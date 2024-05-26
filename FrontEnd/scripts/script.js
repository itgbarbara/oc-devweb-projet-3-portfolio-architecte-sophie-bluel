
//*******************************************************************************************************************//
//*************** Déclaration des fonctions liées à l'affichage de la galerie (homepage_portfolio.js) ***************//
//*******************************************************************************************************************//

/*
** Déclaration de la fonction qui génère dynamiquement tout le contenu de la galerie des projets
*/
export function afficherGalerie(travaux) {
    for (let i=0; i < travaux.length; i++) {
        const projet = travaux[i]

        //** Création des élements html de la galerie de travaux **//
        const baliseFigure = document.createElement("figure")
        baliseFigure.dataset.id = projet.id
    
        const imageProjet = document.createElement("img")
        imageProjet.src = projet.imageUrl // Ajout d'un attribut 'src' à la balise <img>, en allant chercher l'URL source dans la variable "travaux", indice i, propriété 'imageUrl'
        imageProjet.alt = projet.title // Ajout d'un attribut 'alt' à la balise <img>, en allant chercher la description dans la variable "travaux", indice i, propriété 'title'
        baliseFigure.appendChild(imageProjet)
        
        const captionProjet = document.createElement("figcaption")
        captionProjet.innerText = projet.title // Ajout de texte à la balise <figcaption>, provenant de la propriété "title" de chaque objet du tableau "travaux"
        baliseFigure.appendChild(captionProjet) // Rattachement de la balise <figcaption> (enfant) à la balise <figure> (parent)

        //** Récupération de l'élément du DOM qui accueillera les projets (parent) **//
        document.querySelector(".gallery").appendChild(baliseFigure)
    }
}

/*
** Déclaration de la fonction qui permettent d'extraire la liste de catégories sans doublons
*/
export function listerCategories(travaux) {
    //** Récupération des catégories de travaux, en supprimant les doublons **//
    let categories = new Map() // Création d'un nouvel objet Map, pour y stocker des paires de clé-valeur en mémorisant l'ordre d'insertion.
    travaux.forEach( // méthode forEach pour exécuter une fonction une fois pour chaque élément du tableau "travaux"
        projet => categories.set(projet.category.id, projet.category) // fonction lambda + set(key, value) appliqué à la structure Map pour y stocker des données
    )
    let listeCategories = Array.from(categories.values()) // Constitution d'un tableau à partir des values
    return listeCategories
}

/*
** Déclaration de la fonction qui génère dynamiquement le menu de catégories
*/
export function genererBoutonsCategorie(listeCategories) {

    //** Génération du bouton pour réinitialiser l'affichage par défaut **//
    const baliseButtonParDefaut = document.createElement("button")
    baliseButtonParDefaut.classList.add("btn-par-defaut")
    baliseButtonParDefaut.innerText = "Tous"

    const divFilterButtons = document.querySelector(".filter-buttons")
    divFilterButtons.appendChild(baliseButtonParDefaut)

    //** Génération dynamique des boutons de catégories **//
    for (let i = 0; i < listeCategories.length; i++) {
        const baliseButton = document.createElement("button") // Création d'une balise <button> pour chaque categorie
        baliseButton.classList.add("btn-categorie") // Ajout de la classe "btn-categorie"
        baliseButton.value = listeCategories[i].name // Ajout de l'attribut value="listeCategories[i].name"
        baliseButton.dataset.id = listeCategories[i].id // Ajout de l'attribut id="listeCategories[i].id"
        baliseButton.innerText = listeCategories[i].name // Ajout de texte entre les balises, à partir de la propriété name
        
        const divFilterButtons = document.querySelector(".filter-buttons") // Récupération de la <div> de classe "filter-buttons" qui comportera tous les boutons de catégories
        divFilterButtons.appendChild(baliseButton) // Rattachement de chaque balise <button> (enfant) à la <div> de classe "filter-buttons" (parent)
    }
}

