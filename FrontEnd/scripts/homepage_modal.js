/*
** Import des fonctions
*/
import { afficherGalerieModale, listerCategories, selectionnerCategorie } from "./script.js"

/*
** Récupération des données depuis le localStorage ou l'API HTTP
*/
let travaux = window.localStorage.getItem("travaux")
if (travaux === null) { // peut aussi s'écrire if (!travaux)
    const reponse = await fetch("http://localhost:5678/api/works") // Envoi d'une requête GET pour récupérer les données de l'API (route : GET /works) + stockage du résultat dans une constante
    const travaux = await reponse.json() // Désérialisation du JSON et stockage de la liste d'objets (= travaux) obtenue dans la variable "travaux"
    const valeurTravaux = JSON.stringify(travaux) // On convertit les données au format JSON string (chaîne de caractères)
    window.localStorage.setItem("travaux", valeurTravaux) // Stockage des informations dans le localStorage (clé, valeur)
} else {
    travaux = JSON.parse(travaux) // Analyse du JSON pour reconstruire les données (valeurs ou objets) décrites par la chaîne de caractère
}


//*************** Exécution du script ***************//


/*
** Affichage de la galerie de travaux
*/
afficherGalerieModale(travaux)

let listeCategories = listerCategories(travaux)

selectionnerCategorie(listeCategories)




// let modal = null

// function openModal(event) {
//     event.preventDefault()
//     const target = document.querySelector(event.target.getAttribute("href"))
//     target.style.display = null
//     target.setAttribute("aria-hidden", "false")
//     target.setAttribute("aria-modal", "true")
//     modal = target
//     modal.addEventListener("click", closeModal)
//     modal.querySelector(".js-close-modal").addEventListener("click", closeModal)
//     modal.querySelector(".js-stop-propagation").addEventListener("click", stopPropagation)
// }

// function closeModal(event) {
//     if (modal === null) return
//     event.preventDefault()
//     modal.style.display = "none"
//     modal.setAttribute("aria-hidden", "true")
//     modal.removeAttribute("aria-modal")
//     modal.removeEventListener("click", closeModal)
//     modal.querySelector(".js-close-modal").removeEventListener("click", closeModal)
//     modal.querySelector(".js-stop-propagation").removeEventListener("click", stopPropagation)
//     modal = null
// }

// function stopPropagation(event) {
//     event.stopPropagation() // Permet d'éviter la propagation de l'évènement vers les parents, pour empêcher que la modale se ferme quand on clique dans le wrapper
// }


// document.querySelectorAll(".js-open-modal").forEach(a => {
//     a.addEventListener("click", openModal)
// })