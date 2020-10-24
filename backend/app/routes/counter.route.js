const controller = require('../controllers/counter.controller');
const { authJwt, verifyCounter } = require('../middleware');
module.exports = function(app){
    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Header",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get('/api/counters', [authJwt.verifyToken, authJwt.isAdmin], controller.all);
    app.post('/api/counters/create', [authJwt.verifyToken, authJwt.isAdmin, verifyCounter.checkDuplicateCounterCode], controller.create );
    app.route('/api/counters/edit/:id')
        .get([authJwt.verifyToken, authJwt.isAdmin], controller.findOne)
        .post([authJwt.verifyToken, authJwt.isAdmin, verifyCounter.checkDuplicateCounterCode], controller.store)
    app.delete('/api/counters/delete/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.delete)
    app.get('/api/counters/available', [authJwt.verifyToken], controller.availableDesk)
    app.post('/api/counters/selectdesk', [authJwt.verifyToken], controller.selectDesk)
    app.get('/api/counters/checkchoosen', [authJwt.verifyToken], controller.checkChosenDesk)
    app.post('/api/counters/closedesk', [authJwt.verifyToken], controller.closeDesk)

    
}