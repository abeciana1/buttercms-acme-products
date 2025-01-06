export const toPascalCase = (str) => {
    return str?.replace(/(^\w|_\w)/g, (match) => match.replace('_', '').toUpperCase());
};

export const slugify = (text) => {
    return text
        ?.toLowerCase()
        ?.replace(/[^a-z0-9\s-]/g, '')
        ?.trim()
        ?.replace(/\s+/g, '-')
        ?.replace(/-+/g, '-')
};

export const generateAlphanumericId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        result += characters.charAt(randomIndex);
    }

    return result;
}

export const createPattern = (allowNumbers, allowSpecialChars, checkEmail) => {
    let pattern = `^[^`;
    if (!allowNumbers) {
        pattern += '0-9';
    }
    if (!allowSpecialChars) {
        pattern += `!@#$%^&*()_+\\-=[\\]{};':"\\|,.<>/?~\`"`;
    }
    pattern += `]*$`;
    return new RegExp(pattern);
};

export const createPatternMessage = (allowNumbers, allowSpecialChars) => {
    let message = "Invalid input";
    if (!allowNumbers) {
        message += ", numbers are not allowed";
    }
    if (!allowSpecialChars) {
        message += ", special characters are not allowed";
    }
    return message;
};

export const checkValidEmailPattern = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}