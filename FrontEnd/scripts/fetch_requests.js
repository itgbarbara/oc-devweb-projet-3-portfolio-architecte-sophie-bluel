
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
    
    return travaux //// A TESTER
}

/*
** Déclaration de la fonction permettant de mettre à jour le localStorage et les galeries
*/
export async function resetTravauxLocalStorage() {
    window.localStorage.removeItem("travaux")
    const travaux = await recupererTravaux()
    console.log(travaux) // Debugger
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

            let galerieModale = document.querySelector(".modal-gallery")
            let projetASupprimerModale = galerieModale.querySelector(`figure[data-id="${id}"]`)
            projetASupprimerModale.remove()

            let galerieIndex = document.querySelector(".gallery")
            let projetASupprimerIndex = galerieIndex.querySelector(`figure[data-id="${id}"]`)
            projetASupprimerIndex.remove()

            resetTravauxLocalStorage()
        }
    })
    .catch(error => error.message)
}

/*
** Déclaration de la fonction permettant de faire une requête pour ajouter un projet à la BDD
*/
export function ajouterProjet(formData, token) {
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
        if (!reponse.ok) {
            throw new Error("Votre projet n'a pas été ajouté")
        } else {
            // ouvrirPopupConfirmationAjout()
            console.log("Votre projet a bien été ajouté")
            resetTravauxLocalStorage()
        }
    })
    .catch(error => {
        error.message
        console.log("Votre projet n'a pas été ajouté")
    })
}