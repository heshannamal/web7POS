<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
 public function up(): void {
  Schema::create('stores', function(Blueprint $t){$t->id();$t->string('name');$t->string('code')->unique();$t->text('address')->nullable();$t->string('phone')->nullable();$t->string('currency',3)->default('USD');$t->string('timezone')->default('UTC');$t->boolean('active')->default(true);$t->timestamps();});
  Schema::create('warehouses', function(Blueprint $t){$t->id();$t->foreignId('store_id')->nullable()->constrained()->nullOnDelete();$t->string('name');$t->string('code')->unique();$t->text('address')->nullable();$t->boolean('active')->default(true);$t->timestamps();});
  Schema::create('users', function(Blueprint $t){$t->id();$t->foreignId('store_id')->nullable()->constrained()->nullOnDelete();$t->string('name');$t->string('email')->unique();$t->string('password');$t->string('pin_hash')->nullable();$t->timestamp('email_verified_at')->nullable();$t->boolean('two_factor_enabled')->default(false);$t->boolean('active')->default(true);$t->rememberToken();$t->timestamps();});
  Schema::create('roles', function(Blueprint $t){$t->id();$t->string('name')->unique();$t->string('slug')->unique();$t->boolean('system')->default(false);$t->timestamps();});
  Schema::create('permissions', function(Blueprint $t){$t->id();$t->string('name');$t->string('slug')->unique();$t->string('group')->nullable();$t->timestamps();});
  Schema::create('role_user', function(Blueprint $t){$t->foreignId('role_id')->constrained()->cascadeOnDelete();$t->foreignId('user_id')->constrained()->cascadeOnDelete();$t->primary(['role_id','user_id']);});
  Schema::create('permission_role', function(Blueprint $t){$t->foreignId('permission_id')->constrained()->cascadeOnDelete();$t->foreignId('role_id')->constrained()->cascadeOnDelete();$t->string('level')->default('allow');$t->primary(['permission_id','role_id']);});
  Schema::create('registers', function(Blueprint $t){$t->id();$t->foreignId('store_id')->constrained()->cascadeOnDelete();$t->string('name');$t->string('code')->unique();$t->boolean('active')->default(true);$t->timestamps();});
  Schema::create('devices', function(Blueprint $t){$t->id();$t->foreignId('store_id')->nullable()->constrained()->nullOnDelete();$t->foreignId('register_id')->nullable()->constrained()->nullOnDelete();$t->string('name');$t->string('type');$t->string('identifier')->unique();$t->string('connection_type')->nullable();$t->json('settings')->nullable();$t->timestamp('last_seen_at')->nullable();$t->boolean('active')->default(true);$t->timestamps();});
 }
 public function down(): void {foreach(['devices','registers','permission_role','role_user','permissions','roles','users','warehouses','stores'] as $x) Schema::dropIfExists($x);}
};
