import {Component} from '../core/Component.js';

export class Footer extends Component {
    render() {
        const element = document.createElement('footer');
        element.innerHTML = `
      <p>&copy; 2024 Mini React App</p>
    `;
        return element;
    }
}
