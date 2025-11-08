import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // reference to User model
        required: true,
    },
    receiverId: {  
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String,
    },
    image: {  
        type: String,
    }
},
{ timestamps: true} // timestamps option to track createdAt and updatedAt 
)

const Message = mongoose.model("Message", messageSchema);  

export default Message;