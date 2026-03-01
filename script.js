document.addEventListener('DOMContentLoaded', () => {
    
    // --- Header & Nav Logic ---
    const header = document.querySelector('header');
    const navToggle = document.querySelector('.nav-toggle');
    const body = document.body;
    const navLinks = document.querySelectorAll('.nav-primary a');
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    // Toggle Mobile Menu
    navToggle.addEventListener('click', () => {
        body.classList.toggle('nav-open');
        const isOpen = body.classList.contains('nav-open');
        navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close Mobile Menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            body.classList.remove('nav-open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Handle Header Scroll & ScrollToTop Button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (window.scrollY > 400) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    // Active Link Highlighting based on scroll position
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- Smooth, Subtle Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal-up');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Unobserve once triggered so it only animates once per load
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -50px 0px', // Triggers slightly before element enters
        threshold: 0.1 // Triggers when 10% of the element is visible
    });

    revealElements.forEach(el => revealObserver.observe(el));
});