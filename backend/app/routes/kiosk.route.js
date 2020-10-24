const kioskController = require('../controllers/kiosk.controller');

module.exports = function(app) {
    app.get('/api/kiosk/get-service', kioskController.allService);
    app.post('/api/kiosk/make-ticket', kioskController.makeTicket);
}