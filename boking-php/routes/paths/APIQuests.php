<?php
use App\Http\Controllers\QuestController;
use App\Http\Controllers\AdminController;
/**
 * API routes for quests
 */
Route::get('/getQuests',[QuestController::class,'apiGetQuests']);
Route::get('/getQuest/{questId}',[QuestController::class,'apiGetQuest']);
Route::post('/bookTime', [QuestController::class,'apiBookTime']);

/**
 * API routes for admin panel
 */
Route::get('/getBooks',[AdminController::class,'apiGetBooks']);
Route::post('/updateBook',[AdminController::class,'apiUpdateBook']);