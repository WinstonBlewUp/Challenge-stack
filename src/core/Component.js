export class Component {
    constructor(props) {
        this.props = props || {};
        this.state = {};
        this.oldProps = {};
    }

    setState(newState) {
        this.state = {...this.state, ...newState};
        this.display(this.props);
    }

    display(newProps) {
        if (this.shouldUpdate(newProps)) {
            this.oldProps = this.props;
            this.props = newProps;
            const rendered = this.render();
            this.updateDOM(rendered);
        }
    }

    shouldUpdate(newProps) {
        return JSON.stringify(newProps) !== JSON.stringify(this.oldProps);
    }

    updateDOM(rendered) {
        if (!this.props.id) {
            throw new Error("Component must have an id");
        }
        const componentContainer = document.getElementById(this.props.id);
        if (componentContainer) {
            componentContainer.replaceWith(rendered);
        } else {
            console.error("No container found for component ID:", this.props.id);
        }
    }
}
