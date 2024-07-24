import {Component} from '../core/Component.js';
import {createElement} from "../core/DomUtils.js";
import { Navbar } from '../components/Navbar.js';

export class Ticket extends Component {
    constructor(props) {
        super(props);
        this.Navbar = new Navbar({id:'navbar'});
    }
    render() {
        return createElement('div', {id: 'ticket-page'},
            createElement('h1', {}, 'Tickets'),
            createElement('a', {href: '/', className: 'nav-link'}, 'Go to Home'),
            createElement('br'),
            createElement('a', {href: '/events', className: 'nav-link'}, 'Go to Events'),
            createElement('br'),
            createElement('a', {href: '/favorite', className: 'nav-link'}, 'Go to Favorites'),
            createElement('br'),
            createElement('a', {href: '/ticket', className: 'nav-link'}, 'Go to Tickets'),
            this.Navbar.render()
        );
    }
}
