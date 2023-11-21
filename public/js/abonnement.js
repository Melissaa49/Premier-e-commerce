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

 document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let formData = new FormData(this);

    fetch('/contact', {
      method: 'POST',
      body: formData
    })
    .then(response => response.text())
    .then(data => {
      document.getElementById('popupMessage').style.display = 'flex'; // Affiche la popup
    })
    .catch(error => {
      console.error('Erreur:', error);
    });

    document.getElementById('closePopup').addEventListener('click', function() {
      document.getElementById('popupMessage').style.display = 'none'; // Cache la popup
    });
  });