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
            if (rendered instanceof Component) {
                rendered.display(rendered.props);
                return rendered;
            }
            return rendered;
        }
        return null;
    }

    shouldUpdate(newProps) {
        return JSON.stringify(newProps) !== JSON.stringify(this.oldProps);
    }

    render() {
        throw new Error('Component should implement render method');
    }
}
