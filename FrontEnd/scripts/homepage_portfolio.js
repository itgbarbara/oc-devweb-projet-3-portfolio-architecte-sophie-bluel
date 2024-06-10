
//*******************************************************************************************************************//
//****************** Déclaration des fonctions liées à l'affichage de la galerie (page d'accueil) *******************//
//*******************************************************************************************************************//

/*
** Déclaration de la fonction qui génère dynamiquement la galerie des projets (accueil)
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
    travaux.forEach(
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
    const baliseListe = document.createElement("li")

    const baliseButtonParDefaut = document.createElement("button")
    baliseButtonParDefaut.classList.add("btn-par-defaut", "active-filter")
    baliseButtonParDefaut.innerText = "Tous"

    baliseListe.appendChild(baliseButtonParDefaut)
    divFilterButtons.appendChild(baliseListe)

    //** Génération dynamique des boutons de catégories **//
    for (let i = 0; i < listeCategories.length; i++) {
        const baliseListe = document.createElement("li")

        const baliseButton = document.createElement("button")
        baliseButton.classList.add("btn-categorie")
        baliseButton.value = listeCategories[i].name
        baliseButton.dataset.id = listeCategories[i].id
        baliseButton.innerText = listeCategories[i].name

        baliseListe.appendChild(baliseButton)
        
        const divFilterButtons = document.querySelector(".filter-buttons")
        divFilterButtons.appendChild(baliseListe)
    }
}

/*
** Déclaration de la fonction qui gère le fonctionnement des boutons du menu de catégories
*/
export function gererBoutonsCategorie(travaux, listeCategories) {

    travaux = JSON.parse(window.localStorage.getItem("travaux"))
    let filtreActif = document.querySelector(".active-filter")

    //** Affichage par défaut **//
    const btnParDefaut = document.querySelector(".btn-par-defaut")
    btnParDefaut.addEventListener("click", (event) => {

        filtreActif.classList.remove("active-filter")
        event.target.classList.add("active-filter")
        filtreActif = event.target

        document.querySelector(".gallery").innerHTML = ""
        afficherGalerie(travaux)
    })

    //** Sélection d'une catégorie **//
    document.querySelectorAll(".btn-categorie").forEach(btnCategorie => {
        btnCategorie.addEventListener("click", (event) => {

            filtreActif.classList.remove("active-filter")
            event.target.classList.add("active-filter")
            filtreActif = event.target

            let idBtnCategorieChoisie = parseInt(event.target.dataset.id)

            for (let index = 0; index < listeCategories.length; index++) {
                if (idBtnCategorieChoisie === listeCategories[index].id) {

                    let categorieChoisie = travaux.filter(travaux => travaux.category.id === listeCategories[index].id)
                    document.querySelector(".gallery").innerHTML = ""
                    afficherGalerie(categorieChoisie)

                }
            }
        })
    })
}

/*
** Déclaration de la fonction permettant de générer tous les éléments dynamiques de la page d'accueil
*/
export function afficherIndex(travaux) {
    afficherGalerie(travaux)
    let listeCategories = listerCategories(travaux)
    genererBoutonsCategorie(listeCategories)
    gererBoutonsCategorie(travaux, listeCategories)
}