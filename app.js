'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();

module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  var port = process.env.PORT || 10010;
  app.listen(port);

  // install middleware
  swaggerExpress.register(app);

});
