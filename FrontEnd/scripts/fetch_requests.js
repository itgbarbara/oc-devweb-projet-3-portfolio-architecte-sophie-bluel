
//************************************ Import des fonctions ***********************************//

import { afficherIndex } from "./homepage_portfolio.js"
import { afficherGalerieModale, ouvrirPopupConfirmationAjout } from "./homepage_modal.js"

//*******************************************************************************************************************//
//*************** Déclaration des fonctions liées à l'affichage de la galerie (homepage_portfolio.js) ***************//
//*******************************************************************************************************************//

/*
** Déclaration de la fonction permettant de récupérer les travaux et les stocker dans le localStorage
*/
export async function recupererTravaux() {
    //** Requête pour récupérer les travaux **//
    const reponse = await fetch("http://localhost:5678/api/works")
    let travaux = await reponse.json()

    //** Stockage des travaux dans le localStorage **//
    const valeurTravaux = JSON.stringify(travaux)
    window.localStorage.setItem("travaux", valeurTravaux)
    
    return travaux
}

/*
** Déclaration de la fonction permettant de mettre à jour le localStorage et les galeries
*/
export async function resetTravauxLocalStorage() {
    window.localStorage.removeItem("travaux")
    const travaux = await recupererTravaux()
    return travaux
}

/*
** Déclaration de la fonction permettant de faire une requête pour supprimer un projet de la BDD + màj les galeries
*/
export function supprimerProjet(id, token) {
    token = JSON.parse(localStorage.getItem("token"))
    fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
            "accept": "*/*",
            "Authorization": `Bearer ${token.token}`,
        }
    })
    .then(reponse => {
        if (!reponse.ok) {
            throw new Error("Erreur :" + error.message)
        } else {
            console.log("L'élément a bien été supprimé")

            // let galerieModale = document.querySelector(".modal-gallery")
            // let projetASupprimerModale = galerieModale.querySelector(`figure[data-id="${id}"]`)
            // projetASupprimerModale.remove()

            // let galerieIndex = document.querySelector(".gallery")
            // let projetASupprimerIndex = galerieIndex.querySelector(`figure[data-id="${id}"]`)
            // projetASupprimerIndex.remove()

            resetTravauxLocalStorage().then(travaux => {
                afficherIndex(travaux)
                afficherGalerieModale(travaux)
            })
        }
    })
    .catch(error => error.message)
}

/*
** Déclaration de la fonction permettant de faire une requête pour ajouter un projet à la BDD + màj les galeries
*/
export async function ajouterProjet(formData, token) {
    token = JSON.parse(localStorage.getItem("token"))
    fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            // "Content-Type": "multipart/form-data", // Ne pas mettre sinon ça bloque la requête
            "accept": "application/json",
            "Authorization": `Bearer ${token.token}`
        },
        body: formData,
    })
    .then(reponse => {
        if (reponse.ok) {
            ouvrirPopupConfirmationAjout()
            console.log("Votre projet a bien été ajouté")

            resetTravauxLocalStorage().then(travaux => {
                afficherIndex(travaux)
                afficherGalerieModale(travaux)
            })
        }
    })
    .catch(error => console.error(error.message))
}
