<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Branch extends Model
{
    protected $fillable = [
      'name',
      'company_id',
      'location',
    ];

    protected $with = [
      'stock_list',
    ];

    public function users()
    {
        return $this->belongsToMany('App\User')
        ->withPivot('role')
        ->withTimestamps();
    }

    public function company()
    {
        return $this->belongsTo('App\Company');
    }

    public function stock_list()
    {
        return $this->hasMany('App\Stock');
    }
}
