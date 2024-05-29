/*
** Import des fonctions
*/
import { ouvrirModale, ajouterProjet, validerChamps, resetFormulaire, afficherPreviewFichier, recupererSaisieFormulaire } from "./script.js"


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

//** Ouvrir la modale **//
document.querySelectorAll(".js-open-modal").forEach(btnModifier => {
    btnModifier.addEventListener("click", (event) => {
        ouvrirModale(event, travaux, token)
    })
})




//** Gestion du formulaire d'envoi **//

let imageProjet = []
let titreProjet = ""
let categorieProjet = ""
let btnSubmitWork = document.querySelector(".btn-submit-work")
btnSubmitWork.disabled = true
console.log(btnSubmitWork)


document.getElementById("image").addEventListener("change", (event) => {
    afficherPreviewFichier(event)
})



document.querySelectorAll(".form-field").forEach(formField => {
    formField.addEventListener("change", () => {
        imageProjet = document.getElementById("image").files[0]
        console.log(document.getElementById("image").files)
        titreProjet = document.getElementById("title").value
        categorieProjet = document.getElementById("select-category").value

        validerChamps(imageProjet, titreProjet, categorieProjet)
        console.log(btnSubmitWork)
    })
})



let modalForm = document.getElementById("modal-form")
modalForm.addEventListener("submit", (event) => {
    event.preventDefault()
    
    let formData = recupererSaisieFormulaire(imageProjet, titreProjet, categorieProjet)
    ajouterProjet(formData, token)
    resetFormulaire()
})