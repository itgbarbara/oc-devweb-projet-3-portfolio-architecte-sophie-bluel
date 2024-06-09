//************************************ Import des fonctions ***********************************//

import { connecterUtilisateur } from "./fetch_requests.js"
import { validerEmail, validerMdp, afficherMessageErreur } from "./login.js"


//************************************ Exécution du script ************************************//

const loginForm = document.querySelector(".login-form")

//** Vidage du formulaire de connexion **//
loginForm.reset()

//** Soumission du formulaire de connexion **//
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault() // Empêche le comportement par défaut du navigateur (changer l'URL de l'onglet et recharger la page)
    try {
        // Récupération de la saisie dans les champs
        let email = document.getElementById("email").value
        let mdp = document.getElementById("mdp").value

        // Vérification de la validité de la saisie des champs
        validerEmail(email) // Lance une exception au lieu de poursuivre le script en cas d'erreur
        validerMdp(mdp) // Lance une exception au lieu de poursuivre le script en cas d'erreur
        afficherMessageErreur("")

        // Vider les champs après la soumission du formulaire
        loginForm.reset()

        // Création de l'objet correspondant aux infos de login
        let loginUtilisateur = {
            email: email,
            password: mdp
        }
        
        connecterUtilisateur(loginUtilisateur) // Appel à l'API pour récupérer le token
        
    } catch(error) {
        afficherMessageErreur(error.message)
    }
})