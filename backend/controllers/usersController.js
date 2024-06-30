const User = require("../model/userModel");
const bcrypt = require("bcrypt");


module.exports.register = async (req, res, next) => {
    try{
        const{ username, email, password } = req.body;
        
        //check if the username already exists
        const usernameCheck = await User.findOne({ username });
        if(usernameCheck)
            return res.json({msg: "Username already exists", status: false});

        //check if the email already exists
        const emailCheck = await User.findOne({ email });
        if(emailCheck)
            return res.json({msg: "Email already exists", status: false});

        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //create a new user with the hashed password
        const user = await User.create({
            email,
            username,
            password: hashedPassword,
        });

        // Remove the password from the user object before sending the response
        delete user.password;
        return res.json({ status: true, user });
    }
    catch(ex){
        next(ex);
    }
};

module.exports.login = async (req, res, next) => {
    try{
        const{ username, password } = req.body;
    
        //find the user by username
        const user = await User.findOne({ username });
        if(!user)
            return res.json({msg: "Invalid username and password", status: false});

        //Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid)
            return res.json({msg: "Invalid username and password", status: false});

        // Remove the password field from the user object before sending the response
        delete user.password;
        
        return res.json({ status: true, user });
    }
    catch(ex){
        next(ex);
    }
};


module.exports.setAvatar = async (req, res, next) => {

    try{
        const userId = req.params.id;   // Extract the user ID from the request parameters
        const avatarImage = req.body.image;     // Extract the avatar image from the request body

        // Update the user document with the new avatar image
        const userData = await User.findByIdAndUpdate(userId, {
            isAvatarImageSet: true,     // Set the avatar image flag to true
            avatarImage,    // Update the avatar image
        },

        {new: true}     // Return the updated document
    );

    // Return a JSON response with the avatar image status and image URL
        return res.json({
            isSet:userData.isAvatarImageSet,
            image:userData.avatarImage,
        });
    }
    catch(ex){
        next(ex);
    }
};

module.exports.getAllUsers = async (req, res, next) => {
    try{

        // Retrieve all users except the one with the specified ID  ($ne = not equals)
        const users = await User.find({ _id: { $ne: req.params.id }}).select([
            "email",
            "username", 
            "avatarImage", 
            "_id"
        ]);

        // Return the list of users as a JSON response
        return res.json(users);
    }
    catch(ex){
        next(ex);
    }
};


module.exports.logOut = (req, res, next) => {
    try {
        // Check if the user ID is provided in the request parameters
        if (!req.params.id) return res.json({ msg: "User id is required " });

        // Remove the user from the online users collection
        onlineUsers.delete(req.params.id);

        // Send a 200 OK response
        return res.status(200).send();
        
    } catch (ex) {
        next(ex);
    }
};
