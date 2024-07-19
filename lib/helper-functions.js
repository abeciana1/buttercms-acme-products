export const toPascalCase = (str) => {
    return str.replace(/(^\w|_\w)/g, (match) => match.replace('_', '').toUpperCase());
};

export const slugify = (text) => {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
};