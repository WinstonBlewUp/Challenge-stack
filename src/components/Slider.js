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

        return createElement('div', { className: 'slider relative overflow-hidden h-64' },
            createElement('a', { className: 'slider-button control control-prev absolute top-1/2 left-32 sm:left-2 transform -translate-y-1/2 bg-white text-black p-2 cursor-pointer', onclick: this.moveLeft }, '<'),
            createElement('div', { className: 'slider-container flex' },
                createElement('div', { className: 'slider-item w-full h-full flex-shrink-0' },
                    createElement('img', { src: currentItem.imageSrc, alt: 'Slide Image', className: 'w-75 h-full object-cover' })
                )
            ),
            createElement('a', { className: 'slider-button control control-next absolute top-1/2 right-32 sm:right-2 transform -translate-y-1/2 bg-white text-black p-2 cursor-pointer', onclick: this.moveRight }, '>')
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


