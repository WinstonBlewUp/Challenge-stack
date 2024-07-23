import {RootComponent} from './RootComponent.js';
import {Counter} from './components/counter.js';
import {Counter2} from './components/counter2.js';
import {createElement} from './utils/DomUtils.js';

class App extends RootComponent {
    constructor(props) {
        super(props);
        this.counter = new Counter({id: 'counter-component', initialCount: 0});
        this.counter2 = new Counter2({id: 'counter2-component', initialCount: 1});
        console.log("App initialized with props:", this.props);
    }

    render() {
        return createElement('div', {id: 'app-container'},
            createElement('div', {id: 'app-message'}, 'Hello World !'),
            this.counter.render(),
            createElement('h2', {id: 'app-separator'}, '--------------'),
            this.counter2.render()
        );
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const appInstance = new App({id: 'app'});
    const root = document.getElementById('root');
    root.appendChild(createElement('div', {id: 'app'}));
    appInstance.display();
});

