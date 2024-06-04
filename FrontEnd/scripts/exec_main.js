//************************************ Import des fonctions ***********************************//

import { recupererCategories, recupererTravaux } from "./fetch_requests.js"
import { afficherIndex } from "./homepage_portfolio.js"
import { activerModeEdition, desactiverModeEdition, ouvrirPopupLogout } from "./login.js"
import { ouvrirModale } from "./homepage_modal.js"


//*************** Récupération des données depuis le localStorage ou l'API HTTP ***************//

//** Récupération de la liste de travaux **//
let travaux = window.localStorage.getItem("travaux")
if (travaux === null) { // peut aussi s'écrire if (!travaux)
    recupererTravaux()
} else {
    travaux = JSON.parse(travaux)
}

//** Récupération de la liste de catégories **//
let categories = window.localStorage.getItem("categories")
if (categories === null) {
    recupererCategories()
} else {
    categories = JSON.parse(categories)
}

//** Récupération du token éventuellement stockées dans le localStorage **//
let token = localStorage.getItem("token")
let isLogedIn = false
if (token !== null) { // si token existe
    token = JSON.parse(token) // Reconstruction des données
    isLogedIn = true
}

//************************************ Exécution du script ************************************//

//** Affichage des éléments dynamiques de la page d'accueil (galerie, filtres) **//
afficherIndex(travaux)

//** Vérification de la présence du token d'authentification **//
if (isLogedIn === true) {
    activerModeEdition()
} else {
    desactiverModeEdition()
}

//** Déconnexion **//
const btnLogout = document.getElementById("lien-logout")
btnLogout.addEventListener("click", ouvrirPopupLogout)

//** Ouverture et activation de la modale **//
document.querySelectorAll(".js-open-modal").forEach(btnModifier => {
    btnModifier.addEventListener("click", (event) => {
        travaux = JSON.parse(window.localStorage.getItem("travaux"))
        ouvrirModale(event, travaux, categories, token)
    })
})