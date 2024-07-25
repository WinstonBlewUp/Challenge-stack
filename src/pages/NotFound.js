import {Component} from '../core/Component.js';
import {createElement} from "../core/DomUtils.js";

export class NotFound extends Component {
    render() {
        return createElement('div', {id: '404-page'},
            createElement('h1', {}, 'Page Not Found'),
            createElement('a', {href: '/', className: 'nav-link'}, 'Go to Home'),
        );
    }
}
