<?php
use Illuminate\Support\Facades\Route;
Route::get('/', fn () => response()->json(['service' => 'NovaPOS API', 'status' => 'ok']));
