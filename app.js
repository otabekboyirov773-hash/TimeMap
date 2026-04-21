import { initUser, getBalance } from "./modules/user.js";
import { initMap } from "./modules/map.js";
import { loadCoins } from "./modules/coins.js";
import { speak } from "./modules/ai.js";
import { updateBalance, splashHide } from "./modules/ui.js";
import { initOffline } from "./modules/utils.js";

await initUser();
initMap();
initOffline();
splashHide();

// 📡 LOCATION
navigator.geolocation.watchPosition(async pos=>{
 const lat = pos.coords.latitude;
 const lng = pos.coords.longitude;

 loadCoins(lat,lng);
});

// 💰 BALANCE
setInterval(async ()=>{
 const b = await getBalance();
 updateBalance(b);
},2000);

// 🤖 AI
window.ai = ()=>{
 speak("TimeMap ishlayapti 🚀");
};