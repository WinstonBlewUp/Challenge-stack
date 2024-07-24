import {Component} from '../core/Component.js';
import {createElement} from "../core/DomUtils.js";
import {Navbar} from '../components/Navbar.js';
import {Map} from "../components/Map.js";


export class Home extends Component {
    constructor(props) {
        super(props);
        this.Navbar = new Navbar({id: 'navbar'});
        this.map = new Map({id: 'map'});
    }

    render() {
        return createElement('div', {id: 'home-page'},
            this.Navbar.render(),
            this.map.render(),
        );
    }

    display() {
        this.map.display();
    }
}