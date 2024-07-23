import {Component} from './Component.js';

export class Router {
    constructor(routes) {
        this.routes = routes;
        window.addEventListener('popstate', () => this.renderRoute());
    }

    navigate(path) {
        history.pushState(null, null, path);
        this.renderRoute();
    }

    renderRoute() {
        const path = window.location.pathname;
        const route = this.routes[path] || this.routes['/404'];
        const root = document.getElementById('root');
        root.innerHTML = '';
        if (route instanceof Component) {
            route.display(route.props);
            root.appendChild(route.render());
        } else {
            root.appendChild(route());
        }
    }
}
