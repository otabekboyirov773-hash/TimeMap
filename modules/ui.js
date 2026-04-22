export const UI = {
    // Katta portlash va salomlashish
    ignitePortal: (callback) => {
        const intro = document.getElementById('portal-intro');
        const audio = new Audio('./assets/sound.mp3');
        audio.play().catch(() => console.log("Ovoz uchun ekranga bosing"));
        
        intro.classList.add('explode');
        setTimeout(() => {
            intro.style.display = 'none';
            callback();
        }, 1500);
    },
    // Vaqtga qarab xarita rangini o'zgartirish
    setAtmosphere: (hour) => {
        const map = document.getElementById('map');
        if (hour >= 18 || hour <= 6) map.style.filter = "brightness(0.5) contrast(1.2) hue-rotate(200deg)"; // Tun
        else if (hour >= 16) map.style.filter = "sepia(0.3) brightness(0.8) hue-rotate(-30deg)"; // Shom
        else map.style.filter = "brightness(1) contrast(1)"; // Kun
    }
};
