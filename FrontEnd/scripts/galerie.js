// Récupération des données de l'API
const reponse = await fetch("http://localhost:5678/api/works") // Envoi d'une requête pour récupérer les données de l'API (route : GET /works)
travaux = await reponse.json() // Désérialisation du JSON et stockage de la liste d'objets (= travaux) obtenue dans la variable "travaux"