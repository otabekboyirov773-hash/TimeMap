import { CONFIG } from './config.js';
import { UI } from './modules/ui.js';
import { AI } from './modules/ai.js';
import { Coins } from './modules/coins.js';

const supabase = window.supabase.createClient(CONFIG.SB_URL, CONFIG.SB_KEY);
let map, user;
let currentTreasure = { lat: 41.585697, lng: 64.212129 }; // Zarafshan koordinatasi

const App = {
    start: async () => {
        UI.ignitePortal(async () => {
            await App.initMap();
            await App.checkUser();
            App.loadSyncData();
            
            AI.speak("Assalomu alaykum! TimeMap V23 portali ishga tushdi. Men sizni taniyapman.");
        });
    },

    initMap: async () => {
        map = L.map('map', { zoomControl: false, attributionControl: false }).setView([41.5856, 64.2121], 15);
        L.tileLayer('https://{s}://{z}/{x}/{y}{r}.png').addTo(map);
        
        // 3D Tilt initial
        document.getElementById('map').classList.add('map-3d');
        setTimeout(() => map.invalidateSize(), 500);
    },

    checkUser: async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            user = session.user;
            // Adminlikni tekshirish
            const { data: profile } = await supabase.from('profiles').select('is_admin, balance, username').eq('id', user.id).single();
            if (profile) {
                if (profile.is_admin) document.getElementById('admin-btn').classList.replace('hidden', 'flex');
                document.getElementById('ui-balance').innerText = profile.balance.toFixed(2);
                document.getElementById('ai-msg').innerText = `Xush kelibsiz, ${profile.username}! Sayohatni boshlang.`;
            }
        }
    },

    loadSyncData: async () => {
        // 1. Bizneslarni yuklash (Zarafshan do'koni bilan)
        const { data: shops } = await supabase.from('businesses').select('*');
        if (shops) {
            const hud = document.getElementById('nearby-hud');
            hud.innerHTML = "";
            shops.forEach(shop => {
                const shopIcon = L.divIcon({
                    className: 'none',
                    html: `<div class="text-3xl filter drop-shadow-lg animate-bounce">${shop.name.emoji}</div>`
                });
                L.marker([shop.lat, shop.lng], { icon: shopIcon }).addTo(map)
                    .bindPopup(`<b class='text-black'>${shop.name.uz}</b>`);

                // HUDga qo'shish
                hud.innerHTML += `
                    <div class="glass p-4 rounded-2xl border border-white/10 flex items-center gap-4 cursor-pointer hover:scale-105 transition" onclick="map.flyTo([${shop.lat}, ${shop.lng}], 18)">
                        <div class="text-2xl">${shop.name.emoji}</div>
                        <div><h5 class="text-xs font-bold text-cyan-400">${shop.name.uz}</h5><p class="text-[9px] opacity-60 italic">Yaqin masofada</p></div>
                    </div>`;
            });
        }
    },

    toggleAdmin: () => {
        document.getElementById('admin-modal').classList.toggle('-translate-x-full');
        const center = map.getCenter();
        document.getElementById('adm-lat').value = center.lat.toFixed(6);
        document.getElementById('adm-lng').value = center.lng.toFixed(6);
    },

    saveShop: async () => {
        const name = document.getElementById('adm-name').value;
        const cat = document.getElementById('adm-cat').value;
        const lat = document.getElementById('adm-lat').value;
        const lng = document.getElementById('adm-lng').value;
        const emojiMap = { food: "🛒", barber: "✂️", restaurant: "🍴" };

        const { error } = await supabase.from('businesses').insert([{
            name: { uz: name, emoji: emojiMap[cat] },
            category: cat, lat: parseFloat(lat), lng: parseFloat(lng)
        }]);

        if (!error) {
            alert("Muvaffaqiyatli qo'shildi! ✨");
            App.toggleAdmin();
            App.loadSyncData();
        }
    },

    startHunt: () => {
        AI.speak("Radar faollashdi. Hududni skanerlashni boshladim.");
        map.on('move', () => {
            const dist = map.distance(map.getCenter(), [currentTreasure.lat, currentTreasure.lng]);
            document.getElementById('radar-dist').innerHTML = `${Math.round(dist)} <small class="text-xs opacity-50">m</small>`;
            if (dist < 50) {
                AI.speak("Xazina topildi! Hamyoningiz yangilanmoqda.");
                location.reload(); // Soddalashtirilgan
            }
        });
    },

    toggle3D: () => {
        document.getElementById('map').classList.toggle('map-3d');
        speak(document.getElementById('map').classList.contains('map-3d') ? "3D rejim" : "2D rejim");
    }
};

window.App = App;
