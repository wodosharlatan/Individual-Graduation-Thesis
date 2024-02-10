function isNull(value) {
    // Check if the value is null or undefined
    if (value === null || value === undefined) {
        return true;
    }

    // Check if the value is a string and if it's empty after trimming
    if (typeof value === 'string' && value.trim() === '') {
        return true;
    }

    // For numbers, we don't consider 0 as empty
    if (typeof value === 'number') {
        return false;
    }

    return false;
}

module.exports = isNull;