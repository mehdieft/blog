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
            return Inertia::render('test/adminchatdashboard',[
            //does admin need anything from here?
            'sender'=>$sender
                
            ]);

        }else{

            $user_id=Auth::user()->email;
            $massage=Chat::where('sender',Auth::user()->id)->orwhere('reciever',Auth::user()->id)->get();
            $adminImage=User::where('id',1)->get('profile_photo_path');
            $reciever=User::select('email')->first();
            // dd($reciever);
            return Inertia::render('test/chat',
            ['sender'=>$user_id,
            'adminImage'=>$adminImage,
            'userImage'=>Auth::user()->profile_photo_path,
            'reciever'=>$reciever['email'],
            'senderid'=>Auth::user()->id,

            'massages'=>$massage->map(function($msg){
                return [
                'id'=>$msg->id,
                'sender'=>$msg->sender,
                'reciever'=>$msg->reciever,
                'massage'=>$msg->massage,
                'image'=>$msg->image,
                'created_at'=>$msg->created_at
                ];

            })
        ]);
        }
    }
    public function adminchatwithuser(Request $request){
        $massages=Chat::where('sender',$request->id)->orwhere('reciever',$request->id)->get();
        $reciever=User::where('id',$request->id)->select('email');
        $admin=Auth::user()->email;
        $user=User::where('id',$request->id)->first();
        return Inertia::render('test/adminsinglechat',[
            'sender'=>Auth::user()->email,
            'senderid'=>Auth::user()->id,
            'senderUser'=>$user,
            'admin'=>$admin,
            'reciever'=>$reciever,
            'massages'=>$massages->map(function($msg){
                return[
                    'id'=>$msg->id,
                    'sender'=>$msg->sender,
                    'reciever'=>$msg->reciever,
                    'massage'=>$msg->massage,
                    'image'=>$msg->image,
                    'created_at'=>$msg->created_at
                ];
            })
        ]);
    }
}
