import {Component} from '../core/Component.js';
import {createElement} from '../core/DomUtils.js';

export class Navbar extends Component {
    constructor(props) {
        super(props);
        this.isModalOpen = false;
        this.toggleModal = this.toggleModal.bind(this);
    }

    render() {
        const currentPath = window.location.pathname;

        return createElement('div', {id: 'navbar-container'},
            createElement('div', {id: 'navbar', className: `w-full fixed bottom-0 bg-white rounded-t-xl md:hidden ${this.isModalOpen ? 'no-shadow' : ''}`},
                createElement('div', {className: `navbar-bar ${this.isModalOpen ? 'hidden' : ''}`, onclick: this.toggleModal}),
                createElement('div', {className: 'flex justify-around items-center h-24'},
                    this.createNavItem('Accueil', homeIcon, '/', currentPath),
                    this.createNavItem('Événements', eventsIcon, '/events', currentPath),
                    this.createNavItem('Favoris', favoriteIcon, '/favorite', currentPath),
                    this.createNavItem('Billetterie', ticketIcon, '/ticket', currentPath)
                )
            ),
            this.createModal()
        );
    }

    createNavItem(label, iconSvg, href, currentPath) {
        const isActive = currentPath === href;
        const linkClassName = isActive ? 'flex flex-col items-center text-black font-bold text-red-500 nav-link' : 'flex flex-col items-center text-gray-600 nav-link';
        const iconClassName = isActive ? 'h-8 mb-1 text-black font-bold text-red-500' : 'h-8 mb-1';
        return createElement('a', {href: `${href}`, className: linkClassName},
            createElement('div', {className: iconClassName, innerHTML: iconSvg}),
            createElement('span', {className: 'text-sm'}, label)
        );
    }

    createModal() {
        const modalClass = this.isModalOpen ? 'modal open' : 'modal';
        return createElement('div', {className: modalClass},
            createElement('div', {className: 'modal-content'},
                createElement('div', {className: 'navbar-bar', onclick: this.toggleModal}),
                createElement('p', {}, 'Additional content goes here')
            )
        );
    }

    toggleModal() {
        this.isModalOpen = !this.isModalOpen;

        const navbar = document.getElementById('navbar');
        const navbarBar = navbar.querySelector('.navbar-bar');

        if (this.isModalOpen) {
            navbar.classList.add('no-shadow');
            navbarBar.classList.add('hidden');
        } else {
            navbar.classList.remove('no-shadow');
            navbarBar.classList.remove('hidden');
        }
        const modalElement = document.querySelector('.modal');
        if (modalElement) {
            if (this.isModalOpen) {
                modalElement.classList.add('open');
            } else {
                modalElement.classList.remove('open');
            }
        }
    }
}


const homeIcon = `
<svg width="25" height="32" viewBox="0 0 25 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_43_604)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M21.1169 13.7284L13.6169 6.65219C13.6132 6.64899 13.6098 6.64554 13.6066 6.64188C13.0344 6.1215 12.1603 6.1215 11.5881 6.64188L11.5778 6.65219L4.08625 13.7284C3.77729 14.0125 3.6015 14.4131 3.60156 14.8328V23.5C3.60156 24.3284 4.27314 25 5.10156 25H9.60156C10.43 25 11.1016 24.3284 11.1016 23.5V19H14.1016V23.5C14.1016 24.3284 14.7731 25 15.6016 25H20.1016C20.93 25 21.6016 24.3284 21.6016 23.5V14.8328C21.6016 14.4131 21.4258 14.0125 21.1169 13.7284ZM20.1016 23.5H15.6016V19C15.6016 18.1716 14.93 17.5 14.1016 17.5H11.1016C10.2731 17.5 9.60156 18.1716 9.60156 19V23.5H5.10156V14.8328L5.11188 14.8234L12.6016 7.75L20.0922 14.8216L20.1025 14.8309L20.1016 23.5Z" fill="currentColor"/>
  </g>
  <defs>
    <clipPath id="clip0_43_604">
      <rect width="24" height="24" fill="white" transform="translate(0.601562 4)"/>
    </clipPath>
  </defs>
</svg>`;

