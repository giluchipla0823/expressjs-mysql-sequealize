const ApiResponse = require('../utils/api-response');

module.exports = (app) => {
    app.get('/api', (req, res) => {
        return ApiResponse.showMessageResponse(res, 'Welcome to the API');
    });

    // Company routes
    app.use('/api/companies', require('../routes/companies'));

    // Employee routes
    app.use('/api/employees', require('../routes/employees'));
};