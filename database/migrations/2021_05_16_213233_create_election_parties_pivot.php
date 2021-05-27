<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateElectionPartiesPivot extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('election_party', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('election_id');
            $table->foreign('election_id')
                ->references('id')->on('elections')
                ->onDelete('cascade');

            $table->unsignedBigInteger('party_id');
            $table->foreign('party_id')
                ->references('id')->on('parties')
                ->onDelete('cascade');

            $table->boolean('playable')->default(false);
            $table->boolean('published')->default(false);

            $table->unsignedBigInteger('program_upload_id')->nullable();
            $table->foreign('program_upload_id')
                ->references('id')->on('uploads')
                ->onDelete('set null');

            $table->string('program_link')->nullable();

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
        Schema::dropIfExists('election_party');
    }
}
