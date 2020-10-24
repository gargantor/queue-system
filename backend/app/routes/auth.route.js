const { verifySignUp } = require('../middleware');
const controller = require('../controllers/auth.controller');
module.exports = function(app){
    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Header",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post('/api/auth/test', controller.test);
    app.post('/api/auth/signin', controller.signIn);
    app.route('/api/auth/signup')
        .get(controller.getRoles)
        .post(
            [verifySignUp.checkInputSignup ,verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
            controller.signUp
        )
    app.get('/api/getroles', controller.getRoles);
    app.post('/api/auth/update-token', controller.updateToken);
}