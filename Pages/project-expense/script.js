let carouselIndexes = {};
let lightboxIndexes = {};

// Function to change slides
function changeCarousel(slideshowId, direction) {
    let track = document.getElementById(`carousel-track-${slideshowId}`);
    let slides = track.children;

    if (!(slideshowId in carouselIndexes)) carouselIndexes[slideshowId] = 0;

    carouselIndexes[slideshowId] += direction;

    if (carouselIndexes[slideshowId] >= slides.length) carouselIndexes[slideshowId] = 0;
    if (carouselIndexes[slideshowId] < 0) carouselIndexes[slideshowId] = slides.length - 1;

    track.style.transform = `translateX(-${carouselIndexes[slideshowId] * 100}%)`;
}

// Function to open lightbox
function openLightbox(slideshowId, index) {
    let lightbox = document.getElementById(`lightbox-${slideshowId}`);
    lightbox.style.display = "flex";

    lightboxIndexes[slideshowId] = index;
    showLightboxSlide(slideshowId);
}

// Function to close lightbox
function closeLightbox(slideshowId) {
    let lightbox = document.getElementById(`lightbox-${slideshowId}`);
    lightbox.style.display = "none";

    document.querySelectorAll(`#lightbox-${slideshowId} video`).forEach(video => {
        video.pause();
    });
}

// Function to show the correct lightbox slide
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

    lightboxIndexes[slideshowId] += direction;

    if (lightboxIndexes[slideshowId] >= slides.length) lightboxIndexes[slideshowId] = 0;
    if (lightboxIndexes[slideshowId] < 0) lightboxIndexes[slideshowId] = slides.length - 1;

    showLightboxSlide(slideshowId);
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