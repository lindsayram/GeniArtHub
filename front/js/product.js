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

        const select = document.querySelector('select')
        console.log(select)
        const price = document.querySelector('.showprice')

        let index = 0
        for(compareId of res){
            // console.log(compareId)
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

                let i = 0
                for(declinaison of compareId.declinaisons){
                    // console.log(declinaison.prix)
                    const format = `
                        <option value="${declinaison.taille}">${declinaison.taille}</option>`     
                        // console.log(format)              
                    select.insertAdjacentHTML('afterbegin', format)   
                }

                const indexTaille = format.selectedIndex
                                   
                //Valeur par défaut, le prems
                
                price.textContent = `${compareId.declinaisons[0].prix}`             
                    
                const buy = document.querySelector(".button-buy")
                buy.textContent = `Buy ${compareId.shorttitle}`
                
                const title2 = document.querySelector("h2")
                title2.textContent = `${compareId.description}`
                
                // Au clic au ajoute les éléments au panier
                const button = document.querySelector(".button-buy")
            }
        }
        // Si autre option, au clic, choisir autre prix
        //On compare les tailles sélectionnées avec les tailles du tableau/prix correspondant                    
        select.addEventListener('change', () =>{
            // console.log(select.value)
            // console.log(declinaison.taille)
            
            for(compareId of res){
                if(id == compareId._id){
                    console.log(id)
                    console.log(compareId._id)
                    let i = 0
                    for(declinaison of compareId.declinaisons){  
                        if(select.value == declinaison.taille){
                            // localStorage.setItem("taille", JSON.stringify(format.selectedIndex))
                            price.textContent = `${declinaison.prix}`
                            // console.log(select.value)
                            // console.log(declinaison.taille)
                            console.log(compareId.declinaisons)
                        }                               
                    }
                }
            }
        }) 
       
    }catch(error) {
        console.error(`Une erreur est survenue : ${error}`)
    }
}

afficheProduct()

//Modifier les quantités via localstorage et modifier le prix dans le panier ou product.html?
