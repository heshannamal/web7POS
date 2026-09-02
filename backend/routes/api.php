<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\{ProductController,SaleController,InventoryController,DashboardController,CustomerController,PurchaseController,LabelController,SyncController};
Route::get('/health',fn()=>['status'=>'ok','service'=>'NovaPOS API']);
Route::get('/dashboard',DashboardController::class);
Route::apiResource('products',ProductController::class)->only(['index','store','show','update']);
Route::get('/inventory/summary',[InventoryController::class,'summary']);
Route::get('/inventory/ledger',[InventoryController::class,'ledger']);
Route::post('/inventory/adjustments',[InventoryController::class,'adjust']);
Route::post('/sales',[SaleController::class,'store']);
Route::post('/sales/hold',[SaleController::class,'hold']);
Route::get('/sales/held',[SaleController::class,'held']);
Route::apiResource('customers',CustomerController::class)->only(['index','store','show']);
Route::get('/purchases',[PurchaseController::class,'index']);
Route::get('/labels/products',[LabelController::class,'products']);
Route::post('/sync/push',[SyncController::class,'push']);
Route::get('/sync/status',[SyncController::class,'status']);
