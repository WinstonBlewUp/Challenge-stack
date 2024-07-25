import {Component} from '../core/Component.js';
import {createElement} from '../core/DomUtils.js';

export class EventCard extends Component {
    constructor(props) {
        super(props);

        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const isLiked = favorites.includes(props.id);

        this.state = {
            isLiked: isLiked
        };

        this.toggleFavorite = this.toggleFavorite.bind(this);
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

    render() {
        const likedClass = this.state.isLiked ? 'fas fa-heart fa-2xl absolute top-7 right-3 text-red-500' : 'far fa-heart fa-2xl absolute top-7 right-3';

        return createElement('div', {
                className: 'event-card relative flex flex-col bg-gray-100 rounded-lg p-5',
                id: this.props.id,
            },
            createElement('i', {
                className: likedClass,
                onclick: this.toggleFavorite,
            }),
            createElement('div', {className: 'event-card-info'},
                createElement('h2', {className: 'text-xl font-bold mb-5', innerHTML: this.props.discipline}),
                createElement('h3', {className: 'text-gray-800', innerHTML: this.props.name}),
                createElement('p', {className: 'text-gray-500 text-sm mb-5', innerHTML: this.props.location}),
                createElement('p', {className: 'text-gray-800 text-sm mb-6', innerHTML: this.props.description}),
            ),
            createElement('img', {
                src: this.props.image,
                alt: this.props.name,
                className: 'h-52 rounded-lg',
            }),
            createElement('a', {
                href: '#',
                className: 'bg-blue-300 hover:bg-blue-500 rounded-full mt-5 w-1/2 mx-auto flex justify-center items-center py-2',
                innerHTML: 'En savoir plus',
            }),
        );
    }
}
