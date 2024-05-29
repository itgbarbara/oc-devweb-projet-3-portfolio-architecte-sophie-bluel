/*
** Import des fonctions
*/
import { ouvrirModale, ajouterProjet, validerChamps, viderFormulaire } from "./script.js"


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


document.getElementById("image").addEventListener("change", () => {
    document.querySelector(".btn-ajouter-photo").classList.add("inactive")

    let baliseImg = document.createElement("img")
    let nomImg = document.getElementById("image").files[0].name
    let srcImg = `assets/images/${nomImg}`
    baliseImg.src = srcImg
    
    document.querySelector(".placeholder").appendChild(baliseImg)
})


let modalForm = document.getElementById("modal-form")
modalForm.addEventListener("submit", (event) => {

    event.preventDefault()
    
    let imageProjet = document.getElementById("image").files[0]
    let titreProjet = document.getElementById("title").value
    let categorieProjet = document.getElementById("select-category").value
    let idCategorieProjet = document.querySelector(`option[value="${categorieProjet}"]`).dataset.id

    const formData = new FormData()
    formData.append("image", imageProjet)
    formData.append("title", titreProjet)
    formData.append("category", parseInt(idCategorieProjet))

    ajouterProjet(formData, token)
    viderFormulaire()

    // validerFormulaire(event, imageProjet, titreProjet, idCategorieProjet, token)
})