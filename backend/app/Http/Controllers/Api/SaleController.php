<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\{Sale,Product,InventoryBatch,StockMovement};
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
class SaleController extends Controller {
 public function store(Request $request): JsonResponse {
  $data=$request->validate(['store_id'=>'required|exists:stores,id','register_id'=>'nullable|exists:registers,id','customer_id'=>'nullable|exists:customers,id','discount'=>'nullable|numeric|min:0','items'=>'required|array|min:1','items.*.product_id'=>'required|exists:products,id','items.*.quantity'=>'required|numeric|min:0.001','items.*.unit_price'=>'nullable|numeric|min:0','payments'=>'required|array|min:1','payments.*.method'=>'required|string','payments.*.amount'=>'required|numeric|min:0.01','cashier_notes'=>'nullable|string|max:1000']);
  $sale=DB::transaction(function()use($data,$request){
   $items=[];$subtotal=0;$taxTotal=0;$taxRate=.0825;
   foreach($data['items'] as $line){
    $product=Product::lockForUpdate()->findOrFail($line['product_id']);
    $qty=(float)$line['quantity'];$unit=(float)($line['unit_price']??$product->selling_price);
    if($product->minimum_price!==null && $unit<(float)$product->minimum_price) throw ValidationException::withMessages(['items'=>["{$product->name} cannot be sold below minimum price without approval."]]);
    $lineSubtotal=$unit*$qty;$lineTax=$product->tax_inclusive?0:$lineSubtotal*$taxRate;$subtotal+=$lineSubtotal;$taxTotal+=$lineTax;
    $items[]=[$product,$qty,$unit,$lineSubtotal,$lineTax];
   }
   $discount=min((float)($data['discount']??0),$subtotal);$total=max(0,$subtotal-$discount+$taxTotal);$paid=collect($data['payments'])->sum('amount');
   if($paid+0.001<$total) throw ValidationException::withMessages(['payments'=>['Payment total is less than sale total. Use an explicit partial/credit workflow for outstanding balances.']]);
   $sale=Sale::create(['number'=>'INV-'.now()->format('ymdHis'), 'store_id'=>$data['store_id'],'register_id'=>$data['register_id']??null,'customer_id'=>$data['customer_id']??null,'user_id'=>$request->user()?->id,'subtotal'=>$subtotal,'discount_total'=>$discount,'tax_total'=>$taxTotal,'total'=>$total,'paid_total'=>$paid,'cashier_notes'=>$data['cashier_notes']??null,'completed_at'=>now()]);
   foreach($items as [$product,$qty,$unit,$lineSubtotal,$lineTax]){
    $sale->items()->create(['product_id'=>$product->id,'description'=>$product->name,'quantity'=>$qty,'unit_price'=>$unit,'tax_rate'=>$product->tax_inclusive?0:$taxRate*100,'tax_total'=>$lineTax,'line_total'=>$lineSubtotal+$lineTax]);
    if($product->track_stock) $this->consumeStock($product,$qty,$data['store_id'],$sale->id);
   }
   foreach($data['payments'] as $payment) $sale->payments()->create($payment);
   return $sale;
  });
  return response()->json($sale->load(['items','payments']),201);
 }
 private function consumeStock(Product $product,float $qty,int $storeId,int $saleId): void {
  $batches=InventoryBatch::query()->where('product_id',$product->id)->where('store_id',$storeId)->whereRaw('(quantity - reserved_quantity) > 0')->orderByRaw('expiry_date IS NULL, expiry_date asc')->orderBy('id')->lockForUpdate()->get();
  $available=$batches->sum(fn($b)=>(float)$b->quantity-(float)$b->reserved_quantity);
  if($available+0.0001<$qty) throw ValidationException::withMessages(['stock'=>["Insufficient stock for {$product->name}. Available {$available}."]]);
  $remaining=$qty;
  foreach($batches as $batch){if($remaining<=0)break;$free=(float)$batch->quantity-(float)$batch->reserved_quantity;$take=min($free,$remaining);$batch->decrement('quantity',$take);StockMovement::create(['product_id'=>$product->id,'store_id'=>$storeId,'batch_id'=>$batch->id,'type'=>'sale','quantity'=>-$take,'unit_cost'=>$batch->unit_cost,'reference_type'=>Sale::class,'reference_id'=>$saleId]);$remaining-=$take;}
 }
 public function hold(Request $request): JsonResponse { $d=$request->validate(['store_id'=>'required|exists:stores,id','register_id'=>'nullable|exists:registers,id','cart'=>'required|array','pricing'=>'nullable|array']);$id=DB::table('held_sales')->insertGetId(['number'=>'HOLD-'.now()->format('ymdHis'),'store_id'=>$d['store_id'],'register_id'=>$d['register_id']??null,'user_id'=>$request->user()?->id,'cart'=>json_encode($d['cart']),'pricing'=>json_encode($d['pricing']??[]),'held_at'=>now(),'created_at'=>now(),'updated_at'=>now()]);return response()->json(DB::table('held_sales')->find($id),201); }
 public function held(Request $request): JsonResponse { return response()->json(DB::table('held_sales')->where('store_id',$request->integer('store_id',1))->orderByDesc('held_at')->get()); }
}
