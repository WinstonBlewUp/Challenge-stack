export async function fetchData(url) {
    try {
        const response = await fetch(url); // Effectue l'appel API
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json(); // Convertit la réponse en JSON
        console.log(data); // Traite les données reçues
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}
