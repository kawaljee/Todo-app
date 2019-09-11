var express= require('express');
var todoController = require('./controllers/todoControllers');
var app = express();


app.set('view engine' , 'ejs');

app.use(express.static('./public'));

todoController(app);

// listen to port

app.listen(3001);

console.log('listening to port 3001');
