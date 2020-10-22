<?php
use App\Http\Controllers\QuestController;
use App\Http\Controllers\AdminController;

/**
 * WEB routes for quests
 */
Route::get('/', [QuestController::class,'index']);
/**
 * WEB routes for admin
 */
Route::get('/admin', [AdminController::class,'index']);