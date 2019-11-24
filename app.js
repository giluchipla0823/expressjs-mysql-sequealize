const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const Response = require('./utils/response');

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup a default catch-all route that sends back a welcome message in JSON format.
require('./routes')(app);

app.get('*', (req, res) => 
    res.status(Response.HTTP_OK).send({
        message: 'Welcome to the beginning of nothingness.',
    })
);

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

app.listen(port, () => {
    console.log('Express server - puerto '+ port +': \x1b[32m%s\x1b[0m', 'online');
});

module.exports = app;