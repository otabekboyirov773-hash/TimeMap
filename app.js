import { initMap3D } from "./modules/map.js";
import { initUser, getBalance } from "./modules/user.js";
import { speak } from "./modules/ai.js";
import { loadCoins } from "./modules/coins.js";

// SPLASH CLICK
document.getElementById("logo").onclick = async () => {

  const splash = document.getElementById("splash");

  splash.classList.add("boom");

  setTimeout(async () => {
    splash.remove();

    document.getElementById("app").classList.remove("hidden");

    await initUser();
    initMap3D();

    speak("TimeMap ga xush kelibsiz");

  }, 800);
};

// BALANCE UPDATE
setInterval(async ()=>{
  const b = await getBalance();
  document.getElementById("coins").innerText = b;
},2000);

// LOCATION + COINS
navigator.geolocation.watchPosition(pos=>{
  loadCoins(pos.coords.latitude, pos.coords.longitude);
});