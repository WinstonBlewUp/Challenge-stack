import {Component} from '../core/Component.js';

export class Home extends Component {
    render() {
        const element = document.createElement('div');
        element.innerHTML = `
      <h1>Home Page</h1>
      <p>Welcome to the home page!</p>
      <a href="/about">Go to About</a> | <a href="/event">Go to Event</a>
    `;
        return element;
    }
}
