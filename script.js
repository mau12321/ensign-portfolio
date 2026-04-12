document.addEventListener('DOMContentLoaded', () => {
    
    // Theme Toggle Logic
    const themeBtn = document.getElementById('theme-toggle');
    const icon = themeBtn.querySelector('i');
    
    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    applyTheme(currentTheme);

    themeBtn.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(currentTheme);
        localStorage.setItem('theme', currentTheme);
    });

    function applyTheme(theme) {
        if (theme === 'light') {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }

    // Tabs Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            // Add active to clicked
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Scroll Observer for Fade-in Animations
    const fadeElements = document.querySelectorAll('.fade-in-on-scroll');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, ob) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                ob.unobserve(entry.target); // once it appears, stop observing
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    // Typewriter Effect
    const typeTextSpan = document.querySelector('.typed-text');
    const cursorSpan = document.querySelector('.type-cursor');
    const textArray = ["Software Engineer", "Founder, Lamanita Travel LLC", "Cloud Security Enthusiast"];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if(!cursorSpan.classList.contains('blink')) cursorSpan.classList.remove('blink');
            typeTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            cursorSpan.classList.add('blink');
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            if(!cursorSpan.classList.contains('blink')) cursorSpan.classList.remove('blink');
            typeTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursorSpan.classList.add('blink');
            textArrayIndex++;
            if(textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    if(textArray.length) setTimeout(type, newTextDelay + 250);

    // ScrollSpy active navbar link
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(sec => {
            const secTop = sec.offsetTop;
            if (pageYOffset >= secTop - 200) {
                current = sec.getAttribute('id');
            }
        });

        navLinks.forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('href') === `#${current}`) {
                li.classList.add('active');
            }
        });
    });

    // 3D Tilt Effect
    const tiltElements = document.querySelectorAll('.card, .project-card');
    tiltElements.forEach(el => {
        el.addEventListener('mousemove', e => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const xPct = x / rect.width - 0.5;
            const yPct = y / rect.height - 0.5;
            el.style.transform = `perspective(1000px) rotateX(${yPct * -10}deg) rotateY(${xPct * 10}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            el.style.transition = 'transform 0.4s ease';
        });
        el.addEventListener('mouseenter', () => {
            el.style.transition = 'none'; // remove transition for snappy mouse tracking
        });
    });

    // Button Ripple Effect
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            let x = e.clientX - e.target.getBoundingClientRect().left;
            let y = e.clientY - e.target.getBoundingClientRect().top;
            let ripples = document.createElement('span');
            ripples.style.left = x + 'px';
            ripples.style.top = y + 'px';
            ripples.classList.add('ripple');
            this.appendChild(ripples);
            setTimeout(() => ripples.remove(), 600);
        });
    });

});
