/*==================== scroll sections active link ====================*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });
    /*==================== sticky navbar ====================*/
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    /*==================== remove toggle icon and navbar when click navbar link (scroll) ====================*/
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

/*==================== scroll reveal ====================*/
ScrollReveal({
    // reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .activities-container, .education-box, .qualification-container', { origin: 'botttom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });




/*==================== bubble trail cursor effect ====================*/
class LaundryBubbleCursor {
    constructor() {
        this.cursor = document.querySelector('.custom-cursor');
        this.bubbles = [];
        this.mouseX = 0;
        this.mouseY = 0;
        // Mix of regular soap bubbles and washing machine bubbles
        this.bubbleTypes = [
            'soap-1', 'soap-2', 'soap-3', 'soap-4', 'soap-5', 'soap-6', 'soap-7', 'soap-8',
            'washing-foam', 'detergent-bubble', 'suds-bubble', 'cleaning-bubble', 'fresh-bubble'
        ];
        
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        document.addEventListener('mouseleave', () => this.hideCursor());
        document.addEventListener('mouseenter', () => this.showCursor());
        
        // Clean up bubbles periodically
        setInterval(() => this.cleanupBubbles(), 2000);
    }

    handleMouseMove(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        
        // Update cursor position
        if (this.cursor) {
            this.cursor.style.left = (this.mouseX - 6) + 'px';
            this.cursor.style.top = (this.mouseY - 6) + 'px';
        }
        
        // Create bubble with some randomness (not every mousemove)
        if (Math.random() < 0.3) {
            this.createBubble(this.mouseX, this.mouseY);
        }
    }

    createBubble(x, y) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        
        // Random bubble type with higher chance for washing bubbles
        const bubbleType = this.bubbleTypes[Math.floor(Math.random() * this.bubbleTypes.length)];
        bubble.classList.add(bubbleType);
        
        // Different size ranges for different bubble types
        let size;
        if (bubbleType === 'washing-foam') {
            size = Math.random() * 12 + 8; // 8-20px (dense foam bubbles)
        } else if (bubbleType === 'detergent-bubble' || bubbleType === 'cleaning-bubble') {
            size = Math.random() * 16 + 10; // 10-26px (medium detergent bubbles)
        } else if (bubbleType === 'suds-bubble' || bubbleType === 'fresh-bubble') {
            size = Math.random() * 18 + 12; // 12-30px (larger suds bubbles)
        } else {
            size = Math.random() * 15 + 8; // 8-23px (regular soap bubbles)
        }
        
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        
        // Position with slight random offset
        const offsetX = (Math.random() - 0.5) * 40;
        const offsetY = (Math.random() - 0.5) * 40;
        bubble.style.left = (x + offsetX - size/2) + 'px';
        bubble.style.top = (y + offsetY - size/2) + 'px';
        
        // Different animation durations based on bubble type
        let duration;
        if (bubbleType === 'washing-foam' || bubbleType === 'fresh-bubble') {
            duration = Math.random() * 2 + 4.5; // 4.5-6.5 seconds (slower, more realistic)
        } else if (bubbleType === 'detergent-bubble' || bubbleType === 'cleaning-bubble') {
            duration = Math.random() * 1.5 + 3.5; // 3.5-5 seconds
        } else {
            duration = Math.random() * 2 + 3; // 3-5 seconds
        }
        
        bubble.style.animationDuration = duration + 's';
        
        // Add some randomness to animation delay
        const delay = Math.random() * 0.5;
        bubble.style.animationDelay = delay + 's';
        
        document.body.appendChild(bubble);
        this.bubbles.push({
            element: bubble,
            createdAt: Date.now()
        });
        
        // Remove bubble after animation
        setTimeout(() => {
            this.removeBubble(bubble);
        }, (duration + delay) * 1000);
    }

    removeBubble(bubbleElement) {
        if (bubbleElement && bubbleElement.parentNode) {
            bubbleElement.parentNode.removeChild(bubbleElement);
            this.bubbles = this.bubbles.filter(b => b.element !== bubbleElement);
        }
    }

    cleanupBubbles() {
        const now = Date.now();
        const oldBubbles = this.bubbles.filter(b => now - b.createdAt > 6000);
        
        oldBubbles.forEach(bubble => {
            this.removeBubble(bubble.element);
        });
    }

    hideCursor() {
        if (this.cursor) {
            this.cursor.style.opacity = '0';
        }
    }

    showCursor() {
        if (this.cursor) {
            this.cursor.style.opacity = '1';
        }
    }
}

// Initialize the laundry bubble cursor effect
document.addEventListener('DOMContentLoaded', () => {
    new LaundryBubbleCursor();
});