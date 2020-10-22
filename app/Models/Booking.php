<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;
    public $name;
    public $mob;
    public $email;
    public $status;
    public $questId;
    public $date;
    public $time;
}
