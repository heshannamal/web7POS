<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\{DB,Hash};
class DatabaseSeeder extends Seeder {
 public function run(): void {
  $now=now();
  DB::table('stores')->insert([['id'=>1,'name'=>'Main Store','code'=>'MAIN','currency'=>'USD','timezone'=>'Asia/Colombo','active'=>1,'created_at'=>$now,'updated_at'=>$now],['id'=>2,'name'=>'Downtown Store','code'=>'DOWN','currency'=>'USD','timezone'=>'Asia/Colombo','active'=>1,'created_at'=>$now,'updated_at'=>$now]]);
  DB::table('warehouses')->insert([['id'=>1,'store_id'=>1,'name'=>'Main Warehouse','code'=>'WH-A','active'=>1,'created_at'=>$now,'updated_at'=>$now]]);
  DB::table('users')->insert(['id'=>1,'store_id'=>1,'name'=>'Alex Morgan','email'=>'admin@novapos.local','password'=>Hash::make('password'),'active'=>1,'two_factor_enabled'=>0,'created_at'=>$now,'updated_at'=>$now]);
  $roles=['Admin','Manager','Supervisor','Cashier','Inventory Manager','Accountant'];foreach($roles as $i=>$r)DB::table('roles')->insert(['id'=>$i+1,'name'=>$r,'slug'=>str($r)->slug(),'system'=>1,'created_at'=>$now,'updated_at'=>$now]);DB::table('role_user')->insert(['role_id'=>1,'user_id'=>1]);
  $perms=['price-change','discount-approval','refund','cancel-sale','open-cash-drawer','view-cost-price','inventory-change','delete-product','reports-access','profit-view','manage-users'];foreach($perms as $i=>$p)DB::table('permissions')->insert(['id'=>$i+1,'name'=>str($p)->replace('-',' ')->title(),'slug'=>$p,'group'=>'pos','created_at'=>$now,'updated_at'=>$now]);foreach(range(1,count($perms)) as $pid)DB::table('permission_role')->insert(['permission_id'=>$pid,'role_id'=>1,'level'=>'allow']);
  DB::table('registers')->insert(['id'=>1,'store_id'=>1,'name'=>'Register 1','code'=>'POS-01','active'=>1,'created_at'=>$now,'updated_at'=>$now]);
  foreach([['Fruits & Vegetables','fruits-vegetables'],['Dairy & Eggs','dairy-eggs'],['Bakery','bakery'],['Grocery','grocery'],['Beverages','beverages'],['Snacks','snacks'],['Household','household'],['Personal Care','personal-care']] as $i=>$c) DB::table('categories')->insert(['id'=>$i+1,'name'=>$c[0],'slug'=>$c[1],'active'=>1,'created_at'=>$now,'updated_at'=>$now]);
  foreach([['Kilogram','kg'],['Piece','pc'],['Litre','L'],['Pack','pack'],['Box','box']] as $i=>$u)DB::table('units')->insert(['id'=>$i+1,'name'=>$u[0],'symbol'=>$u[1],'precision'=>1,'created_at'=>$now,'updated_at'=>$now]);
  $items=[
   ['FRU-1001','Red Apple',1,1,2.19,3.29,128,20,'1234567890123'],['FRU-1002','Banana',1,1,.78,1.29,184,30,'1234567890124'],['DAI-1001','Milk 1L',2,3,.85,1.49,96,25,'1234567890125'],['BAK-1003','Whole Wheat Bread',3,2,1.35,2.49,34,15,'1234567890127'],['DAI-1002','Eggs (12 pcs)',2,4,2.40,3.49,18,20,'1234567890128'],['GRO-1001','Basmati Rice 5kg',4,4,8.20,12.99,22,10,'1234567890129'],['BEV-1006','Instant Coffee 200g',5,2,3.20,4.99,0,10,'1234567890133']
  ];
  foreach($items as $i=>$p){$id=$i+1;DB::table('products')->insert(['id'=>$id,'sku'=>$p[0],'name'=>$p[1],'category_id'=>$p[2],'unit_id'=>$p[3],'cost_price'=>$p[4],'selling_price'=>$p[5],'tax_inclusive'=>0,'reorder_level'=>$p[7],'low_stock_threshold'=>$p[7],'status'=>'active','created_at'=>$now,'updated_at'=>$now]);DB::table('product_barcodes')->insert(['product_id'=>$id,'barcode'=>$p[8],'type'=>'EAN13','primary'=>1,'created_at'=>$now,'updated_at'=>$now]);DB::table('inventory_batches')->insert(['product_id'=>$id,'store_id'=>1,'warehouse_id'=>null,'lot_number'=>'OPEN-'.$id,'quantity'=>$p[6],'reserved_quantity'=>0,'unit_cost'=>$p[4],'created_at'=>$now,'updated_at'=>$now]);}
 }
}
