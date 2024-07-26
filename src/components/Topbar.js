import {createElement} from "../core/DomUtils.js";
import {Component} from "../core/Component.js";
import {router} from "../app.js";

export class Topbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return createElement('div', {id: 'topbar', className: 'relative'},
            createElement('a', {
                    href: '/',
                    className: 'nav-link',
                    onclick: (event) => this.handleNavClick(event),
                },
                createElement('i', {className: 'fas fa-arrow-left fa-xl absolute top-1/2 left-5  '}),
            ),
            createElement('h2', {className: 'text-xl', innerHTML: this.props.title}),
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
