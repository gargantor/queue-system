const controller = require('../controllers/user.controller');
const { authJwt } = require('../middleware');
module.exports = function(app){
    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Header",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get('/api/users', [authJwt.verifyToken, authJwt.isAdmin], controller.all);
    app.post('/api/users/create', [authJwt.verifyToken, authJwt.isAdmin], controller.create);
    app.route('/api/users/edit/:id')
        .get([authJwt.verifyToken, authJwt.isAdmin], controller.findOne)
        .post([authJwt.verifyToken, authJwt.isAdmin], controller.store)
    app.delete('/api/users/delete/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.delete)
    app.post('/api/users/profile', [authJwt.verifyToken], controller.getProfile)
    app.post('/api/users/profile-update', [authJwt.verifyToken], controller.profileUpdate)
    app.post('/api/users/password-update', [authJwt.verifyToken], controller.passwordUpdate)
    
}