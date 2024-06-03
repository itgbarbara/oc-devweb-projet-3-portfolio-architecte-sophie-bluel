/*
** Import des fonctions
*/
import { recupererTravaux, resetTravauxLocalStorage, listerCategories, connecterUtilisateur, supprimerProjet, ajouterProjet } from "./fetch_requests.js"
import { afficherGalerie, genererBoutonsCategorie, gererBoutonsCategorie } from "./homepage_portfolio.js"
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
console.log(travaux) // Debug

//** Récupération du token éventuellement stockées dans le localStorage **//
let token = localStorage.getItem("token")
let isLogedIn = false
if (token !== null) { // si token existe
    token = JSON.parse(token) // Reconstruction des données
    isLogedIn = true
}

//*************** Exécution du script ***************//

//*******************************************************************************************************************//
//***************************************** Affichage de la galerie (index) *****************************************//
//*******************************************************************************************************************//

//** Premier affichage de la galerie de travaux **//
afficherGalerie(travaux)

//** Génération dynamique du menu de catégories **//
let listeCategories = listerCategories(travaux)
genererBoutonsCategorie(listeCategories)

//** Gestion du fonctionnement des boutons du menu de catégories **//
gererBoutonsCategorie(travaux, listeCategories)


//*******************************************************************************************************************//
//************************************************** Mode edition ***************************************************//
//*******************************************************************************************************************//

//** Vérification de la présence du token d'authentification **//
if (isLogedIn === true) {
    activerModeEdition()
} else {
    desactiverModeEdition()
}

//** Déconnexion **//
const btnLogout = document.getElementById("lien-logout")
btnLogout.addEventListener("click", ouvrirPopupLogout)

//*******************************************************************************************************************//
//****************************************** Fonctionnement de la modale ********************************************//
//*******************************************************************************************************************//

//** Ouverture et activation de la modale **//
document.querySelectorAll(".js-open-modal").forEach(btnModifier => {
    btnModifier.addEventListener("click", (event) => {
        travaux = JSON.parse(window.localStorage.getItem("travaux"))
        console.log(travaux)
        ouvrirModale(event, travaux, token)
    })
})

console.log(travaux) // Debug : doit donner un résultat différent des deux premiers console.log(travaux) après ajout ou suppression d'un projet

// afficherGalerie(travaux)