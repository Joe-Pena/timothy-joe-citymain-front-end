export const required = value => (value ? undefined : 'All fields are required');
export const nonEmpty = value =>
    value.trim() !== '' ? undefined : 'Field cannot be empty';
export const isTrimmed = value =>
    value.trim() === value ? undefined : 'Cannot start or end with whitespace';
export const length = length => value => {
    if (length.min && value.length < length.min) {
        return `Password must be at least ${length.min} characters long`;
    }
    if (length.max && value.length > length.max) {
        return `Password must be at most ${length.max} characters long`;
    }
};
export const matches = field => (value, allValues) =>
    field in allValues && value.trim() === allValues[field].trim()
        ? undefined
        : 'Passwords do not match';
