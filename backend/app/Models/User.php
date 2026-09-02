<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
class User extends Authenticatable { use HasApiTokens,HasFactory,Notifiable; protected $guarded=[]; protected $hidden=['password','remember_token','pin_hash']; protected function casts():array{return ['email_verified_at'=>'datetime','two_factor_enabled'=>'boolean','active'=>'boolean','password'=>'hashed'];} }
