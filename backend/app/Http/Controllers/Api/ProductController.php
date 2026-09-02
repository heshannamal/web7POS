<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
class ProductController extends Controller {
 public function index(Request $request): JsonResponse {
  $q=Product::query()->with(['barcodes','storePrices'])->withSum('batches as stock','quantity')->withSum('batches as reserved_stock','reserved_quantity');
  if($s=$request->string('search')->trim()->toString()) $q->where(function($x)use($s){$x->where('name','like',"%{$s}%")->orWhere('sku','like',"%{$s}%")->orWhereHas('barcodes',fn($b)=>$b->where('barcode','like',"%{$s}%"));});
  if($request->filled('category_id')) $q->where('category_id',$request->integer('category_id'));
  if($request->filled('status')) $q->where('status',$request->string('status'));
  return response()->json($q->orderBy('name')->paginate($request->integer('per_page',30)));
 }
 public function store(Request $request): JsonResponse {
  $data=$request->validate(['name'=>'required|string|max:255','sku'=>'required|string|max:100|unique:products,sku','category_id'=>'nullable|exists:categories,id','brand_id'=>'nullable|exists:brands,id','unit_id'=>'nullable|exists:units,id','cost_price'=>'required|numeric|min:0','selling_price'=>'required|numeric|min:0','wholesale_price'=>'nullable|numeric|min:0','member_price'=>'nullable|numeric|min:0','minimum_price'=>'nullable|numeric|min:0','tax_inclusive'=>'boolean','low_stock_threshold'=>'nullable|numeric|min:0','reorder_level'=>'nullable|numeric|min:0','track_batch'=>'boolean','track_expiry'=>'boolean','track_serial'=>'boolean']);
  return response()->json(Product::create($data),201);
 }
 public function show(Product $product): JsonResponse { return response()->json($product->load(['barcodes','batches','storePrices'])); }
 public function update(Request $request, Product $product): JsonResponse {$product->update($request->validate(['name'=>'sometimes|string|max:255','selling_price'=>'sometimes|numeric|min:0','cost_price'=>'sometimes|numeric|min:0','wholesale_price'=>'nullable|numeric|min:0','member_price'=>'nullable|numeric|min:0','status'=>'sometimes|in:active,draft,archived','low_stock_threshold'=>'sometimes|numeric|min:0','reorder_level'=>'sometimes|numeric|min:0','shelf_location'=>'nullable|string|max:100']));return response()->json($product->fresh());}
}
