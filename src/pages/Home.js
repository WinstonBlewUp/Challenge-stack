import {Component} from '../core/Component.js';
import {createElement} from "../core/DomUtils.js";
import {Map} from "../components/Map.js";

export class Home extends Component {
    constructor(props) {
        super(props);
        this.map = new Map({id: 'map'});
    }

    render() {
        return createElement('div', {id: 'home-page'},
            // createElement('h1', {}, 'Home Page'),
            // createElement('a', {href: '/', className: 'nav-link'}, 'Go Home'),
            // createElement('br'),
            // createElement('a', {href: '/event', className: 'nav-link'}, 'Go to Events'),
            // createElement('br'),
            // createElement('a', {href: '/favorite', className: 'nav-link'}, 'Go to Favorites'),
            // createElement('br'),
            // createElement('a', {href: '/ticket', className: 'nav-link'}, 'Go to Tickets'),
            this.map.render()
        );
    }

    display() {
        this.map.display();
    }
}