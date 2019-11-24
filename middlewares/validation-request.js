const expressValidator = require('express-validator');
const Tools = require('../utils/tools');
const ApiResponse = require('../utils/api-response');
const Response = require('../utils/response');

exports.handle = (req, res, next) => {
    const errors = expressValidator.validationResult(req);
    
    if (!errors.isEmpty()) {
        return ApiResponse.errorResponse(res, 'Form validation failed', Response.HTTP_UNPROCESSABLE_ENTITY, { errors: Tools.getValidationErrors(errors.array()) });
    }

    next();
};