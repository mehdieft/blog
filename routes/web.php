<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\Test\mehdiTestController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth:sanctum', 'verified'])->get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');

Route::middleware(['auth:sanctum', 'verified'])->get('/testmehdi', function () {
    return Inertia::render('test/mehdiTest');
})->name('test');






Route::middleware(['auth:sanctum','verified'])->prefix('test')->group(function(){
    Route::get('/index',[mehdiTestController::class,'index'])->name('mehdiindex');
    Route::get('/homepage',[mehdiTestController::class,'homepage'])->name("homepage");
    Route::get('/chat',[mehdiTestController::class,'chat'])->name("chat");
    Route::post('/admin/chatwithuser',[mehdiTestController::class,'adminchatwithuser'])->name('adminchatwithuser');
});






/// admin crud
Route::middleware(['auth:sanctum', 'verified'])->prefix('admin')->group(function(){
Route::resource('blog', BlogController::class);
});
