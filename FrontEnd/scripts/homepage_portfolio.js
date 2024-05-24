/*
** Import des fonctions
*/
import { afficherGalerie, listerCategories, genererBoutonsCategorie, gererBoutonsCategorie } from "./script.js"


//*************** Récupération des données depuis le localStorage ou l'API HTTP ***************//

//** Récupération de la liste de travaux **//
let travaux = window.localStorage.getItem("travaux")
if (travaux === null) { // peut aussi s'écrire if (!travaux)
    const reponse = await fetch("http://localhost:5678/api/works")
    const travaux = await reponse.json()
    const valeurTravaux = JSON.stringify(travaux)
    window.localStorage.setItem("travaux", valeurTravaux)
} else {
    travaux = JSON.parse(travaux)
}

//** Récupération du token éventuellement stockées dans le localStorage **//
let token = localStorage.getItem("token")
let isLogedIn = false
if (token !== null) { // si token existe
    token = JSON.parse(token) // Reconstruction des données
    isLogedIn = true
}


//*************** Exécution du script ***************//

//** Premier affichage de la galerie de travaux **//
afficherGalerie(travaux)

//** Génération dynamique du menu de catégories **//
let listeCategories = listerCategories(travaux)
genererBoutonsCategorie(listeCategories)

//** Gestion du fonctionnement des boutons du menu de catégories **//
gererBoutonsCategorie(travaux, listeCategories)