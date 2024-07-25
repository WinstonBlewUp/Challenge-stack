import {Component} from '../core/Component.js';
import {createElement} from "../core/DomUtils.js";
import {Navbar} from '../components/Navbar.js';
import {Map} from "../components/Map.js";
import { SearchBar} from "../components/Searchbar.js"


export class Home extends Component {
    constructor(props) {
        super(props);
        this.Navbar = new Navbar({id: 'navbar'});
        this.map = new Map({id: 'map'});
        this.searchbar = new SearchBar({id:'searchbar'});

    }

    render() {
        return createElement('div', {id: 'home-page'},
            this.searchbar.render(),
            this.Navbar.render(),
            this.map.render(),
        );
    }

    display(newProps) {
        super.display(newProps)
        this.map.display();
    }
}