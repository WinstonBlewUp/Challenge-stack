import {Component} from '../core/Component.js';
import {createElement} from '../core/DomUtils.js';
import {dataFetch, dataFetchFilterSite} from '../../config/Api.js';
import {Button} from '../components/Button.js';
import * as L from "https://cdn.jsdelivr.net/npm/leaflet@1.8.0/dist/leaflet-src.esm.js";

let siteFilter = true;
let eventFilter = true;

let siteMarkers = [];
let eventMarkers = [];

const Icon = L.Icon.extend({
    options: {
        iconSize: [40, 40],
        shadowSize: [50, 64],
        iconAnchor: [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor: [-3, -76]
    }
});

const siteIcon = new Icon({iconUrl: '../../assets/siteIcon.svg'});
const eventIcon = new Icon({iconUrl: '../../assets/eventIcon.svg'});
const userIcon = new Icon({iconUrl: '../../assets/user.png'});



export class Map extends Component {
    constructor(props) {
        super(props);
        this.map = null;
        this.siteButton = new Button({className: 'blue site-button', text: 'Site', onClick: (event) => this.siteFiltering(event)});
        this.eventButton = new Button({className: 'blue event-button', text: 'Event', onClick: (event) => this.eventFiltering(event)});
        this.centerPosition = this.centerPosition.bind(this);
        this.centerParis = this.centerParis.bind(this);
    }

    siteFiltering(event){
        event.preventDefault();
        if (siteFilter){
            this.hideSiteMarker();
        } else {
            this.showSiteMarker();
        }
        siteFilter = !siteFilter;
    }

    hideSiteMarker(){
        siteMarkers.forEach(marker =>{
            marker.setOpacity(0);
        });
    }

    showSiteMarker(){
        siteMarkers.forEach(marker =>{
            marker.setOpacity(1);
        });
    }

    eventFiltering(event){
        event.preventDefault();
        if (eventFilter){
            this.hideEventMarker();
        } else {
            this.showEventMarker();
        }
        eventFilter = !eventFilter;
    }

    hideEventMarker(){
        eventMarkers.forEach(marker =>{
            marker.setOpacity(0);
        });
    }

    showEventMarker(){
        eventMarkers.forEach(marker =>{
            marker.setOpacity(1);
        });
    }

    componentDidMount(coordinates = [48.866669, 2.33333]) {
        const mapElement = document.getElementById(this.props.id);
        if (mapElement) {
            if (!(this.map instanceof L.map)){
                this.map = L.map(mapElement).setView(coordinates, 13);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(this.map);
            } 
        } else {
            console.error(`Element with ID ${this.props.id} not found`);
        }
    }

    render() {
        return createElement('div', {id: this.props.id, style: 'height: 100vh; width: 100%'},
            this.siteButton.render(),
            this.eventButton.render(),
        );
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
        this.componentDidMount([position.coords.latitude, position.coords.longitude]);
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
        if (siteFilter){
            siteData.forEach(element => {
                siteMarkers.push(L.marker([element.point_geo.lat, element.point_geo.lon], {icon: siteIcon}).addTo(this.map).bindPopup(element.nom_site +"<br><a href='/site/"+element.code_site+"'>Informations</>" , {closeButton: false}));
            });
        }
        if (eventFilter){
            eventData.forEach(element => {
                eventMarkers.push(L.marker([element.latitude_c, element.longitude_c], {icon: eventIcon}).addTo(this.map).bindPopup(element.name +"<br><a href='/event/"+element.id+"'>Informations</>" , {closeButton: false}));
            });
        }
    }
}