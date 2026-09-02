<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
class Product extends Model {
 protected $guarded=[];
 protected function casts(): array { return ['cost_price'=>'decimal:4','selling_price'=>'decimal:4','wholesale_price'=>'decimal:4','member_price'=>'decimal:4','track_stock'=>'boolean','track_batch'=>'boolean','track_expiry'=>'boolean','track_serial'=>'boolean']; }
 public function barcodes(): HasMany { return $this->hasMany(ProductBarcode::class); }
 public function batches(): HasMany { return $this->hasMany(InventoryBatch::class); }
 public function storePrices(): HasMany { return $this->hasMany(ProductStorePrice::class); }
 public function purchaseOrderItems(): HasMany { return $this->hasMany(PurchaseOrderItem::class); }
}
