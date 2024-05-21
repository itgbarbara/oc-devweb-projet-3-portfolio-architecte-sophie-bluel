/*
** Import des fonctions
*/
import { activerModeEdition, deconnecterUtilisateur, desactiverModeEdition } from "./script.js"

/*
** Récupération des données depuis le localStorage ou l'API HTTP
*/

//** Récupération du token éventuellement stockées dans le localStorage **//
let storedToken = localStorage.getItem("token")
if (storedToken !== null) { // si token existe
    JSON.parse(storedToken) // Reconstruction des données
    activerModeEdition() // Affichage des éléments liés à l'édition
} else {
    desactiverModeEdition() // Retrait des éléments liés à l'édition
}

deconnecterUtilisateur()