var CompanyModel = require('../models').Company;
var Response = require('../utils/response');
var ApiResponse = require('../utils/api-response');

exports.findCompanyById = (req, res, next) => {
    CompanyModel.findByPk(req.params.id)
        .then(company => {
            if (!company) {
                return ApiResponse.errorResponse(
                    res,
                    'There is no company instance with the specified id',
                    Response.HTTP_NOT_FOUND
                );
            }

            next();
        })
        .catch(error => ApiResponse.errorResponse(res, error));
};

