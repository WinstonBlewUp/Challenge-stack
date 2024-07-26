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
            this.map.removeLayer(marker);
        });
    }

    showSiteMarker(){
            this.createPoints();
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
            this.map.removeLayer(marker);
        });
    }

    showEventMarker(){
        this.createPoints();
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

    siteTrigger(event, id){
        event.preventDefault();
        console.log(id);
    }

    eventTrigger(event, id){
        event.preventDefault();
        console.log(id);
    }

    async createPoints(position) {
        const siteData = await dataFetch('site');
        const eventData = await dataFetch('event');

        this.map.on('popupopen', (e) => {
            const popup = e.popup;
            const eventLink = popup._contentNode.querySelector('.event-link');
            const siteLink = popup._contentNode.querySelector('.site-link');

            if (eventLink) {
                eventLink.addEventListener('click', (event) => {
                    event.preventDefault();
                    const id = event.currentTarget.getAttribute('data-id');
                    this.eventTrigger(event, id);
                });
            }

            if (siteLink) {
                siteLink.addEventListener('click', (event) => {
                    event.preventDefault();
                    const id = event.currentTarget.getAttribute('data-id');
                    this.siteTrigger(event, id);
                });
            }
        });

        if (position){
            L.marker(position, {icon: userIcon}).addTo(this.map).bindPopup("Vous êtes ici", {closeButton: false});
        }
        if (siteFilter){
            siteData.forEach(element => {
                const sitePopupContent = `<div><h3>${element.nom_site}</h3><a class="site-link" data-id="${element.code_site}">Informations</>`;
                siteMarkers.push(L.marker([element.point_geo.lat, element.point_geo.lon], {icon: siteIcon}).addTo(this.map).bindPopup(sitePopupContent, {closeButton: false}));
            });
        }
        if (eventFilter){
            eventData.forEach(element => {
                const eventPopupContent = `<div><h3>${element.name}</h3><a class="event-link" data-id="${element.id}">Informations</>`;
                eventMarkers.push(L.marker([element.latitude_c, element.longitude_c], {icon: eventIcon}).addTo(this.map).bindPopup(eventPopupContent, {closeButton: false}));
            });
        }
    }
}