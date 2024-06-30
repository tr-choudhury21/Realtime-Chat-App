const Messages = require("../model/messageModel");


module.exports.getMessages = async (req, res, next) => {
    try {
        const { from, to } = req.body;

        //Find messages exchanged between the two users
        const messages = await Messages.find({
            users: {
            $all: [from, to],
            },
        }).sort({ updatedAt: 1 });


        // Project messages to a simpler format
        const projectedMessages = messages.map((msg) => {
            return {
            fromSelf: msg.sender.toString() === from,
            message: msg.message.text,
            };
        });
        // Send the projected messages as a JSON response
        res.json(projectedMessages);

    } catch (ex) {
        next(ex);
    }
};

module.exports.addMessage = async (req, res, next) => {
    try {
        const { from, to, message } = req.body;

        // Create a new message document
        const data = await Messages.create({
            message: { text: message },
            users: [from, to],
            sender: from,
        });

        // Check if the message was successfully added
        if (data) return res.json({ msg: "Message added successfully." });

        else return res.json({ msg: "Failed to add message to the database" });

    } catch (ex) {
        next(ex);
    }
};