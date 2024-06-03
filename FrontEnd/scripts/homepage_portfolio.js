
//*******************************************************************************************************************//
//*************** Déclaration des fonctions liées à l'affichage de la galerie (homepage_portfolio.js) ***************//
//*******************************************************************************************************************//

/*
** Déclaration de la fonction qui génère dynamiquement tout le contenu de la galerie des projets
*/
export function afficherGalerie(travaux) {
    document.querySelector(".gallery").innerHTML = ""
    
    for (let i=0; i < travaux.length; i++) {
        const projet = travaux[i]

        //** Création des élements html de la galerie de travaux **//
        const baliseFigure = document.createElement("figure")
        baliseFigure.dataset.id = projet.id
    
        const imageProjet = document.createElement("img")
        imageProjet.src = projet.imageUrl
        imageProjet.alt = projet.title
        baliseFigure.appendChild(imageProjet)
        
        const captionProjet = document.createElement("figcaption")
        captionProjet.innerText = projet.title
        baliseFigure.appendChild(captionProjet)

        //** Récupération de l'élément du DOM qui accueillera les projets (parent) **//
        document.querySelector(".gallery").appendChild(baliseFigure)
    }
}

/*
** Déclaration de la fonction qui permettent d'extraire la liste de catégories sans doublons
*/
export function listerCategories(travaux) {
    //** Récupération des catégories de travaux, en supprimant les doublons **//
    let categories = new Map() // Création d'un nouvel objet Map, pour y stocker des paires de clé-valeur en mémorisant l'ordre d'insertion.
    travaux.forEach( // méthode forEach pour exécuter une fonction une fois pour chaque élément du tableau "travaux"
        projet => categories.set(projet.category.id, projet.category) // fonction lambda + set(key, value) appliqué à la structure Map pour y stocker des données
    )
    let listeCategories = Array.from(categories.values()) // Constitution d'un tableau à partir des values
    return listeCategories
}

/*
** Déclaration de la fonction qui génère dynamiquement le menu de catégories
*/
export function genererBoutonsCategorie(listeCategories) {

    const divFilterButtons = document.querySelector(".filter-buttons")
    divFilterButtons.innerHTML = ""

    //** Génération du bouton pour réinitialiser l'affichage par défaut **//
    const baliseButtonParDefaut = document.createElement("button")
    baliseButtonParDefaut.classList.add("btn-par-defaut")
    baliseButtonParDefaut.innerText = "Tous"

    divFilterButtons.appendChild(baliseButtonParDefaut)

    //** Génération dynamique des boutons de catégories **//
    for (let i = 0; i < listeCategories.length; i++) {
        const baliseButton = document.createElement("button")
        baliseButton.classList.add("btn-categorie")
        baliseButton.value = listeCategories[i].name
        baliseButton.dataset.id = listeCategories[i].id
        baliseButton.innerText = listeCategories[i].name
        
        const divFilterButtons = document.querySelector(".filter-buttons")
        divFilterButtons.appendChild(baliseButton)
    }
}

/*
** Déclaration de la fonction qui gère le fonctionnement des boutons du menu de catégories
*/
export function gererBoutonsCategorie(travaux, listeCategories) {

    travaux = JSON.parse(window.localStorage.getItem("travaux")) // TEST

    //** Affichage par défaut **//
    const affichageParDefaut = document.querySelector(".btn-par-defaut")
    affichageParDefaut.addEventListener("click", () => {
        document.querySelector(".gallery").innerHTML = ""
        afficherGalerie(travaux)
    })

    //** Sélection d'une catégorie **//
    const btnCategorie = document.querySelectorAll(".btn-categorie") // Utiliser methode forEach pour alléger le code
    for (let i=0; i < btnCategorie.length; i++) {
        btnCategorie[i].addEventListener("click", (event) => {

            let btnCategorieClick = event.target.value

            for (let index = 0; index < listeCategories.length; index++) {
                if (btnCategorieClick === listeCategories[index].name) {

                    let categorieChoisie = travaux.filter(travaux => travaux.category.name === listeCategories[index].name)
                    document.querySelector(".gallery").innerHTML = ""
                    afficherGalerie(categorieChoisie)

                }
            }
        }
    )}
}

export function afficherIndex(travaux) {
    afficherGalerie(travaux)
    let listeCategories = listerCategories(travaux)
    genererBoutonsCategorie(listeCategories)
    gererBoutonsCategorie(travaux, listeCategories)
}