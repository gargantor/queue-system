const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build/index.html'), function(err) {
        if (err) {
          res.status(500).send(err)
        }
      })
});
app.listen(8081, () => {
  console.log(`Server is running on port 8081.`);
});