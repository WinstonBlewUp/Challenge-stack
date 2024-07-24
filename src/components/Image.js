import {createElement} from '../core/DomUtils.js';
import {Component} from '../core/Component.js';

export class Image extends Component {
    constructor(props) {
        super(props);
        this.image = null;
    }

    render() {
        return createElement('img', {
            src: this.props.image,
            alt: this.props.name,
            className: ''
        })
    }
}