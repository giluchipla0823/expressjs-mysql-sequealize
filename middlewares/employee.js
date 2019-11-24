const EmployeeModel = require('../models').Employee;
const Response = require('../utils/response');
const ApiResponse = require('../utils/api-response');

exports.findEmployeeById = (req, res, next) => {
    return EmployeeModel.findByPk(req.params.id)
        .then(employee => {
            if (!employee) {
                return ApiResponse.errorResponse(
                    res,
                    'There is no employee instance with the specified id',
                    Response.HTTP_NOT_FOUND
                );
            }

            next();
        })
        .catch(error => ApiResponse.errorResponse(res, error));
};