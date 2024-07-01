const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const UserRoutes = require("./routes/userRoutes");
const MessageRoutes = require("./routes/messageRoutes");

const app = express();
const socket = require("socket.io");
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", UserRoutes);
app.use("/api/messages", MessageRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;


mongoose.connect(MONGO_URL)
.then(() => {
    console.log("Database connected Successfully!!");
})
.catch((err) => {
    console.log(err.message);
});


const server = app.listen(PORT, ()=>{
    console.log(`Server started on Port ${PORT}`);
});


const io = socket (server, {
    cors:{
        origin: "http://localhost:5173",
        credentials : true,
    },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    console.log('New user connected: ', socket.id);

    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
        console.log(`User added: ${userId} with socket ID: ${socket.id}`);
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            io.to(sendUserSocket).emit("msg-receive", data.msg);
            console.log(`Message from ${data.from} to ${data.to}: ${data.msg}`);
        } else {
            console.log(`User ${data.to} is not online`);
        }
    });

    socket.on("disconnect", () => {
        for (let [userId, socketId] of onlineUsers.entries()) {
            if (socketId === socket.id) {
                onlineUsers.delete(userId);
                console.log(`User disconnected: ${userId}`);
                break;
            }
        }
    });
});