const eventsIcon = `
<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_43_564)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M20.3047 3H18.0547V2.25C18.0547 1.83579 17.7189 1.5 17.3047 1.5C16.8905 1.5 16.5547 1.83579 16.5547 2.25V3H9.05469V2.25C9.05469 1.83579 8.7189 1.5 8.30469 1.5C7.89047 1.5 7.55469 1.83579 7.55469 2.25V3H5.30469C4.47626 3 3.80469 3.67157 3.80469 4.5V19.5C3.80469 20.3284 4.47626 21 5.30469 21H20.3047C21.1331 21 21.8047 20.3284 21.8047 19.5V4.5C21.8047 3.67157 21.1331 3 20.3047 3ZM11.3047 17.25C11.3047 17.6642 10.9689 18 10.5547 18C10.1405 18 9.80469 17.6642 9.80469 17.25V12.4631L9.39031 12.6713C9.01959 12.8566 8.5688 12.7063 8.38344 12.3356C8.19808 11.9649 8.34834 11.5141 8.71906 11.3287L10.2191 10.5787C10.4516 10.4624 10.7279 10.4748 10.9491 10.6116C11.1703 10.7483 11.3049 10.9899 11.3047 11.25V17.25ZM16.5547 16.5C16.9689 16.5 17.3047 16.8358 17.3047 17.25C17.3047 17.6642 16.9689 18 16.5547 18H13.5547C13.2706 18 13.0109 17.8395 12.8839 17.5854C12.7568 17.3313 12.7842 17.0273 12.9547 16.8L15.6528 13.2028C15.82 12.9802 15.8502 12.6833 15.7311 12.4316C15.612 12.1799 15.3633 12.0149 15.0851 12.003C14.8069 11.9912 14.5451 12.1344 14.405 12.375C14.2749 12.6146 14.025 12.7647 13.7523 12.7671C13.4797 12.7694 13.2272 12.6236 13.093 12.3863C12.9588 12.1489 12.964 11.8574 13.1066 11.625C13.6159 10.7435 14.6537 10.3139 15.6371 10.5774C16.6205 10.8409 17.3043 11.7319 17.3047 12.75C17.3063 13.2391 17.1468 13.7152 16.8509 14.1047L15.0547 16.5H16.5547ZM5.30469 7.5V4.5H7.55469V5.25C7.55469 5.66421 7.89047 6 8.30469 6C8.7189 6 9.05469 5.66421 9.05469 5.25V4.5H16.5547V5.25C16.5547 5.66421 16.8905 6 17.3047 6C17.7189 6 18.0547 5.66421 18.0547 5.25V4.5H20.3047V7.5H5.30469Z" fill="currentColor"/>
  </g>
  <defs>
    <clipPath id="clip0_43_564">
      <rect width="24" height="24" fill="white" transform="translate(0.804688)"/>
    </clipPath>
  </defs>
</svg>`;

const favoriteIcon = `
<svg width="24" height="32" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_43_572)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.6953 7C14.7594 7 13.0644 7.8325 12.0078 9.23969C10.9513 7.8325 9.25625 7 7.32031 7C4.11166 7.00362 1.51143 9.60384 1.50781 12.8125C1.50781 19.375 11.2381 24.6869 11.6525 24.9062C11.8743 25.0256 12.1413 25.0256 12.3631 24.9062C12.7775 24.6869 22.5078 19.375 22.5078 12.8125C22.5042 9.60384 19.904 7.00362 16.6953 7ZM12.0078 23.3875C10.2959 22.39 3.00781 17.8459 3.00781 12.8125C3.01091 10.4321 4.93987 8.5031 7.32031 8.5C9.14375 8.5 10.6747 9.47125 11.3141 11.0312C11.4296 11.3126 11.7037 11.4963 12.0078 11.4963C12.312 11.4963 12.586 11.3126 12.7016 11.0312C13.3409 9.46844 14.8719 8.5 16.6953 8.5C19.0758 8.5031 21.0047 10.4321 21.0078 12.8125C21.0078 17.8384 13.7178 22.3891 12.0078 23.3875Z" fill="currentColor"/>
  </g>
  <defs>
    <clipPath id="clip0_43_572">
      <rect width="24" height="24" fill="white" transform="translate(0.0078125 4)"/>
    </clipPath>
  </defs>
</svg>`;

const ticketIcon = `
<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_43_582)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M21.51 9.795C22.2085 9.65288 22.7105 9.03878 22.7109 8.32594V6C22.7109 5.17157 22.0394 4.5 21.2109 4.5H3.21094C2.38251 4.5 1.71094 5.17157 1.71094 6V8.32594C1.71133 9.03878 2.21335 9.65288 2.91188 9.795C3.9562 10.0116 4.70499 10.9316 4.70499 11.9981C4.70499 13.0647 3.9562 13.9847 2.91188 14.2013C2.21197 14.3437 1.70954 14.9598 1.71094 15.6741V18C1.71094 18.8284 2.38251 19.5 3.21094 19.5H21.2109C22.0394 19.5 22.7109 18.8284 22.7109 18V15.6741C22.7105 14.9612 22.2085 14.3471 21.51 14.205C20.4657 13.9884 19.7169 13.0684 19.7169 12.0019C19.7169 10.9353 20.4657 10.0153 21.51 9.79875V9.795ZM3.21094 15.675C4.95759 15.3192 6.21239 13.783 6.21239 12.0005C6.21239 10.2179 4.95759 8.68175 3.21094 8.32594V6H8.46094V18H3.21094V15.675ZM21.2109 15.675V18H9.96094V6H21.2109V8.325C19.4643 8.68081 18.2095 10.217 18.2095 11.9995C18.2095 13.7821 19.4643 15.3182 21.2109 15.6741V15.675Z" fill="currentColor"/>
  </g>
  <defs>
    <clipPath id="clip0_43_582">
      <rect width="24" height="24" fill="white" transform="translate(0.210938)"/>
    </clipPath>
  </defs>
</svg>`;




