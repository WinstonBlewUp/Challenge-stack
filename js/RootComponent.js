export class RootComponent {
    constructor(props = {}) {
        this.props = props;
        this.oldProps = {};
        if (!this.props.id) {
            throw new Error("Component must have an id");
        }
        console.log(`RootComponent initialized with props:`, this.props);
    }

    display(newProps = this.props) {
        if (this.shouldUpdate(newProps, this.oldProps)) {
            this.oldProps = this.props;
            this.props = newProps;
            const rendered = this.render();
            this.updateDOM(rendered);
        }
    }

    shouldUpdate(newProps, oldProps) {
        return JSON.stringify(newProps) !== JSON.stringify(oldProps);
    }

    render() {
        throw new Error("Render method must be implemented by subclass");
    }

    updateDOM(rendered) {
        if (!this.props.id) {
            throw new Error("Component must have an id");
        }
        const componentContainer = document.getElementById(this.props.id);
        if (componentContainer) {
            componentContainer.innerHTML = '';
            componentContainer.appendChild(rendered);
        } else {
            console.error("No container found for component ID:", this.props.id);
        }
    }
}



