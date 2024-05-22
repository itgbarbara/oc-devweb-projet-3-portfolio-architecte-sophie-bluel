/*
** Import des fonctions
*/
import { afficherGalerie, listerCategories, genererBoutonsCategorie, gererBoutonsCategorie } from "./script.js"

/*
** Récupération des données depuis le localStorage ou l'API HTTP
*/
let travaux = window.localStorage.getItem("travaux")
if (travaux === null) { // peut aussi s'écrire if (!travaux)
    const reponse = await fetch("http://localhost:5678/api/works") // Envoi d'une requête GET pour récupérer les données de l'API (route : GET /works) + stockage du résultat dans une constante
    const travaux = await reponse.json() // Désérialisation du JSON et stockage de la liste d'objets (= travaux) obtenue dans la variable "travaux"
    const valeurTravaux = JSON.stringify(travaux) // On convertit les données au format JSON string (chaîne de caractères)
    window.localStorage.setItem("travaux", valeurTravaux) // Stockage des informations dans le localStorage (clé, valeur)
} else {
    travaux = JSON.parse(travaux) // Analyse du JSON pour reconstruire les données (valeurs ou objets) décrites par la chaîne de caractère
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