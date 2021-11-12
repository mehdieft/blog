const io = require('socket.io')(3000);

const mysql =require('mysql');


var connection=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'doctorblog'
});
connection.connect(function(err){
    if(err) throw err;
    //else connect provided
    console.log("this is connect");

    connection.query("SELECT email,id,name FROM users",function(err,result,fields){
        if(err) throw err;
        console.log("data from users",result);

    })
});






//this part  is for connection to  socket.io

io.on("connection", socket=>{
    console.log("main of socket function",socket)
})



