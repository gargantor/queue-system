const controller = require('../controllers/settings.controller');
const authJwt = require('../middleware/authJwt');

module.exports = function(app){
    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Header",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get('/api/settings/reset-count',[authJwt.verifyToken, authJwt.isAdmin], controller.resetCounter);
    app.get('/api/settings/get-count',[authJwt.verifyToken, authJwt.isAdmin], controller.getCounter);
}