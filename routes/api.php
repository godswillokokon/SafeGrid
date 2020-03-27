<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => 'v1'], function () {
    Route::post('register', 'UserController@register');
    Route::post('login', 'UserController@login');

    /* Secure routes */
    Route::group(['middleware' => [
      'auth:api',
    ]], function () {
        Route::post('logout', 'UserController@logout');

        Route::group([
          'prefix' => 'user',
        ], function () {
            Route::get('', 'UserController@get');
        });

        Route::group([
          'prefix' => 'company',
        ], function () {
            Route::get('', 'CompanyController@get');
            Route::post('', 'CompanyController@create');
            Route::put('', 'CompanyController@store');
            Route::delete('', 'CompanyController@delete');
            Route::post('fetch', 'CompanyController@fetch');
            Route::post('activation', 'CompanyController@activation');
            Route::post('admin', 'CompanyUserController@createCompanyAdmin');
            Route::get('fetch-users', 'CompanyUserController@fetch');
        });

        Route::group([
          'prefix' => 'branch',
        ], function () {
            Route::get('', 'BranchController@get');
            Route::post('', 'BranchController@create');
            Route::put('', 'BranchController@store');
            Route::delete('', 'BranchController@delete');
            Route::post('fetch', 'BranchController@fetch');
            Route::post('user', 'BranchUserController@createBranchRep');
            Route::get('fetch-users', 'BranchUserController@fetchUsers');
        });

        Route::group([
          'prefix' => 'stock',
        ], function () {
            Route::get('', 'StockController@get');
            Route::post('', 'StockController@create');
            Route::put('', 'StockController@store');
            Route::delete('', 'StockController@delete');
            Route::post('fetch', 'StockController@fetch');
            Route::get('fetch-all-stocks', 'StockController@fetchAllStocks');


            Route::group([
              'prefix' => 'records',
            ], function () {
                Route::post('', 'StockRecordController@addRecord');
                Route::put('', 'StockRecordController@reverseRecord');
                Route::post('fetch', 'StockRecordController@fetchRecords');
                Route::post('balance', 'StockRecordController@balance');
            });
        });

        Route::group([
          'prefix' => 'invoice',
        ], function () {
            Route::post('', 'InvoiceController@addInvoice');
            Route::put('', 'InvoiceController@reverseInvoice');
            Route::post('fetch', 'InvoiceController@fetchInvoices');
            Route::post('revenue', 'InvoiceController@revenue');
        });
    });
});
