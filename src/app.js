import {Router} from './core/Router.js';
import {Home} from './pages/Home.js';
import {Event} from './pages/Event.js';
import {Events} from './pages/Events.js';
import {Favorite} from './pages/Favorite.js';
import {Ticket} from './pages/Ticket.js';
import {NotFound} from './pages/NotFound.js';

const routes = {
    '/': new Home(),
    '/event': new Event(),
    '/events': new Events(),
    '/favorite': new Favorite(),
    '/ticket': new Ticket(),
    '/404': new NotFound()
};

const router = new Router(routes);
router.renderRoute();
router.displayRoute();

export { router };