
//*******************************************************************************************************************//
//*************** Déclaration des fonctions liées à l'affichage de la galerie (homepage_portfolio.js) ***************//
//*******************************************************************************************************************//

/*
** Déclaration de la fonction qui génère dynamiquement tout le contenu de la galerie des projets
*/
export function afficherGalerie(travaux) {
    document.querySelector(".gallery").innerHTML = ""
    
    for (let i=0; i < travaux.length; i++) {
        const projet = travaux[i]

        //** Création des élements html de la galerie de travaux **//
        const baliseFigure = document.createElement("figure")
        baliseFigure.dataset.id = projet.id
    
        const imageProjet = document.createElement("img")
        imageProjet.src = projet.imageUrl
        imageProjet.alt = projet.title
        baliseFigure.appendChild(imageProjet)
        
        const captionProjet = document.createElement("figcaption")
        captionProjet.innerText = projet.title
        baliseFigure.appendChild(captionProjet)

        //** Récupération de l'élément du DOM qui accueillera les projets (parent) **//
        document.querySelector(".gallery").appendChild(baliseFigure)
    }
}


/*
** Déclaration de la fonction qui permet d'afficher les travaux dans la page 1 de la modale
*/
export function afficherGalerieModale(travaux) {
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
}



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
** Déclaration de la fonction qui permet de récupérer le token et connecter l'utilisateur
*/
export function connecterUtilisateur(loginUtilisateur) {
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginUtilisateur)
    })
    .then(reponse => {
        if (reponse.ok) {
            reponse.json()
            .then(token => {
                localStorage.setItem("token", JSON.stringify(token))
                window.location.href="index.html"
            })
        } else {
            const loginForm = document.querySelector(".login-form")
            loginForm.reset()
            throw new Error("Erreur d'identifiant ou de mot de passe")
        }
    })
    .catch(error => afficherMessageErreur(error.message))
}

/*
** Déclaration de la fonction permettant de faire une requête pour supprimer un projet de la BDD
*/
export function supprimerProjet(id, token) {
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

            // TEST :

            let galerieModale = document.querySelector(".modal-gallery")
            let projetASupprimerModale = galerieModale.querySelector(`figure[data-id="${id}"]`)
            projetASupprimerModale.remove()

            let galerieIndex = document.querySelector(".gallery")
            let projetASupprimerIndex = galerieIndex.querySelector(`figure[data-id="${id}"]`)
            projetASupprimerIndex.remove()

            resetTravauxLocalStorage().then(travaux => {
                afficherGalerie(travaux)
                // afficherGalerieModale(travaux)
            })
        }
    })
    .catch(error => error.message)
}

/*
** Déclaration de la fonction permettant de faire une requête pour ajouter un projet à la BDD
*/
export async function ajouterProjet(formData, token) {
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
            // ouvrirPopupConfirmationAjout()
            console.log("Votre projet a bien été ajouté")

            resetTravauxLocalStorage().then(travaux => {
                afficherGalerie(travaux)
                // afficherGalerieModale(travaux)
            })
        }
    })
    .catch(error => console.error(error.message))
}
