<?php
namespace App\Models; use Illuminate\Database\Eloquent\Model; class Promotion extends Model { protected $guarded=[]; protected function casts():array{return ['starts_at'=>'datetime','ends_at'=>'datetime','member_only'=>'boolean','automatic'=>'boolean','active'=>'boolean'];} }
