import {Component} from '../core/Component.js';
import {createElement} from "../core/DomUtils.js";
import {Navbar} from '../components/Navbar.js';

export class Ticket extends Component {
    constructor(props) {
        super(props);
        this.Navbar = new Navbar({id: 'navbar'});
    }

    render() {
        return createElement('div', {id: 'ticket-page'},
            createElement('h1', {}, 'Billetterie'),
            this.Navbar.render(),
        );
    }
}
