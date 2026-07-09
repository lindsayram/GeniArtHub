//Récupérer les images
async function recupImages() {
    try{
        const req = await fetch("http://localhost:3000/api/products/")
    if(!req.ok) {
        throw new Error (`Erreur HTTP : Statut : ${req.status}`)
    }
    const res = await req.json()
    
    res.forEach(product => {
        //afficher url
        // console.log(`${product._id}`)

        //faire une boucle pour afficher les images dans HTML
        //Modifier URL de la src img
        const products = document.querySelector('.products')
        const article =`
            <article>
                <img src="${product.image}" alt="${product.shorttitle}">
                <a href="product.html?id=${product._id}">Buy ${product.shorttitle}</a>
            </article> 
            `
       products.insertAdjacentHTML('beforeend', article)
    })
    } catch(error) {
        console.error(`Une erreur est survenue : ${error}`)
    }
}

recupImages()

