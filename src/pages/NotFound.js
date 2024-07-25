import {Component} from '../core/Component.js';
import {createElement} from "../core/DomUtils.js";
import {Navbar} from '../components/Navbar.js';

export class NotFound extends Component {
    constructor(props) {
        super(props);
        this.Navbar = new Navbar({id: 'navbar'});
    }

    render() {
        return createElement('div', {id: '404-page'},
            createElement('h1', {}, 'Page Not Found'),
            this.Navbar.render(),
        );
    }
}
