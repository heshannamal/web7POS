<?php
namespace App\Models; use Illuminate\Database\Eloquent\Model; class RegisterShift extends Model { protected $guarded=[]; protected function casts():array{return ['opened_at'=>'datetime','closed_at'=>'datetime'];} }
