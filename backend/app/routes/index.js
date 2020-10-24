module.exports = function(app) {
    require('./user.route')(app);
    require('./auth.route')(app);
    require('./counter.route')(app);
    require('./service.route')(app);
    require('./kiosk.route')(app);
    require('./queue.route')(app);
    require('./monitor.route')(app);
    require('./settings.route')(app);
}
