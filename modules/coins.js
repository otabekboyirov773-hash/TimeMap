import { supabase } from "./api.js";

export async function loadCoins(lat,lng){

 const { data } = await supabase.rpc("get_nearby_hotspots",{
  p_lat:lat,
  p_lng:lng
 });

 if(data){
   console.log("Coins:", data);
 }
}