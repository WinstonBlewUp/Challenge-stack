import {Component} from '../core/Component.js';
import {createElement} from "../core/DomUtils.js";

export class Footer extends Component {
    render() {
        return createElement('footer', {class: 'footer'}, 'Footer');
    }
}
