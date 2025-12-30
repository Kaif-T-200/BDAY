// Shared utility functions

// Check if it's the birthday
function isBirthday() {
    const today = new Date();
    const month = today.getMonth(); // 0-indexed (0 = January)
    const date = today.getDate();
    
    return month === 0 && date === 6; // January 6
}

// Format date nicely
function formatDate(date) {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
}

// Create a random color
function getRandomColor() {
    const colors = [
        '#ff4d8d', '#9c27b0', '#ff9800', '#ffcc00', 
        '#00e5ff', '#4caf50', '#2196f3', '#e91e63'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Play sound
function playSound(url) {
    try {
        const audio = new Audio(url);
        audio.volume = 0.5;
        return audio.play();
    } catch (error) {
        console.log('Audio play failed:', error);
        return Promise.reject(error);
    }
}

// Typewriter effect
function typewriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Add parallax effect
function initParallax() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const rate = element.dataset.rate || 0.5;
            const offset = scrolled * rate;
            element.style.transform = `translateY(${offset}px)`;
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add current year to footer if exists
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Initialize parallax if needed
    if (document.querySelector('.parallax')) {
        initParallax();
    }
    
    // Add scroll animations
    window.addEventListener('scroll', debounce(function() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        animatedElements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('animated');
            }
        });
    }, 100));
});

// Export functions for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isBirthday,
        formatDate,
        getRandomColor,
        debounce,
        isInViewport,
        playSound,
        typewriter,
        initParallax
    };
}