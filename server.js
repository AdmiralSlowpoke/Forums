let express = require('express');
let app = express();
const uuidv4 = require('uuid/v4');
app.use(express.static(__dirname + '/public')); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 
let msg=[]; // храним сообщения в массиве
// обработка запросов
app.get('/login',function(req,res){
  console.log(req.query.login);
  console.log(req.query.password);
  if(req.query.login==='Maxim'&&req.query.password==='123')
  {
    let token1=uuidv4();
    msg.push(token1);
    res.send({response:{token:token1}});
  }
  else
  res.send({error:{message:'Неправильный логин/пароль',code:'304'}});
});
app.get('/addcomment', function(req, res) { // добавить сообщение
  msg.push(req.query.newmsg);
  res.send({message:msg.length}); 
});
app.get('/lastcomments', function(req, res) { // последние 10 сообщений
  res.send(msg.slice(-10)); 
});
app.get('/getTopics',function(req,res){
for(let i=0;i<msg.length;i++){
  if(req.query.token===msg[i]){
    res.send({message:'Проверка'});
  }
  else
  res.send({message:'Нет доступа'});
}
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