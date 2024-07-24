export function createElement(type, props, ...children) {
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