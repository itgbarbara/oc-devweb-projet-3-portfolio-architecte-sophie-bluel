//************************************ Import des fonctions ***********************************//

import { listerCategories } from "./homepage_portfolio.js"
import { ajouterProjet, supprimerProjet } from "./fetch_requests.js"


//***********************************************************************************************//
//************************* Déclaration des fonctions liées à la modale *************************//
//***********************************************************************************************//

/*
** Déclaration de la fonction qui permet d'afficher et supprimer les travaux dans la page 1 de la modale
*/
export function afficherGalerieModale(travaux, token) {
    document.querySelector(".modal-gallery").innerHTML= ""
    
    for (let i=0; i < travaux.length; i++) {
        const projet = travaux[i]

        //** Création des élements html de la galerie de travaux **//
        const baliseFigure = document.createElement("figure")
        baliseFigure.dataset.id = projet.id

        const imageProjet = document.createElement("img")
        imageProjet.src = projet.imageUrl
        imageProjet.alt = projet.title
        baliseFigure.appendChild(imageProjet)
        
        const btnSupprimer = document.createElement("button")
        btnSupprimer.classList.add("modal-delete-button", "js-delete-work")
        const iconeSupprimer = document.createElement("i")
        iconeSupprimer.classList.add("fa-solid", "fa-trash-can")
        baliseFigure.appendChild(btnSupprimer)
        btnSupprimer.appendChild(iconeSupprimer)

        //** Récupération de l'élément du DOM qui accueillera les projets (parent) **//
        document.querySelector(".modal-gallery").appendChild(baliseFigure)
    }

    //** Suppression d'un projet **//
    document.querySelectorAll(".js-delete-work").forEach(btnSupprimer => {
        btnSupprimer.addEventListener("click", (event) => {
            event.preventDefault()

            let id = event.target.closest("figure").getAttribute("data-id")
            supprimerProjet(id, token)
        })
    })
}

/*
** Déclaration de la fonction qui permet de supprimer les travaux dans la page 1 de la modale (nettoyage de la modale lors de sa fermeture)
*/
export function supprimerGalerieModale() {
    document.querySelector(".modal-gallery").innerHTML = ""

    //** Suppression d'un projet **//
    document.querySelectorAll(".js-delete-work").forEach(btnSupprimer => {
        btnSupprimer.removeEventListener("click", (event) => {
            event.preventDefault()

            let id = event.target.closest("figure").getAttribute("data-id")
            supprimerProjet(id, token)
        })
    })
}

/*
** Déclaration de la fonction qui permet d'afficher la liste déroulante de catégories dans la page 2 de la modale
*/
export function selectionnerCategorie(categories) {
    const baliseOptionVide = document.createElement("option")
    baliseOptionVide.value = ""
    document.getElementById("select-category").appendChild(baliseOptionVide)
    
    //** Génération dynamique de a liste déroulante de catégories **//
    for (let i = 0; i < categories.length; i++) {
        const baliseOption = document.createElement("option")
        baliseOption.value = categories[i].name
        baliseOption.innerText = categories[i].name
        baliseOption.dataset.id = categories[i].id

        document.getElementById("select-category").appendChild(baliseOption)
    }
}

/*
** Déclaration de la fonction qui permet de supprimer la liste déroulante de catégories dans la page 2 de la modale (nettoyage de la modale lors de sa fermeture)
*/
export function supprimerSelectionCategorie () {
    document.getElementById("select-category").innerHTML = ""
}

/*
** Déclaration de la fonction qui permettent d'éviter la propagation d'un évènement vers les éléments enfants de l'élément du DOM qui a déclenché l'évènement
*/
export function stopPropagation(event) {
    event.stopPropagation()
}

/*
** Déclaration de la fonction permettant de changer de vue dans la modale
*/
export function changerVueModale() {
    document.getElementById("modal-vue-1").classList.toggle("inactive")
    document.getElementById("modal-vue-2").classList.toggle("inactive")
}

/*
** Déclaration de la fonction permettant d'afficher une preview de l'image sélectionnée dans le formulaire d'envoi d'un projet
*/
export function afficherPreviewFichier(event) {
    event.preventDefault()
    document.querySelector(".btn-ajouter-photo").classList.add("inactive")
    const imageProjet = event.target.files[0] // Récupération du fichier sélectionné
    if (imageProjet) { // Si un fichier a été uploadé alors : on lit le fichier
        const reader = new FileReader()
        reader.addEventListener("load", (event) => {
            let baliseImg = document.createElement("img")
            baliseImg.src = event.target.result

            document.querySelector(".placeholder").appendChild(baliseImg)
        })
        reader.readAsDataURL(imageProjet)
    }
}

