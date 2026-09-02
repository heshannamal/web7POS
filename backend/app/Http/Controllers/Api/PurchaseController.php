<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;use App\Models\PurchaseOrder;use Illuminate\Http\{Request,JsonResponse};
class PurchaseController extends Controller { public function index(Request $request):JsonResponse{return response()->json(PurchaseOrder::query()->latest()->paginate($request->integer('per_page',30)));} }
