import {Component} from '../core/Component.js';
import {createElement} from "../core/DomUtils.js";
import {Navbar} from '../components/Navbar.js';
import {Topbar} from "../components/Topbar.js";

export class Ticket extends Component {
    constructor(props) {
        super(props);
        this.Topbar = new Topbar({title: 'Billetterie'});
        this.Navbar = new Navbar({id: 'navbar'});
    }

    render() {
        return createElement('div', {id: 'ticket-page', className: 'flex flex-col gap-10 mt-20'},
            this.Topbar.render(),
            this.Navbar.render(),
        );
    }
}
