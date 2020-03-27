<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    protected $fillable = [
      'stock_id',
      'stock_record_id',
      'added_by',
      'amount',
      'quantity',
      'unit_price',
      'reverse_id',
    ];

    public function stock()
    {
        return $this->belongsTo('App\Stock');
    }
}
