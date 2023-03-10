<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserTrackingController;
use App\Http\Controllers\UserDetailController;
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
    return view('home');
});
Route::post('user-tracking', [UserTrackingController::class, 'store']);
Route::post('save-user-details', [UserDetailController::class, 'create']);
Route::post('/users/{userId}/address', [UserDetailController::class, 'updateAddress']);
