<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddLocaleToAnalyticsTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('swipes', function (Blueprint $table) {
            $table->string('locale')->nullable();
        });

        Schema::table('initiations', function (Blueprint $table) {
            $table->string('locale')->nullable();
        });

        Schema::table('results', function (Blueprint $table) {
            $table->string('locale')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('results', function (Blueprint $table) {
            $table->dropColumn('locale');
        });

        Schema::table('initiations', function (Blueprint $table) {
            $table->dropColumn('locale');
        });

        Schema::table('swipes', function (Blueprint $table) {
            $table->string('locale')->nullable();
        });
    }
}
