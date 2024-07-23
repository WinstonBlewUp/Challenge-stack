import {Component} from '../core/Component.js';
import {createElement} from "../core/DomUtils";

export class Header extends Component {
    render() {
        return createElement('header', {class: 'header'}, 'nav');
    }
}
