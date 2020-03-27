<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Company;
use App\CompanyUser;
use App\User;
use Validator;

class CompanyUserController extends Controller
{
    public function createCompanyAdmin(Request $req)
    {
        try {
            $this->authorize('create', Company::class);
        } catch (\Throwable $e) {
            report($e);

            return response()->json([
              'message' => 'You are not authorized to do this.',
            ], 403);
        }

        $validator = Validator::make($req->input(), [
          'company-id' => [
            'required',
            'exists:companies,id',
          ],
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
                $user->companies()->attach($req->input('company-id'), [
                  'role' => 'admin',
                ]);
            } catch (\Throwable $e) {
                report($e);

                return response()->json([
                  'message' => 'Some error occured while attaching User to Company.',
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

    public function fetch(Request $req)
    {
        $validator = Validator::make($req->input(), [
          'company-ids' => [
            'required',
          ],
          'company-ids.*' => [
            'required',
            'exists:companies,id',
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

            $query = CompanyUser::whereIn('company_id', $req['company-ids'])->where(function ($query) use ($req) {
                if ($req->filled('role')) {
                    $query->where('role', $req['role']);
                }
            })->with([
              'company',
              'user',
            ]);

            $paginator = $query->paginate($size);
            $paginator->currentPage($page);

            return response()->json([
              'message' => 'Commpany Users fetched successfully.',
              'data' => $paginator,
            ], 200);
        } catch (\Throwable $e) {
            report($e);

            return response()->json([
              'message' => 'Some error occured while fetching Commpany Users.',
            ], 500);
        }
    }
}
