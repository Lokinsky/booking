<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;
use App\Models\Quest;

class BookingResource extends ResourceCollection
{

    private $res;
    public function toAdminPanel()
    {
        /**
         * Функция сборки объектов для выдачи в панель администратора.
         * @return Array
         */
        $books = $this->collection;
        

        foreach ($books as $key => $book) {
            $this->res[$key] = [
                "id"=>$book->id,
                "name"=>$book['name'],
                "mob"=>$book['mob'],
                "email"=>$book['email'],
                "status"=>$book['status'],
                "quest"=>Quest::select('name')->where('id',$book['questId'])->get(),
                "date"=>$book['date'],
                "time"=>$book['time']
            ];
            
        }
        return $this;
    }
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return $this->res;
    }
}
