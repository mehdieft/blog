
  const app=require('express')(); 
  const server=require('http').createServer(app);
  const io =require('socket.io')(server,{
    cors: {
        origin: "*",
        //this should be the website address
        // methods: ["GET", "POST"]
      }

  });
 const cors = require('cors')

  io.on('connection', (socket)=>{
      console.log("socket",socket);
      console.log("socket is online now");
      socket.on('massage',(msg)=>{
        console.log("this is massage--->",msg)

      })
  });
  //app.listen(5000,()=>{console.log("server is active")})
  server.listen(5000,()=>{console.log("server is work in port 5000");})