<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\BranchUser;
use Validator;

class BranchUserController extends Controller
{
    public function createBranchRep(Request $req)
    {
        // try {
        //     $this->authorize('create', Branch::class);
        // } catch (\Throwable $e) {
        //     report($e);

        //     return response()->json([
        //       'message' => 'You are not authorized to do this.',
        //     ], 403);
        // }

        $validator = Validator::make($req->input(), [
          'branch-id' => [
            'required',
            'exists:branches,id',
          ],
          'role' => [
            'string',
            'required',
            'min:3',
            'max:25',
          ],
          'name' => [
            'string',
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
            'email',
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
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors(),
            ], 400);
        }

        try {
            $user = User::create([
              'name' => $req->input('name'),
              'mobile' => $req->input('mobile'),
              'email' => $req->input('email'),
              'gender' => $req->input('gender'),
              'password' => bcrypt($req->input('password')),
            ]);

            try {
                $user->branches()->attach($req->input('branch-id'), [
                  'role' => $req->input('role'),
                ]);
            } catch (\Throwable $e) {
                report($e);

                return response()->json([
                  'message' => 'Some error occured while attaching User to Branch.',
                ], 500);
            }
        } catch (\Throwable $e) {
            report($e);

            return response()->json([
              'message' => 'Some error occured while creating User.',
            ], 500);
        }

        return response()->json([
          'message' => 'User attached successfully.',
        ], 200);
    }

    public function fetchUsers(Request $req)
    {
        $validator = Validator::make($req->input(), [
          'ids' => [
            'required',
          ],
          'ids.*' => [
            'required',
            'exists:branches,id',
          ],
          'role' => [
            'string',
          ],
          'page' => [
            'numeric',
          ],
          'size' => [
            'numeric',
          ],
        ]);

        if ($validator->fails()) {
            return response()->json([
              'error' => $validator->errors(),
            ], 400);
        }

        try {
            $page = !empty($req->page) ? $req->page : 1;
            $size = !empty($req->size) ? $req->size : 10;

            $query = BranchUser::where(function ($query) use ($req) {
                $query->whereIn('branch_id', $req['ids']);
                if ($req->filled('role')) {
                    $query->where('role', $req['role']);
                }
            });

            $paginator = $query->paginate($size);
            $paginator->currentPage($page);

            return response()->json([
              'message' => 'Branch Users fetched successfully.',
              'data' => $paginator,
            ], 200);
        } catch (\Throwable $e) {
            report($e);

            return response()->json([
              'message' => 'Some error occured while fetching Branch Users.',
            ], 500);
        }
    }
}
