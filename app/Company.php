<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $fillable = [
      'name',
      'location',
    ];

    protected $with = [
      'branches',
    ];

    public function users()
    {
        return $this->belongsToMany('App\User')
        ->withPivot('role')
        ->withTimestamps();
    }

    public function branches()
    {
        return $this->hasMany('App\Branch');
    }
}
