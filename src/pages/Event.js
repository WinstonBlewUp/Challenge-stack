import {Component} from '../core/Component.js';
import {createElement} from "../core/DomUtils.js";
import { Navbar } from '../components/Navbar.js';
import {Topbar} from '../components/Topbar.js';


export class Event extends Component {
    constructor(props) {
        super(props);
        this.Navbar = new Navbar({id:'navbar'});
        this.Topbar = new Topbar({id:'Topbar'});

    }
    render() {
        return createElement('div', {id: 'event-page'},
            createElement('h1', {}, 'Event'),
            createElement('a', {href: '/', className: 'nav-link'}, 'Go to Home'),
            createElement('br'),
            createElement('a', {href: '/events', className: 'nav-link'}, 'Go to Events'),
            createElement('br'),
            createElement('a', {href: '/favorite', className: 'nav-link'}, 'Go to Favorites'),
            createElement('br'),
            createElement('a', {href: '/ticket', className: 'nav-link'}, 'Go to Tickets'),
            this.Navbar.render(),
            this.Topbar.render()

        );
    }
}
