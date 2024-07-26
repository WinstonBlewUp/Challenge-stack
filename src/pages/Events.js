import {Component} from '../core/Component.js';
import {createElement} from "../core/DomUtils.js";
import {EventCard} from "../components/EventCard.js";
import {Navbar} from "../components/Navbar.js";
import {Topbar} from "../components/Topbar.js";
import {dataFetch} from "../../config/Api.js";

export class Events extends Component {
    constructor(props) {
        super(props);
        this.Topbar = new Topbar({title: 'Événements'});
        this.Navbar = new Navbar({id: 'navbar'});
    }

    render() {
        return createElement('div', {id: 'event-page'},
            createElement('div', {id: 'event-container', className: 'flex flex-col gap-10 p-5 mt-20 mb-24'}),
            this.Topbar.render(),

            this.Navbar.render(),
        );
    }
}

async function renderEventCards() {
    const eventContainer = document.getElementById('event-container');
    if (!eventContainer) {
        return;
    }

    eventContainer.innerHTML = '';

    const eventData = await dataFetch('event');

    if (!Array.isArray(eventData)) {
        console.error('Event data is not an array:', eventData);
        return;
    }

    eventData.forEach(event => {
        const disciplineRaw = event.discipline_principale_du_projet_c[0];
        const semicolonIndex = disciplineRaw.indexOf(';');
        const discipline = semicolonIndex !== -1 ? disciplineRaw.substring(0, semicolonIndex) : disciplineRaw;

        const eventProps = {
            id: event.id,
            discipline: discipline,
            name: event.name,
            location: event.lieu_de_presentation_c,
            description: event.presentation_synthetique_du_projet_c,
            image: 'https://picsum.photos/500/300',
        };

        const eventCard = new EventCard(eventProps);
        eventContainer.appendChild(eventCard.render());
    });
}

function setupEventListeners() {
    document.addEventListener('DOMContentLoaded', renderEventCards);

    window.addEventListener('routeChange', (event) => {
        if (event.detail.path === '/events') {
            renderEventCards();
        }
    });
}

setupEventListeners();