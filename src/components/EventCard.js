import {Component} from '../core/Component.js';
import {createElement} from '../core/DomUtils.js';

export class EventCard extends Component {
    constructor(props) {
        super(props);
        this.eventCard = null;
    }

    render() {
        return createElement('div', {
                className: 'event-card',
                id: this.props.id,
                onClick: this.props.onClick,
                style: ''
            },
            createElement('img', {
                src: this.props.image,
                alt: this.props.name,
                className: 'event-card-image',
                style: 'width: 100%;'
            }),
            createElement('div', {className: 'event-card-info'},
                createElement('h3', {className: 'event-card-name', innerHTML: this.props.name}),
            ),
            createElement('button', {
                className: 'event-card-button',
                onClick: this.props.onButtonClick,
                innerHTML: this.props.name
            },)
        );
    }
}
