import {Component} from '../core/Component.js';

export class NotFound extends Component {
    render() {
        const element = document.createElement('div');
        element.innerHTML = `
      <h1>404</h1>
      <p>Page not found.</p>
      <a href="/">Go to Home</a>
    `;
        return element;
    }
}
