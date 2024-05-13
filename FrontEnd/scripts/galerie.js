// Récupération des données depuis l'API HTTP
const reponse = await fetch("http://localhost:5678/api/works") // Envoi d'une requête pour récupérer les données de l'API (route : GET /works)
const travaux = await reponse.json() // Désérialisation du JSON et stockage de la liste d'objets (= travaux) obtenue dans la variable "travaux"

// Déclaration de la fonction qui génère tout le contenu de la galerie des projets
function afficherGalerie(travaux) {
    for (let i=0; i < travaux.length; i++) {
        const projet = travaux[i]

        // Création des élements html de la galerie de travaux
        const baliseFigure = document.createElement("figure") // Création d'une balise <figure> dédiée à chaque projet
    
        const imageProjet = document.createElement("img") // Création d'une balise <img> pour chaque projet
        imageProjet.src = projet.imageUrl // Ajout d'un attribut 'src' à la balise <img>, en allant chercher l'URL source dans la variable "travaux", propriété 'imageUrl'
        imageProjet.alt = projet.title // Ajout d'un attribut 'alt' à la balise <img>, en allant chercher la description dans la variable "travaux", propriété 'title'
        baliseFigure.appendChild(imageProjet) // Rattachement de la balise <img> (enfant) à la balise <figure> (parent)
        
        const captionProjet = document.createElement("figcaption") // Création d'une balise <figcaption> pour chaque projet
        captionProjet.innerText = projet.title // Ajout de texte à la balise <figcaption>, provenant de la propriété "title" de chaque objet du tableau "travaux"
        baliseFigure.appendChild(captionProjet) // Rattachement de la balise <figcaption> (enfant) à la balise <figure> (parent)

        // Récupération de l'élément du DOM qui accueillera les projets (parent)
        const divGallery = document.querySelector(".gallery") // Récupération de la <div> de classe "gallery" qui comportera tous les travaux
        divGallery.appendChild(baliseFigure) // Rattachement de la balise <figure> (enfant) à la <div> de classe "gallery" (parent)
    }
}

// Premier affichage de la galerie de travaux
afficherGalerie(travaux)