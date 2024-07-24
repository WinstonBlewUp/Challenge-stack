import { Component } from '../core/Component.js';
import { createElement } from '../core/DomUtils.js';

export class Slider extends Component {
    constructor(props) {
        super(props);
        this.currentIndex = 0;
        this.items = props.items || [];
        this.moveLeft = this.moveLeft.bind(this);
        this.moveRight = this.moveRight.bind(this);
    }

    moveLeft() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.update();
        }
    }

    moveRight() {
        if (this.currentIndex < this.items.length - 1) {
            this.currentIndex++;
            this.update();
        }
    }

    render() {
        const currentItem = this.items[this.currentIndex];

        return createElement('div', { className: 'slider' },
            createElement('a', { className: 'control_prev', onclick: this.moveLeft }, '<'),
            createElement('div', { className: 'slider-container' },
                createElement('div', { className: 'slider-item', style: `background: ${currentItem.color}` }, 'Slide Content')
            ),
            createElement('a', { className: 'control_next', onclick: this.moveRight }, '>')
        );
    }

    update() {
        const sliderElement = document.querySelector('.slider');
        if (sliderElement) {
            sliderElement.innerHTML = '';
            sliderElement.appendChild(this.render());
        }
    }
}
