import { Component } from '../core/Component.js';
import { createElement } from '../core/DomUtils.js';

export class Modal extends Component {
    constructor(props) {
        super(props);
        this.isOpen = false;
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.openModal();
        } else {
            this.closeModal();
        }
    }

    openModal() {
        const modalElement = document.getElementById(this.props.id);
        if (modalElement) {
            modalElement.classList.remove('hidden');
            modalElement.classList.add('open');
        }
    }

    closeModal() {
        const modalElement = document.getElementById(this.props.id);
        if (modalElement) {
            modalElement.classList.remove('open');
            modalElement.classList.add('hidden');
        }
    }

    render() {
        const modalClass = this.isOpen ? `${this.props.className} open` : `${this.props.className} hidden`;

        const content = this.props.content;

        const modalElement = createElement('div', { id: this.props.id, className: modalClass, onclick: this.closeOnOutsideClick.bind(this) },
            createElement('div', { className: 'modal-content bg-white p-8 rounded-lg shadow-lg max-w-90 max-h-90 overflow-y-auto relative transition-transform transform translate-y-12', onclick: (e) => e.stopPropagation() },
                createElement('button', { className: 'close-button absolute top-4 right-4 text-2xl cursor-pointer', onclick: this.toggleModal }, '×'),
                content
            )
        );

        return modalElement;
    }

    closeOnOutsideClick(event) {
        if (event.target.classList.contains('modal')) {
            this.toggleModal();
        }
    }
}


