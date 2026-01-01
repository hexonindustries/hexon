const slides = document.querySelectorAll(".slide");
let current = 0;
let interval = null;
const delay = 3000;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[index].classList.add("active");
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

const slider = document.querySelector(".hero-slider");

slider.addEventListener("mouseenter", stopSlideshow);
slider.addEventListener("mouseleave", startSlideshow);

// start on load
startSlideshow();



//add dots
const dots = document.querySelectorAll(".dot");

function updateDots(index) {
    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
}

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[index].classList.add("active");
    updateDots(index);
}

dots.forEach(dot => {
    dot.addEventListener("click", () => {
        stopSlideshow();
        current = parseInt(dot.dataset.slide);
        showSlide(current);
        startSlideshow();
    });
});
