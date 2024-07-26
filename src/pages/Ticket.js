import {Component} from '../core/Component.js';
import {createElement} from "../core/DomUtils.js";
import {Navbar} from '../components/Navbar.js';
import {Topbar} from "../components/Topbar.js";

export class Ticket extends Component {
    constructor(props) {
        super(props);
        this.Topbar = new Topbar({title: 'Billetterie'});
        this.Navbar = new Navbar({id: 'navbar'});
    }

    render() {
        return createElement('div', {id: 'ticket-page', className: 'flex flex-col gap-10 mt-24'},
            createElement('p', {className: 'text-center text-gray-500'}, 'Achetez vos billets pour les événements à venir'),
            createElement('div', {className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-5'},
                createElement('div', {className: 'event-card relative flex flex-col bg-gray-100 rounded-lg p-5'},
                    createElement('div', {className: 'event-card-header relative'},
                        createElement('img', {className: 'rounded-lg', src: 'public/images/autre.webp', alt: 'Event image'}),
                    ),
                    createElement('div', {className: 'event-card-body flex flex-col gap-3 mt-5'},
                        createElement('a', {
                                href: 'https://tickets.paris2024.org/search/?affiliate=24R',
                                target: '_blank',
                                className: 'mx-auto bg-yellow-300 px-5 py-2 rounded-full flex items-center justify-center gap-3 font-bold',
                            },
                            createElement('i', {className: 'fas fa-ticket fa-xl'}),
                            'Acheter un billet'),
                    ),
                ),
            ),
            this.Topbar.render(),
            this.Navbar.render(),
        );
    }
}
