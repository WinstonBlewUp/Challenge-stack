export async function dataFetch(type) {
    const urlArray = {
        "site": "https://data.paris2024.org/api/explore/v2.1/catalog/datasets/paris-2024-sites-de-competition/records?select=nom_site%2C%20code_site%2C%20point_geo&limit=100",
        "event": "https://data.paris2024.org/api/explore/v2.1/catalog/datasets/paris-2024-evenements-olympiade-culturelle/records?limit=20&refine=departement%3A%2275%22&refine=date_de_debut_c%3A%222024%22&refine=date_de_fin_c%3A%222024%22",
        "fav": "https://data.paris2024.org/api/explore/v2.1/catalog/datasets/paris-2024-evenements-olympiade-culturelle/records?limit=6&refine=departement%3A%2275%22&refine=date_de_debut_c%3A%222024%22&refine=date_de_fin_c%3A%222024%22&offset=35",
    };
    try {
        const response = await fetch(urlArray[type]);
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}