<?php
namespace App\Models; use Illuminate\Database\Eloquent\Model; class ProductBarcode extends Model { protected $guarded=[]; protected function casts(): array{return ['primary'=>'boolean'];} }
