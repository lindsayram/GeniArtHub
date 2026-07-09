// Récupérer l'url, pour afficher toutes infos
// console.log(window.location.href)
//Récupère les paramètres dans l'URL
// console.log(window.location.search)

// Récupérer l'id dans l'url
const nbParam = new URLSearchParams(window.location.search)
// console.log(nbParam)
const id = nbParam.get('id')
// console.log(id)

//comparer avec API

async function afficheProduct() {
    try{
        const req = await fetch("http://localhost:3000/api/products/")
        if(!req.ok) {
            throw new Error (`Erreur HTTP : Statut : ${req.status}`)
        }
        const res = await req.json()
        
        let index = 0
        for(compareId of res){
            if(id == compareId._id){
                const article = document.querySelector('article')
                const figure = `
                    <figure>
                        <img src="${compareId.image}" alt="${compareId.shorttitle}">
                    </figure>`
                article.insertAdjacentHTML('afterbegin', figure)

            // console.log(compareId.declinaisons)

                const div = document.querySelector('#details')
                const infosArt = `
                    <h1>${compareId.titre}</h1>
                    <p>Plongez dans l'univers mystique de 'Bird', une œuvre d'art captivante qui transcende les limites de la réalité. Réalisée dans le style éthéré et spectral, cette pièce évoque la présence d'un oiseau envoûtant qui semble flotter dans l'au-delà.</p>
                    `
                div.insertAdjacentHTML('afterbegin', infosArt)
                // console.log(compareId.declinaisons)
                // Faire le menu SELECT
                const select = document.querySelector('select')
                console.log(compareId.declinaisons)

                for(declinaison of compareId.declinaisons){
                    // console.log(declinaison.taille)
                    const format = `
                        <option>${declinaison.taille}</option>`                   
                    select.insertAdjacentHTML('afterbegin', format)
                }
                
                const buy = document.querySelector(".button-buy")
                buy.textContent = `Buy ${compareId.shorttitle}`
                
                const title2 = document.querySelector("h2")
                title2.textContent = `Description de l'oeuvre : ${compareId.titre}`
            }

                //Faire le aside
        }       
    }catch(error) {
        console.error(`Une erreur est survenue : ${error}`)
    }
}

afficheProduct()


//Modifier les quantités via localstorage et modifier le prix dans le panier ou product.html?
