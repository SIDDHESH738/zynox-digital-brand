// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Add slight delay to follower
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 50);
});

// Cursor hover effects
document.querySelectorAll('a, button, input, textarea').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursorFollower.classList.add('hover');
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorFollower.classList.remove('hover');
    });
});

// Blog Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const blogCards = document.querySelectorAll('.blog-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const category = button.getAttribute('data-category');

        // Filter blog cards
        blogCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
                // Animate in
                gsap.fromTo(card, 
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.5 }
                );
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Hero section animations
const heroSection = document.querySelector('.hero-section');
if (heroSection) {
    const heroContent = heroSection.querySelector('.hero-content');
    const heroElements = heroContent.querySelectorAll('.fade-in');

    // Initial state
    gsap.set(heroElements, {
        opacity: 0,
        y: 30
    });

    // Staggered animation for hero elements
    gsap.to(heroElements, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.5
    });

    // Parallax effect on scroll
    gsap.to(heroContent, {
        scrollTrigger: {
            trigger: heroSection,
            start: "top top",
            end: "bottom top",
            scrub: true
        },
        y: 100,
        opacity: 0.5,
        ease: "none"
    });
}

// Set initial state for other fade-in elements
const fadeElements = document.querySelectorAll('.fade-in:not(.hero-content *)');
fadeElements.forEach(element => {
    gsap.set(element, {
        opacity: 1,
        y: 0
    });
});

// Fade-in animation for elements with .fade-in class
fadeElements.forEach(element => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.2
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            window.scrollTo({
                top: target.offsetTop - (navbar ? navbar.offsetHeight : 0), // Adjust for fixed navbar height
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced button hover effects
const buttons = document.querySelectorAll('.cta-button');
buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        gsap.to(button, {
            duration: 0.4,
            y: -2,
            boxShadow: "0 0 30px rgba(255, 255, 255, 0.3)",
            ease: "power2.out"
        });
    });

    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            duration: 0.4,
            y: 0,
            boxShadow: "none",
            ease: "power2.out"
        });
    });
});

// Product card hover effects
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            duration: 0.3,
            y: -5,
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
            ease: "power2.out"
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            duration: 0.3,
            y: 0,
            boxShadow: "none",
            ease: "power2.out"
        });
    });
});

// Initialize EmailJS
(function() {
    emailjs.init("nQVHTQ3f0UhfNq0wq");
})();

// Form submission handling
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log('Form submitted');
            
            // Hide any existing messages
            successMessage.style.display = 'none';
            errorMessage.style.display = 'none';
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            console.log('Form data:', data);

            try {
                console.log('Sending email...');
                // Send email using EmailJS
                const response = await emailjs.send(
                    "service_u9yuxsi",
                    "template_jya7dkm",
                    {
                        from_name: data.name,
                        from_email: data.email,
                        message: data.message,
                        to_name: "Zynox",
                        reply_to: data.email,
                    }
                );
                console.log('Email sent successfully:', response);

                if (response.status === 200) {
                    // Show success message
                    successMessage.style.display = 'block';
                    contactForm.reset();
                    
                    // Wait for 2 seconds to show the success message
                    setTimeout(() => {
                        // Redirect to home page
                        window.location.href = 'index.html';
                    }, 2000);
                } else {
                    throw new Error('Email sending failed');
                }
            } catch (error) {
                console.error('Error sending email:', error);
                // Show error message
                errorMessage.style.display = 'block';
                
                // Hide error message after 5 seconds
                setTimeout(() => {
                    errorMessage.style.display = 'none';
                }, 5000);
            }
        });
    }
});

// Hamburger Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // Function to toggle mobile menu
    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navbar.classList.toggle('active');
        body.classList.toggle('menu-open');
    }

    // Hamburger click event
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMobileMenu();
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navbar.classList.contains('active') && !navbar.contains(e.target)) {
            toggleMobileMenu();
        }
    });

    // Close menu when clicking a nav link
    navLinks.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            toggleMobileMenu();
        }
    });

    // Prevent scrolling when menu is open
    function preventScroll(e) {
        if (body.classList.contains('menu-open')) {
            e.preventDefault();
        }
    }

    document.addEventListener('touchmove', preventScroll, { passive: false });
    document.addEventListener('wheel', preventScroll, { passive: false });

    // Ensure home page is visible on mobile
    function checkMobileVisibility() {
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const viewportHeight = window.innerHeight;
            const heroHeight = heroSection.offsetHeight;
            if (heroHeight < viewportHeight) {
                heroSection.style.minHeight = `${viewportHeight}px`;
            }
        }
    }

    // Check on load and resize
    window.addEventListener('load', checkMobileVisibility);
    window.addEventListener('resize', checkMobileVisibility);
});

// Animation handling for narrative sections
function handleNarrativeAnimations() {
    const sections = document.querySelectorAll('.narrative-section, .philosophy-section, .purpose-section, .signal-section, .final-section');
    
    sections.forEach(section => {
        const texts = section.querySelectorAll('.narrative-text, .philosophy-text, .purpose-text, .signal-text, .final-text');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    texts.forEach((text, index) => {
                        setTimeout(() => {
                            text.classList.add('visible');
                        }, index * 200);
                    });
                }
            });
        }, {
            threshold: 0.2
        });
        
        observer.observe(section);
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    handleNarrativeAnimations();
    
    // Add initial visible class to hero elements
    const heroElements = document.querySelectorAll('.hero-content h1, .hero-content h2');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, index * 200);
    });
}); 