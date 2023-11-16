const navBar = document.querySelector("nav");
const burgerMenu = document.getElementById('burger');
const closeNav = document.getElementById('close');

burgerMenu.addEventListener('click', () => {
    navBar.classList.toggle('active');
});

closeNav.addEventListener('click', () => {
    navBar.classList.toggle('active');
});

let currentSlide = 0;
const testimonials = document.querySelectorAll('.testimonial');

function nextSlide() {
    testimonials[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % testimonials.length;
    testimonials[currentSlide].classList.add('active');
}

setInterval(nextSlide, 5000);

