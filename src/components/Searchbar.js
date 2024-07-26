import { Component } from '../core/Component.js';
import { createElement } from '../core/DomUtils.js';
import { Modal } from './Modal.js';
import { Events } from '../pages/Events.js';

export class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.openModal = this.openModal.bind(this);

        const searchModalContent = this.createSearchModalContent();

        this.modal = new Modal({
            id: 'search-modal',
            className: 'modal-full modal-full-left',
            content: searchModalContent
        });
    }

    handleSearch(event) {
        console.log('Search query:', event.target.value);
    }

    openModal(event) {
        event.preventDefault();
        this.modal.toggleModal();
    }

    createSearchModalContent() {
        const eventsPage = new Events();
        return eventsPage.render()
    }

    render() {
        return createElement('div', { className: 'searchbar flex items-center rounded ' },
            createElement('a', { href: '#', className: 'searchbar-link flex items-center p-2', onclick: this.openModal },
                createElement('div', { className: 'icon1', innerHTML: burgerIcon })
            ),
            createElement('div', { className: 'icon2 p-2', innerHTML: searchIcon }),
            createElement('input', {
                type: 'text',
                className: 'searchbar-input p-2',
                placeholder: 'Search events',
                oninput: this.handleSearch
            }),
            this.modal.render()
        );
    }
}

const searchIcon = `
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.5306 18.4694L14.8366 13.7762C17.6629 10.383 17.3204 5.36693 14.0591 2.38935C10.7978 -0.588237 5.77134 -0.474001 2.64867 2.64867C-0.474001 5.77134 -0.588237 10.7978 2.38935 14.0591C5.36693 17.3204 10.383 17.6629 13.7762 14.8366L18.4694 19.5306C18.7624 19.8237 19.2376 19.8237 19.5306 19.5306C19.8237 19.2376 19.8237 18.7624 19.5306 18.4694ZM1.75 8.5C1.75 4.77208 4.77208 1.75 8.5 1.75C12.2279 1.75 15.25 4.77208 15.25 8.5C15.25 12.2279 12.2279 15.25 8.5 15.25C4.77379 15.2459 1.75413 12.2262 1.75 8.5Z" fill="#4A699C"/>
</svg>
`;

const burgerIcon = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_106_504)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M21 12C21 12.4142 20.6642 12.75 20.25 12.75H3.75C3.33579 12.75 3 12.4142 3 12C3 11.5858 3.33579 11.25 3.75 11.25H20.25C20.6642 11.25 21 11.5858 21 12ZM3.75 6.75H20.25C20.6642 6.75 21 6.41421 21 6C21 5.58579 20.6642 5.25 20.25 5.25H3.75C3.33579 5.25 3 5.58579 3 6C3 6.41421 3.33579 6.75 3.75 6.75ZM20.25 17.25H3.75C3.33579 17.25 3 17.5858 3 18C3 18.4142 3.33579 18.75 3.75 18.75H20.25C20.6642 18.75 21 18.4142 21 18C21 17.5858 20.6642 17.25 20.25 17.25Z" fill="#4A699C"/>
</g>
<defs>
<clipPath id="clip0_106_504">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>
`;