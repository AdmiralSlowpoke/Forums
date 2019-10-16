let express = require('express');
let app = express();
app.use(express.static(__dirname + '/public')); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 
let msg=[]; // храним сообщения в массиве
// обработка запросов
app.get('/addcomment', function(req, res) { // добавить сообщение
  msg.push(req.query.newmsg);
  res.send({message:msg.length}); 
});
app.get('/lastcomments', function(req, res) { // последние 10 сообщений
  res.send(msg.slice(-10)); 
});
app.get('/testcommand',function(req,res){
    let errorcode=304;
    let errormessage='Произошла ошибка';
    res.send({error:{message:errormessage,code:errorcode}});
});
app.get('/testcommand2',function(req,res){
    res.send({message:req.query.test1+' '+req.query.test2});
});

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});