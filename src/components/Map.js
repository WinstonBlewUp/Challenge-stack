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

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(this.map);
        } else {
            console.error(`Element with ID ${this.props.id} not found`);
        }
    }

    render() {
        return createElement('div', {id: this.props.id, style: 'height: 100vh; width: 100%'});
    }

    display() {
        this.componentDidMount();
    }
}