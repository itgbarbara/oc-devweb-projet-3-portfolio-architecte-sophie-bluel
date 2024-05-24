/*
** Import des fonctions
*/
import { activerModeEdition, deconnecterUtilisateur, desactiverModeEdition } from "./script.js"

/*
** Récupération des données depuis le localStorage ou l'API HTTP
*/

//** Récupération du token éventuellement stockées dans le localStorage **//
let token = localStorage.getItem("token")
let isLogedIn = false
if (token !== null) { // si token existe
    token = JSON.parse(token)
    isLogedIn = true
    activerModeEdition() // Affichage des éléments liés à l'édition
} else {
    desactiverModeEdition() // Retrait des éléments liés à l'édition
}

deconnecterUtilisateur()