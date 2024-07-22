import { createElement } from '../utils/DomUtils.js';
import { RootComponent } from '../RootComponent.js';

export class Counter2 extends RootComponent {
    constructor(props) {
        super(props);
        this.state = { count: this.props.initialCount || 0 };
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
    }

    increment() {
        const newCount = this.state.count + 1;
        this.setState({ count: newCount });
    }

    decrement() {
        const newCount = this.state.count - 1;
        this.setState({ count: newCount });
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.display({ ...this.props, ...this.state });
    }

    render() {
        return createElement('div', { id: this.props.id },
            createElement('h1', {}, `Count: ${this.state.count}`),
            createElement('button', { onClick: this.increment }, 'Increment'),
            createElement('button', { onClick: this.decrement }, 'Decrement')
        );
    }
}
