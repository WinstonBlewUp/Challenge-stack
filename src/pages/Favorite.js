import {Component} from '../core/Component.js';
import {createElement} from "../core/DomUtils.js";
import {Navbar} from '../components/Navbar.js';

export class Favorite extends Component {
    constructor(props) {
        super(props);
        this.Navbar = new Navbar({id: 'navbar'});
    }

    render() {
        return createElement('div', {id: 'favorite-page'},
            createElement('h1', {}, 'Favoris'),
            this.Navbar.render(),
        );
    }
}
