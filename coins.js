export const Coins = {
    fly: (startX, startY) => {
        const flyer = document.createElement('div');
        flyer.className = 'flying-coin';
        flyer.style.left = `${startX}px`;
        flyer.style.top = `${startY}px`;
        document.body.appendChild(flyer);

        const wallet = document.querySelector('.wallet-box').getBoundingClientRect();

        setTimeout(() => {
            flyer.style.left = `${wallet.left + 20}px`;
            flyer.style.top = `${wallet.top + 20}px`;
            flyer.style.transform = "scale(0.2) rotate(720deg)";
            flyer.style.opacity = "0";
        }, 50);

        setTimeout(() => flyer.remove(), 1000);
    }
};
