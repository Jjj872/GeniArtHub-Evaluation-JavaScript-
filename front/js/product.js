// Récupération HTML
    const img = document.querySelector("figure img");
    const title = document.querySelector("h1");
    const description = document.querySelector("section.detailoeuvre article p");
    const price = document.querySelector(".showprice");
    const select = document.querySelector("#format");
    const aside = document.querySelector("aside h2");
    const asidedescription = document.querySelector("aside p");
    const button = document.querySelector(".button-buy");
    const pagename = document.querySelector("title")


// Fonction pour extraire l'id de l'URL
function getProductIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");   // return l'id trouver dans l'url 
}

// Fonction pour récupérer les infos du produit via son ID 
async function getProductById(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/products/${id}`); // l'id est trouvé par la fonction getProductIdFromUrl
        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la récupération du produit :", error); 
    }
}



// Fonction PRINCIPAL qui injecte les infos dans la page product.html
async function displayProductDetail() {
    const productId = getProductIdFromURL();
    if (!productId) return;
    // console.log(productId); // Pour VERIF que l'id arrive bien

    const product = await getProductById(productId);
    if (!product) return;
    // console.log(product); // pour VERIF que toutes les infos (id,img,descrip. . .) arrive bien


        // Injection des données
    img.src = product.image;     
    img.alt = product.shorttitle;
    title.textContent = product.titre;
    description.textContent = truncatedText;
    pagename.textContent = product.titre;

    
    // Fonction pour raccourcir la description 
    function TruncatedDescription(str, maxLength) {
    if (str.length > maxLength) {
        return str.substring(0, maxLength) + '...'; // substring(indexStart, indexEnd)
    }
    return str; // si str < maxlength affiche tout le text (logique)
    }
    const longText = product.description;
    const truncatedText = TruncatedDescription(longText, 200); // truncatedText est la variable longtext qui passe dans la fonction truncateddescription avec 200 en max length
    // console.log(truncatedText); // Affiche dans la console la description tronquée







    // Prend le prix de la première déclinaison comme prix affiché
    price.textContent = `${product.declinaisons[0].prix}€`;

    // Affiche le prix par rapport au format selectionner par l'utilisateur
    select.addEventListener("change", function () {
    const selectedTaille = this.value;
    const selectedDeclinaison = product.declinaisons.find(declinaison => declinaison.taille === selectedTaille); // "Je cherche dans la liste des déclinaisons celle dont la taille est exactement égale à la taille choisie par l’utilisateur."

    if (selectedDeclinaison) {
        price.textContent = `${selectedDeclinaison.prix}€`;
    } else {
        price.textContent = "Prix indisponible";
    }
    });


    // Ajoute les déclinaisons dans le <select>
    product.declinaisons.forEach(declinaison => {
        const option = document.createElement("option");
        option.value = declinaison.taille;
        option.textContent = `${declinaison.taille} - ${declinaison.prix}€`;
        select.appendChild(option);
    });

    // Oblige l'input #quantity min 0 max 100
    document.getElementById("quantity").addEventListener("change", function() {
        let valeur = parseInt(this.value ,10); // analyse  la string fournie et renvoie un entier //Attention : La base par défaut n'est pas 10. Ce paramètre doit toujours être utilisé, en effet s'il n'est pas spécifié, le comportement de la fonction n'est pas garanti et peut varier d'une plate-forme à une autre.
        if (valeur <0) {
            this.value = 0;
        }
        if (valeur >100) {
             this.value = 100;
        }

        
    });

    // Inject dans aside titre / la description complete et modifie le buy button avec le nom du produit
    aside.textContent = `Description de l'oeuvre : ${product.titre}`;
    asidedescription.textContent = product.description;
    button.textContent = `Buy ${product.shorttitle}`;


    // addEventListener sur le bouton "buy" des pages products
    button.addEventListener("click", function (event) {
    const productId = getProductIdFromURL();
    const quantity = parseInt(document.getElementById("quantity").value, 10);
    const format = document.getElementById("format").value;
    const shorttitle = product.shorttitle;
    const prixText = document.querySelector(".showprice").textContent;
    const prix = parseFloat(prixText.replace("€", "").trim()); // Convertit "35.25€" → 35.25
    const img = product.image;

    addToCart(productId, quantity, format, shorttitle, prix, img);
});

}
// Lancement
displayProductDetail();





// FUNCTION addToCart sert à setItem le localStorage, si le produit est déja dans le LocalStorage -> quantity+1 :
function addToCart(productId, quantity, format, shorttitle, prix, img) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find(item => item.id === productId && item.format === format);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            shorttitle: shorttitle,
            quantity: quantity,
            format: format,
            prix: prix,
            img : img
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`"${shorttitle}" ajouté au panier.`);
}

