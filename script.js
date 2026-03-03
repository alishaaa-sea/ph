const messages = [
    { title: "Halloo", text: "Selamat datang", emoji: "🌟" },
    { title: "Did you know?", text: "You have a smile that can light up a room!", emoji: "😊" },
    { title: "Wow!", text: "You are doing great today, keep it up!", emoji: "🎈" },
    { title: "Surprise!", text: "Here is a virtual hug for you!", emoji: "🫂" },
    { title: "Yay!", text: "Never forget how awesome you are!", emoji: "✨" }

];

const modalBg = document.getElementById('modal-bg');
const modalContent = document.getElementById('modal-content');
const closeBtn = document.getElementById('close-btn');
const openBtn = document.getElementById('open-btn');
const nextBtn = document.getElementById('next-btn');

const modalTitle = document.getElementById('modal-title');
const modalText = document.getElementById('modal-message');
const modalEmoji = document.getElementById('modal-emoji');

let currentMessageIndex = -1;

function getRandomMessageIndex() {
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * messages.length);
    } while (newIndex === currentMessageIndex && messages.length > 1);
    return newIndex;
}

function showMessage() {
    currentMessageIndex = getRandomMessageIndex();
    const msg = messages[currentMessageIndex];

    modalTitle.textContent = msg.title;
    modalText.textContent = msg.text;
    modalEmoji.textContent = msg.emoji;

    // Change modal colors randomly for fun
    const colors = [
        { border: '#ff9aa2', text: '#ff7b85' },
        { border: '#ffb7b2', text: '#ff9a94' },
        { border: '#ffdac1', text: '#ffc19c' },
        { border: '#e2f0cb', text: '#a5d172' },
        { border: '#b5ead7', text: '#88d7b9' },
        { border: '#c7ceea', text: '#9ba8d9' }
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    modalContent.style.borderColor = randomColor.border;
    modalTitle.style.color = randomColor.text;

    modalBg.classList.add('active');
    createConfetti();
}

function closeModal() {
    modalBg.classList.remove('active');
}

openBtn.addEventListener('click', showMessage);
nextBtn.addEventListener('click', showMessage);
closeBtn.addEventListener('click', closeModal);

modalBg.addEventListener('click', (e) => {
    if (e.target === modalBg) {
        closeModal();
    }
});

// Simple confetti effect
function createConfetti() {
    const colors = ['#ff9aa2', '#ffb7b2', '#ffdac1', '#e2f0cb', '#b5ead7', '#c7ceea'];
    const container = document.body;

    for (let i = 0; i < 40; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');

        // Random properties
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100 + 'vw';

        confetti.style.backgroundColor = color;
        confetti.style.left = left;
        confetti.style.top = '-20px';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

        // Add animation
        confetti.animate([
            { transform: `translate3d(0,0,0) rotate(0deg)`, opacity: 1 },
            { transform: `translate3d(${Math.random() * 200 - 100}px, 100vh, 0) rotate(${Math.random() * 720}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 2000 + 2000,
            easing: 'cubic-bezier(.37,0,.63,1)',
            fill: 'forwards'
        });

        container.appendChild(confetti);

        // Remove after animation
        setTimeout(() => {
            confetti.remove();
        }, 4500);
    }
}

// Show popup immediately on load (with 500ms delay for aesthetics)
window.addEventListener('load', () => {
    setTimeout(showMessage, 500);
});
