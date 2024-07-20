import { RootComponent } from './RootComponent.js';
import { Counter } from './components/counter.js';
import { createElement } from './utils/DomUtils.js';

class App extends RootComponent {
    constructor(props) {
        super(props);
        this.counter = new Counter({ initialCount: 0 });
    }

    render() {
        return createElement('div', { id: 'app-container' },
            createElement('div',{id:'app-message'}, 'Hello World !'),
            this.counter.render()
        );
    }
}

const appInstance = new App({});
appInstance.display();
