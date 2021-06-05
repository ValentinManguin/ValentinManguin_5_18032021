async function getCameras() {
    let response = await fetch('http://localhost:3000/api/cameras');
    let camerasData = await response.json();
    const camerasElt = document.getElementById('cameras');
console.log(camerasData);
    for (const camera of camerasData) {


        camerasElt.innerHTML += `<li>
<a href="produit.html?id=${camera._id}"><img src="${camera.imageUrl}" alt=""> <h2><span>${camera.name}</span><span>${convertPrice(camera.price)}</span></h2></a>   
</li>`
    }
}
getCameras();