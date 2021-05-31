<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStatisticsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('swipes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('question_id');
            $table->foreign('question_id')
                ->references('id')->on('questions')
                ->onDelete('cascade');

            $table->unsignedBigInteger('election_id');
            $table->foreign('election_id')
                ->references('id')->on('elections')
                ->onDelete('cascade');

            $table->integer('answer');
            $table->string('platform');
            $table->timestamps();
        });

        Schema::create('initiations', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('election_id');
            $table->foreign('election_id')
                ->references('id')->on('elections')
                ->onDelete('cascade');

            $table->string('platform');
            $table->timestamps();
        });

        Schema::create('results', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('election_id');
            $table->foreign('election_id')
                ->references('id')->on('elections')
                ->onDelete('cascade');

            $table->unsignedBigInteger('party_id');
            $table->foreign('party_id')
                ->references('id')->on('parties')
                ->onDelete('cascade');

            $table->json('result');
            $table->string('platform');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('swipes');
        Schema::dropIfExists('initiations');
        Schema::dropIfExists('results');
    }
}
