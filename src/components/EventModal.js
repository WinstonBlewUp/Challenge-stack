import {Component} from '../core/Component.js';
import {createElement} from '../core/DomUtils.js';

export class EventModal extends Component {
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

        return createElement('div', {id: this.props.id, className: modalClass, onclick: this.closeOnOutsideClick.bind(this)},
            createElement('div', {
                    className: 'bg-white p-8 overflow-y-auto top-0 w-full h-full absolute',
                    style: ' z-index: 1200',
                    onclick: (e) => e.stopPropagation()
                },
                createElement('button', {className: 'close-button absolute top-0 left-0 py-8 px-4 text-2xl', onclick: this.toggleModal},
                    createElement('i', {className: 'fas fa-arrow-left'})
                ), content)
        );
    }

    closeOnOutsideClick(event) {
        if (event.target.classList.contains('modal')) {
            this.toggleModal();
        }
    }
}


