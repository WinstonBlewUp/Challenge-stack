import { createElement } from "../core/DomUtils.js";
import { Component } from "../core/Component.js";

export class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return createElement(
            'a',
            {
              href: this.props.href,
              className: `button-link ${this.props.className}` 
            },
            this.props.text || 'Button'
        );
    }
}

