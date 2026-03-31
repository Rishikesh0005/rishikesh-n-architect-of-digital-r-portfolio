document.addEventListener('DOMContentLoaded', function() {
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // SYSTEM 1: HERO NAME CHAR REVEAL
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        document.querySelectorAll('.hero-name').forEach(el => {
            const originalText = el.textContent.trim();
            if (!originalText) return;
            el.innerHTML = originalText.split('').map((letter, i) => {
                return `<span class="char" style="animation-delay:${(i * 0.05 + 0.5)}s;">${letter === ' ' ? '&nbsp;' : letter}</span>`;
            }).join('');
        });

        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // SYSTEM 2: SCROLL-TRIGGERED REVEALS
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.transitionDelay = entry.target.dataset.delay || '0s';
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        document.querySelectorAll('.reveal, .reveal-dramatic').forEach(el => revealObserver.observe(el));

        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // SYSTEM 3: STAT COUNTER ANIMATION
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        function animateCounter(el) {
            const target = parseFloat(el.dataset.target);
            if (isNaN(target)) return;
            const duration = 2500;
            let start = null;
            const step = (timestamp) => {
                if (!start) start = timestamp;
                const progress = Math.min((timestamp - start) / duration, 1);
                const easedProgress = 1 - Math.pow(1 - progress, 4);
                let current = easedProgress * target;
                if (target % 1 !== 0) {
                    el.textContent = current.toFixed(2);
                } else {
                    el.textContent = Math.floor(current);
                }
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                } else {
                    el.textContent = target;
                }
            };
            window.requestAnimationFrame(step);
        }
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.8 });
        document.querySelectorAll('.stat-number').forEach(el => counterObserver.observe(el));
        
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // SYSTEM 4: SCROLLED NAV STYLING
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        const nav = document.querySelector('nav');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('nav-scrolled');
            } else {
                nav.classList.remove('nav-scrolled');
            }
        });
        
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // CUSTOM: EMBER CANVAS ANIMATION
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        const canvas = document.getElementById('emberCanvas');
        const ctx = canvas.getContext('2d');
        let particles = [];
        
        function setupCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles = [];
            let particleCount = Math.floor(canvas.width / 30);
            for(let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: Math.random() * 1 + 0.5,
                    size: Math.random() * 2 + 0.5,
                    opacity: Math.random() * 0.5 + 0.2
                });
            }
        }

        function drawEmbers() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                ctx.beginPath();
                ctx.fillStyle = `rgba(255, 72, 0, ${p.opacity})`;
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                p.x += p.vx;
                p.y -= p.vy;

                if (p.y < -10) {
                    p.y = canvas.height + 10;
                    p.x = Math.random() * canvas.width;
                }
                if (p.x < -10 || p.x > canvas.width + 10) {
                    p.vx *= -1;
                }
            });
            requestAnimationFrame(drawEmbers);
        }

        window.addEventListener('resize', setupCanvas);
        setupCanvas();
        drawEmbers();

        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // CUSTOM: HAMBURGER MENU
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    });
    
(function(){
  document.addEventListener('mousemove',function(e){
    var mx=(e.clientX/window.innerWidth-0.5)*25;
    var my=(e.clientY/window.innerHeight-0.5)*25;
    document.querySelectorAll('.inj-orb,.bg-orb,[class*="orb"],[class*="float"],[class*="decorat"],.mouse-move').forEach(function(el){
      var s=parseFloat(el.dataset.speed)||0.6;
      el.style.transform='translate('+(mx*s)+'px,'+(my*s)+'px)';
    });
  });
})();