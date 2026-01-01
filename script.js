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

// dot click
dots.forEach(dot => {
    dot.addEventListener("click", () => {
        stopSlideshow();
        current = parseInt(dot.dataset.slide);
        showSlide(current);
        startSlideshow();
    });
});

// pause on hover
const slider = document.querySelector(".hero-slider");
slider.addEventListener("mouseenter", stopSlideshow);
slider.addEventListener("mouseleave", startSlideshow);

// init
showSlide(0);
startSlideshow();
