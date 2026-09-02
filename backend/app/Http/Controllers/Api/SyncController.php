<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;use Illuminate\Http\{Request,JsonResponse};use Illuminate\Support\Facades\DB;
class SyncController extends Controller {
 public function push(Request $request):JsonResponse {$data=$request->validate(['device_id'=>'required|string','events'=>'required|array','events.*.entity_type'=>'required|string','events.*.action'=>'required|string','events.*.payload'=>'required|array']);$accepted=[];foreach($data['events'] as $event){$id=DB::table('sync_queue')->insertGetId(['device_id'=>$data['device_id'],'entity_type'=>$event['entity_type'],'entity_id'=>$event['payload']['id']??null,'action'=>$event['action'],'payload'=>json_encode($event['payload']),'status'=>'pending','created_at'=>now(),'updated_at'=>now()]);$accepted[]=$id;}return response()->json(['accepted'=>$accepted,'server_time'=>now()->toIso8601String()]);}
 public function status(Request $request):JsonResponse {return response()->json(['device_id'=>$request->string('device_id'),'pending'=>DB::table('sync_queue')->where('device_id',$request->string('device_id'))->where('status','pending')->count(),'server_time'=>now()->toIso8601String()]);}
}
