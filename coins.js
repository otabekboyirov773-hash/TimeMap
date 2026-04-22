export function loadCoins(lat,lng){

 // fake demo coin
 const el = document.createElement("div");
 el.innerText="🪙";
 el.style.position="fixed";
 el.style.left=Math.random()*90+"%";
 el.style.top=Math.random()*90+"%";
 el.style.fontSize="24px";

 document.body.appendChild(el);

 el.onclick=()=>{
   el.remove();
   alert("Coin topding!");
 };
}