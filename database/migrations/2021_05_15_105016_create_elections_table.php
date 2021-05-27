<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateElectionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('elections', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('country_id')
                ->constrained()
                ->onUpdate('no action')
                ->onDelete('cascade');
            $table->json('name');
            $table->json('slug');
            $table->boolean('published')->default(false);
            $table->boolean('playable')->default(false);
            $table->unsignedBigInteger('card_upload_id')->nullable();
            $table->foreign('card_upload_id')
                ->references('id')->on('uploads')
                ->onDelete('set null');

            $table->date('voting_day');
            $table->dateTime('playable_date');
            $table->json('translations_available');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('elections');
    }
}
