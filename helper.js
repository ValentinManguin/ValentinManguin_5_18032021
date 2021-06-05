function convertPrice(priceConvert) {
    let priceEuros = priceConvert / 100;
    return priceEuros.toFixed(2) + ' €';

}

function GetBasket() {
    const basket = localStorage.getItem("basket");
    if (basket === null) {
        return [];
    } else {
        return JSON.parse(basket);
    }
}

function SetBasket(basketToSave) {
    localStorage.setItem("basket", JSON.stringify(basketToSave));
}

// faire la fonction qui ajoute un produit au panier

function AddToBasket(productToAdd) {
   let basket = GetBasket();
   // Ajout panier
   productToAdd.quantity = 1;
   basket.push(productToAdd);
   SetBasket(basket);
    alert("produit ajouter au panier");
};


// fonction vider le panier

function emptyBasket() {
    localStorage.removeItem("basket");
alert("Votre panier est mainteneant vide");
};





