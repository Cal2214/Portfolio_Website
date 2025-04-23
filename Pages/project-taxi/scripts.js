let carouselIndexes = {};
let lightboxIndexes = {};
let isTransitioning = {};

// Function to change slides

function changeCarousel(slideshowId, direction) {
    if (isTransitioning[slideshowId]) return; // prevent rapid double clicks

    isTransitioning[slideshowId] = true;
    let track = document.getElementById(`carousel-track-${slideshowId}`);
    let slides = track.children;

    if (!(slideshowId in carouselIndexes)) carouselIndexes[slideshowId] = 0;

    carouselIndexes[slideshowId] += direction;

    if (carouselIndexes[slideshowId] >= slides.length) carouselIndexes[slideshowId] = 0;
    if (carouselIndexes[slideshowId] < 0) carouselIndexes[slideshowId] = slides.length - 1;

    // Move the carousel
    track.style.transform = `translateX(-${carouselIndexes[slideshowId] * 100}%)`;

    // Allow time for the transition to finish before enabling again
    setTimeout(() => {
        isTransitioning[slideshowId] = false;
    }, 500); // match your CSS transition time

    // Sync with lightbox if open
    if (document.getElementById(`lightbox-${slideshowId}`).style.display === "flex") {
        lightboxIndexes[slideshowId] = carouselIndexes[slideshowId];
        showLightboxSlide(slideshowId);
    }
}

// Function to open lightbox
function openLightbox(slideshowId, index) {
    let lightbox = document.getElementById(`lightbox-${slideshowId}`);
    lightbox.style.display = "flex";

    // Initialize the lightbox index
    lightboxIndexes[slideshowId] = index;
    showLightboxSlide(slideshowId); // Show the first slide
}

function closeLightbox(slideshowId) {
    let lightbox = document.getElementById(`lightbox-${slideshowId}`);
    lightbox.style.display = "none";

    // Pause all videos when closing the lightbox
    document.querySelectorAll(`#lightbox-${slideshowId} video`).forEach(video => {
        video.pause();
    });
}

// Function to show the lightbox slide
function showLightboxSlide(slideshowId) {
    let slides = document.querySelectorAll(`#lightbox-slideshow-${slideshowId} .lightbox-slide`);
    slides.forEach((slide, i) => {
        slide.style.display = i === lightboxIndexes[slideshowId] ? "block" : "none";
        let video = slide.querySelector("video");
        if (video) video.pause();
        if (i === lightboxIndexes[slideshowId] && video) video.play();
    });
}

// Function to change lightbox slides
function changeLightbox(slideshowId, direction) {
    let slides = document.querySelectorAll(`#lightbox-slideshow-${slideshowId} .lightbox-slide`);
    const totalSlides = slides.length;

    // Wrap around the index when changing slides
    lightboxIndexes[slideshowId] = (lightboxIndexes[slideshowId] + direction + totalSlides) % totalSlides;

    showLightboxSlide(slideshowId); // Show the updated slide

    // Update the carousel index if lightbox is visible
    if (document.getElementById(`lightbox-${slideshowId}`).style.display === "flex") {
        carouselIndexes[slideshowId] = lightboxIndexes[slideshowId];
        let track = document.getElementById(`carousel-track-${slideshowId}`);
        track.style.transform = `translateX(-${carouselIndexes[slideshowId] * 100}%)`;
    }
}

// Close lightbox when clicking outside content
window.addEventListener('click', function(event) {
    document.querySelectorAll(".lightbox").forEach(lightbox => {
        if (event.target === lightbox) {
            let id = lightbox.id.split("-")[1];
            closeLightbox(id);
        }
    });
});


let currentIndex = 0; 

function changeSlide(direction) {
    let slides = document.querySelectorAll(".project-slideshow .slide-item");

    // Remove the active class from the current slide
    slides[currentIndex].classList.remove("active");

    currentIndex = (currentIndex + direction + slides.length) % slides.length;

    slides[currentIndex].classList.add("active");
}

document.addEventListener("DOMContentLoaded", function () {
    let slides = document.querySelectorAll(".project-slideshow .slide-item");

    slides[currentIndex].classList.add("active");
});


closeLightbox(1);
closeLightbox(2);
closeLightbox(3);
closeLightbox(4);
closeLightbox(5);
closeLightbox(6);
closeLightbox(7);
closeLightbox(8);
closeLightbox(9);
closeLightbox(10);
closeLightbox(11);
closeLightbox(12);
closeLightbox(13);
