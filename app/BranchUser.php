<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\Pivot;

class BranchUser extends Pivot
{
    protected $fillable = [
      'branch_id',
      'user_id',
      'role',
    ];

    protected $with = ['user'];

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
