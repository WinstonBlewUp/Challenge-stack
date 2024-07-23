import {Component} from '../core/Component.js';
import {createElement} from "../core/DomUtils.js";

export class Favorite extends Component {
    render() {
        return createElement('div', {id: 'favorite-page'},
            createElement('h1', {}, 'Favorites'),
            createElement('a', {href: '/', className: 'nav-link'}, 'Go to Home'),
            createElement('br'),
            createElement('a', {href: '/event', className: 'nav-link'}, 'Go to Events'),
            createElement('br'),
            createElement('a', {href: '/favorite', className: 'nav-link'}, 'Go to Favorites'),
            createElement('br'),
            createElement('a', {href: '/ticket', className: 'nav-link'}, 'Go to Tickets'),
        );
    }
}