/*
** Déclaration de la fonction qui gère le fonctionnement des boutons du menu de catégories
*/
export function gererBoutonsCategorie(travaux, listeCategories) {

    //** Affichage par défaut **//
    const affichageParDefaut = document.querySelector(".btn-par-defaut")
    affichageParDefaut.addEventListener("click", () => {
        document.querySelector(".gallery").innerHTML = ""
        afficherGalerie(travaux)
    })

    //** Sélection d'une catégorie **//
    const btnCategorie = document.querySelectorAll(".btn-categorie") // Sélection de tous les boutons de class "btn-categorie"
    for (let i=0; i < btnCategorie.length; i++) { // Pour chaque bouton i :
        btnCategorie[i].addEventListener("click", (event) => { // Ajout d'un écouteur sur l'évènement "click"

            let btnCategorieClick = event.target.value // Sélection du bouton qui a déclenché l'évènement (bouton sur lequel l'utilisateur a cliqué)

            for (let index = 0; index < listeCategories.length; index++) { // On parcourt toutes les catégories de la listeCategories
                if (btnCategorieClick === listeCategories[index].name) {

                    let categorieChoisie = travaux.filter(travaux => travaux.category.name === listeCategories[index].name)
                    document.querySelector(".gallery").innerHTML = ""
                    afficherGalerie(categorieChoisie)

                }
            }
        }
    )}
}


//**********************************************************************************************************//
//*************** Déclaration des fonctions liées à la connexion de l'utilisateur (login.js) ***************//
//**********************************************************************************************************//

/*
** Déclaration des fonctions qui définissent des règles de validation
*/
//** Vérification de la validité de la saisie de l'e-mail **//
export function validerEmail(email) {
    let emailRegEx = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+")
    if (!emailRegEx.test(email)) {
        throw new Error("L'adresse e-mail n'est pas valide")
    }
}

//** Vérification de la validité de la saisie du mot de passe **//
export function validerMdp(mdp) {
    if (mdp.trim() === "") {
        throw new Error("Veuillez saisir votre mot de passe")
    }
}

/*
** Déclaration de la fonction qui affiche le message d'erreur
*/
export function afficherMessageErreur(message) {
    
    let spanMessageErreur = document.getElementById("message-erreur") // On vérifie qu'il n'y a pas déjà une <span> pour le message d'erreur (on ne veut pas de doublon)

    if (!spanMessageErreur) { // Si la <span> n'existe pas, on la crée
        const btnConnexion = document.getElementById("btn-connexion") // Sélection de la balise avant laquelle on va afficher le message

        spanMessageErreur = document.createElement("span") // Création de la <span> (pas besoin de déclarer la variable puisqu'elle l'a déjà été)
        spanMessageErreur.id = "message-erreur" // Ajout d'un id pour identifier cette <span>
        btnConnexion.insertAdjacentElement("beforebegin", spanMessageErreur) // Insertion de la <span> avant le bouton de connexion
    }
    spanMessageErreur.innerText = message // Ajout ou mise à jour du message à l'intérieur de la <span>
}


