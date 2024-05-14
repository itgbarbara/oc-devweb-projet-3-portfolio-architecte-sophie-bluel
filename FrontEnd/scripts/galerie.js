/*
** Import des fonctions du fichier script.js
**/


/*
** Récupération des données depuis l'API HTTP
*/
const reponse = await fetch("http://localhost:5678/api/works") // Envoi d'une requête pour récupérer les données de l'API (route : GET /works)
const travaux = await reponse.json() // Désérialisation du JSON et stockage de la liste d'objets (= travaux) obtenue dans la variable "travaux"

/*
** Déclaration de la fonction qui génère dynamiquement tout le contenu de la galerie des projets
*/
function afficherGalerie(travaux) {
    for (let i=0; i < travaux.length; i++) {
        const projet = travaux[i]

        //** Création des élements html de la galerie de travaux **//
        const baliseFigure = document.createElement("figure") // Création d'une balise <figure> dédiée à chaque projet
    
        const imageProjet = document.createElement("img") // Création d'une balise <img> pour chaque projet
        imageProjet.src = projet.imageUrl // Ajout d'un attribut 'src' à la balise <img>, en allant chercher l'URL source dans la variable "travaux", indice i, propriété 'imageUrl'
        imageProjet.alt = projet.title // Ajout d'un attribut 'alt' à la balise <img>, en allant chercher la description dans la variable "travaux", indice i, propriété 'title'
        baliseFigure.appendChild(imageProjet) // Rattachement de la balise <img> (enfant) à la balise <figure> (parent)
        
        const captionProjet = document.createElement("figcaption") // Création d'une balise <figcaption> pour chaque projet
        captionProjet.innerText = projet.title // Ajout de texte à la balise <figcaption>, provenant de la propriété "title" de chaque objet du tableau "travaux"
        baliseFigure.appendChild(captionProjet) // Rattachement de la balise <figcaption> (enfant) à la balise <figure> (parent)

        //** Récupération de l'élément du DOM qui accueillera les projets (parent) **//
        const divGallery = document.querySelector(".gallery") // Récupération de la <div> de classe "gallery" qui comportera tous les travaux
        divGallery.appendChild(baliseFigure) // Rattachement de chaque balise <figure> (enfant) à la <div> de classe "gallery" (parent)
    }
}

/*
** Déclaration de la fonction qui génère dynamiquement le menu de catégories
*/
function genererBoutonsCategorie(listeCategories) {

    //** Génération du bouton pour réinitialiser l'affichage par défaut **//
    const baliseButtonParDefaut = document.createElement("button")
    baliseButtonParDefaut.classList.add("btn-par-defaut")
    baliseButtonParDefaut.innerText = "Tous"

    const divFilterButtons = document.querySelector(".filter-buttons")
    divFilterButtons.appendChild(baliseButtonParDefaut)

    //** Génération dynamique des boutons de catégories **//
    for (let i = 0; i < listeCategories.length; i++) {
        const baliseButton = document.createElement("button") // Création d'une balise <button> pour chaque categorie
        baliseButton.classList.add("btn-categorie") // Ajout de la classe "btn-categorie"
        baliseButton.value = listeCategories[i].name // Ajout de l'attribut value="listeCategories[i].name"
        baliseButton.dataset.id = listeCategories[i].id // Ajout de l'attribut id="listeCategories[i].id"
        baliseButton.innerText = listeCategories[i].name // Ajout de texte entre les balises, à partir de la propriété name
        
        const divFilterButtons = document.querySelector(".filter-buttons") // Récupération de la <div> de classe "filter-buttons" qui comportera tous les boutons de catégories
        divFilterButtons.appendChild(baliseButton) // Rattachement de chaque balise <button> (enfant) à la <div> de classe "filter-buttons" (parent)
    }
}


/*
** Déclaration de la fonction qui gère le fonctionnement des boutons du menu de catégories
*/
function gererBoutonsCategorie(travaux, listeCategories) {

    //** Affichage par défaut **//
    const affichageParDefaut = document.querySelector(".btn-par-defaut")
    affichageParDefaut.addEventListener("click", () => {
        document.querySelector(".gallery").innerHTML = ""
        afficherGalerie(travaux)
    })

    //** Sélection d'une catégorie **//
    const btnCategorie = document.querySelectorAll(".btn-categorie") // Sélection de tous les boutons de class "btn-categorie"
    for (let i=0; i < btnCategorie.length; i++) { // Pour chaque bouton i :
        btnCategorie[i].addEventListener("click", (event) => { // Ajout d'un écouteur sur l'évènement "click"

            let btnCategorieClick = event.target.value // Sélection du bouton qui a déclenché l'évènement (bouton sur lequel l'utilisateur a cliqué)
            console.log(btnCategorieClick) // Vérif

            for (let index = 0; index < listeCategories.length; index++) {
                if (btnCategorieClick === listeCategories[index].name) {

                    let categorieChoisie = travaux.filter(travaux => travaux.category.name === listeCategories[index].name)
                    console.log(categorieChoisie) // Vérif
                    document.querySelector(".gallery").innerHTML = ""
                    afficherGalerie(categorieChoisie)

                }
            }
        }
    )}
}



/*
** Premier affichage de la galerie de travaux
*/
afficherGalerie(travaux)

/* 
** Récupération des catégories en supprimant les doublons
*/
let categories = new Map() // Création d'un nouvel objet Map, pour y stocker des paires de clé-valeur en mémorisant l'ordre d'insertion.
travaux.forEach( // méthode forEach pour exécuter une fonction une fois pour chaque élément du tableau "travaux"
    projet => categories.set(projet.category.id, projet.category) // fonction lambda + set(key, value) appliqué à la structure Map pour y stocker des données
)
let listeCategories = Array.from(categories.values()) // Constitution d'un tableau à partir des values
console.log(listeCategories) // Vérif

/*
** Génération dynamique du menu de catégories
*/
genererBoutonsCategorie(listeCategories)

/*
** Gestion du fonctionnement des boutons du menu de catégories
*/
gererBoutonsCategorie(travaux, listeCategories)
