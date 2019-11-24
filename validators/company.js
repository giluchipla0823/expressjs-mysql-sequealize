const expressValidator = require('express-validator');

exports.validators = [
    expressValidator.check('name')
        .not()
        .isEmpty()
        .withMessage('El campo es requerido')
        .isLength({ min: 2 })
        .withMessage('El campo debe contener mínimo 2 caracteres')];
