import {Component} from '../core/Component.js';
import {createElement} from '../core/DomUtils.js';
import * as L from "https://cdn.jsdelivr.net/npm/leaflet@1.8.0/dist/leaflet-src.esm.js";


export class Map extends Component {
    constructor(props) {
        super(props);
        this.map = null;
    }

    componentDidMount() {
        const mapElement = document.getElementById(this.props.id);
        if (mapElement) {
            this.map = L.map(mapElement).setView([51.505, -0.09], 13);

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
    }
}