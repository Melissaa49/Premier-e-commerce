document.addEventListener('DOMContentLoaded', function() {
    // Gestion du menu hamburger
    const navBar = document.querySelector("nav");
    const burgerMenu = document.getElementById('burger');
    const closeNav = document.getElementById('close');
    if (burgerMenu && closeNav && navBar) {
        burgerMenu.addEventListener('click', () => {
            navBar.classList.toggle('active');
        });
        closeNav.addEventListener('click', () => {
            navBar.classList.toggle('active');
        });
    }

    // Gestion du formulaire de contact
    const contactForm = document.getElementById('contactForm');
    const closePopup = document.getElementById('closePopup');
    if (contactForm && closePopup) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let formData = new FormData(this);
            fetch('/contact', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                document.getElementById('popupMessage').style.display = 'flex';
            })
            .catch(error => {
                console.error('Erreur:', error);
            });

            closePopup.addEventListener('click', function() {
                document.getElementById('popupMessage').style.display = 'none';
            });
        });
    }

    // Gestion de l'ajout au panier
    document.querySelectorAll('.add-to-cart-button').forEach(function(button) {
        button.addEventListener('click', addToCartHandler);
    });

    function addToCartHandler() {
        const productId = this.getAttribute('data-product-id');
        const quantityInput = this.closest('.card').querySelector('.product-quantity');
        const quantity = quantityInput ? parseInt(quantityInput.value) : 1;

        fetch('/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ productId, quantity })
        })
        .then(response => response.json())
        .then(data => {
            alert('Article ajouté au panier!');
            window.location.reload();
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
    }

    // Gestion de la suppression d'un article
    document.querySelectorAll('.btn-delete').forEach(function(button) {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            fetch(`/cart/delete/${productId}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                window.location.reload();
            })
            .catch(error => {
                console.error('Erreur:', error);
            });
        });
    });

// Fonction pour recalculer le sous-total et le total du panier
function recalculateTotal() {
    let subtotal = 0;
    document.querySelectorAll('.cart-item').forEach(function(item) {
        const price = parseFloat(item.querySelector('.product-price').innerText.replace('Prix : ', '').replace('€', ''));
        const quantity = parseInt(item.querySelector('.quantity-select').value);
        subtotal += price * quantity;
    });

    const shippingCost = 4.90; // Frais de livraison fixe
    const total = subtotal + shippingCost;

    document.querySelector('.cart-summary .subtotal').innerText = `Sous-total : ${subtotal.toFixed(2)}€`;
    document.querySelector('.cart-summary .total').innerText = `Total : ${total.toFixed(2)}€`;
}

// Attacher l'événement de changement aux sélecteurs de quantité
document.querySelectorAll('.quantity-select').forEach(function(select) {
    select.addEventListener('change', recalculateTotal);
});

// Calcul initial du sous-total et du total
recalculateTotal();

});
document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    if (faqQuestions.length) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const answer = this.nextElementSibling;
                answer.style.display = answer.style.display === 'none' ? 'block' : 'none';
            });
        });
    }
});