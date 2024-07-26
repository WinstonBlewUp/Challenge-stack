import {Component} from '../core/Component.js';
import {createElement} from '../core/DomUtils.js';
import {EventModal} from "./EventModal.js";

export class EventCard extends Component {
    constructor(props) {
        super(props);

        const searchModalContent = this.createSearchModalContent();

        this.eventModal = new EventModal({
            id: `modal-${props.id}`,
            className: 'modal-full modal-full-width',
            content: searchModalContent
        });

        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const isLiked = favorites.includes(props.id);

        this.state = {
            isLiked: isLiked
        };

        this.toggleFavorite = this.toggleFavorite.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    toggleFavorite() {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const index = favorites.indexOf(this.props.id);

        if (index === -1) {
            favorites.push(this.props.id);
            this.setState({isLiked: true});
        } else {
            favorites.splice(index, 1);
            this.setState({isLiked: false});
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));
        this.render();
    }

    openModal(event) {
        event.preventDefault();
        this.eventModal.toggleModal();
    }

    createSearchModalContent() {
        return createElement('div', {className: 'h-full flex flex-col justify-start aligns-center mt-5'},

            createElement('h2', {className: 'text-2xl font-bold text-center my-5', innerHTML: this.props.name}),
            createElement('img', {
                src: this.props.image,
                alt: this.props.name,
                className: 'h-52 rounded-lg mx-auto mb-5',
            }),
            createElement('p', {className: 'text-gray-800 text-sm mb-6', innerHTML: this.props.description}),
            createElement('p', {className: 'text-gray-500 text-sm mb-5', innerHTML: this.props.location}),
            createElement('p', {className: 'text-gray-800 font-bold text-sm mb-5', innerHTML: `Du ` + new Date(this.props.dateStart).toLocaleDateString() + ` au ` + new Date(this.props.dateEnd).toLocaleDateString()}),
            createElement('p', {className: 'text-gray-800 text-sm mb-5', innerHTML: this.props.discipline}),
        );
    }

    render() {
        const likedClass = this.state.isLiked ? 'fas fa-heart fa-2xl text-red-500' : 'far fa-heart fa-2xl';

        return createElement('div', {
                className: 'event-card relative flex flex-col bg-gray-100 rounded-lg p-5',
                id: this.props.id,
            },
            createElement('div', {className: 'event-card-info'},
                createElement('h2', {className: 'text-xl font-bold mb-5', innerHTML: this.props.discipline}),
                createElement('h3', {className: 'text-gray-800', innerHTML: this.props.name}),
                createElement('p', {className: 'text-gray-500 text-sm mb-5', innerHTML: this.props.location}),
            ),
            createElement('img', {
                src: this.props.image,
                alt: this.props.name,
                className: 'h-52 rounded-lg',
            }),
            createElement('div', {className: 'flex justify-center items-center gap-16 mt-5 py-3'},
                createElement('i', {
                    className: likedClass,
                    onclick: this.toggleFavorite,
                }),
                createElement('i', {
                    className: 'fas fa-info-circle fa-2xl text-blue-500 ',
                    onclick: this.openModal
                }),
            ),
            this.eventModal.render(),
        );
    }
}
