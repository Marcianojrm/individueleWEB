document.addEventListener("DOMContentLoaded", function() {
    let slides = document.querySelectorAll(".slides img");
    let currentIndex = 0;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove("active"));
        slides[index].classList.add("active");
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }
    
    showSlide(currentIndex);
    setInterval(nextSlide, 10000);
});