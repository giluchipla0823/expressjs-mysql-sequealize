const express = require('express');
const app = express();
const controller = require('../controllers/employee');
const EmployeeMiddlewares = require('../middlewares/employee');
const ValidationMiddleware = require('../middlewares/validation-request').handle;
const validators = require('../validators/employee').validators;

app.get('/', controller.all); 
app.get('/:id', controller.findById); 
app.post(
    '/',
    [
        validators,
        ValidationMiddleware,
        
    ],
    controller.create
);
app.put(
    '/:id',
    [
        validators,
        EmployeeMiddlewares.findEmployeeById,
        ValidationMiddleware
    ],
    controller.update
);
app.delete('/:id', [EmployeeMiddlewares.findEmployeeById], controller.delete);

module.exports = app;