document.addEventListener("DOMContentLoaded", () => {

    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");

    let current = 0;
    let interval;
    const delay = 5000;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active"));

        slides[index].classList.add("active");
        dots[index].classList.add("active");
    }

    function nextSlide() {
        current = (current + 1) % slides.length;
        showSlide(current);
    }

    function startSlideshow() {
        interval = setInterval(nextSlide, delay);
    }

    function stopSlideshow() {
        clearInterval(interval);
    }

    // Dot clicks
    dots.forEach(dot => {
        dot.addEventListener("click", () => {
            stopSlideshow();
            current = parseInt(dot.dataset.slide);
            showSlide(current);
            startSlideshow();
        });
    });

    // Pause on hover
    const slider = document.querySelector(".hero-slider");
    slider.addEventListener("mouseenter", stopSlideshow);
    slider.addEventListener("mouseleave", startSlideshow);
    window.addEventListener("load", () => {
        showSlide(0);
        startSlideshow();
    })
    // INIT PROPERLY

    const prevBtn = document.querySelector(".slider-arrow.prev");
    const nextBtn = document.querySelector(".slider-arrow.next");

    prevBtn.addEventListener("click", () => {
        stopSlideshow();
        current = (current - 1 + slides.length) % slides.length;
        showSlide(current);
        startSlideshow();
    });

    nextBtn.addEventListener("click", () => {
        stopSlideshow();
        nextSlide();
        startSlideshow();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") {
            nextBtn.click();
        }
        if (e.key === "ArrowLeft") {
            prevBtn.click();
        }
    });
    
    /* =========================
    MOBILE SWIPE SUPPORT
    ========================= */

    let startX = 0;
    let endX = 0;
    const swipeThreshold = 50; // minimum px to count as swipe

    slider.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
    });

    slider.addEventListener("touchmove", (e) => {
        endX = e.touches[0].clientX;
    });

    slider.addEventListener("touchend", () => {
        if (!startX || !endX) return;

        const diff = startX - endX;

        if (Math.abs(diff) > swipeThreshold) {
            stopSlideshow();

            if (diff > 0) {
                // swipe left → next slide
                nextSlide();
            } else {
                // swipe right → previous slide
                current = (current - 1 + slides.length) % slides.length;
                showSlide(current);
            }

            startSlideshow();
        }

        startX = 0;
        endX = 0;
    });

    
});

document.querySelectorAll('.application-card').forEach(card => {
    card.addEventListener('click', () => {
        // Close other cards
        document.querySelectorAll('.application-card').forEach(c => {
            if (c !== card) c.classList.remove('active');
        });

        // Toggle current card
        card.classList.toggle('active');
    });
});

document.querySelectorAll('.group-title').forEach(btn => {
    btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        content.style.display =
            content.style.display === 'block' ? 'none' : 'block';
    });
});

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.25 }
);

reveals.forEach(el => observer.observe(el));


const overviewSections = document.querySelectorAll('.category-overview');

window.addEventListener('scroll', () => {
    const viewportHeight = window.innerHeight;

    overviewSections.forEach(section => {
        const image = section.querySelector('.overview-image img');
        if (!image) return;

        const rect = section.getBoundingClientRect();

        // Only animate when section is visible
        if (rect.top < viewportHeight && rect.bottom > 0) {
            const progress =
                (viewportHeight - rect.top) / (viewportHeight + rect.height);

            const direction = section.classList.contains('reverse') ? -1 : 1;   
            const translateY = direction * (progress - 0.5) * 13; // max ~10px up/down
            image.style.transform = `translateY(${translateY}px)`;
        }
    });
});
/*
const cards = document.querySelectorAll('.reveal-card');

const cardObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            entry.target.style.setProperty('--delay', delay);
            entry.target.classList.add('active');
            cardObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

cards.forEach(card => cardObserver.observe(card));
*/
const cards = document.querySelectorAll('.reveal-card');
const section = document.querySelector('.cabinet-why');

let revealedCount = 0;

window.addEventListener('scroll', () => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    // Start revealing when section is 60% into viewport
    const triggerPoint = windowHeight * 0.6;

    if (sectionTop < triggerPoint) {
        const progress = triggerPoint - sectionTop;

        const revealSpacing = 120; // px scroll per card (adjustable)

        const cardsToReveal = Math.floor(progress / revealSpacing);

        for (let i = revealedCount; i <= cardsToReveal && i < cards.length; i++) {
            cards[i].classList.add('active');
            revealedCount++;
        }
    }
});
