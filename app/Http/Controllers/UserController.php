<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Validator;
use App\User;

class UserController extends Controller
{
    public function register(Request $req)
    {
        $validator = Validator::make($req->input(), [
          'name' => [
            'required',
            'min:3',
            'max:25',
          ],
          'mobile' => [
            'required',
            'string',
            'unique:users,mobile',
          ],
          'email' => [
            'string',
            'unique:users,email',
          ],
          'gender' => [
            'required',
            'in:M,F',
          ],
          'password' => [
            'required',
            'string',
          ],
          'match-password' => [
            'required',
            'same:password',
          ],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors(),
            ], 400);
        }

        try {
            User::create([
              'name' => $req->input('name'),
              'email' => $req->input('email'),
              'mobile' => $req->input('mobile'),
              'gender' => $req->input('gender'),
              'password' => bcrypt($req->input('password')),
            ]);
        } catch (\Throwable $e) {
            report($e);

            return response()->json([
              'error' => 'An error occured while creating the user.',
            ], 500);
        }

        return response()->json(['message' => 'User created successfully.'], 200);
    }

    public function login(Request $req)
    {
        $validator = Validator::make($req->input(), [
          'mobile' => [
            'required',
            'exists:users,mobile',
          ],
          'password' => [
            'required',
          ],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors(),
            ], 400);
        }

        if (auth()->attempt(['mobile' => $req->input('mobile'), 'password' => $req->input('password')])) {
            $token = Str::random(60);
            auth()->user()->api_token = hash('sha256', $token);
            auth()->user()->save();

            return response()->json([
              'token' => $token,
              'user' => auth()->user(),
            ], 200);
        } else {
            return response()->json(['error' => 'Unauthorised.'], 401);
        }
    }

    public function logout(Request $req)
    {
        $req->user()->api_token = null;
        $req->user()->save();

        return response()->json(['message' => 'Logout successful.'], 200);
    }

    public function get(Request $req)
    {
        $user = null;

        $validator = Validator::make($req->input(), [
          'id' => [
            'required',
            'exists:users,id',
          ],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors(),
            ], 400);
        }

        try {
            $user = User::find($req->input('id'));
        } catch (\Throwable $e) {
            report($e);

            return response()->json([
              'message' => 'Some error occured while finding User.',
            ], 500);
        }

        return response()->json([
          'message' => 'User found.',
          'data' => $user,
        ], 200);
    }
}
