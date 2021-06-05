document.getElementById("infoClient").addEventListener("submit", function(event) {
    event.preventDefault();
    console.log("");
    setData();
});

const getInfoClient = () => {
    let infoStorage = localStorage.getItem('infoClient');
    if (infoStorage !== null) {
        let infoClient = JSON.parse(infoStorage);
        //   alert(infoClient);
        document.getElementById('lastname').value = infoClient.nom;
        document.getElementById('firstname').value = infoClient.prenom;
        document.getElementById('address').value = infoClient.adresse;
        document.getElementById('city').value = infoClient.ville;
        document.getElementById('email').value = infoClient.email;


    }
};
getInfoClient();

//faire la fonction qui récuper le panier et qui génrer du html pour chaque élément du panier 

function displayBasket() {


    let basket = GetBasket();
    const basketElt = document.getElementById('basket');
    for (const camera of basket) {
        basketElt.innerHTML += `<li>
<a href="produit.html?id=${camera._id}"><img src="${camera.imageUrl}" alt=""> <h2><span>${camera.name}</span><span>${convertPrice(camera.price)}</span></h2></a>   
</li>`
    }

}
displayBasket();

// Vider le panier

document.getElementById('videPanier').addEventListener('click', emptyBasket);

async function setData() {

    //let infoClientNom = document.getElementById('Lastname').value;
    let infoClient = {
        nom: document.getElementById('lastname').value,
        prenom: document.getElementById('firstname').value,
        adresse: document.getElementById('address').value,
        ville: document.getElementById('city').value,
        email: document.getElementById('email').value

    };

    let infoClientStr = JSON.stringify(infoClient);
    localStorage.setItem('infoClient', infoClientStr);


    // envoyer au serveur


    let productsOrder = [];
    //gerneration la list des products id 

let basket = GetBasket() 

    for (let camera of basket) {
        const cameraId = camera._id;
        productsOrder.push(cameraId);
    }

    if (productsOrder.length == 0){
        alert("Le panier est vide");
        return;
    }

console.log(productsOrder);
    // 

    let response = await fetch('http://localhost:3000/api/cameras/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contact: {
                firstName: infoClient.nom,
                lastName: infoClient.prenom,
                address: infoClient.adresse,
                city: infoClient.ville,
                email: infoClient.email
            },
            products: productsOrder
        })

    })
    let order = await response.json();

    console.log(order);

    //affichage de id commande à l'utilisateur 

let mainElt = document.getElementById('main');
  mainElt.innerHTML = ` <h2>Merci pour votre commande !</h2> <h2>Votre numéro de commande est : ${order.orderId}</h2>`;


};



// JSON.stringify =  transforme  l'objet transmis en paramètre en chaîne de caractères JSON

// JSON.Parse() = transforme la chaîne de caractères JSON en objet