/*
** Déclaration de la fonction qui permet de récupérer le token et connecter l'utilisateur
*/
export function connecterUtilisateur(url, loginUtilisateur) {
    fetch(url, { // Requête POST pour envoyer les données à l'API (route : POST /users/login) + récupérer le token en réponse + stockage de la réponse dans une constante
        method: "POST",
        headers: {
            "accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginUtilisateur) // Charge utile : chaîne de caractères (string) au format JSON
    })
    .then(reponse => {
        if (reponse.ok) {
            reponse.json()
            .then(token => {
                localStorage.setItem("token", JSON.stringify(token))
                window.location.href="index.html" // Redirection vers la page d'accueil
            })
        } else {
            document.getElementById("email").value = ""
            document.getElementById("mdp").value = ""
            throw new Error("Erreur d'identifiant ou de mot de passe")
        }
    })
    .catch(error => afficherMessageErreur(error.message))
}



//**************************************************************************************************//
//*************** Déclaration des fonctions liées au mode edition (homepage_edit.js) ***************//
//**************************************************************************************************//

export function activerModeEdition() {
    document.querySelector(".bandeau-mode-edition").classList.remove("inactive") // Afficher le bandeau d'édition
    document.querySelector("header").classList.add("header-mode-edition") // Décaller le header
    document.getElementById("lien-logout").classList.remove("inactive") // Afficher le lien logout
    document.getElementById("lien-login").classList.add("inactive") // Cacher le lien login
    document.querySelector(".edit-button").classList.remove("inactive") // Afficher le bouton modifier
}

export function desactiverModeEdition() {
    document.querySelector(".bandeau-mode-edition").classList.add("inactive") // Cacher le beandeau d'édition
    document.querySelector("header").classList.remove("header-mode-edition") // Décaller le header
    document.getElementById("lien-logout").classList.add("inactive") // Cacher le lien logout
    document.getElementById("lien-login").classList.remove("inactive") // Afficher le lien login
    document.querySelector(".edit-button").classList.add("inactive") // Cacher le bouton modifier
}


/*
** Déclaration de la fonction qui permet de supprimer le token, déconnecter l'utilisateur et quitter le mode édition
*/
export function deconnecterUtilisateur() {
    localStorage.removeItem("token") // Supprimer le token du localStorage
}


//***********************************************************************************************//
//*************** Déclaration des fonctions liées à la modale (homepage_modal.js) ***************//
//***********************************************************************************************//

/*
** Déclaration de la fonction qui permet d'afficher les travaux dans la page 1 de la modale
*/
export function afficherGalerieModale(travaux) {
    for (let i=0; i < travaux.length; i++) {
        const projet = travaux[i]

        //** Création des élements html de la galerie de travaux **//
        const baliseFigure = document.createElement("figure") // Création d'une balise <figure> dédiée à chaque projet
        baliseFigure.dataset.id = projet.id

        const imageProjet = document.createElement("img") // Création d'une balise <img> pour chaque projet
        imageProjet.src = projet.imageUrl // Ajout d'un attribut 'src' à la balise <img>, en allant chercher l'URL source dans la variable "travaux", indice i, propriété 'imageUrl'
        imageProjet.alt = projet.title // Ajout d'un attribut 'alt' à la balise <img>, en allant chercher la description dans la variable "travaux", indice i, propriété 'title'
        baliseFigure.appendChild(imageProjet) // Rattachement de la balise <img> (enfant) à la balise <figure> (parent)
        
        const btnSupprimer = document.createElement("button")
        btnSupprimer.classList.add("modal-delete-button", "js-delete-work")
        const iconeSupprimer = document.createElement("i") // Création d'une balise <figcaption> pour chaque projet
        iconeSupprimer.classList.add("fa-solid", "fa-trash-can")
        baliseFigure.appendChild(btnSupprimer) // Rattachement de la balise <figcaption> (enfant) à la balise <figure> (parent)
        btnSupprimer.appendChild(iconeSupprimer)

        //** Récupération de l'élément du DOM qui accueillera les projets (parent) **//
        document.querySelector(".modal-gallery").appendChild(baliseFigure) // Rattachement de chaque balise <figure> (enfant) à la <div> de classe "gallery" (parent)
    }
}

/*
** Déclaration de la fonction qui permet de supprimer les travaux dans la page 1 de la modale (nettoyage de la modale lors de sa fermeture)
*/
export function supprimerGalerieModale() {
    document.querySelector(".modal-gallery").innerHTML = ""
}

/*
** Déclaration de la fonction qui permet d'afficher la liste déroulante de catégories dans la page 2 de la modale
*/
export function selectionnerCategorie(listeCategories) {
    const baliseOptionVide = document.createElement("option")
    baliseOptionVide.value = ""
    document.getElementById("select-category").appendChild(baliseOptionVide)
    
    //** Génération dynamique de a liste déroulante de catégories **//
    for (let i = 0; i < listeCategories.length; i++) {
        const baliseOption = document.createElement("option") // Création d'une balise <option> pour chaque categorie
        baliseOption.value = listeCategories[i].name
        baliseOption.innerText = listeCategories[i].name
        baliseOption.dataset.id = listeCategories[i].id // Ajout de l'attribut id="listeCategories[i].id"

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
** Déclaration de la fonction permettant de faire une requête pour supprimer un projet de la BDD
*/
export function supprimerProjet(id, token) { // Ajout 1er param
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

            let galerieModale = document.querySelector(".modal-gallery")
            let projetASupprimerModale = galerieModale.querySelector(`figure[data-id="${id}"]`)
            projetASupprimerModale.remove()

            let galerieIndex = document.querySelector(".gallery")
            let projetASupprimerIndex = galerieIndex.querySelector(`figure[data-id="${id}"]`)
            projetASupprimerIndex.remove()
        }
    })
    .catch(error => error.message)
}

