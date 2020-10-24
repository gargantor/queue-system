const controller = require('../controllers/queue.controller');
const authJwt = require('../middleware/authJwt');

module.exports = function(app){
    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Header",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/api/queue/getcount',[authJwt.verifyToken], controller.queueCount);
    app.post('/api/queue/getcurrentticket',[authJwt.verifyToken], controller.getCurrentTicket);
    app.post('/api/queue/setmissed',[authJwt.verifyToken], controller.setMissed);
    app.post('/api/queue/setdone',[authJwt.verifyToken], controller.setDone);
    app.post('/api/queue/nextcall',[authJwt.verifyToken], controller.nextCall);
    
    //app.post('/queue/getcount', controller.queueCount);
}