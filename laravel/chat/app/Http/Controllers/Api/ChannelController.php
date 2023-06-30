<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Channel;

class ChannelController extends Controller
{
    public function index()
    {
        return response()->json(Channel::all());
    }
}
