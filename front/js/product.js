// Fonction pour extraire l'id de l'URL
function getProductIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

// Fonction pour récupérer les infos du produit via son ID
async function getProductById(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/products/${id}`);
        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la récupération du produit :", error);
    }
}

// Fonction principale qui injecte les infos dans la page product.html
async function displayProductDetail() {
    const productId = getProductIdFromURL();
    if (!productId) return;

    const product = await getProductById(productId);
    if (!product) return;

    console.log(product); // Pour vérifier

    // Sélections HTML
    const img = document.querySelector("figure img");
    const title = document.querySelector("h1");
    const description = document.querySelector("section.detailoeuvre article p");
    const price = document.querySelector(".showprice");
    const select = document.querySelector("#format");
    const aside = document.querySelector("aside h2");
    const button = document.querySelector(".button-buy");

    // Injection des données
    img.src = product.image;
    img.alt = product.shorttitle;
    title.textContent = product.titre;
    description.textContent = product.description;

    // Prend le prix de la première déclinaison comme prix affiché
    if (product.declinaisons && product.declinaisons.length > 0) {
        price.textContent = `${product.declinaisons[0].prix}€`;
    } else {
        price.textContent = "Prix indisponible";
    }

    // Ajoute les déclinaisons dans le <select>
    select.innerHTML = ""; // Vide avant d'ajouter
    product.declinaisons.forEach(decl => {
        const option = document.createElement("option");
        option.value = decl.taille;
        option.textContent = `${decl.taille} - ${decl.prix}€`;
        select.appendChild(option);
    });

    aside.textContent = `Description de l'oeuvre : ${product.titre}`;
    button.textContent = `Buy ${product.shorttitle}`;
}

// Lancement
displayProductDetail();
