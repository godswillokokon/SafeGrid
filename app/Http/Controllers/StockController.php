<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Stock;
use Validator;

class StockController extends Controller
{
    public function create(Request $req)
    {
        // try {
        //     $this->authorize('create', Company::class);
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
          'name' => [
              'required',
              'max:20',
          ],
          'unit' => [
              'required',
              'max:10',
          ],
          'description' => [
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
            Stock::create([
              'branch_id' => $req->input('branch-id'),
              'name' => $req->input('name'),
              'unit' => $req->input('unit'),
              'description' => $req->input('description'),
            ]);
        } catch (\Throwable $e) {
            report($e);

            return response()->json([
              'message' => 'Some error occured while creating Stock.',
            ], 500);
        }

        return response()->json([
          'message' => 'Stock created successfully.',
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
            'exists:stocks,id',
          ],
          'name' => [
            'max:20',
          ],
          'unit' => [
            'max:20',
          ],
          'description' => [
            'max:100',
          ],
          'branch-id' => [
            'exists:branches,id',
          ],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors(),
            ], 400);
        }

        try {
            $stock = Stock::find($req->input('id'));
            $req->filled('branch-id') && $stock->branch_id = $req->input('branch-id');
            $req->filled('name') && $stock->name = $req->input('name');
            $req->filled('unit') && $stock->unit = $req->input('unit');
            $req->filled('description') && $stock->description = $req->input('description');

            $stock->save();
        } catch (\Throwable $e) {
            report($e);

            return response()->json([
              'message' => 'Some error occured while updating Stock.',
            ], 500);
        }

        return response()->json([
          'message' => 'Stock updated successfully.',
        ], 200);
    }

    public function get(Request $req)
    {
        $stock = null;

        $validator = Validator::make($req->input(), [
          'id' => [
            'required',
            'exists:stocks,id',
          ],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors(),
            ], 400);
        }

        try {
            $stock = Stock::find($req->input('id'));
        } catch (\Throwable $e) {
            report($e);

            return response()->json([
              'message' => 'Some error occured while finding Stock.',
            ], 500);
        }

        return response()->json([
          'message' => 'Stock found.',
          'data' => $stock,
        ], 200);
    }

    public function delete(Request $req)
    {
        $validator = Validator::make($req->input(), [
          'id' => [
            'required',
            'exists:stocks,id',
          ],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors(),
            ], 400);
        }

        try {
            Stock::destroy($req->input('id'));
        } catch (\Throwable $e) {
            report($e);

            return response()->json([
              'message' => 'Some error occured while deleting Stock.',
            ], 500);
        }

        return response()->json([
          'message' => 'Stock deleted successfully.',
        ], 200);
    }

    public function fetch(Request $req)
    {
        $validator = Validator::make($req->input(), [
          'branch-ids.*' => [
            'exists:branches,id',
          ],

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

        $query = Stock::where(function ($query) use ($req) {
            if ($req->filled('query')) {
                $query->where('name', 'like', '%'.$req['query'].'%')
                ->orWhere('description', 'like', '%'.$req['query'].'%');
            }
            if ($req->filled('branch-ids')) {
                $query->whereIn('branch_id', $req['branch-ids']);
            }
        });

        $paginator = $query->paginate($size);
        $paginator->currentPage($page);

        return response()->json([
          'message' => 'Stocks fetched successfully.',
          'data' => $paginator,
        ], 200);
    }

    public function fetchAllStocks(Request $req)
    {
      $query = Stock::all();
      $response = ['data' =>$query];
      return response()->json([
        'message' => 'All Stocks fetched successfully.',
        'data' =>  $response,
      ], 200);
    }
}
