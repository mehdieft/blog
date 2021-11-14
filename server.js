// const io = require('socket.io')(3000);

const mysql =require('mysql');
const app = require("express");
const server=require('http').createServer(app);
const cors = require('cors');
const io =require('socket.io')(server,{
  cors: {
      origin: "*",
      //this should be the website address
      // methods: ["GET", "POST"]
    }

});




io.on("connection", (socket) => {
  // ...
  console.log("fuck you",socket)
});





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
server.listen(3000,()=>{console.log("server is work in port 3000");})








