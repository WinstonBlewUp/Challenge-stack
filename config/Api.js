export async function dataFetch(type) {
    const urlArray = {
        "site": "https://data.paris2024.org/api/explore/v2.1/catalog/datasets/paris-2024-sites-de-competition/records?",
        "event": "https://data.paris2024.org/api/explore/v2.1/catalog/datasets/paris-2024-evenements-olympiade-culturelle/records?&refine=departement%3A%2275%22&refine=date_de_debut_c%3A%222024%22&refine=date_de_fin_c%3A%222024%22",
        "limit":"&limit=100",
    };
    try {
        const response = await fetch(urlArray[type]);
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    };
}

export async function dataFetchFilterSite(filter){
    const baseUrlArray = "https://data.paris2024.org/api/explore/v2.1/catalog/datasets/paris-2024-sites-de-competition/records?";
    let updatedUrl = baseUrlArray;
    filter.array.forEach(element => {
        updatedUrl = updatedUrl + element;
    });
    try {
        const response = await fetch(updatedUrl);
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    };
}