/*
** Déclaration de la fonction permettant de supprimer la preview de l'image sélectionnée dans le formulaire d'envoi d'un projet
*/
export function supprimerPreviewFichier() {
    document.querySelector(".btn-ajouter-photo").classList.remove("inactive")
    let baliseImg = document.querySelector(".placeholder img")
    if (baliseImg) {
        baliseImg.remove()
    }
}

/*
** Déclaration de la fonction permettant de récupérer les champs du formulaires pour créer un objet formData (body de la requête d'envoi)
*/
export function recupererSaisieFormulaire(imageProjet, titreProjet, categorieProjet) {
    imageProjet = document.getElementById("image").files[0]
    titreProjet = document.getElementById("title").value
    categorieProjet = document.getElementById("select-category").value

    let idCategorieProjet = document.querySelector(`option[value="${categorieProjet}"]`).dataset.id

    const formData = new FormData()
    formData.append("image", imageProjet)
    formData.append("title", titreProjet)
    formData.append("category", parseInt(idCategorieProjet))

    return formData
}

/*
** Déclaration de la fonction permettant de vérifier les champs du formulaire et débloquer le bouton de soumission
*/
export function validerChamps(btnSubmitWork, imageProjet, titreProjet, categorieProjet) {
    if (imageProjet === undefined || titreProjet.trim() === "" || categorieProjet === "") {
        if (!btnSubmitWork.disabled) {
            btnSubmitWork.disabled = true
        }
    } else {
        if (btnSubmitWork.disabled) {
            btnSubmitWork.disabled = false
        }
    }
}

/*
** Déclaration de la fonction permettant d'afficher une popup de confirmation en cas de succès de l'ajout
*/
let popupConfirmationAjout = null
export function ouvrirPopupConfirmationAjout() {
    popupConfirmationAjout = document.getElementById("popup-confirmation-ajout")
    popupConfirmationAjout.showModal()
    popupConfirmationAjout.style.display = null
    popupConfirmationAjout.setAttribute("aria-hidden", "false")
    popupConfirmationAjout.querySelector(".js-close-popup").addEventListener("click", fermerPopupConfirmationAjout)
}

export function fermerPopupConfirmationAjout() {
    if (popupConfirmationAjout === null) return
    popupConfirmationAjout.close()
    popupConfirmationAjout.style.display = "none"
    popupConfirmationAjout.setAttribute("aria-hidden", "true")
    popupConfirmationAjout.querySelector(".js-close-popup").removeEventListener("click", fermerPopupConfirmationAjout)
    popupConfirmationAjout = null
}

/*
** Déclaration de la fonction permettant de vider les champs du formulaire d'envoi d'un projet
*/
export function resetFormulaire() {
    let modalForm = document.getElementById("modal-form")
    modalForm.reset()
    supprimerPreviewFichier()
}

