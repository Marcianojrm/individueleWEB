document.addEventListener("DOMContentLoaded", function() {
    let slidesContainer = document.querySelector(".slides");
    let slides = document.querySelectorAll(".slides img");
    let currentIndex = 0;
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    setInterval(nextSlide, 5000);
});
