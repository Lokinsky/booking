<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;

use App\Http\Resources\BookingResource;

class AdminController extends Controller
{
    public function index(Request $request)
    {
        return view('admin',['title'=>['en'=>'Admin','ru'=>'Админка']]);
    }
    public function apiGetBooks(Request $request)
    {
        /**
         * API-функция для выборки забронированных мест.
         */
        $books = Booking::paginate(10);
        
        if(!empty($books))
            $booksR = new BookingResource($books);
        return $booksR->toAdminPanel();
    }
    public function apiUpdateBook(Request $request)
    {
        /**
         * API-функция для обновления брони.
         * Также можно доработать при необходимости.
         */

        $books = Booking::where('id',$request->input('book')['id'])->update([
            'status'=>$request->input('book')['status']
        ]);
        
        return $books;
    }
}
