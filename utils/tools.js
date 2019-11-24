const convertIncludesToArray = (value) => {
    if (!value) {
        return [];
    }

    return value.split(',');
};

const resolveRelationships = (values, relationships) => {
    const includes = convertIncludesToArray(values);

    if(includes.length === 0) {
        return [];
    }

    return relationships.filter(item => {
        return includes.includes(item.as);
    });
};

const getValidationErrors = (errors) => {
    const errorResponse = [];

    errors.forEach(error => {
        errorResponse.push({
            field: error.param,
            message: error.msg
        });
    });

    return errorResponse;
};

module.exports = {
    resolveRelationships,
    convertIncludesToArray,
    getValidationErrors
};