import {Component} from '../core/Component.js';
import {createElement} from "../core/DomUtils.js";
import {EventCard} from "../components/EventCard.js";

export class Events extends Component {
    constructor(props) {
        super(props);
        this.eventCard = new EventCard({id: 'event-container'});
    }

    render() {
        return createElement('div', {id: 'event-page'},
            this.eventCard.render(),
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
    console.log('Event data:', eventData);

    if (!Array.isArray(eventData)) {
        console.error('Event data is not an array:', eventData);
        return;
    }

    eventData.forEach(event => {
        const eventProps = {
            id: event.id,
            image: 'https://img.freepik.com/photos-gratuite/outils-sport_53876-138077.jpg?w=996&t=st=1721833226~exp=1721833826~hmac=8e217a87988aa1307100217ca50bfa19b88eb8c45d8ac2f2ea543912359417e5',
            name: event.name,
            onClick: () => console.log(`Event ${event.id} clicked`),
            onButtonClick: () => console.log(`Button for event ${event.id} clicked`)
        };

        const eventCard = new EventCard(eventProps);
        eventContainer.appendChild(eventCard.render());
    });
}

document.addEventListener('DOMContentLoaded', renderEventCards);

