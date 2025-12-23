export function hasSameProps(obj1, obj2) {
    return obj1.every(function (prop) {
        return obj2.hasOwnProperty(prop);
    });
}