const storedCartData = localStorage.getItem('cart'); // recup les produit dans le panier du localstorage
const produits = document.getElementsByClassName("produit");
var val = JSON.parse(storedCartData); // Local storage -> tableau[]
// console.log(val) // Affiche dans la console le localstorage sous forme d'array
  


// Supprime le produit listé en face du boutton supprimer dans le panier  
for (let produit of produits) {
    const buttonDelete = produit.querySelector(".delete_product");

    buttonDelete.addEventListener('click', () => {
        produit.remove(); 
    });
}



async function displayProducts() { // NON FONCTIONNEL

  val.forEach((card, index) => {   // index sert à recup le produit correspondant dans le tableau storedCartData[].
  const product = val[index]; 
  console.log(product) // Affiche dans la console chaque produits dans le panier, une ligne = 1 produit 
  }

)};

displayProducts()



const template = `    <div class="produit">
                        <img src="${this.img}" alt="Oiseau regard en l'air">
                        <div>
                            <h3 class="produit_h3">${this.shorttitle}</h3>
                            <p class="produit_format">${this.format}</p>
                            <p class="produit_prix">${this.prix}</p>
                            <div>
                                <label for="quantity">Quantité:</label>
                                <input value="${this.quantity}" type="number" id="quantity" name="quantity" min="0" max="10" />
                            </div>
                            <button class="delete_product">Supprimer</button>
                          </div>
                      </div> `



// PLAN ->
// Prendre les infos dans localstorage "cart"
// Parse pour séparer les éléments ? 
// pour chaque produit dans "cart", crée un template avec les infos du produit
// Injecte dans le html les differents produit avec le template
  // SI addeventlistener "change" sur l'input quantity ça doit update le localstorage ce MàJ
  
  // Delete Button déja crée et fonctionnel ()
  






// CODE POUR LE FORMULAIRE ->




 
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
    return value.length >= 2 ;
  }

  function validateValueAdresse(value) {
    return value.length >= 10 ;
  }

  function validateValueVille(value) {
    return value.length >= 3 ;
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

// Quand l'utilisateur clique en dehors de la modal, la ferme 
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
