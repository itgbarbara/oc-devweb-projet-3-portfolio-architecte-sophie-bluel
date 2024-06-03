
//***********************************************************************************************//
//*************** Déclaration des fonctions liées à la connexion de l'utilisateur ***************//
//***********************************************************************************************//

/*
** Déclaration des fonctions qui définissent des règles de validation des champs du formulaire Login
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
** Déclaration des fonctions pour activer / déactiver l'interface administrateur(ice)
*/
export function activerModeEdition() {
    document.querySelector(".bandeau-mode-edition").classList.remove("inactive")
    document.querySelector("header").classList.add("header-mode-edition")
    document.getElementById("lien-logout").classList.remove("inactive")
    document.getElementById("lien-login").classList.add("inactive") 
    document.querySelector(".edit-button").classList.remove("inactive")
}

export function desactiverModeEdition() {
    document.querySelector(".bandeau-mode-edition").classList.add("inactive")
    document.querySelector("header").classList.remove("header-mode-edition")
    document.getElementById("lien-logout").classList.add("inactive")
    document.getElementById("lien-login").classList.remove("inactive")
    document.querySelector(".edit-button").classList.add("inactive")
}

/*
** Déclaration de la fonction qui permet de supprimer le token
*/
export function deconnecterUtilisateur() {
    localStorage.removeItem("token")
}

/*
** Déclaration des fonctions qui permettent d'ouvrir et fermer une popup de confirmation pour se déconnecter
*/
let popupLogout = null
export function ouvrirPopupLogout(event) {
    event.preventDefault()

    popupLogout = document.getElementById("popup-logout")

    popupLogout.style.display = null
    popupLogout.setAttribute("aria-hidden", "false")
    popupLogout.showModal()

    popupLogout.querySelector(".js-confirmation-logout").addEventListener("click", (event) => {
        fermerPopupLogout(event)
        deconnecterUtilisateur()
        document.location.reload()
    })

    popupLogout.querySelectorAll(".js-close-popup").forEach(btnRetour => {
        btnRetour.addEventListener("click", fermerPopupLogout)
    })
}


export function fermerPopupLogout(event) {
    if (popupLogout === null) return

    event.preventDefault()

    popupLogout.style.display = "none"
    popupLogout.setAttribute("aria-hidden", "true")
    popupLogout.close()

    popupLogout.querySelector(".js-confirmation-logout").removeEventListener("click", () => {
        fermerPopupLogout(event)
        deconnecterUtilisateur()
        document.location.reload()
    })

    popupLogout.querySelectorAll(".js-close-popup").forEach(btnRetour => {
        btnRetour.removeEventListener("click", fermerPopupLogout)
    })

    popupLogout = null
}