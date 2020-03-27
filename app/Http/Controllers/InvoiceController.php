<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use App\StockRecord;
use App\Invoice;
use DB;

class InvoiceController extends Controller
{
    public function addInvoice(Request $req)
    {
        $validator = Validator::make($req->input(), [
          'stock-id' => [
            'required',
            'exists:stocks,id',
          ],
          'quantity' => [
            'required',
            'integer',
          ],
          'unit-cost' => [
            'required',
            'integer',
          ],
        ]);

        if ($validator->fails()) {
            return response()->json([
              'error' => $validator->errors(),
            ], 400);
        }

        try {
            $insufficientStock = false;

            DB::transaction(function () use ($req, &$insufficientStock) {
                $lastRecord = StockRecord::where('stock_id', $req->input('stock-id'))
                ->latest()->first();

                if (($lastRecord->balance - $req->input('quantity')) < 0) {
                    $insufficientStock = true;

                    return;
                }

                $newRecord = StockRecord::create([
                  'stock_id' => $req->input('stock-id'),
                  'quantity' => $req->input('quantity'),
                  'balance' => $lastRecord->balance - $req->input('quantity'),
                  'added_by' => $req->user()->id,
                  'transaction_type' => 'deduction',
                ]);

                Invoice::create([
                  'stock_id' => $req->input('stock-id'),
                  'added_by' => $req->user()->id,
                  'quantity' => $req->input('quantity'),
                  'unit_price' => $req->input('unit-cost'),
                  'amount' => $req->input('quantity') * $req->input('unit-cost'),
                  'stock_record_id' => $newRecord->id,
                ]);
            }, 2);
            if ($insufficientStock) {
                return response()->json([
                  'message' => 'Your stock balance is insufficient for this invoice.',
                ], 400);
            }
        } catch (\Throwable $e) {
            report($e);

            return response()->json([
            'message' => 'Some error occured while adding Invoice.',
          ], 500);
        }

        return response()->json([
        'message' => 'Invoice added successfully.',
      ], 200);
    }

    public function reverseInvoice(Request $req)
    {
        $validator = Validator::make($req->input(), [
          'id' => [
            'required',
            'exists:invoices,id',
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
                $originalInvoice = Invoice::find($req->input('id'));
                $lastRecord = StockRecord::where('stock_id', $originalInvoice->stock_id)->latest()->first();

                if ($lastRecord->id != $originalInvoice->stock_record_id) {
                    $idMismatch = true;

                    return;
                }

                $newRecord = StockRecord::create([
                  'stock_id' => $lastRecord->stock_id,
                  'quantity' => $lastRecord->quantity,
                  'added_by' => $req->user()->id,
                  'transaction_type' => 'reverse-deduction',
                  'reverse_id' => $originalInvoice->stock_record_id,
                  'balance' => $lastRecord->balance + $lastRecord->quantity,
                  ]);
                $newRecord->save();

                Invoice::create([
                  'reverse_id' => $originalInvoice->id,
                  'stock_record_id' => $newRecord->id,
                  'stock_id' => $newRecord->stock_id,
                  'added_by' => $req->user()->id,
                  'quantity' => $originalInvoice->quantity,
                  'amount' => $originalInvoice->amount,
                ]);
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

    public function fetchInvoices(Request $req)
    {
        $validator = Validator::make($req->input(), [
          'stock-ids' => [
            'required',
          ],
          'stock-ids.*' => [
            'required',
            'exists:stocks,id',
          ],
          'type' => [
            'in:all,addition,reversal',
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

            $query = Invoice::where(function ($query) use ($req) {
                $query->whereIn('stock_id', $req->input('stock-ids'));

                switch ($req->input('type')) {
                  case 'addition':
                    $query->whereNull('reverse_id');
                    break;

                  case 'reversal':
                    $query->whereNotNull('reverse_id');
                    break;

                  default:
                    // Don't modify query (query all)
                    break;
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
              'message' => 'Invoice Records fetched successfully.',
              'data' => $paginator,
            ], 200);
        } catch (\Throwable $e) {
            report($e);

            return response()->json([
              'message' => 'Some error occured while fetching Invoice Records.',
            ], 500);
        }
    }

    public function revenue(Request $req)
    {
        $validator = Validator::make($req->input(), [
          'stock-ids' => [
            'required',
          ],
          'stock-ids.*' => [
            'required',
            'exists:stocks,id',
          ],
          'start-date' => [
            'required',
            'date',
          ],
          'end-date' => [
            'required',
            'date',
          ],
        ]);

        if ($validator->fails()) {
            return response()->json([
              'error' => $validator->errors(),
            ], 400);
        }

        try {
            $totalRevenue = Invoice::where(function ($query) use ($req) {
                $query->whereIn('stock_id', $req->input('stock-ids'));
                $query->whereDate('created_at', '>=', $req->input('start-date'));
                $query->whereDate('created_at', '<=', $req->input('end-date'));
            })->sum('amount');

            return response()->json([
              'message' => 'Total revenue fetched successfully.',
              'data' => $totalRevenue,
            ], 200);
        } catch (\Throwable $e) {
            report($e);

            return response()->json([
              'message' => 'Some error occured while fetching Total revenue.',
            ], 500);
        }
    }
}
