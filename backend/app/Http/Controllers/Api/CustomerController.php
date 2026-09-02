<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller; use App\Models\Customer; use Illuminate\Http\{Request,JsonResponse};
class CustomerController extends Controller {
 public function index(Request $request):JsonResponse {$q=Customer::query();if($s=$request->string('search')->trim()->toString())$q->where(fn($x)=>$x->where('name','like',"%{$s}%")->orWhere('email','like',"%{$s}%")->orWhere('phone','like',"%{$s}%"));return response()->json($q->latest()->paginate($request->integer('per_page',30)));}
 public function store(Request $request):JsonResponse {return response()->json(Customer::create($request->validate(['name'=>'required|string|max:255','email'=>'nullable|email','phone'=>'nullable|string|max:50','address'=>'nullable|string','customer_group_id'=>'nullable|exists:customer_groups,id','membership_level'=>'nullable|string|max:50','credit_limit'=>'nullable|numeric|min:0','birthday'=>'nullable|date','notes'=>'nullable|string'])),201);}
 public function show(Customer $customer):JsonResponse{return response()->json($customer);}
}
