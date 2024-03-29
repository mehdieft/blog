<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBlogsTagsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('blogs_tags', function (Blueprint $table) {
            $table->id();
           $table->unsignedBigInteger('blog_id');
           $table->foreign('blog_id')->references('id')->on('blogs')->onDelete('cascade');
           $table->unsignedBigInteger('tag_id');
           $table->foreign('tag_id')->references('id')->on('tags')->onDelete('cascade');
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
        Schema::dropIfExists('blogs_tags');
    }
}
