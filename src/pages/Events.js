import {Component} from '../core/Component.js';
import {createElement} from "../core/DomUtils.js";
import {EventCard} from "../components/EventCard.js";
import {Navbar} from "../components/Navbar.js";

export class Events extends Component {
    constructor(props) {
        super(props);
        this.Navbar = new Navbar({id: 'navbar'});
    }

    render() {
        return createElement('div', {id: 'event-page'},
            createElement('div', {id: 'event-container', className: 'flex flex-col gap-10 p-5'}),
            this.Navbar.render(),
        );
    }
}

async function fetchEventData() {
    try {
        const response = await fetch('https://data.paris2024.org/api/explore/v2.1/catalog/datasets/paris-2024-evenements-olympiade-culturelle/records?limit=20');
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Error fetching event data:', error);
        return [];
    }

}

async function renderEventCards() {
    const eventContainer = document.getElementById('event-container');
    if (!eventContainer) {
        console.error('Container element with id "event-container" not found.');
        return;
    }

    const eventData = await fetchEventData();

    if (!Array.isArray(eventData)) {
        console.error('Event data is not an array:', eventData);
        return;
    }

    eventData.forEach(event => {
        const eventProps = {
            id: event.id,
            discipline: event.discipline_principale_du_projet_c[0],
            name: event.name,
            location: event.lieu_de_presentation_c,
            description: event.presentation_synthetique_du_projet_c,
            image: 'https://picsum.photos/500/300',
        };

        const eventCard = new EventCard(eventProps);
        eventContainer.appendChild(eventCard.render());
    });
}

if (window.location.pathname === '/events') {
    document.addEventListener('DOMContentLoaded', renderEventCards);
}

