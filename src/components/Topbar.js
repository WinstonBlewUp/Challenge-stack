import {createElement} from "../core/DomUtils.js";
import {Component} from "../core/Component.js";
import {router} from "../app.js";

export class Topbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return createElement('div', {id: 'topbar'},
            createElement('a', {
                    href: '/',
                    className: 'nav-link',
                    onclick: (event) => this.handleNavClick(event),
                },
                createElement('i', {className: 'fas fa-arrow-left fa-xl'})
            ),
            createElement('h2', {className: 'text-xl', innerHTML: this.props.title}),
            createElement('div', {className: 'menu-button'},
                createElement('i', {className: 'fas fa-bars-sort fa-xl'})
            ),
        );
    }

    handleNavClick(event) {
        event.preventDefault();
        if (router && typeof router.navigate === 'function') {
            router.navigate('/');
        } else {
            console.error("Router not found or navigate method is missing.");
        }
    }
}

