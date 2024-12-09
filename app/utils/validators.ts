export const isRequired = (value: any) => {
    let isValid = true;
    Object.keys(value).forEach((key) => {
        if (
            value[key] === '' ||
            value[key] === null ||
            value[key] === undefined ||
            value[key] === false ||
            (typeof value[key] === 'object' && Object.keys(value[key]).length === 0) ||
            (typeof value[key] === 'object' && value["@assetType"] === undefined) ||
            (typeof value[key] === 'object' && value[key].length === 0)
        ) {
            isValid = false;
        }
    });

    return isValid;
};