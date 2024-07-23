String.prototype.interpolate = function (obj) {
    return this.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
        const keys = key.split('.').map(k => k.trim());
        return keys.reduce((prev, curr) => prev ? prev[curr] : '', obj) || '';
    });
};
