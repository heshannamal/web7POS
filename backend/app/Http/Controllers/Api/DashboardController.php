<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\{Sale,Product,Customer};
use Illuminate\Http\{Request,JsonResponse};
use Illuminate\Support\Facades\DB;
class DashboardController extends Controller {
 public function __invoke(Request $request):JsonResponse { $store=$request->integer('store_id',1);$from=now()->startOfDay();$sales=Sale::where('store_id',$store)->where('created_at','>=',$from);$total=(clone $sales)->sum('total');$transactions=(clone $sales)->count();$profit=DB::table('sale_items')->join('sales','sales.id','=','sale_items.sale_id')->leftJoin('products','products.id','=','sale_items.product_id')->where('sales.store_id',$store)->where('sales.created_at','>=',$from)->selectRaw('COALESCE(SUM(sale_items.line_total - (products.cost_price * sale_items.quantity)),0) v')->value('v');$low=Product::withSum(['batches as stock'=>fn($q)=>$q->where('store_id',$store)],'quantity')->get()->filter(fn($p)=>(float)$p->stock<=(float)$p->reorder_level)->values()->take(10);return response()->json(['sales'=>(float)$total,'transactions'=>$transactions,'gross_profit'=>(float)$profit,'average_basket'=>$transactions?(float)$total/$transactions:0,'customers'=>Customer::where('active',true)->count(),'low_stock'=>$low]); }
}
