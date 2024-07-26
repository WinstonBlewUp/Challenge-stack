import {createElement} from "../core/DomUtils.js";
import {dataFetch} from "../../config/Api.js";
import {Component} from '../core/Component.js';
import {Navbar} from '../components/Navbar.js';
import {Topbar} from "../components/Topbar.js";
import {FavCard} from "../components/FavCard.js";

export class Favorite extends Component {
    constructor(props) {
        super(props);
        this.Topbar = new Topbar({title: 'Favoris'});
        this.Navbar = new Navbar({id: 'navbar'});
    }

    render() {
        return createElement('div', {id: 'favorite-page', className: 'flex flex-col gap-10 mt-20 mb-16'},
            createElement('div', {id: 'fav-container', className: 'flex flex-col gap-10 p-5'}),
            this.Topbar.render(),
            this.Navbar.render(),
        );
    }
}

async function fetchEventById(eventId) {
    const allEvents = await dataFetch('event');
    return allEvents.find(event => event.id === eventId);
}

function getDisciplineImage(discipline) {
    const disciplineImages = {
        'cinema': 'cinema.jpg',
        'danse': 'dance.jpg',
        'Muséal': 'museal.jpg',
        'musique': 'musique.webp',
        'Arts de la rue': 'streetart.jpg',
        'Théâtre': 'theatre.jpg',
    };

    return disciplineImages[discipline.toLowerCase()] || 'autre.webp';
}

async function renderFavCards() {
    const favContainer = document.getElementById('fav-container');
    if (!favContainer) {
        return;
    }

    favContainer.innerHTML = '';

    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    for (const eventId of favorites) {
        const fav = await fetchEventById(eventId);
        if (!fav) {
            console.error('Event not found:', eventId);
            continue;
        }

        const disciplineRaw = fav.discipline_principale_du_projet_c[0];
        const semicolonIndex = disciplineRaw.indexOf(';');
        const discipline = semicolonIndex !== -1 ? disciplineRaw.substring(0, semicolonIndex) : disciplineRaw;

        const favProps = {
            id: fav.id,
            discipline: discipline,
            name: fav.name,
            location: fav.lieu_de_presentation_c,
            description: fav.presentation_synthetique_du_projet_c,
            image: `public/images/${getDisciplineImage(discipline)}`,
        };

        const favCard = new FavCard(favProps);
        favContainer.appendChild(favCard.render());
    }
}

function setupFavListeners() {
    document.addEventListener('DOMContentLoaded', renderFavCards);

    window.addEventListener('routeChange', (fav) => {
        if (fav.detail.path === '/Challenge-stack/favorite') {
            renderFavCards();
        }
    });
}

setupFavListeners();
