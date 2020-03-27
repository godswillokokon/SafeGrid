<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    protected $fillable = [
      'branch_id',
      'name',
      'unit',
      'description',
    ];

    public function branch()
    {
        return $this->belongsTo('App\Branch');
    }
}
