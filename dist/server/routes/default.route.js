"use strict";
var userAPI = require("../api/school/user.api");
function registerRoutes(app) {
    app.use('/api/school/users', userAPI.apiController());
}
exports.registerRoutes = registerRoutes;
