<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;
use App\Models\Booking;

class QuestsResource extends ResourceCollection
{
    private $res;
    public function toPaginateOrder()
    {
        /**
         * Функция сборки объектов под выдачу через пагинацию
         * @return Array
         */
        $quests = $this->collection;
        
        
        foreach ($quests as $key => $quest) {
            $this->res[$key] = [
                "id"=>$quest->id,
                "questName"=>$quest->name,
                "img"=>$quest->img,
                "time"=>$quest->time,
                "sellTimes"=>Booking::where('questId',$quest->id)->where('status','success')->count(),
            ];
        }
        return $this;
    }
    public function toBookOrder()
    {
        /**
         * Функция сборки объекта под прямую выдачу
         * @return Array
         */
        $quests = $this->collection;
        

        foreach ($quests as $key => $quest) {
            $this->res[$key] = [
                "id"=>$quest->id,
                "quest_name"=>$quest->name,
                "quest_description"=>$quest->description,
                "img"=>$quest->img,
                "time"=>$quest->time,
                "date_booked"=>Booking::select('date','time')
                                ->where('questId',$quest->id)
                                ->where('status','new')
                                ->limit(336)
                                ->get(),
            ];
        }
        return $this;
    }
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        
        return $this->res;
    }
}
