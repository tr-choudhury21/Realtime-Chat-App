const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const UserRoutes = require("./routes/userRoutes");
const MessageRoutes = require("./routes/messageRoutes");

const app = express();

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