import {Component} from '../core/Component.js';
import {createElement} from '../core/DomUtils.js';
import * as L from "https://cdn.jsdelivr.net/npm/leaflet@1.8.0/dist/leaflet-src.esm.js";
import {fetchSites} from '../../js/Api.js';

let siteData;

var Icon = L.Icon.extend({
    options: {
        iconSize:     [70, 70],
        shadowSize:   [50, 64],
        iconAnchor:   [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor:  [-3, -76]
    }
});

var phrygeIcon = new Icon({iconUrl: '../../assets/phryge.svg'});


export class Map extends Component {
    constructor(props) {
        super(props);
        this.map = null;
    }

    componentDidMount() {
        const mapElement = document.getElementById(this.props.id);
        if (mapElement) {
            this.map = L.map(mapElement).setView([48.866669, 2.33333], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.map);
        } else {
            console.error(`Element with ID ${this.props.id} not found`);
        }
    }

    render() {
        // Crée un div avec une hauteur définie pour la carte
        return createElement('div', {id: this.props.id, style: 'height: 800px; width: 100%; border: 1px solid red; overflow: hidden;'});
    }

    display() {
        this.componentDidMount(); // Initialiser la carte après l'affichage du composant
        this.createPoints();
    }

    createPoints() {
        const apiUrl = 'https://data.paris2024.org/api/explore/v2.1/catalog/datasets/paris-2024-sites-de-competition/records?select=nom_site%2C%20sports%2C%20point_geo&limit=100';

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                siteData = data.results;
                siteData.forEach(element => {
                    L.marker([element.point_geo.lat, element.point_geo.lon], {icon: phrygeIcon}).addTo(this.map).bindPopup(element.nom_site);
                });
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }
}