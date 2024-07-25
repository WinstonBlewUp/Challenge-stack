import {Component} from '../core/Component.js';
import {createElement} from "../core/DomUtils.js";
import { Navbar } from '../components/Navbar.js';

export class Site extends Component {
    constructor(props) {
        super(props);
        this.Navbar = new Navbar({id: 'navbar'});
    }

    render() {
        return createElement('div', {id: 'site-page'},
            createElement('div', {id: 'site-information', className: 'flex flex-col gap-10 p-5'}),
            this.Navbar.render(),
        );
    }
}

async function fetchSiteData() {
    try {
        const response = await fetch();
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Error fetching event data:', error);
        return [];
    }

}