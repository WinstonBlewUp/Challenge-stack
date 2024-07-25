import {createElement} from "../core/DomUtils.js";
import {Component} from "../core/Component.js";

export class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false
        };
    }

    toggleMenu() {
        this.setState({showMenu: !this.state.showMenu});
    }

    handleOptionClick(option) {
        this.setState({showMenu: false});
        if (this.props.onSelect) {
            this.props.onSelect(option);
        }
    }

    render() {
        const {buttonLabel, options} = this.props;
        const {showMenu} = this.state;

        const menuItems = options.map((option, index) =>
            createElement('a', {
                href: '#',
                className: 'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100',
                onclick: (event) => {
                    event.preventDefault();
                    this.handleOptionClick(option);
                }
            }, option.label)
        );

        return createElement('div', {className: 'relative inline-block text-left'},
            createElement('div', {className: 'group'},
                createElement('button', {
                        type: 'button',
                        className: 'inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:bg-gray-700',
                        onclick: () => this.toggleMenu()
                    },
                    buttonLabel,
                    createElement('svg', {className: 'w-4 h-4 ml-2 -mr-1', xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 20 20', fill: 'currentColor'},
                        createElement('path', {fillRule: 'evenodd', d: 'M10 12l-5-5h10l-5 5z'})
                    )
                ),
                createElement('div', {
                        className: `absolute left-0 w-40 mt-1 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg ${showMenu ? 'opacity-100 visible' : 'opacity-0 invisible'} transition duration-300`
                    },
                    createElement('div', {className: 'py-1'}, ...menuItems)
                )
            )
        );
    }
}
