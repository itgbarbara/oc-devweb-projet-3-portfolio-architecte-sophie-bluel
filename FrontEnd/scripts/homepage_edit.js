/*
** Import des fonctions
*/
import { activerModeEdition, desactiverModeEdition, ouvrirPopupLogout } from "./script.js"


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
    token = JSON.parse(token)
    isLogedIn = true
}


//*************** Exécution du script ***************//

//** Vérification de la présence du token d'authentification */
if (isLogedIn === true) {
    activerModeEdition() // Affichage des éléments liés à l'édition
} else {
    desactiverModeEdition() // Retrait des éléments liés à l'édition
}

//** Déconnexion **//
const btnLogout = document.getElementById("lien-logout")
btnLogout.addEventListener("click", ouvrirPopupLogout)