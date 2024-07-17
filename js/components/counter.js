// Counter.js dans le dossier components

function Counter() {
    const [count, setCount] = useState(0); // Utilisation de useState provenant de app.js

    return createElement('div', null,
        createElement('h1', null, `Compteur: ${count}`),
        createElement('button', {
            onClick: () => setCount(count + 1)
        }, 'Incrémenter'),
        createElement('button', {
            onClick: () => setCount(count - 1)
        }, 'Décrémenter')
    );
}
