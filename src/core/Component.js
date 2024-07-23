export class Component {
    constructor(props) {
        this.props = props || {};
        this.oldProps = {};
    }

    display(newProps) {
        if (this.shouldUpdate(newProps)) {
            this.oldProps = this.props;
            this.props = newProps;
            const rendered = this.render();
            this.updateDOM(rendered);
        }
        return null;
    }

    shouldUpdate(newProps) {
        return JSON.stringify(newProps) !== JSON.stringify(this.oldProps);
    }

    render() {
        throw new Error('Component should implement render method');
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
