<?php

namespace App\Http\Controllers\Test;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
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
        if(Auth::user()->id==1){
            $users=User::where('id','!=',1)->get();
            $sender=Auth::user()->email;
            return Inertia::render('test/adminchat',[
                'users'=>$users,
                'sender'=>$sender
            ]);

        }else{

            $user_id=Auth::user()->id;
            $reciever=User::select('email')->first();
            // dd($reciever);
            return Inertia::render('test/chat',
            ['sender'=>$user_id,
            'reciever'=>$reciever['email']
        ]);
        }
    }
}
