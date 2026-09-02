<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;use App\Models\Product;use Illuminate\Http\{Request,JsonResponse};
class LabelController extends Controller {
 public function products(Request $request):JsonResponse { $q=Product::with('barcodes'); if($request->filled('from'))$q->whereDate('created_at','>=',$request->date('from'));if($request->filled('to'))$q->whereDate('created_at','<=',$request->date('to'));if($request->filled('purchase_order_id'))$q->whereHas('purchaseOrderItems',fn($x)=>$x->where('purchase_order_id',$request->integer('purchase_order_id')));return response()->json($q->paginate(50)); }
}
