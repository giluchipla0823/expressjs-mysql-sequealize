const expressValidator = require('express-validator');
const CompanyModel = require('../models').Company;

exports.validators = [
    expressValidator.check('name')
        .not()
        .isEmpty()
        .withMessage('El campo es requerido')
        .isLength({ min: 2 })
        .withMessage('El campo debe contener mínimo 2 caracteres'),
    expressValidator.check('designation')
        .not()
        .isEmpty()
        .withMessage('El campo es requerido'),
    expressValidator.check('salary')
        .not()
        .isEmpty()
        .withMessage('El campo es requerido'),
    expressValidator.check('companyId')
        .not()
        .isEmpty()
        .withMessage('El campo es requerido')
        .custom((value, {req}) => {
            return new Promise(async (resolve, reject) => {
                const company = await CompanyModel.findByPk(req.body.companyId)

                if (!company) {
                    reject(new Error('There is no company instance with the specified id'));
                }

                resolve(true);
            });
        })
];
