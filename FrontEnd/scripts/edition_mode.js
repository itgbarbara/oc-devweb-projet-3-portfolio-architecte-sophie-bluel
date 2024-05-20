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
    const token = JSON.parse(storedToken) // Reconstruction des données
    console.log(token)
    activerModeEdition()
} else {
    desactiverModeEdition()
}

deconnecterUtilisateur()