// Récupérer l'url, pour afficher toutes infos
// console.log(window.location.href)
//Récupère les paramètres dans l'URL
// console.log(window.location.search)

// Récupérer l'id dans l'url
const nbParam = new URLSearchParams(window.location.search)
// console.log(nbParam)
const id = nbParam.get('id')
// console.log(id)

//Classe pour les infos nécessaires au panier
class Achat {
    constructor(titre, image, format, prix){
        this.titre = titre
        this.image = image
        this.format = format
        this.prix = prix
    }

    afficherInfos(){
        console.log(`Achat : ${this.titre} ${this.image} ${this.format} ${this.prix}`)
    }
}

//Comparer avec API
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

            

                const div = document.querySelector('#details')
                const premierePhrase = compareId.description.split('.')[0] + '.'
                // console.log(premierePhrase)

                const infosArt = `
                    <h1>${compareId.titre}</h1>
                    <p>${premierePhrase}</p>
                    `
                div.insertAdjacentHTML('afterbegin', infosArt)
                // console.log(compareId.declinaisons)
                
                // Faire le menu SELECT
                const select = document.querySelector('select')
                const price = document.querySelector('.showprice')

                // console.log(compareId.declinaisons)

                for(declinaison of compareId.declinaisons){
                    // console.log(declinaison.prix)
                    const format = `
                        <option>${declinaison.taille}</option>`                   
                    select.insertAdjacentHTML('afterbegin', format)
                }
                // console.log(compareId.declinaisons[0].prix)
                // console.log(declinaison)
                // console.log(declinaison.prix)
                
                switch(declinaison.taille){
                    case "20 x 20":
                        price.textContent = `${compareId.declinaisons[0].prix}`
                    break;
                    case "30 x 20":
                        price.textContent = `${compareId.declinaisons[1].prix}`
                    break;
                    case "30 x 30":
                        price.textContent = `${compareId.declinaisons[2].prix}`
                    break;
                    case "40 x 30":
                        price.textContent = `${compareId.declinaisons[3].prix}`
                    break;
                    case "40 x 40":
                        price.textContent = `${compareId.declinaisons[4].prix}`
                    break;
                    default:
                        "0"
                } 
                // utiliser le localstorage?, et maj immédiatement                    
                
                
                const buy = document.querySelector(".button-buy")
                buy.textContent = `Buy ${compareId.shorttitle}`
                
                const title2 = document.querySelector("h2")
                title2.textContent = `${compareId.description}`
                
                // Au clic au ajoute les éléments au panier
                const button = document.querySelector(".button-buy")
                    
                button.addEventListener('click', (e) =>{
                    e.preventDefault();
                    for(compareId of res){
                        if(id == compareId._id){
                            console.log(compareId._id)
                            const mesAchats = new Achat(compareId.titre, compareId.image, declinaison.taille, declinaison.prix)
                            mesAchats.afficherInfos()
                    localStorage.setItem("cart", JSON.stringify(mesAchats))
                    // - L'image, titre long, Le format choisi, Le prix unitaire, La quantité choisie, Un lien de suppression
                        }
                    }
                })
            }
        }
        
       
    }catch(error) {
        console.error(`Une erreur est survenue : ${error}`)
    }
}

afficheProduct()


//Modifier les quantités via localstorage et modifier le prix dans le panier ou product.html?