/*
** Déclaration de la fonction qui gère les évènements à l'ouverture de la modale et son fonctionnement interne
*/
let modal = null
export async function ouvrirModale(event, travaux, token) {
    event.preventDefault() // On empêche le comportement par défaut du clic sur le lien (renvoi vers l'ancre #modal)
    modal = document.getElementById("modal")

    //** Modifications html **//
    modal.style.display = null
    modal.setAttribute("aria-hidden", "false")
    modal.setAttribute("aria-modal", "true")

    //** Affichage des données provenant de l'API **//
        /* Vue 1 */
    afficherGalerieModale(travaux, token)

        /* Vue 2 */
    let listeCategories = listerCategories(travaux)
    selectionnerCategorie(listeCategories)

    //** Gestion des vues de la modale **//
        /* Vue par défaut */
    document.getElementById("modal-vue-1").classList.remove("inactive")
    document.getElementById("modal-vue-2").classList.add("inactive")

        /* Changement de vue */
    document.querySelector(".modal-next-btn").addEventListener("click", changerVueModale)
    document.querySelectorAll(".modal-previous-btn").forEach(btnPrecedent => {
        btnPrecedent.addEventListener("click", changerVueModale)
    })

    //** Ajout d'un projet **//
    resetFormulaire()
    let imageProjet = []
    let titreProjet = ""
    let categorieProjet = ""
    let btnSubmitWork = document.querySelector(".btn-submit-work")
    btnSubmitWork.disabled = true
    
    document.getElementById("image").addEventListener("change", (event) => {
        afficherPreviewFichier(event)
    })
    
    document.querySelectorAll(".form-field").forEach(formField => {
        formField.addEventListener("change", () => {
            imageProjet = document.getElementById("image").files[0]
            titreProjet = document.getElementById("title").value
            categorieProjet = document.getElementById("select-category").value
    
            validerChamps(btnSubmitWork, imageProjet, titreProjet, categorieProjet)
        })
    })
    
    let modalForm = document.getElementById("modal-form")
    modalForm.addEventListener("submit", (event) => {
        event.preventDefault()
        
        let formData = recupererSaisieFormulaire(imageProjet, titreProjet, categorieProjet)
        ajouterProjet(formData, token)
        resetFormulaire()
    })
    
    //** Fermeture de la modale **//
    modal.addEventListener("click", fermerModale) // Lorsque l'on clique dans la modale (#modal), ça la ferme
    modal.querySelector(".js-stop-propagation").addEventListener("click", stopPropagation) // On empêche la propagation du listener à partir de l'élément "modal-wrapper" (et ses enfants)
    modal.querySelectorAll(".js-close-modal").forEach(btnFermer => {
        btnFermer.addEventListener("click", fermerModale)
    })
}

/*
** Déclaration de la fonction qui nettoie la modale à sa fermeture
*/
export async function fermerModale(event) { // Cette fonction fait l'inverse de la fonction ouvrirModale(event). Permet de nettoyer la boîte modale
    if (modal === null) return // Si on n'a pas encore ouvert la modale, cette variable renvoie la valeur null, donc on s'arrête là. Sinon on continue :
    
    event.preventDefault()
    modal.style.display = "none"
   
    //** Reset html **//
    modal.setAttribute("aria-hidden", "true")
    modal.removeAttribute("aria-modal")

    //** Suppression des données générée dynamiquement avec appel de l'API **//
        /* Vue 1 */
    supprimerGalerieModale()

        /* Vue 2 */
    supprimerSelectionCategorie()
    
    //** Reset des vues de la modale **//
        /* Vue par défaut */
    document.getElementById("modal-vue-1").classList.add("inactive")
    document.getElementById("modal-vue-2").classList.remove("inactive")

        /* Changement de vue */
    document.querySelector(".modal-next-btn").removeEventListener("click", changerVueModale)
    document.querySelectorAll(".modal-previous-btn").forEach(btnPrecedent => {
        btnPrecedent.removeEventListener("click", changerVueModale)
    })

    //** Reset ajout d'un projet **//
    resetFormulaire()
    let imageProjet = []
    let titreProjet = ""
    let categorieProjet = ""
    let btnSubmitWork = document.querySelector(".btn-submit-work")
    btnSubmitWork.disabled = true
    
    document.getElementById("image").removeEventListener("change", (event) => {
        afficherPreviewFichier(event)
    })
    
    document.querySelectorAll(".form-field").forEach(formField => {
        formField.removeEventListener("change", () => {
            imageProjet = document.getElementById("image").files[0]
            titreProjet = document.getElementById("title").value
            categorieProjet = document.getElementById("select-category").value
    
            validerChamps(btnSubmitWork, imageProjet, titreProjet, categorieProjet)
        })
    })
    
    let modalForm = document.getElementById("modal-form")
    modalForm.removeEventListener("submit", (event) => {
        event.preventDefault()
        
        let formData = recupererSaisieFormulaire(imageProjet, titreProjet, categorieProjet)
        ajouterProjet(formData, token)
        resetFormulaire()
    })

    //** Fermeture de la modale **//
    modal.removeEventListener("click", fermerModale)
    modal.querySelector(".js-stop-propagation").removeEventListener("click", stopPropagation)
    modal.querySelectorAll(".js-close-modal").forEach(btnFermer => {
        btnFermer.removeEventListener("click", fermerModale)
    })
    
    modal = null // Après avoir tout réinitialisé, on redéfinit la valeur de la variable "modal" sur null
}