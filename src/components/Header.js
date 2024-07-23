import {Component} from '../core/Component.js';

export class Header extends Component {
    render() {
        const element = document.createElement('header');
        element.innerHTML = `
      <h1>Mini React App</h1>
      <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/event">Event</a>
      </nav>
    `;
        return element;
    }
}
