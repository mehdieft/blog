<?php

namespace App\Http\Controllers\Test;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Chat;
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
            //does admin need anything from here?
            'sender'=>$sender
                
            ]);

        }else{

            $user_id=Auth::user()->email;
            $massage=Chat::where('sender',Auth::user()->id)->orwhere('reciever',Auth::user()->id)->get();
            $reciever=User::select('email')->first();
            // dd($reciever);
            return Inertia::render('test/chat',
            ['sender'=>$user_id,
            'reciever'=>$reciever['email'],
            'senderid'=>Auth::user()->id,
            'massages'=>$massage->map(function($msg){
                return [
                'id'=>$msg->id,
                'sender'=>$msg->sender,
                'reciever'=>$msg->reciever,
                'massage'=>$msg->massage,
                'created_at'=>$msg->created_at
                ];

            })
        ]);
        }
    }
}
