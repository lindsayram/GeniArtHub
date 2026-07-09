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

            // console.log(recherche._id)
                const div = document.querySelector('#details')
                const infosArt = `
                    <h1>${compareId.titre}</h1>
                    <p>Plongez dans l'univers mystique de 'Bird', une œuvre d'art captivante qui transcende les limites de la réalité. Réalisée dans le style éthéré et spectral, cette pièce évoque la présence d'un oiseau envoûtant qui semble flotter dans l'au-delà.</p>
                    <div class="price">
                        <p>Acheter pour</p>
                        <span class="showprice">35.25€</span>
                    </div>
                    <div class="declinaison">
                        <input type="number" name="quantity" id="quantity" placeholder="1" value="1" minlength="1">
                        <select name="format" id="format">
                            
                        </select>
                    </div>
                    <a class="button-buy" href="#">Buy ${compareId.shorttitle}</a>`
                div.insertAdjacentHTML('afterbegin', infosArt)
            }
        }
    }catch(error) {
        console.error(`Une erreur est survenue : ${error}`)
    }
}

afficheProduct()
//Liste SELECT
// function afficher() {
//     const liste = document.querySelector("select");
//     const selection = liste.value;
//     let sortie = document.querySelector("sortie");
//     sortie.innerHTML = selection; -------------------------> bleu
//   }



//Modifier les quantités via localstorage et modifier le prix dans le panier ou product.html?

//Afficher un menu déroulant avec des tailles différentes