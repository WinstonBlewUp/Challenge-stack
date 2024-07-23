import {Router} from './core/Router.js';
import {Home} from './pages/Home.js';
import {About} from './pages/About.js';
import {Event} from './pages/Event.js';
import {NotFound} from './pages/NotFound.js';

const routes = {
    '/': new Home(),
    '/about': new About(),
    '/event': new Event(),
    '/404': new NotFound()
};

const router = new Router(routes);
router.renderRoute();

document.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('click', function (event) {
        event.preventDefault();
        const path = this.getAttribute('href');
        router.navigate(path);
    });
});
