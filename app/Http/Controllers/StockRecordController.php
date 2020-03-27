<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\StockRecord;
use DB;
use Validator;

class StockRecordController extends Controller
{
    public function addRecord(Request $req)
    {
        $validator = Validator::make($req->input(), [
          'stock-id' => [
            'required',
            'integer',
            'exists:stocks,id',
          ],
          'quantity' => [
            'required',
            'integer',
          ],
          'type' => [
            'required',
            'in:addition,deduction,update',
          ],
        ]);

        if ($validator->fails()) {
            return response()->json([
              'error' => $validator->errors(),
            ], 400);
        }

        try {
            DB::transaction(function () use ($req) {
                $lastRecord = StockRecord::where('stock_id', $req->input('stock-id'))->latest()->first();
                $newRecord = new StockRecord([
                  'stock_id' => $req->input('stock-id'),
                  'quantity' => $req->input('quantity'),
                  'added_by' => $req->user()->id,
                ]);

                switch ($req->input('type')) {
                  case 'addition':
                    $newRecord->transaction_type = $req->input('type');
                    if (!empty($lastRecord)) {
                        $newRecord->balance = $lastRecord->balance + $req->input('quantity');
                    } else {
                        $newRecord->balance = $req->input('quantity');
                    }
                    break;

                  case 'deduction':
                    $newRecord->transaction_type = $req->input('type');
                    if (!empty($lastRecord)) {
                        $newRecord->balance = $lastRecord->balance - $req->input('quantity');
                    } else {
                        $newRecord->balance = $req->input('quantity');
                    }
                    break;

                  case 'update':
                    $newRecord->transaction_type = $req->input('type');
                    $newRecord->quantity = 0;
                    $newRecord->balance = $req->input('quantity');
                    break;

                  default:
                    return response()->json([
                      'message' => 'Invalid transaction type.',
                    ], 400);
                    break;
                }

                $newRecord->save();
            }, 2);
        } catch (\Throwable $e) {
            report($e);

            return response()->json([
            'message' => 'Some error occured while adding Stock Record.',
          ], 500);
        }

        return response()->json([
        'message' => 'Stock Record added successfully.',
      ], 200);
    }

    public function reverseRecord(Request $req)
    {
        $validator = Validator::make($req->input(), [
          'id' => [
            'required',
            'exists:stock_records,id',
          ],
        ]);

        if ($validator->fails()) {
            return response()->json([
              'error' => $validator->errors(),
            ], 400);
        }

        try {
            $idMismatch = false;
            DB::transaction(function () use ($req, &$idMismatch) {
                $originalRecord = StockRecord::find($req->input('id'));
                $lastRecord = StockRecord::where('stock_id', $originalRecord->stock_id)
                ->latest()->first();

                if ($lastRecord->id != $originalRecord->id) {
                    $idMismatch = true;

                    return;
                }

                $newRecord = new StockRecord([
                  'stock_id' => $lastRecord->stock_id,
                  'quantity' => $lastRecord->quantity,
                  'added_by' => $req->user()->id,
                  'reverse_id' => $originalRecord->id,
                ]);

                switch ($originalRecord->transaction_type) {
                  case 'addition':
                    $newRecord->type = 'reverse-addition';
                    $newRecord->balance = $originalRecord->balance - $originalRecord->quantity;
                    break;

                  case 'deduction':
                    $newRecord->type = 'reverse-deduction';
                    $newRecord->balance = $originalRecord->balance + $originalRecord->quantity;
                    break;

                  case 'update':
                    $newRecord->type = 'reverse-update';
                    $lastRecord = StockRecord::where('stock_id', $originalRecord->stock_id)
                    ->where('transaction_type', '!=', 'update')
                    ->orderBy('created_at', 'DESC')->first();
                    $newRecord->quatity = 0;
                    !empty($lastRecord) ? $newRecord->balance = $lastRecord->balance
                    : $newRecord->balance = 0;
                    break;

                  default:
                    return response()->json([
                      'message' => 'Invalid transaction type to reverse.',
                    ], 400);
                    break;
                }
                $newRecord->save();
            }, 2);
            if ($idMismatch) {
                return response()->json([
                  'message' => 'You can only update the last record.',
                ], 400);
            }
        } catch (\Throwable $e) {
            report($e);

            return response()->json([
              'message' => 'Some error occured while reversing Stock Record.',
            ], 500);
        }

        return response()->json([
        'message' => 'Stock Record reversed successfully.',
      ], 200);
    }

    public function fetchRecords(Request $req)
    {
        $validator = Validator::make($req->input(), [
          'stock-ids' => [
            'required',
          ],
          'stock-ids.*' => [
            'required',
            'exists:stocks,id',
          ],
          'types.*' => [
            'required',
            'distinct',
            'in:addition,deduction,update,reverse-addition,reverse-deduction,reverse-update',
          ],
          'page' => [
            'numeric',
          ],
          'size' => [
            'numeric',
          ],
          'start-date' => [
            'date',
          ],
          'end-date' => [
            'date',
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

            $query = StockRecord::where(function ($query) use ($req) {
                $query->whereIn('stock_id', $req->input('stock-ids'));

                if (!empty($req->input('types'))) {
                    $query->whereIn('transaction_type', $req->input('types'));
                }

                if ($req->filled('start-date')) {
                    $query->whereDate('created_at', '>=', $req->input('start-date'));
                }

                if ($req->filled('end-date')) {
                    $query->whereDate('created_at', '<=', $req->input('end-date'));
                }
            })->with([
              'stock',
              'stock.branch',
            ])->latest();

            $paginator = $query->paginate($size);
            $paginator->currentPage($page);

            return response()->json([
              'message' => 'Stock Records fetched successfully.',
              'data' => $paginator,
            ], 200);
        } catch (\Throwable $e) {
            report($e);

            return response()->json([
              'message' => 'Some error occured while fetching Stock Records.',
            ], 500);
        }
    }

    public function balance(Request $req)
    {
        $validator = Validator::make($req->input(), [
          'stock-ids' => [
            'required',
          ],
          'stock-ids.*' => [
            'required',
            'exists:stocks,id',
          ],
          'end-date' => [
            'date',
          ],
        ]);

        if ($validator->fails()) {
            return response()->json([
              'error' => $validator->errors(),
            ], 400);
        }

        try {
            $lastEntries = [];
            foreach ($req->input('stock-ids') as $stock_id) {
                $record = StockRecord::where(function ($query) use ($req, $stock_id) {
                    $query->where('stock_id', $stock_id);

                    if ($req->filled('end-date')) {
                        $query->whereDate('created_at', '<=', $req->input('end-date'));
                    }
                })->with([
                  'stock',
                  'stock.branch',
                ])->latest()->first();

                \array_push($lastEntries, $record);
            }

            return response()->json([
              'message' => 'Stock Balances fetched successfully.',
              'data' => $lastEntries,
            ], 200);
        } catch (\Throwable $e) {
            report($e);

            return response()->json([
              'message' => 'Some error occured while fetching Stock Balances.',
            ], 500);
        }
    }
}
