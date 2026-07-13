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
        this.quantity = quantity       
    }

    afficherInfos(){
        console.log(`Achat : ${this.id} ${this.titre} ${this.image} ${this.format} ${this.quantity}`)
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
                    // console.log(priceAfficher)                   

                    const monAchat = new Achat(id, compareId.titre, compareId.image, declinaison.taille, input.value) 
                    // console.log(monAchat)

                    // let tableauAchats = Array.from(Achat)
                    // console.log(tableauAchats) 
                    ajoutPanier(monAchat)                      
                }                
            }                       
        }                                                  
    }
}
    // Si le produit est différent, on ajoute à la suite du localstorage
        
        
function ajoutPanier(monAchat){
    const button = document.querySelector(".button-buy")
    button.addEventListener('click', async(e) => {
        e.preventDefault;

        // // On ne peut pas ajouter quelque chose de null
        if(input.value != 0 && input.value != ""){
            const cartsData =  JSON.parse(localStorage.getItem("element")) ?? monAchat
            // console.log(input.value)
            // console.log(cartsData)           
            

            // Après ajout, si le produit est le même, avec le même format il faut modifier la quantité
            for(cartData in cartsData){ 
             console.log(cartsData.id)
                    // revoir cette condition...                           
                if(id == cartsData.id && select.value == cartsData.format && input.value != cartsData['quantity']){
                    console.log(input.value) 
                    console.log(cartsData['quantity']) 
                    
                    // cartsData['quantity'] += input.value
                    // console.log(cartsData.quantity)
                    
                    localStorage.setItem("element", JSON.stringify(monAchat))
                    //Ajouter une modale, pop up avec la liste des ajouts (bonus?) Sinon insérer un msg alert "ajouter au panier"
                    document.querySelector("#message").textContent = "Ajouté au panier"                       
                } 
                if(id == cartsData.id && select.value != cartsData.format){
                    // si le nom de la clé existe, alors i+?
                    localStorage.setItem("element2", JSON.stringify(monAchat))
                    // const envoiAuPanier = await fetch(`http://localhost:3000/api/products/${id}`, {
                    //     method:'Post',
                    //     body:JSON.stringify(monAchat),
                    //     headers:{
                    //         'Content-type' : 'application/json',
                    //     }                             
                    // })
                    //Ajouter une modale, pop up avec la liste des ajouts (bonus?) Sinon insérer un msg alert "ajouter au panier"
                    document.querySelector("#message").textContent = "Ajouté au panier"
                } 
                if(id!=cartsData.id) {
                localStorage.setItem("element3", JSON.stringify(monAchat))
                // const envoiAuPanier = await fetch(`http://localhost:3000/api/products/${id}`, {
                //     method:'Post',
                //     body:JSON.stringify(monAchat),
                //     headers:{
                //         'Content-type' : 'application/json',
                //     }
                // })
                //Ajouter une modale, pop up avec la liste des ajouts (bonus?) Sinon insérer un msg alert "ajouter au panier"
                document.querySelector("#message").textContent = "Ajouté au panier"
                }  
            } 
        }                            
    })                                            
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

