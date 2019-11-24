const Response = require('../utils/response');

const successResponse = (res, data, message = 'OK', code = Response.HTTP_OK, extras = {}) => {
    return res.status(code).send({
        code,
        message,
        data
    });
};

const showMessageResponse = (res, message, code = Response.HTTP_OK) => {
    return res.status(code).send({
        code,
        message
    });
};

const errorResponse = (res, message, code = Response.HTTP_INTERNAL_SERVER_ERROR, extras = {}) => {
    return res.status(code).send(Object.assign({code, message}, extras));
};

module.exports = {
    successResponse,
    errorResponse,
    showMessageResponse
};