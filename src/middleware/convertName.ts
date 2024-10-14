export function convertName(name: string) {
    return name
        .split(' ')
        .map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(' ');
}