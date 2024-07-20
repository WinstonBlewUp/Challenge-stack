export class RootComponent {
    constructor(props) {
        this.props = props;
        this.oldProps = {};
    }

    display(newProps) {
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
        const root = document.getElementById('root');
        root.innerHTML = '';
        root.appendChild(rendered);
    }
}
