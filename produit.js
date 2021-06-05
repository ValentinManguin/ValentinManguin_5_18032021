let camerasData = null;

async function getCameras() {
    const searchParam = new URLSearchParams(window.location.search);
    const cameraId = searchParam.get("id");
    console.log(window.location);
    console.log(cameraId);
    const fetchUrl = 'http://localhost:3000/api/cameras/' + cameraId


    let response = await fetch(fetchUrl);
        camerasData = await response.json();
    const camerasElt = document.getElementById('cameras');
    console.log(camerasData);

let lensesHtml = '';
for (const lense of camerasData.lenses) {
    lensesHtml += `<option value="${lense}">${lense}</option>`;
}




    camerasElt.insertAdjacentHTML("beforeend", `<li>
<img src="${camerasData.imageUrl}" alt=""> <h2><span>${camerasData.name}</span><span>${convertPrice(camerasData.price)}</span>
<select  name="lentille" id="lentille">${lensesHtml}</select></h2> 
</li>`);

}
getCameras();



// Ajouter au panier

const ajouterPanier = document.getElementById('ajoutPanier');
console.log(ajouterPanier);

ajouterPanier.addEventListener("click", (event) => {
    event.preventDefault();
    if (camerasData !== null) {


        AddToBasket(camerasData);
    }
});