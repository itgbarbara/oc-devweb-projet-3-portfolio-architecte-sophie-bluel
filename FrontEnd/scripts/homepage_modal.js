/*
** Import des fonctions
*/
import {ouvrirModale } from "./script.js"

/*
** Récupération des données depuis le localStorage ou l'API HTTP
*/
//** Récupération de la liste de travaux **//
let travaux = window.localStorage.getItem("travaux")
if (travaux === null) { // peut aussi s'écrire if (!travaux)
    const reponse = await fetch("http://localhost:5678/api/works") // Envoi d'une requête GET pour récupérer les données de l'API (route : GET /works) + stockage du résultat dans une constante
    const travaux = await reponse.json() // Désérialisation du JSON et stockage de la liste d'objets (= travaux) obtenue dans la variable "travaux"
    const valeurTravaux = JSON.stringify(travaux) // On convertit les données au format JSON string (chaîne de caractères)
    window.localStorage.setItem("travaux", valeurTravaux) // Stockage des informations dans le localStorage (clé, valeur)
} else {
    travaux = JSON.parse(travaux) // Analyse du JSON pour reconstruire les données (valeurs ou objets) décrites par la chaîne de caractère
}

//** Récupération du token éventuellement stockées dans le localStorage **//
let storedToken = localStorage.getItem("token")
if (storedToken !== null) { // si token existe
    let token = JSON.parse(storedToken) // Reconstruction des données
    console.log(token)
}



//*************** Exécution du script ***************//


//** Ouvrir la modale **//
document.querySelectorAll(".js-open-modal").forEach(btnModifier => {
    btnModifier.addEventListener("click", (event) => {
        ouvrirModale(event, travaux)
    })
})