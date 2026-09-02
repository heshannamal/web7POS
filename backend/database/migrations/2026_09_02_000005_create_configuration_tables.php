<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
 public function up(): void {
  Schema::create('tax_rates',function(Blueprint $t){$t->id();$t->string('name');$t->decimal('rate',8,4);$t->string('type')->default('percent');$t->boolean('active')->default(true);$t->timestamps();});
  Schema::create('receipt_templates',function(Blueprint $t){$t->id();$t->string('name');$t->string('paper_size')->default('80mm');$t->json('layout');$t->boolean('default')->default(false);$t->timestamps();});
  Schema::create('barcode_templates',function(Blueprint $t){$t->id();$t->string('name');$t->decimal('width_mm',8,2);$t->decimal('height_mm',8,2);$t->string('barcode_type')->default('CODE128');$t->boolean('include_qr')->default(false);$t->json('layout')->nullable();$t->timestamps();});
 }
 public function down():void {Schema::dropIfExists('barcode_templates');Schema::dropIfExists('receipt_templates');Schema::dropIfExists('tax_rates');}
};
