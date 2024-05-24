/*
** Import des fonctions
*/
import { afficherGalerie, listerCategories, genererBoutonsCategorie, gererBoutonsCategorie } from "./script.js"

/*
** Récupération des données depuis le localStorage ou l'API HTTP
*/
let travaux = window.localStorage.getItem("travaux")
if (travaux === null) { // peut aussi s'écrire if (!travaux)
    const reponse = await fetch("http://localhost:5678/api/works")
    const travaux = await reponse.json()
    const valeurTravaux = JSON.stringify(travaux)
    window.localStorage.setItem("travaux", valeurTravaux)
} else {
    travaux = JSON.parse(travaux)
}


//*************** Exécution du script ***************//

/*
** Premier affichage de la galerie de travaux
*/
afficherGalerie(travaux)

/* 
** Récupération des catégories de travaux, en supprimant les doublons
*/
let listeCategories = listerCategories(travaux)

/*
** Génération dynamique du menu de catégories
*/
genererBoutonsCategorie(listeCategories)

/*
** Gestion du fonctionnement des boutons du menu de catégories
*/
gererBoutonsCategorie(travaux, listeCategories)