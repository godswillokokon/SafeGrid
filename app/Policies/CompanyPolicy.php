<?php

namespace App\Policies;

use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CompanyPolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
    }

    public function create(User $user)
    {
        return $user->role == 'admin';
    }

    public function update(User $user)
    {
        return $user->role == 'admin';
    }

    public function delete(User $user)
    {
        return $user->role == 'admin';
    }
}
