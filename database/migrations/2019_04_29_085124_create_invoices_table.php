<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInvoicesTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('stock_id');
            $table->unsignedBigInteger('stock_record_id');
            $table->unsignedBigInteger('added_by')->nullable();
            $table->unsignedDecimal('amount', 24, 4);
            $table->unsignedDecimal('quantity', 24, 4);
            $table->unsignedDecimal('unit_price', 24, 4);
            $table->unsignedBigInteger('reverse_id')->nullable()->unique();
            $table->timestamps();

            $table->foreign('stock_id')
            ->references('id')->on('stocks')
            ->onDelete('cascade');

            $table->foreign('stock_record_id')
            ->references('id')->on('stock_records')
            ->onDelete('cascade');

            $table->foreign('added_by')
            ->references('id')->on('users')
            ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('invoices');
    }
}
