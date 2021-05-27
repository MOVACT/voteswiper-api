<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnswersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('answers', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('electionparty_id');
            $table->foreign('electionparty_id')
                ->references('id')->on('election_party')
                ->onDelete('cascade');

            $table->unsignedBigInteger('question_id');
            $table->foreign('question_id')
                ->references('id')->on('questions')
                ->onDelete('cascade');

            $table->unique(['electionparty_id', 'question_id']);

            $table->integer('answer')->default(0);
            $table->json('reason')->nullable();

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
        Schema::dropIfExists('answers');
    }
}