/*
** Déclaration de la fonction qui gère les évènements à l'ouverture de la modale et son fonctionnement interne
*/
let modal = null // Définition d'une variable globale "modal" qui est nulle par défaut
export async function ouvrirModale(event, travaux, token) {
    event.preventDefault() // On empêche le comportement par défaut du clic sur le lien (renvoi vers l'ancre #modal)
    modal = document.getElementById("modal")

    //** Modifications html **//
    modal.style.display = null // On enlève l'attribut style="display: none" a l'élément d'id "modal" pour faire apparaître la fenêtre
    modal.setAttribute("aria-hidden", "false")
    modal.setAttribute("aria-modal", "true")

    //** Gestion des vues de la modale **//
        /* Vue par défaut */
    document.getElementById("modal-vue-1").classList.remove("inactive")
    document.getElementById("modal-vue-2").classList.add("inactive")

        /* Changement de vue */
    document.querySelector(".modal-next-btn").addEventListener("click", changerVueModale)
    document.querySelectorAll(".modal-previous-btn").forEach(btnPrecedent => {
        btnPrecedent.addEventListener("click", changerVueModale)
    })

    //** Affichage des données provenant de l'API **//
        /* Vue 1 */
    afficherGalerieModale(travaux) // 1er affichage de la galerie (risque de poser problème si on supprime un projet ?)

        /* Vue 2 */
    let listeCategories = listerCategories(travaux)
    selectionnerCategorie(listeCategories)

    //** Suppression d'un projet **//
    document.querySelectorAll(".js-delete-work").forEach(btnSupprimer => {
        btnSupprimer.addEventListener("click", (event) => {
            event.preventDefault()

            let id = event.target.closest("figure").getAttribute("data-id")
            supprimerProjet(id, token)
        })
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
    
    //** Reset des vues de la modale **//
        /* Vue par défaut */
    document.getElementById("modal-vue-1").classList.add("inactive")
    document.getElementById("modal-vue-2").classList.remove("inactive")

        /* Changement de vue */
    document.querySelector(".modal-next-btn").removeEventListener("click", changerVueModale)
    document.querySelectorAll(".modal-previous-btn").forEach(btnPrecedent => {
        btnPrecedent.removeEventListener("click", changerVueModale)
    })

    //** Suppression des données générée dynamiquement avec appel de l'API **//
        /* Vue 1 */
    supprimerGalerieModale()

        /* Vue 2 */
    supprimerSelectionCategorie()

    //** Suppression d'un projet **//
    document.querySelectorAll(".js-delete-work").forEach(btnSupprimer => {
        btnSupprimer.removeEventListener("click", (event) => {
            event.preventDefault()

            let id = event.target.closest("figure").getAttribute("data-id")
            supprimerProjet(id, token)
        })
    })

    //** Fermeture de la modale **//
    modal.removeEventListener("click", fermerModale)
    modal.querySelector(".js-stop-propagation").removeEventListener("click", stopPropagation)
    modal.querySelectorAll(".js-close-modal").forEach(btnFermer => {
        btnFermer.removeEventListener("click", fermerModale)
    })
    
    modal = null // Après avoir tout réinitialisé, on redéfinit la valeur de la variable "modal" sur null

    window.localStorage.removeItem("travaux") // On vide le localStorage pour faire un nouvel appel à l'API
    const reponse = await fetch("http://localhost:5678/api/works")
    const travaux = await reponse.json()
    const valeurTravaux = JSON.stringify(travaux)
    window.localStorage.setItem("travaux", valeurTravaux)
}