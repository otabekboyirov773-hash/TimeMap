import { supabase } from "./api.js";

let userId;

export async function initUser(){
 const { data } = await supabase.auth.getUser();
 userId = data.user?.id;
}

export async function getBalance(){
 const { data } = await supabase
  .from("profiles")
  .select("balance")
  .eq("id", userId)
  .single();

 return data?.balance || 0;
}