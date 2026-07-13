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
    constructor(id, titre, image, format, prix, quantity){
        this.id = id
        this.titre = titre
        this.image = image
        this.format = format
        this.prix = prix 
        this.quantity = quantity       
    }

    afficherInfos(){
        console.log(`Achat : ${this.id} ${this.titre} ${this.image} ${this.format} ${this.prix} ${this.quantity}`)
    }
}

//Fonction calcul des prix
const select = document.querySelector('select')
const price = document.querySelector('.showprice')
const input = document.querySelector('#quantity')

function calcul(x){
    for(compareId of x){
        if(id == compareId._id){
            
            let i = 0
            for(declinaison of compareId.declinaisons){  
                if(select.value == declinaison.taille){
                    let priceAfficher = declinaison.prix * input.value
                    price.textContent = priceAfficher
                    console.log(priceAfficher)                   

                    const monAchat = new Achat(id, compareId.titre, compareId.image, declinaison.taille, priceAfficher, input.value) 
                    console.log(monAchat)

                    const button = document.querySelector(".button-buy")
                    button.addEventListener('click', (e) => {
                        JSON.parse(localStorage.getItem("cart")) ?? monAchat
                        console.log(monAchat)
                        console.log(id,compareId.titre, compareId.image, declinaison.taille, priceAfficher, input.value)
                        console.log(id)
                        // On ne peut pas ajouter quelque chose de null
                        if(input.value != 0){
                            localStorage.setItem("cart", JSON.stringify(monAchat))

                            //Ajouter une modale, pop up avec la liste des ajouts (bonus?) Sinon insérer un msg alert "ajouter au panier"
                            document.querySelector("#message").textContent = "Ajouté au panier"
                        }                       
                    })                   
                }                       
            }                                                  
        }
    }
}
    // Après ajout, si le produit est le même, il faut modifier la quantité
    // Si le produit est différent, on ajoute à la suite du localstorage
    // if()
    // innerText, récupérer le localstorage et ajouter d'autres objets au suivant
    //Supprimer des objets selon les id? (autres fonctions?)


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
                price.textContent = compareId.declinaisons[0].prix             
                    
                const buy = document.querySelector(".button-buy")
                buy.textContent = `Buy ${compareId.shorttitle}`
                
                const title2 = document.querySelector("h2")
                title2.textContent = `${compareId.description}`
            }
        }
        // Appel de la fonction calcul avant les add.event pour pouvoir ajouter au panier les éléments par défaut
        calcul(res)
        
        // Si autre option, au clic, choisir autre prix
        //On compare les tailles sélectionnées avec les tailles du tableau/prix correspondant                    
        select.addEventListener('change', (e) =>{
            e.preventDefault;

            // Revenir à quantity = 1, lorsqu'on change de format
            input.value = 1

            calcul(res)
            // ajoutPanier()
        }) 

        input.addEventListener('input', (e) =>{
            e.preventDefault;
                        
            calcul(res) 
        })   
        
            
    }catch(error) {
        console.error(`Une erreur est survenue : ${error}`)
    }
}

afficheProduct()

//Modifier les quantités via localstorage et modifier le prix dans le panier ou product.html?
