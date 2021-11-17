const app = require("express")();
const MOMENT = require('moment');
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
    console.log("You have Connected to database!");

    con.query("SELECT email,id FROM users", function (err, result, fields) {
        if (err) throw err;

        for (let i = 0; i < result.length; i++) {
            usersData[i] = {
                email: result[i].email,
                id: result[i].id,
                socketID: null,
            };
        }
    });
});

const cors = require("cors");

io.on("connection", (socket) => {
    socket.on("findme", (callback) => {
        console.log("****", callback);
        let obj = usersData.find((o) => o.email == callback.email);
        obj.socketID = socket.id;
        console.log("object", obj);
        //this is for fucking admin
        // users=usersData.filter(o => o.email !=callback.email)

        users = usersData.filter((o) => o.id == 1);
        console.log("users--->", users);
        //we send the admin for user
        socket.emit("admin", { user: users });
        console.log("admin or user data sent");
    });
    console.log("socket is online now");
    socket.on("sendmassage", (msg) => {
      let datetime = MOMENT().format( 'YYYY-MM-DD  HH:mm:ss.000' );
        sender = usersData.find((o) => o.email == msg.sender);
        //now we have to check that
        if (msg.reciever.socketID == null) {
            console.log("this is massage--->", msg);
            con.query(
                "INSERT INTO chats (sender, reciever, massage,created_at) VALUES ('" +
                    sender.id +
                    "', '" +
                    msg.reciever.id +
                    "' ,'" +
                    msg.massage +
                    "','"+datetime+"')",
                function (err, res,fields) {
                    if (err) console.log("errrr------------>", err);
                    console.log('res--',res);
                    //get last database
                    con.query("SELECT * FROM chats WHERE id ='"+res.insertId+"' ",function(err,res){
                      console.log("res data",res)
                      if(res){
                        socket.emit("get",res)
                      }

                    })
                    console.log('fields',fields)
                }
            );
        }else{

        }

        //****************  this is the part of storing massages and push it back if the user is online */
    });
});

server.listen(5000, () => {
    console.log("server is work in port 5000");
});
