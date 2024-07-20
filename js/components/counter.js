import { createElement } from '../utils/DomUtils.js';
import { RootComponent } from '../RootComponent.js';

export class Counter extends RootComponent {
    constructor(props) {
        super(props);
        this.state = { count: this.props.initialCount || 0 };
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        console.log("Counter initialized with count:", this.state.count);
    }

    increment = () => {
        console.log("Before increment:", this.state.count);
        const newCount = this.state.count + 1;
        this.setState({ count: newCount });
        console.log("After increment:", this.state.count);
    }
    
    decrement = () => {
        console.log("Before decrement:", this.state.count);
        const newCount = this.state.count - 1;
        this.setState({ count: newCount });
        console.log("After decrement:", this.state.count);
    }
    
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.display(this.state);
    }

    
    render() {
        console.log("Rendering Counter with count:", this.state.count);
        return createElement('div', { id: this.props.id },
            createElement('h1', {}, `Count: ${this.state.count}`),
            createElement('button', { onClick: this.increment }, 'Increment'),
            createElement('button', { onClick: this.decrement }, 'Decrement')
        );
    }
}
