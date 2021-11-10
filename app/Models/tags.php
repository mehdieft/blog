<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tags extends Model
{
    use HasFactory;
    public function blogs(){
        return $this->belongsToMany(Blog::class,'blogs_tags','tag_id','blog_id');
    }
}
