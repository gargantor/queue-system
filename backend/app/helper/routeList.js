module.exports = function(app){
    app.get('/list-routes', (req,res) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<h3>---LIST ROUTE---</h3>')    
        app._router.stack.forEach(function(r){    
          if (r.route && r.route.path){ 
            console.log(r);
            var test =r.route.stack           
            var method = r.route.stack[0].method;
            var path = r.route.path;
            //console.log(path);
            var methods = r.route.methods
            var listmethod = ''
            Object.keys(methods).map((key, index) => {
              listmethod = listmethod + key + ', ' 
            })            
            res.write(`<p>${path} => ${listmethod}</p>`);
          }    
          
        })
        return res.end();
      });
    
}