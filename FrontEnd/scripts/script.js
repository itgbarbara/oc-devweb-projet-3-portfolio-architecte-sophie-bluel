
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
        const baliseFigure = document.createElement("figure") // Création d'une balise <figure> dédiée à chaque projet
    
        const imageProjet = document.createElement("img") // Création d'une balise <img> pour chaque projet
        imageProjet.src = projet.imageUrl // Ajout d'un attribut 'src' à la balise <img>, en allant chercher l'URL source dans la variable "travaux", indice i, propriété 'imageUrl'
        imageProjet.alt = projet.title // Ajout d'un attribut 'alt' à la balise <img>, en allant chercher la description dans la variable "travaux", indice i, propriété 'title'
        baliseFigure.appendChild(imageProjet) // Rattachement de la balise <img> (enfant) à la balise <figure> (parent)
        
        const captionProjet = document.createElement("figcaption") // Création d'une balise <figcaption> pour chaque projet
        captionProjet.innerText = projet.title // Ajout de texte à la balise <figcaption>, provenant de la propriété "title" de chaque objet du tableau "travaux"
        baliseFigure.appendChild(captionProjet) // Rattachement de la balise <figcaption> (enfant) à la balise <figure> (parent)

        //** Récupération de l'élément du DOM qui accueillera les projets (parent) **//
        document.querySelector(".gallery").appendChild(baliseFigure) // Rattachement de chaque balise <figure> (enfant) à la <div> de classe "gallery" (parent)
    }
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
        headers: {"Content-Type": "application/json"},
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
    const btnLogout = document.getElementById("lien-logout")
    btnLogout.addEventListener("click", () => {
        localStorage.removeItem("token") // Supprimer le token du localStorage
        document.location.reload() // Recharger la page pour afficher les modifications
    })
}


//***********************************************************************************************//
//*************** Déclaration des fonctions liées à la modale (homepage-modal.js) ***************//
//***********************************************************************************************//

export function afficherGalerieModale(travaux) {
    for (let i=0; i < travaux.length; i++) {
        const projet = travaux[i]

        //** Création des élements html de la galerie de travaux **//
        const baliseFigure = document.createElement("figure") // Création d'une balise <figure> dédiée à chaque projet
    
        const imageProjet = document.createElement("img") // Création d'une balise <img> pour chaque projet
        imageProjet.src = projet.imageUrl // Ajout d'un attribut 'src' à la balise <img>, en allant chercher l'URL source dans la variable "travaux", indice i, propriété 'imageUrl'
        imageProjet.alt = projet.title // Ajout d'un attribut 'alt' à la balise <img>, en allant chercher la description dans la variable "travaux", indice i, propriété 'title'
        baliseFigure.appendChild(imageProjet) // Rattachement de la balise <img> (enfant) à la balise <figure> (parent)
        
        const iconePoubelle = document.createElement("i") // Création d'une balise <figcaption> pour chaque projet
        iconePoubelle.classList.add("fa-solid", "fa-trash-can")
        baliseFigure.appendChild(iconePoubelle) // Rattachement de la balise <figcaption> (enfant) à la balise <figure> (parent)

        //** Récupération de l'élément du DOM qui accueillera les projets (parent) **//
        document.querySelector(".modal-gallery").appendChild(baliseFigure) // Rattachement de chaque balise <figure> (enfant) à la <div> de classe "gallery" (parent)
    }
}