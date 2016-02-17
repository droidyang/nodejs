var app=require("express")();
var http=require('http').Server(app);
var io=require('socket.io')(http);
var cookieParser = require('socket.io-cookie');

app.get('/',function(req,res){
	res.sendFile(__dirname + '\\index.html');
	});

io.use(cookieParser);

function authentication(socket,next){

var auth=socket.request.headers.cookie['auth'];
	if(auth=='password') {
		console.log("cookie:"+auth);
		return next();
	}else{
	console.log("error authentication:"+auth);
	next(new Error('authentication error'));
	}
}

io.use(authentication);
	
io.on('connection',function(socket){
 console.log('a user connected');

socket.emit('chat message','hi');
 socket.on('chat message',function(msg){
	console.log('message:'+msg);
	socket.emit('chat message',msg);
	});
 socket.on('disconnect',function(){
	console.log('user disconnected');
	});
}); 
	
http.listen(3000,function(){
	console.log('listening on *:3000');
	});
	