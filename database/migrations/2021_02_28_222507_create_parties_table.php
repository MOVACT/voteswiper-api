<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePartiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('parties', function (Blueprint $table) {
            $table->id();
            $table->foreignId('country_id')
                ->constrained()
                ->onUpdate('no action')
                ->onDelete('cascade');
            $table->string('name');
            $table->string('slug');
            $table->string('full_name');
            $table->string('url')->nullable();
            $table->unsignedBigInteger('logo_upload_id')->nullable();
            $table->foreign('logo_upload_id')
                ->references('id')->on('uploads')
                ->onDelete('set null');
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
        Schema::dropIfExists('parties');
    }
}
