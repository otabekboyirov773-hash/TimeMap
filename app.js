import { CONFIG } from './config.js';
import { UI } from './modules/ui.js';

const supabase = window.supabase.createClient(CONFIG.SB_URL, CONFIG.SB_KEY);
let map;

const App = {
    start: () => {
        const intro = document.getElementById('portal-intro');
        intro.classList.add('explode');
        
        // Ovoz effekti (O'zbekcha AI)
        const msg = new SpeechSynthesisUtterance("Assalomu alaykum! Time Map portaliga xush kelibsiz.");
        msg.lang = 'uz-UZ';
        window.speechSynthesis.speak(msg);

        setTimeout(() => {
            intro.style.display = 'none';
            App.initMap();
        }, 1500);
    },

    initMap: () => {
        map = L.map('map', { 
            zoomControl: false, 
            attributionControl: false 
        }).setView([41.5856, 64.2121], 15); // Zarafshan koordinatasi

        L.tileLayer('https://{s}://{z}/{x}/{y}{r}.png').addTo(map);
        
        // Xaritani 3D rejimga o'tkazish
        document.getElementById('map').classList.add('map-3d');
        
        // Qora ekranni yo'qotish uchun majburiy yangilash
        setTimeout(() => map.invalidateSize(), 500);
    }
};

window.App = App;
