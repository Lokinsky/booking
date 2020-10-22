<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\QuestsResource;
use App\Models\Quest;
use App\Models\Booking;

class QuestController extends Controller
{
    public function index(Request $request)
    {
        /**
         * Функция получения вида главной страницы
         * @return View
         */
        $localeTitles = ['ru'=>'Главная страница','en'=>'Home'];
        return view('home',['title'=>$localeTitles]);
    }
    public function apiBookTime(Request $request)
    {
        /**
         * Добавление записи о бронировании.
         * @var quest:Quest 
         * @return Array
         */
        $targetBook = Booking::where('questId',$request->input('questId'))
            ->where('date',$request->input('book_time')['day'])
            ->where('time',$request->input('book_time')['time'])->limit(1)->get();
        if(count($targetBook)==0){
            \DB::table('bookings')->insert(
                [
                    'name' => $request->input('client')['name'],
                    'mob' => $request->input('client')['mob'],
                    'email' => $request->input('client')['email'],
                    'status' => 'new',
                    'questId' => $request->input('questId'),
                    'date' => $request->input('book_time')['day'],
                    'time' => $request->input('book_time')['time'],
                ]
            );
        }
    }
    public function apiGetQuests(Request $request)
    {
        /**
         * Получение квестов через пагинацию.
         * @var quest:Quest 
         * @return Array
         */
        $quests = Quest::select(['id','name','img','time'])->paginate(6);

        if(!empty($quests))
            $questsR = new QuestsResource($quests);

        return $questsR->toPaginateOrder();
    }
    public function apiGetQuest(Request $request,$questId)
    {
        /**
         * Получение подробной информации по квесту.
         * @var quest:Quest 
         * @return Array
         */
        $quests = Quest::select(['id','name','img','description','time'])->where('id', $questId)->get();

        if(!empty($quests))
            $questsR = new QuestsResource($quests);

        return $questsR->toBookOrder();
        
    }
}
