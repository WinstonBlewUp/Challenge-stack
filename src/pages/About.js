import {Component} from '../core/Component.js';

export class About extends Component {
    render() {
        const element = document.createElement('div');
        element.innerHTML = `
      <h1>About Page</h1>
      <p>This is the about page.</p>
      <a href="/">Go to Home</a> | <a href="/event">Go to Event</a>
    `;
        return element;
    }
}
