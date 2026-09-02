<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class InventoryBatch extends Model { protected $guarded=[]; protected function casts():array{return ['expiry_date'=>'date','quantity'=>'decimal:4','reserved_quantity'=>'decimal:4','unit_cost'=>'decimal:4'];} public function product():BelongsTo{return $this->belongsTo(Product::class);} }
