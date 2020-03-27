<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Branch;
use Validator;

class BranchController extends Controller
{
    public function create(Request $req)
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
          'company-id' => [
            'required',
            'exists:companies,id',
          ],
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
            Branch::create([
              'company_id' => $req->input('company-id'),
              'name' => $req->input('name'),
              'location' => $req->input('location'),
            ]);
        } catch (\Throwable $e) {
            report($e);

            return response()->json([
              'message' => 'Some error occured while creating Branch.',
            ], 500);
        }

        return response()->json([
          'message' => 'Branch created successfully.',
        ], 200);
    }

    public function store(Request $req)
    {
        try {
            $this->authorize('create', Branch::class);
        } catch (\Throwable $e) {
            report($e);

            return response()->json([
              'message' => 'You are not authorized to do this.',
            ], 403);
        }

        $validator = Validator::make($req->input(), [
          'id' => [
            'required',
            'exists:branches,id',
          ],
          'name' => [
            'max:20',
          ],
          'location' => [
            'max:100',
          ],
          'company-id' => [
            'exists:companies,id',
          ],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors(),
            ], 400);
        }

        try {
            $branch = Branch::find($req->input('id'));
            $req->filled('name') && $branch->name = $req->input('name');
            $req->filled('location') && $branch->location = $req->input('location');
            $req->filled('company-id') && $branch->company_id = $req->input('company-id');
            $branch->save();
        } catch (\Throwable $e) {
            report($e);

            return response()->json([
              'message' => 'Some error occured while updating Branch.',
            ], 500);
        }

        return response()->json([
          'message' => 'Branch updated successfully.',
        ], 200);
    }

    public function delete(Request $req)
    {
        try {
            $this->authorize('delete', Branch::class);
        } catch (\Throwable $e) {
            report($e);

            return response()->json([
              'message' => 'You are not authorized to do this.',
            ], 403);
        }

        $validator = Validator::make($req->input(), [
          'id' => [
            'required',
            'exists:branches,id',
          ],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors(),
            ], 400);
        }

        try {
            Branch::destroy($req->input('id'));
        } catch (\Throwable $e) {
            report($e);

            return response()->json([
              'message' => 'Some error occured while deleting Branch.',
            ], 500);
        }

        return response()->json([
          'message' => 'Branch deleted successfully.',
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
          'company-id' => [
            'numeric',
            'exists:companies,id',
          ],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors(),
            ], 400);
        }

        $page = !empty($req->page) ? $req->page : 1;
        $size = !empty($req->size) ? $req->size : 10;

        $query = Branch::where(function ($query) use ($req) {
            if ($req->filled('query')) {
                $query->where('name', 'like', '%'.$req['query'].'%')
                ->orWhere('location', 'like', '%'.$req['query'].'%');
            }
            if ($req->filled('company-id')) {
                $query->where('company_id', $req['company-id']);
            }
        });

        $paginator = $query->paginate($size);
        $paginator->currentPage($page);

        return response()->json([
          'message' => 'Branches fetched successfully.',
          'data' => $paginator,
        ], 200);
    }

    public function get(Request $req)
    {
        $company = null;

        $validator = Validator::make($req->input(), [
          'id' => [
            'required',
            'exists:branches,id',
          ],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors(),
            ], 400);
        }

        try {
            $branch = Branch::find($req->input('id'));
        } catch (\Throwable $e) {
            report($e);

            return response()->json([
              'message' => 'Some error occured while finding Branch.',
            ], 500);
        }

        return response()->json([
          'message' => 'Branch found.',
          'data' => $branch,
        ], 200);
    }
}
