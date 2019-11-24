const CompanyModel = require('../models').Company;
const EmployeeModel = require('../models').Employee;
const Tools = require('../utils/tools');
const Response = require('../utils/response');
const ApiResponse = require('../utils/api-response');

const RELATIONSHIPS = [
    {
        model: EmployeeModel,
        as: 'employees'
    }
];

const CompanyController = {
    all: (req, res) => {
        const relations = Tools.resolveRelationships(req.query.includes, RELATIONSHIPS);  
    
        return CompanyModel.findAll({
            include: relations
        })
        .then(companies => ApiResponse.successResponse(res, companies))
        .catch(error => ApiResponse.errorResponse(res, error));
    },
    findById: (req, res) => {
        return CompanyModel.findByPk(req.params.id)
            .then(company => {
                if (!company) {
                    return ApiResponse.errorResponse(
                        res,
                        'There is no company instance with the specified id',
                        Response.HTTP_NOT_FOUND
                    );
                }

                return ApiResponse.successResponse(res, company);
            })
            .catch(error => ApiResponse.errorResponse(res, error));
    },
    create: (req, res) => {
        return CompanyModel
            .create({
                name: req.body.name
            })
            .then(company => ApiResponse.successResponse(res, company, 'Company created successfully', Response.HTTP_CREATED))
            .catch(error => ApiResponse.errorResponse(res, error));
    },
    update: (req, res) => {
        return CompanyModel.update(
                {
                    name: req.body.name
                },
                {
                    where: {
                        id: req.params.id
                    }
                }
            )
            .then(() => ApiResponse.showMessageResponse('Company updated successfully'))
            .catch(error => ApiResponse.errorResponse(res, error));
    },
    delete: (req, res) => {
        return CompanyModel.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(() => ApiResponse.showMessageResponse('Company deleted successfully'))
        .catch(error => ApiResponse.errorResponse(res, error));
    }
};

module.exports = CompanyController;
