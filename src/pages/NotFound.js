import {Component} from '../core/Component.js';
import {createElement} from "../core/DomUtils.js";
import {Navbar} from '../components/Navbar.js';
import {Topbar} from "../components/Topbar.js";

export class NotFound extends Component {
    constructor(props) {
        super(props);
        this.Topbar = new Topbar({title: 'Erreur 404'});
        this.Navbar = new Navbar({id: 'navbar'});
    }

    render() {
        return createElement('div', {id: 'ticket-page', className: 'flex flex-col gap-10 mt-24'},
            createElement('h1', {className: 'text-3xl font-bold text-center'}, 'Page non trouvée'),
            this.Topbar.render(),
            this.Navbar.render(),
        );
    }
}
