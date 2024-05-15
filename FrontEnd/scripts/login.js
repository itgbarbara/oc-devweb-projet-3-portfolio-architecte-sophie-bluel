
//*************** Déclaration des fonctions liées à la connexion de l'utilisateur ***************//


/*
** Récupération des données depuis l'API HTTP
*/
const reponse = await fetch("http://localhost:5678/api/users/login") // Envoi d'une requête pour récupérer les données de l'API (route : POST /users/login)
const login = await reponse.json() // Désérialisation du JSON et stockage de la liste d'objets (= travaux) obtenue dans la variable "travaux"



// Utiliser méthode POST car on va envoyer des données à l'API
// Ajouter Regexp sur email et mdp
// Ne pas oublier d'utiliser prevent.default sur l'évènement submit
// Faire une boucle qui parcourt les identifiants (stockés sous forme d'objets avec deux propriétés : login et mdp) contenus dans la base de données
// Si ce qu'on a saisi correspond à un couple login-mdp de notre bdd, alors on autorise la connexion