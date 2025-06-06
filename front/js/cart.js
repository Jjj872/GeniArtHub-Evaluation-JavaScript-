// /!\ ATTENTION – Chaque action effectuée (modification des quantités, suppression de produit, validation du formulaire) doit pouvoir fonctionner sans rechargement de la page.

// Récupération de la modal | OUTSIDE FUNCTION
const modal = document.getElementById("myModal");

// Récupération button element qui ouvre la modal | OUTSIDE FUNCTION
const btn = document.getElementById("btn");

// Récupération <span> element qui ferme la modal | OUTSIDE FUNCTION
const span = document.getElementsByClassName("close")[0];

btn.onclick = function(event) {
  event.preventDefault();

  // Récupération des valeurs
  const emailVal = document.getElementById("form_email_input").value;
  const prenomVal = document.getElementById("form_prenom_input").value;
  const nomVal = document.getElementById("form_nom_input").value;
  const adresseVal = document.getElementById("form_adresse_input").value;
  const villeVal = document.getElementById("form_ville_input").value;
 



  // Fonctions de validation
  function validateValueNomPrenom(value) {
    return value.length >= 2 && value.length <= 100;
  }

  function validateValueAdresse(value) {
    return value.length >= 10 && value.length <= 100;
  }

  function validateValueVille(value) {
    return value.length >= 3 && value.length <= 100;
  }



  // Vérification globale
  if (!validateValueNomPrenom(prenomVal)) {
    alert('Veuillez renseigner le champ "Prénom" avec minimum 2 caractères');
    return;
  }

  if (!validateValueNomPrenom(nomVal)) {
    alert('Veuillez renseigner le champ "Nom" avec minimum 2 caractères');
    return;
  }

  if (!validateValueAdresse(adresseVal)) {
    alert('Veuillez renseigner le champ "Adresse" avec minimum 10 caractères');
    return;
  }

  if (!validateValueVille(villeVal)) {
    alert('Veuillez renseigner le champ "Ville" avec minimum 3 caractères');
    return;
  }

  // Si tout est valide, on affiche la modal
  modal.style.display = "block";  
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
