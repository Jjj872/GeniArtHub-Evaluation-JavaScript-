// Fonction pour récupérer les produits depuis API
async function getProduct() {
    try {
        const response = await fetch('http://localhost:3000/api/products/');
        const data = await response.json();
        // console.log("Produits reçus :", data); 
        return data;
    } catch (e) {
        console.error("Erreur lors de la récupération des produits :", e);
    }
}

// Fonction pour injecter les données dans les <article class="product-card">
async function displayProducts() {
    const products = await getProduct(); // Récupère les données de l'API
    // console.log (products) // Affiche liste des produits

    if (!products) {
        console.log("Aucun produit trouvé !");
        return;
    }

    const cards = document.querySelectorAll('.product-card'); // Sélectionne tous les <article>

    cards.forEach((card, index) => {   // index sert à recup le produit correspondant dans le tableau products[].
        const product = products[index]; 

        const img = card.querySelector('.product-image');  // Sélectionne l'image dans la carte
        const button = card.querySelector('.buy-button');  // Sélectionne le lien dans la carte

        // Met à jour l'image
        img.src = product.image;
        img.alt = product.shorttitle;

        // Met à jour le bouton
        button.textContent = `Buy ${product.shorttitle}`;
        button.href = `product.html?id=${product._id}`;
        }
    )};


// Lance le remplissage 
displayProducts()