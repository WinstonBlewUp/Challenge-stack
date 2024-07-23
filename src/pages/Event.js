import {Component} from '../core/Component.js';

export class Event extends Component {
    render() {
        const element = document.createElement('div');
        element.innerHTML = `
      <h1>Event Page</h1>
      <p>Details about the event.</p>
      <a href="/">Go to Home</a> | <a href="/about">Go to About</a>
    `;
        return element;
    }
}
