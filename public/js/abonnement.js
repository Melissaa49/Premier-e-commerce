const navBar = document.querySelector("nav");
const burgerMenu = document.getElementById('burger');
const closeNav = document.getElementById('close');

burgerMenu.addEventListener('click', () => {
    navBar.classList.toggle('active');
});

closeNav.addEventListener('click', () => {
    navBar.classList.toggle('active');
});
function toggleFaqAnswer(faqQuestionElement) {
    const answer = faqQuestionElement.nextElementSibling;
    const icon = faqQuestionElement.querySelector('.faq-icon');
    
    const isAnswerVisible = answer.style.display === 'block';
    answer.style.display = isAnswerVisible ? 'none' : 'block';
    icon.textContent = isAnswerVisible ? '+' : '-';
}