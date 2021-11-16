
  const app=require('express')(); 
  const server=require('http').createServer(app);
  var usersData = [];
  const io =require('socket.io')(server,{
    cors: {
        origin: "*",
        //this should be the website address
        // methods: ["GET", "POST"]
      }

  });


  var mysql = require('mysql');
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "doctorblog",
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("You have Connected to database!");
  
    con.query("SELECT email,id FROM users", function (err, result, fields) {
      if (err) throw err;
      
  
      for (let i = 0; i < result.length; i++) {        
      
          usersData[i] =  { 'email': result[i].email , 'id' : result[i].id ,  'socketID' : null}  ;
      }      
  
    });
  
  });
  






 const cors = require('cors')





 
  io.on('connection', (socket)=>{
      socket.on('findme',(callback)=>{

          console.log("****",callback);
          let obj = usersData.find(o => o.email == callback.email);
          obj.socketID=socket.id
          console.log("object",obj);
          //this is for fucking admin
          // users=usersData.filter(o => o.email !=callback.email)

          users=usersData.filter(o => o.id==1)
          console.log("users--->",users);
          socket.emit('admin',{user:users})
      })
      console.log("socket is online now");
      socket.on('sendmassage',(msg)=>{
        console.log("this is massage--->",msg)
        // console.log("***id**",socket.id,'***');

      })
  });
  //app.listen(5000,()=>{console.log("server is active")})




  
  server.listen(5000,()=>{console.log("server is work in port 5000");})