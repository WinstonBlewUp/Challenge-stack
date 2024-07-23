import {Component} from '../core/Component.js';
import {createElement} from "../core/DomUtils.js";
import {Counter} from "../components/Counter.js";
import {Counter2} from "../components/Counter2.js";

export class Home extends Component {
    constructor(props) {
        super(props);
        this.counter = new Counter({id: 'counter1', initialCount: 1});
        this.counter2 = new Counter2({id: 'counter2', initialCount: 2});
    }

    render() {
        return createElement('div', {id: 'home-page'},
            createElement('h1', {}, 'Home Page'),
            createElement('a', {href: '/', className: 'nav-link'}, 'Go to Home'),
            createElement('br'),
            createElement('a', {href: '/event', className: 'nav-link'}, 'Go to Events'),
            createElement('br'),
            createElement('a', {href: '/favorite', className: 'nav-link'}, 'Go to Favorites'),
            createElement('br'),
            createElement('a', {href: '/ticket', className: 'nav-link'}, 'Go to Tickets'),
            this.counter.render(),
            this.counter2.render()
        );
    }
}
