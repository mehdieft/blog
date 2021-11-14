<?php

namespace App\Http\Controllers\Test;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class mehdiTestController extends Controller
{
    //
    public function index(){
        $user=User::get();
         return Inertia::render('test/mehdiTest',['users'=>$user->map(function($users){
             return [
             'id'=>$users->id,
             'email'=>$users->email
             ];
         })]);
    }
    public function homepage(){
        return Inertia::render('test/homepage');
    }
    public function chat(){
        $sender=Auth::user()->email;
        return Inertia::render('test/chat',['sender'=>$sender]);
    }
}
