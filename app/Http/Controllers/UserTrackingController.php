<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserTracking;
use Jenssegers\Agent\Agent;
class UserTrackingController extends Controller
{
    public function store(Request $request)
    {
        $agent = new Agent();
        $browser = $agent->browser();
        $platform = $agent->platform();
        $userTracking = new UserTracking();
        $userTracking->ip_address = $request->ip();
        $userTracking->device_type =$platform.' '.$agent->version($platform);;
        $userTracking->browser = $browser.' '.$agent->version($browser);
        $userTracking->user_agent = $request->header('User-Agent');
        $userTracking->save();

        return response()->json([
            'status' => 'success',
            'message' => 'User tracking data saved successfully'
        ]);
    }
}
