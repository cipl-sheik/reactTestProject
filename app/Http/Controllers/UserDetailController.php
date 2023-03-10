<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class UserDetailController extends Controller
{
    public function create(Request $request)
    {
        
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'phone_number' => 'required|regex:/^[0-9]{10}$/|unique:users',
            'email' => 'required|email|unique:users',
            'date_of_birth' => 'required|date',
        ]);

        
        if ($validator->fails()) {
            $messages = $validator->messages();
            return response()->json([
		            'status' => 'Failed',
		            'message' => 'User details Not saved',
		            'error' =>$messages
		        ]);
        }
		else{
			       
		        $user = new User();
		        $user->first_name = $request->input('first_name');
		        $user->last_name = $request->input('last_name');
		        $user->phone_number = $request->input('phone_number');
		        $user->email = $request->input('email');
		        $user->date_of_birth = date('Y-m-d', strtotime(str_replace('-', '/', ($request->input('date_of_birth')))));
		        $user->save();

		         return response()->json([
		            'status' => 'success',
		            'message' => 'User details saved successfully',
		            'user_id' =>$user->id,
		            'user_name'=>$user->first_name.' '.$user->last_name
		        ]);
		}

    }
	public function updateAddress(Request $request, $userId)
	{
	$user = User::findOrFail($userId);

	$user->address = json_encode($request->input('addresses'));

	$user->save();

	return response()->json(['message' => 'Address updated successfully']);
	}
}
