// Get the modal
const modal = document.getElementById("myModal");

// Get the button that opens the modal
const btn = document.getElementById("btn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// Get the <input>s 
const prenom = document.getElementById("form_prenom_input");
const nom = document.getElementById("form_nom_input");
const adresse = document.getElementById("form_adresse_input");
const ville = document.getElementById("form_ville_input");
const email = document.getElementById("form_email_input");

// When the user click on btn make the modal appears if nones inputs are empty
btn.onclick = function() {
//   console.log("Valeur du prénom :", prenom.value);
//   console.log("Valeur du nom :", nom.value); 
//   console.log("Valeur de l'adresse :", adresse.value); 
//   console.log("Valeur de la ville :", ville.value); 
//   console.log("Valeur du mail :", email.value);  

  if (prenom.value == null || prenom.value.trim() === "", nom.value == null || nom.value.trim() === "", adresse.value == null || adresse.value.trim() === "", ville.value == null || ville.value.trim() === "", email.value == null || email.value.trim() === ""    ) {
    modal.style.display = "none";
  } else {
    modal.style.display = "block";
  }
  event.preventDefault();   // event deprecated but, didnt work without
}





// When the user click on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}



















