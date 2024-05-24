/*
** Import des fonctions
*/
import { validerEmail, validerMdp, afficherMessageErreur, connecterUtilisateur } from "./script.js"


//*************** Exécution du script ***************//

/*
** Vidage du formulaire de connexion
*/
document.getElementById("email").value = ""
document.getElementById("mdp").value = ""

/*
** Soumission du formulaire de connexion
*/
const loginForm = document.querySelector(".login-form")
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault() // Empêche le comportement par défaut du navigateur (changer l'URL de l'onglet et recharger la page)
    try {
        //** Récupération de la saisie dans les champs **//
        let email = document.getElementById("email").value
        let mdp = document.getElementById("mdp").value

        //** Vérification de la validité de la saisie des champs **//
        validerEmail(email) // Lance une exception (erreur) gérée par le bloc 'catch' si le format de la saisie n'est pas valide, sinon le script continue
        validerMdp(mdp) // Lance une exception (erreur) gérée par le bloc 'catch' si le format de la saisie n'est pas valide, sinon le script continue
        afficherMessageErreur("") // Dans le cas où il n'y a pas d'erreur, on met une chaîne vide

        //** Vider les champs après la soumission du formulaire **//
        document.getElementById("email").value = ""
        document.getElementById("mdp").value = ""

        //** Création de l'objet correspondant aux infos de login **//
        let loginUtilisateur = { // Création d'un objet login utilisateur, qui sera convertit en chaîne de caractère JSON pour la charge utile de la requête POST 
            email: email, // Récupération de la valeur du champ email du formulaire de connexion
            password: mdp // Récupération de la valeur du champ mot de passe du formulaire de connexion
        }
        
        connecterUtilisateur("http://localhost:5678/api/users/login", loginUtilisateur)
        
    } catch(error) {
        afficherMessageErreur(error.message)
    }
})