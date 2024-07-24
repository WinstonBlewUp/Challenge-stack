import {Component} from '../core/Component.js';
import {createElement} from "../core/DomUtils.js";
<<<<<<< HEAD
import {Navbar} from '../components/Navbar.js';
=======
import { Navbar } from '../components/Navbar.js';
import {Topbar} from '../components/Topbar.js';
>>>>>>> eb77398 (ajout de la Topbar)

export class Favorite extends Component {
    constructor(props) {
        super(props);
<<<<<<< HEAD
        this.Navbar = new Navbar({id: 'navbar'});
=======
        this.Navbar = new Navbar({id:'navbar'});
        this.Topbar = new Topbar({id:'Topbar'});
>>>>>>> eb77398 (ajout de la Topbar)
    }

    render() {
        return createElement('div', {id: 'favorite-page'},
<<<<<<< HEAD
            this.Navbar.render()
=======
            createElement('h1', {}, 'Favorites'),
            createElement('a', {href: '/', className: 'nav-link'}, 'Go to Home'),
            createElement('br'),
            createElement('a', {href: '/events', className: 'nav-link'}, 'Go to Events'),
            createElement('br'),
            createElement('a', {href: '/favorite', className: 'nav-link'}, 'Go to Favorites'),
            createElement('br'),
            createElement('a', {href: '/ticket', className: 'nav-link'}, 'Go to Tickets'),
            this.Navbar.render(),
            this.Topbar.render()
>>>>>>> eb77398 (ajout de la Topbar)
        );
    }
}
