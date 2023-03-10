<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserTracking extends Model
{
    use HasFactory;

    protected $table = 'user_tracking';

    protected $fillable = [
        'ip_address',
        'device_type',
        'browser',
        'user_agent',
    ];

    // Add any additional methods you need here
}

