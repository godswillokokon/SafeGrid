<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStockRecordsTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('stock_records', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('stock_id');
            $table->unsignedDecimal('quantity');
            $table->unsignedDecimal('balance');
            $table->unsignedBigInteger('added_by')->nullable();
            $table->unsignedBigInteger('reverse_id')->nullable()->unique();
            $table->string('transaction_type');
            $table->timestamps();

            $table->foreign('added_by')
            ->references('id')->on('users')
            ->onDelete('set null');

            $table->foreign('stock_id')
            ->references('id')->on('stocks')
            ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('stock_records');
    }
}
