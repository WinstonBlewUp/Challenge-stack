import {Component} from './Component.js';

export class Router {
    constructor(routes) {
        this.routes = routes;
        window.addEventListener('popstate', () => this.renderRoute());
    }

    navigate(path) {
        history.pushState(null, null, path);
        this.renderRoute();
        this.displayRoute();

        const routeChangeEvent = new CustomEvent('routeChange', {detail: {path}});
        window.dispatchEvent(routeChangeEvent);
    }

    renderRoute() {
        const path = window.location.pathname;
        const route = this.routes[path] || this.routes['/404'];
        const root = document.getElementById('root');
        root.innerHTML = '';
        let element;
        if (route instanceof Component) {
            element = route.render();
        } else {
            element = route();
        }
        root.appendChild(element);
        this.initLinks();
    }

    displayRoute() {
        const path = window.location.pathname;
        const route = this.routes[path] || this.routes['/404'];
        route.display(route.props);
    }

    initLinks() {
        const links = document.querySelectorAll('a.nav-link');
        links.forEach(link => {
            link.addEventListener('click', (event) => {
                if (event.target.matches('a.nav-link')) {
                    const href = link.getAttribute('href');
                    if (href.startsWith('/')) {
                        event.preventDefault();
                        this.navigate(href);
                    }
                }
            });
        });
    }
}
