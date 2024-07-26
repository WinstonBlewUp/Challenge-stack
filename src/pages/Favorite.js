import {createElement} from "../core/DomUtils.js";
import {dataFetch} from "../../config/Api.js";
import {Component} from '../core/Component.js';
import {Navbar} from '../components/Navbar.js';
import {Topbar} from "../components/Topbar.js";
import {FavCard} from "../components/FavCard.js";
import { Slider} from "../components/Slider.js";

const sliderItems = [
    { color: '#ff6666', imageSrc: 'public/assets/images/bar.png' },
    { color: '#66ff66', imageSrc: 'public/assets/images/room.png' },
    { color: '#6666ff', imageSrc: 'public/assets/images/fancy.png' },
];

export class Favorite extends Component {
    constructor(props) {
        super(props);
        this.Topbar = new Topbar({title: 'Favoris'});
        this.Navbar = new Navbar({id: 'navbar'});
        this.slider = new Slider({id: 'slider', items: sliderItems});
    }

    render() {
        return createElement('div', {id: 'favorite-page', className: 'flex flex-col gap-10 mt-20 mb-16'},
            createElement('div', {id: 'fav-container', className: 'flex flex-col gap-10 p-5'}),
            this.Topbar.render(),
            this.slider.render(),
            this.Navbar.render(),
        );
    }
}

async function fetchEventById(eventId) {
    const allEvents = await dataFetch('event');
    return allEvents.find(event => event.id === eventId);
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
            image: 'https://picsum.photos/500/300',
        };

        const favCard = new FavCard(favProps);
        favContainer.appendChild(favCard.render());
    }
}

function setupFavListeners() {
    document.addEventListener('DOMContentLoaded', renderFavCards);

    window.addEventListener('routeChange', (fav) => {
        if (fav.detail.path === '/favorite') {
            renderFavCards();
        }
    });
}

setupFavListeners();
