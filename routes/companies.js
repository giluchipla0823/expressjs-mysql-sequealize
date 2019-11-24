const express = require('express');
const app = express();
const controller = require('../controllers/company');
const CompanyMiddlewares = require('../middlewares/company');
const ValidationMiddlewares = require('../middlewares/validation-request').handle;
const Validators = require('../validators/company').validators;

app.get('/', controller.all); 
app.get('/:id', controller.findById); 
app.post(
    '/',
    [
        Validators,
        ValidationMiddlewares
    ],
    controller.create

);
app.put(
    '/:id',
    [
        CompanyMiddlewares.findCompanyById
    ],
    controller.update
);
app.delete('/:id', [CompanyMiddlewares.findCompanyById], controller.delete);

module.exports = app;
