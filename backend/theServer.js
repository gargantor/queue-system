require("dotenv").config();
const app = require('./app');

// set port, listen for requests
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  console.log("---LIST ROUTE---");
  app._router.stack.forEach(function(r){
    //console.log(r);
    if (r.route && r.route.path){
      var method = r.route.stack[0].method;
      var path = r.route.path;
      var methods = r.route.methods;
      var listmethod = ''
      Object.keys(methods).map((key, index) => {
        listmethod = listmethod + key + ', ' 
      })
      console.log(path + ' => ' + listmethod);
    }    
    
  })
  console.log("---END OF LIST ROUTE---");
});

module.exports = server;