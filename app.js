var express = require('express');
var app = express();
var another = require('./searchFilms.js');
var path = require("path");

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
//app.use(express.static(__dirname+'/public'));
app.use(express.static('G:/Films'));

app.get('/',(req,res)=>{
	res.sendFile(__dirname + '/views/view2.html'); 
})

app.post('/ByName', function(req, res) {
    res.json({title:"Titres des films après recherche par nom:",message:another.data.findFilesInDir('G:/Films', req.query.name)});
});

app.post('/ByType', function(req, res) {	
    res.json({title:"Titres des films après recherche par type:",message:another.data.findFilesInSpecificDirectory('G:/Films/'+ req.query.type)});
});

app.post('/LEDon', function(req, res) {
    console.log('LEDon button pressed!');
});

app.listen(1337);
