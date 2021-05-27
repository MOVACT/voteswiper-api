<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->unsignedBigInteger('election_id');
            $table->foreign('election_id')
                ->references('id')->on('elections')
                ->onDelete('cascade');
            $table->json('thesis');
            $table->json('topic')->nullable();
            $table->json('video_url')->nullable();
            $table->json('explainer_text')->nullable();
            $table->unsignedBigInteger('thumbnail_upload_id')->nullable();
            $table->foreign('thumbnail_upload_id')
                ->references('id')->on('uploads')
                ->onDelete('set null');
            $table->integer('sort_order')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('questions');
    }
}
