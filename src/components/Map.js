import {Component} from '../core/Component.js';
import {createElement} from '../core/DomUtils.js';
import {dataFetch} from '../../config/Api.js';
import * as L from "https://cdn.jsdelivr.net/npm/leaflet@1.8.0/dist/leaflet-src.esm.js";

let siteData;

const Icon = L.Icon.extend({
    options: {
        iconSize: [70, 70],
        shadowSize: [50, 64],
        iconAnchor: [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor: [-3, -76]
    }
});

const phrygeIcon = new Icon({iconUrl: '../../assets/phryge.svg'});
const userIcon = new Icon({iconUrl: '../../assets/user.png'});



export class Map extends Component {
    constructor(props) {
        super(props);
        this.map = null;
        this.centerPosition = this.centerPosition.bind(this);
        this.centerParis = this.centerParis.bind(this);
    }

    componentDidMount(coordinates = [48.866669, 2.33333]) {
        const mapElement = document.getElementById(this.props.id);
        if (mapElement) {
            this.map = L.map(mapElement).setView(coordinates, 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(this.map);
        } else {
            console.error(`Element with ID ${this.props.id} not found`);
        }
    }

    render() {
        return createElement('div', {id: this.props.id, style: 'height: 100vh; width: 100%'});
    }

    display() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.centerPosition, this.centerParis);
        } else {
            this.componentDidMount();
            this.createPoints();
        }
    }

    centerPosition(position) {
        this.componentDidMount([position.coords.latitude, position.coords.longitude]); // Initialiser la carte après l'affichage du composant
        this.createPoints([position.coords.latitude, position.coords.longitude]);
    }

    centerParis() {
        this.componentDidMount();
        this.createPoints();
    }

    
    

    async createPoints(position) {
        const siteData = await dataFetch('site');
        const eventData = await dataFetch('event');
        if (position){
            L.marker(position, {icon: userIcon}).addTo(this.map).bindPopup("Vous êtes ici", {closeButton: false});
        }
        siteData.forEach(element => {
            L.marker([element.point_geo.lat, element.point_geo.lon], {icon: phrygeIcon}).addTo(this.map).bindPopup(element.nom_site +"<br><a href='/site/"+element.code_site+"'>Informations</>" , {closeButton: false});
        });
        eventData.forEach(element => {
            L.marker([element.latitude_c, element.longitude_c], {icon: eventIcon}).addTo(this.map).bindPopup(element.name +"<br><a href='/event/"+element.project_oc_r_id+"'>Informations</>" , {closeButton: false});
        });
    }
}