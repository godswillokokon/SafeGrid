<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class StockRecord extends Model
{
    protected $fillable = [
      'stock_id',
      'added_by',
      'quantity',
      'balance',
      'reverse_id',
      'transaction_type',
    ];

    protected $appends = ['previous_balance'];

    public function stock()
    {
        return $this->belongsTo('App\Stock');
    }

    public function getPreviousBalanceAttribute()
    {
        $value = 0;
        $lastRecord = DB::table($this->table)->select()->where('stock_id', $this->stock_id)
        ->where('id', '<', $this->id)->latest()->first();

        if (!empty($lastRecord)) {
            $value = $lastRecord->balance;
        }

        return $this->attributes['previous_balance'] = $value;
    }
}
