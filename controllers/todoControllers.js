var bodyParser = require('body-parser');

var mongoose = require('mongoose');

//connect to db

mongoose.connect('mongodb+srv://kawal:kawal@cluster0-d5mk9.mongodb.net/test?retryWrites=true&w=majority');


//create a schema 

var todoSchema = new mongoose.Schema({
    item: String
});

// create a model

var Todo = mongoose.model('Todo', todoSchema);





//var data = [{item: 'get milk'},{item: ' walk dog'} , {item: 'kick'}];

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){
    app.get('/todo' , function(req,res){

        //get data from db and pass to the view

        Todo.find({}, function(err,data){
            if(err) throw err;
            res.render('todo' , {todos: data});

        });
        

    });

    app.post('/todo', urlencodedParser , function(req,res){

        //get data from the view and add it to the mongoDB

        var newTodo = Todo(req.body).save(function(err,data){
            if (err) throw err;
            res.json(data);
                
            
        })

           
    });

    app.delete('/todo/:item' , function(req,res){

        //delete from db
        Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err,data){
            if(err) throw err;
            res.json(data);
        })

       


    });
};