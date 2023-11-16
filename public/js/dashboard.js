document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("clientsBtn").addEventListener("click", function() {
    loadContent("/dashboard/liste-clients");
  });

  document.getElementById("ordersBtn").addEventListener("click", function() {
    loadContent("/dashboard/liste-de-commandes");
  });

  document.getElementById("productsListBtn").addEventListener("click", function() {
    loadContent("/dashboard/liste-de-produits");
  });

  document.getElementById("addProductBtn").addEventListener("click", function() {
    loadContent("/dashboard/ajouter-produit");
  });

  document.getElementById("subscriptionsBtn").addEventListener("click", function() {
    loadContent("/dashboard/liste-abonnements");
  });

document.getElementById("createSubscriptionBtn").addEventListener("click", function() {
  loadContent("/dashboard/ajouter-abonnement");
});


  function loadContent(url) {
    fetch(url)
      .then(response => response.text())
      .then(data => {
        document.getElementById("content").innerHTML = data;
      })
      .catch(error => {
        document.getElementById("content").innerHTML = '<p>Une erreur s\'est produite.</p>';
      });
  }

  const form = document.getElementById("add-product-form");
  if(form) { 
    form.addEventListener("submit", function(event) {
      event.preventDefault();

      const formData = new FormData(form);

      fetch("/dashboard/ajouter-produit", {
        method: "POST",
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        console.log(data); 
      })
      .catch(error => {
        console.log("Une erreur s'est produite:", error);
      });
    });
  }
});
