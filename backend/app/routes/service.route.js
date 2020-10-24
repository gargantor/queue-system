const controller = require('../controllers/service.controller');
const authJwt = require('../middleware/authJwt');
module.exports = function(app){
    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Header",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get('/api/services',[authJwt.verifyToken], controller.all);
    app.post('/api/services/create', [authJwt.verifyToken, authJwt.isAdmin], controller.create );
    app.route('/api/services/edit/:id')
        .get([authJwt.verifyToken, authJwt.isAdmin], controller.findOne)
        .post([authJwt.verifyToken, authJwt.isAdmin], controller.store)        
    app.delete('/api/services/delete/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.delete)
        
}