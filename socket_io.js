var siofu = require("socketio-file-upload");
const app = require("express")().use(siofu.router);
const MOMENT = require("moment");
const path = require('path');
const fs = require('fs');

const server = require("http").createServer(app);
var usersData = [];
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        //this should be the website address
        // methods: ["GET", "POST"]
    },
});

var mysql = require("mysql");
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "doctorblog",
});

con.connect(function (err) {
    if (err) throw err;
    // console.log("You have Connected to database!");

    con.query(
        "SELECT name,email,id,profile_photo_path FROM users",
        function (err, result, fields) {
            if (err) throw err;

            for (let i = 0; i < result.length; i++) {
                usersData[i] = {
                    name: result[i].name,
                    image: result[i].profile_photo_path,
                    email: result[i].email,
                    id: result[i].id,
                    socketID: null,
                };
            }
        }
    );
});

const cors = require("cors");
io.on("connection", (socket) => {
    socket.on("findme", (callback) => {
        console.log("****", callback);
        socket.on('filesend',(msg)=>{
             var uploader = new siofu();
        fs.mkdir( locationFile= path.join(__dirname+'/public',""+callback.email+""),function(err){
            if(err){
                console.log("err",err)
                console.log(" a in error",locationFile);
            }
            else{
                console.log("a??",locationFile);
                
                console.log("path is created");
            }
        })
        uploader.dir =locationFile+""+(Math.random()*100000+1)+"";
        uploader.on("saved", function(event){
            console.log(event.file);
            console.log("this is the path-------",locationFile+"\\"+""+event.file.name+"");
           
        });
    
        uploader.listen(socket)

        })
       
     
      

        let obj = usersData.find((o) => o.email == callback.email);
        obj.socketID = socket.id;

        //************************************************************************************************** admin logic */
        if (obj.email == "mehdi@gmail.com") {
            users = usersData.filter((o) => o.email != "mehdi@gmail.com");
            //   console.log('all users----for admin',users);
            socket.emit("users", users);
            socket.on("adminmassage", (msg) => {
                console.log("whtas massage")
                let datetime = MOMENT().format("YYYY-MM-DD  HH:mm:ss.000");
                reciever= usersData.find((o) => o.id==msg.reciever)
                console.log("recievrrrrrrrrrrrrrrrrrrrrrrrrrrrr",reciever)

                console.log("user data and admin", msg);
                //   sender= usersData.find((o)=>o.email==msg.sender);
                con.query(
                    "INSERT INTO chats (sender, reciever, massage,created_at) VALUES ('" +
                        msg.sender +
                        "', '" +
                        msg.reciever +
                        "' ,'" +
                        msg.massage +
                        "','" +
                        datetime +
                        "')",
                    function (err, res) {
                        if (err) console.log("errrr------------>", err);
                        console.log("res--", res);
                        //get last database
                        con.query(
                            "SELECT * FROM chats WHERE id ='" +
                                res.insertId +
                                "' ",
                            function (err, res) {
                                //   console.log("res data", res);
                                if (res) {
                                    //   console.log("*************************");
                                    // socket.emit("get", res);
                                    // console.log("this is admin massage");
                                    if(reciever.socketID !=null){
                                        socket.to(reciever.socketID).emit('private-massage',res);
                                        socket.emit("get", res);


                                    }else{
                                        socket.emit("get", res);

                                    }

                                }
                            }
                        );
                    }
                );

                //****************  this is the part of storing massages and push it back if the user is online */
            });

            //we have admin
        } else {
            users = usersData.filter((o) => o.id == 1);

            socket.emit("admin", { user: users });

            socket.on("sendmassage", (msg) => {
                let datetime = MOMENT().format("YYYY-MM-DD  HH:mm:ss.000");
                sender = usersData.find((o) => o.email == msg.sender);
                reciever = usersData.find((o) => o.id == msg.reciever.id);

                con.query(
                    "INSERT INTO chats (sender, reciever, massage,created_at) VALUES ('" +
                        sender.id +
                        "', '" +
                        msg.reciever.id +
                        "' ,'" +
                        msg.massage +
                        "','" +
                        datetime +
                        "')",
                    function (err, res) {
                        if (err) console.log("errrr------------>", err);
                        console.log("res--", res);
                        //get last database
                        con.query(
                            "SELECT * FROM chats WHERE id ='" +
                                res.insertId +
                                "' ",
                            function (err, res) {
                                //   console.log("res data", res);
                                if (res) {
                                    if (reciever.socketID == null) {
                                        //   console.log("*************************");
                                        socket.emit("get", res);
                                        console.log("this is user emit");
                                    }else{
                                        console.log("admin is online---");
                                        socket.emit("get", res);
                                        socket.to(reciever.socketID).emit('private-massage',res);
                                    }
                                }
                            }
                        );
                    }
                );

                //****************  this is the part of storing massages and push it back if the user is online */
            });
        }
        //this is for fucking admin
        // users=usersData.filter(o => o.email !=callback.email)
    });
});

server.listen(5000, () => {
    console.log("server is work in port 5000");
});
