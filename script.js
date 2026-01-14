document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");

    let current = 0;
    let interval;
    const delay = 5000;

    const slideImages = [
        "assets/index/slide1.webp",
        "assets/index/slide2.webp",
        
    ];
    
    slideImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });


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
    /*window.addEventListener("load", () => {
        showSlide(0);
        startSlideshow();
    })*/
    showSlide(0); /*added later*/
    startSlideshow();
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

/*
const cards = document.querySelectorAll('.reveal-card');
const section = document.querySelector('.cabinet-why');
if (window.innerWidth < 768) {
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('active');
        }, index * 180);
    });
} else {
    // desktop scroll logic here


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
}
*/
/*
const whySection = document.querySelector('.cabinet-why');
const whyCards = document.querySelectorAll('.cabinet-why-card');

if (whySection && whyCards.length) {
    let revealed = false;

    window.addEventListener('scroll', () => {
        if (revealed) return;

        const sectionTop = whySection.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight * 0.75;

        if (sectionTop < triggerPoint) {
            revealed = true;

            whyCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('active');
                }, index * 180);
            });
        }
    });
}
*/
/* =========================
   CABINET WHY – STABLE REVEAL
========================= */
/*
document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector('.cabinet-why');
    const cards = document.querySelectorAll('.cabinet-why-card');

    if (!section || !cards.length) return;

    let revealedCount = 0;

    function revealCardsOnScroll() {
        const sectionRect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Start when section enters viewport
        if (sectionRect.top < windowHeight * 0.9) {
            cards.forEach((card, index) => {
                if (index < revealedCount + 1 && !card.classList.contains('active')) {
                    card.classList.add('active');
                }
            });

            revealedCount++;
        }
    }

    // Initial check
    revealCardsOnScroll();

    // Scroll listener
    window.addEventListener('scroll', revealCardsOnScroll);
});*/

const shadeSlider = document.querySelector('.shade-slider');
const prevShade = document.querySelector('.shade-arrow.prev');
const nextShade = document.querySelector('.shade-arrow.next');

if (shadeSlider && prevShade && nextShade) {
    const scrollAmount = 300;

    nextShade.addEventListener('click', () => {
        shadeSlider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    prevShade.addEventListener('click', () => {
        shadeSlider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
}

const kitchenImages = [
    "white",
    "gray",
    "champagne",
    "light-wood",
    "walnut",
    "charcoal",
    "cappuccino",
    "pearl-white"
];
kitchenImages.forEach(shade =>{
    const img = new Image();
    img.src = `/assets/kitchen/kitchen-${shade}.png`;

});

kitchenImages.forEach(shade =>{
    const img1 = new Image();
    img1.src = `/assets/shades/${shade}.png`;

});

const kitchenPreview = document.getElementById('kitchenPreview');
const shadeCards = document.querySelectorAll('.shade-card1');
const shadeList = document.getElementById('shadeList');

shadeCards.forEach(card => {
    card.addEventListener('click', () => {
        if (card.classList.contains('active')) return;

        shadeCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        centerActiveShade(card);

        const shade = card.dataset.shade;
        const newSrc = `/assets/kitchen/kitchen-${shade}.png`;
        kitchenPreview.classList.add("fade-out");
        setTimeout(() => {
            kitchenPreview.src = newSrc;
            kitchenPreview.onload = () =>{
                kitchenPreview.classList.remove('fade-out');
            }
            
        }, 200);

    });
});

/* Vertical arrows */
document.querySelector('.shade-arrow1.up').onclick = () => {
    shadeList.scrollBy({ top: -100, behavior: 'smooth' });
};

document.querySelector('.shade-arrow1.down').onclick = () => {
    shadeList.scrollBy({ top: 100, behavior: 'smooth' });
};



function centerActiveShade(card) {
    const list = document.getElementById("shadeList");
    const listRect = list.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    const offset = 
        cardRect.top -
        listRect.top -
        list.clientHeight / 2 +
        card.clientHeight / 2;
    list.scrollBy({
        top: offset,
        behavior: "smooth"
    });
}



document.addEventListener('DOMContentLoaded', () => {
    const zoneRows = document.querySelectorAll('.zone-row');

    const zoneObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.transitionDelay = '0.1s';
                    entry.target.classList.add('active');
                }
            });
        },
        {
            threshold: 0.3
        }
    );

    zoneRows.forEach(row => zoneObserver.observe(row));
});



/* MOBILE VISUALIZER SLIDER */
const isMobile = window.matchMedia("(max-width: 900px)").matches;

if (!isMobile) {
    document.querySelector('.shade-arrow1.up')?.addEventListener('click', () => {
        shadeList.scrollBy({ top: -120, behavior: 'smooth' });
    });

    document.querySelector('.shade-arrow1.down')?.addEventListener('click', () => {
        shadeList.scrollBy({ top: 120, behavior: 'smooth' });
    });
}


/*
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('active');
        hamburger.classList.toggle('active', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });
});
*/
    /*
    const closeBtn= document.querySelector(".mobile-close");
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
        hamburger.classList.remove("active");
        mobileMenu.classList.remove("active");
        document.body.style.overflow = "";
        });
    }
    
    // tap outside nav closes menu
    mobileMenu.addEventListener("click", (e) => {
        if (e.target === mobileMenu) {
        hamburger.classList.remove("active");
        mobileMenu.classList.remove("active");
        document.body.style.overflow = "";
        }
    });
    */


  
/*
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const mobileMenu = document.querySelector(".mobile-menu");
    const closeBtn = document.querySelector(".mobile-close");
  
    if (!hamburger || !mobileMenu) return;
  
    function openMenu() {
      mobileMenu.classList.add("active");
      hamburger.classList.add("active");
      hamburger.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    }
  
    function closeMenu() {
      mobileMenu.classList.remove("active");
      hamburger.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  
    hamburger.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.contains("active");
      isOpen ? closeMenu() : openMenu();
    });
  
    // Close button
    closeBtn?.addEventListener("click", closeMenu);
  
    // Tap outside drawer closes menu
    mobileMenu.addEventListener("click", (e) => {
      if (e.target === mobileMenu) closeMenu();
    });
  
    // ESC closes
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  
    // Clicking links closes
    document.querySelectorAll(".mobile-nav a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
});
*/