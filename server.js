// const io = require('socket.io')(3000);

const mysql =require('mysql');
const express = require("express");


const { Server } = require("socket.io");

const io = new Server(3000, { /* options */ });

io.on("connection", (socket) => {
  // ...
  console.log("fuck you")
});


io.on("connection", function (socket) {
  console.log("Made socket connection");
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








