const states = [];
let stateCursor = 0;

// créée un élément avec 3 params : le type, props et children de l'élement
// pour props si clé = on, on attache l'évenement. si = style alors on attache le style
function createElement(type, props, ...children) {
    const element = document.createElement(type);
    Object.keys(props || {}).forEach(key => {
        if (key.startsWith("on") && key.toLowerCase() in window) {
            element.addEventListener(key.toLowerCase().substr(2), props[key]);
        } else if (key === "style" && typeof props[key] === "object") {
            Object.assign(element.style, props[key]);
        } else {
            element[key] = props[key];
        }
    });
    children.forEach(child => {
        if (typeof child === "string") {
            element.appendChild(document.createTextNode(child));
        } else {
            element.appendChild(child);
        }
    });
    return element;
}

function useState(initialState) {
    const FROZEN_CURSOR = stateCursor;
    states[FROZEN_CURSOR] = states[FROZEN_CURSOR] || initialState; 
    const setState = (newState) => {
        states[FROZEN_CURSOR] = newState;
        rerender();  
    };
    stateCursor++; 
    return [states[FROZEN_CURSOR], setState];
}

function rerender() {
    stateCursor = 0;
    const root = document.querySelector('#root');
    root.firstChild.remove();
    render(App(), root);
}// réinitialise l'état global à modifier pour rerender uniquement les compo dont l'état à changé

function render(component, container) {
    container.appendChild(component);
}

function App() {
    return createElement('div', null,
        Counter()
    );       
}// ajouter component dans la div + index

const root = document.getElementById('root');
render(App(), root);
