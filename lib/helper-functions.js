export const toPascalCase = (str) => {
    return str.replace(/(^\w|_\w)/g, (match) => match.replace('_', '').toUpperCase());
};