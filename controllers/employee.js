const EmployeeModel = require('../models').Employee;
const CompanyModel = require('../models').Company;
const Tools = require('../utils/tools');
const Response = require('../utils/response');
const ApiResponse = require('../utils/api-response');

const RELATIONSHIPS = [
    {
        model: CompanyModel,
        as: 'company'
    }
];

const EmployeeController = {
    all: (req, res) => {
        const relations = Tools.resolveRelationships(req.query.includes, RELATIONSHIPS);  
    
        return EmployeeModel.findAll({
            include: relations
        })
        .then(employees => ApiResponse.successResponse(res, employees))
        .catch(error => ApiResponse.errorResponse(res, error));
    },
    findById: (req, res) => {
        return EmployeeModel.findByPk(req.params.id)
            .then(employee => {
                if (!employee) {
                    return ApiResponse.errorResponse(
                        res,
                        'There is no employee instance with the specified id',
                        Response.HTTP_NOT_FOUND
                    );
                }

                return ApiResponse.successResponse(res, employee);
            })
            .catch(error => ApiResponse.errorResponse(res, error));
    },
    create: (req, res) => {
        const {name, designation, salary, companyId} = req.body;

        return EmployeeModel
            .create({
                name,
                designation,
                salary,
                companyId
            })
            .then(employee => ApiResponse.successResponse(res, employee, 'Employee created successfully', Response.HTTP_CREATED))
            .catch(error => ApiResponse.errorResponse(res, error));
    },
    update: (req, res) => {
        const {name, designation, salary, companyId} = req.body;

        return EmployeeModel.update(
            {
                name,
                designation,
                salary,
                companyId
            },
            {
                where: {
                    id: req.params.id,
                }
            }
        )
        .then(() => ApiResponse.showMessageResponse('Employee updated successfully'))
        .catch(error => ApiResponse.errorResponse(res, error));
    },
    delete: (req, res) => {
        return EmployeeModel.destroy({
            where: {
                id: req.params.id
            }
        })        
        .then(() => ApiResponse.showMessageResponse('Employee deleted successfully'))
        .catch(error => ApiResponse.errorResponse(res, error));
    }
};

module.exports = EmployeeController;