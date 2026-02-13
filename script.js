// Get all elements
const envelope = document.getElementById('envelope');
const envelopeSection = document.getElementById('envelopeSection');
const questionCard = document.getElementById('questionCard');
const brokenHeartSection = document.getElementById('brokenHeartSection');
const letterSection = document.getElementById('letterSection');
const btnYes = document.getElementById('btnYes');
const btnNo = document.getElementById('btnNo');
const btnRetry = document.getElementById('btnRetry');
const backButton = document.getElementById('backButton');

// Envelope click handler
envelope.addEventListener('click', function() {
    if (!envelope.classList.contains('opened')) {
        envelope.classList.add('opened');
        
        // Show question card after envelope opens
        setTimeout(() => {
            questionCard.classList.add('show');
        }, 400);
    }
});

// Yes button handler
btnYes.addEventListener('click', function() {
    // Add celebration effect
    createHearts();
    
    // Transition to letter section
    setTimeout(() => {
        envelopeSection.classList.remove('active');
        letterSection.classList.add('active');
        letterSection.scrollTop = 0;
    }, 1000);
});

// No button handler
btnNo.addEventListener('click', function() {
    envelopeSection.classList.remove('active');
    brokenHeartSection.classList.add('active');
});

// Retry button handler
btnRetry.addEventListener('click', function() {
    brokenHeartSection.classList.remove('active');
    envelopeSection.classList.add('active');
    
    // Reset envelope
    envelope.classList.remove('opened');
    questionCard.classList.remove('show');
});

// Back button handler
backButton.addEventListener('click', function() {
    letterSection.classList.remove('active');
    envelopeSection.classList.add('active');
    
    // Reset envelope
    envelope.classList.remove('opened');
    questionCard.classList.remove('show');
});

// Create floating hearts animation
function createHearts() {
    const colors = ['❤️', '💕', '💖', '💗', '💝', '💘'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = colors[Math.floor(Math.random() * colors.length)];
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '100%';
            heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
            heart.style.zIndex = '9999';
            heart.style.pointerEvents = 'none';
            heart.style.animation = 'floatUp 3s ease-out forwards';
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 3000);
        }, i * 100);
    }
}

// Add float up animation dynamically
const style = document.createElement('style');
style.innerHTML = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth scroll for letter section
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add parallax effect to photos
window.addEventListener('scroll', function() {
    const photos = document.querySelectorAll('.photo-frame');
    photos.forEach((photo, index) => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        photo.style.transform = `translateY(${rate * (index % 2 === 0 ? 1 : -1) * 0.1}px)`;
    });
});

// Add entrance animation to photos when they come into view
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe photo frames when letter section is visible
setTimeout(() => {
    document.querySelectorAll('.photo-frame').forEach(frame => {
        observer.observe(frame);
    });
}, 100);
