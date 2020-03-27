<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Company;
use Validator;

class CompanyController extends Controller
{
    public function create(Request $req)
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
            'name' => [
                'required',
                'max:20',
            ],
            'location' => [
                'required',
                'max:100',
            ],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors(),
            ], 400);
        }

        try {
            Company::create([
              'name' => $req->input('name'),
              'location' => $req->input('location'),
            ]);
        } catch (\Throwable $e) {
            report($e);

            return response()->json([
              'message' => 'Some error occured while creating Company.',
            ], 500);
        }

        return response()->json([
          'message' => 'Company created successfully.',
        ], 200);
    }

    public function store(Request $req)
    {
        try {
            $this->authorize('update', Company::class);
        } catch (\Throwable $e) {
            report($e);

            return response()->json([
              'message' => 'You are not authorized to do this.',
            ], 403);
        }

        $validator = Validator::make($req->input(), [
          'id' => [
            'required',
            'exists:companies,id',
          ],
          'name' => [
              'max:20',
          ],
          'location' => [
              'max:100',
          ],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors(),
            ], 400);
        }

        try {
            $company = Company::find($req->input('id'));
            $req->filled('name') && $company->name = $req->input('name');
            $req->filled('location') && $company->location = $req->input('location');

            $company->save();
        } catch (\Throwable $e) {
            report($e);

            return response()->json([
              'message' => 'Some error occured while updating Company.',
            ], 500);
        }

        return response()->json([
          'message' => 'Company updated successfully.',
        ], 200);
    }

    public function get(Request $req)
    {
        $company = null;

        $validator = Validator::make($req->input(), [
          'id' => [
            'required',
            'exists:companies,id',
          ],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors(),
            ], 400);
        }

        try {
            $company = Company::find($req->input('id'));
        } catch (\Throwable $e) {
            report($e);

            return response()->json([
              'message' => 'Some error occured while finding Company.',
            ], 500);
        }

        return response()->json([
          'message' => 'Company found.',
          'data' => $company,
        ], 200);
    }

    public function fetch(Request $req)
    {
        $validator = Validator::make($req->input(), [
          'page' => [
            'numeric',
          ],
          'size' => [
            'numeric',
          ],
          'query' => [
            'string',
          ],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors(),
            ], 400);
        }

        $page = !empty($req->page) ? $req->page : 1;
        $size = !empty($req->size) ? $req->size : 10;

        $query = Company::where(function ($query) use ($req) {
            if ($req->filled('query')) {
                $query->where('name', 'like', '%'.$req['query'].'%')
                ->orWhere('location', 'like', '%'.$req['query'].'%');
            }
        });

        $paginator = $query->paginate($size);
        $paginator->currentPage($page);

        return response()->json([
          'message' => 'Companies fetched successfully.',
          'data' => $paginator,
        ], 200);
    }

    public function delete(Request $req)
    {
        try {
            $this->authorize('delete', Company::class);
        } catch (\Throwable $e) {
            report($e);

            return response()->json([
              'message' => 'You are not authorized to do this.',
            ], 403);
        }

        $validator = Validator::make($req->input(), [
          'id' => [
            'required',
            'exists:companies,id',
          ],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors(),
            ], 400);
        }

        try {
            Company::destroy($req->input('id'));
        } catch (\Throwable $e) {
            report($e);

            return response()->json([
              'message' => 'Some error occured while deleting Company.',
            ], 500);
        }

        return response()->json([
          'message' => 'Company deleted successfully.',
        ], 200);
    }

    public function activation(Request $req)
    {
        try {
            $this->authorize('update', Company::class);
        } catch (\Throwable $e) {
            report($e);

            return response()->json([
              'message' => 'You are not authorized to do this.',
            ], 403);
        }

        $validator = Validator::make($req->input(), [
          'id' => [
            'required',
            'exists:companies,id',
          ],
          'action' => [
            'required',
            'in:activate,deactivate',
          ],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors(),
            ], 400);
        }

        try {
            $company = Company::find($req->input('id'));
            if ($req->input('action') == 'activate') {
                $company->active = true;
            } elseif ($req->input('action') == 'deactivate') {
                $company->active = false;
            }
            $company->save();
        } catch (\Throwable $e) {
            report($e);

            return response()->json([
              'message' => 'Some error occured while '
              .$req->input('action') ? ' activating ' : ' deactivating '.
              ' Company.',
            ], 500);
        }

        return response()->json([
          'message' => 'Company '
          .$req->input('action') ? ' activated ' : ' deactivated '.
          ' successfully.',
        ], 200);
    }
}
