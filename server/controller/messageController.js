const { Conversation } = require("../models/conversationSchema");
const { Message } = require("../models/messageSchema");
const { getReceiverSocketId, io } = require("../socket/socket");

exports.sendMessage = async(req,res)=>{
    try{
        const senderId = req.id;
        const recieverId = req.params.id;

        const {message} = req.body;

        let gotConversation = await Conversation.findOne({
            participants:{$all:[senderId,recieverId]}
        })

        if(!gotConversation){
            gotConversation = await Conversation.create({
                participants:[senderId,recieverId]
            })
        }

        const newMessage = await Message.create({
            senderId,
            recieverId,
            message
        })

        if(newMessage){
            gotConversation.messages.push(newMessage._id)
        }

        await gotConversation.save()

        await Promise.all([gotConversation.save(), newMessage.save()]);


        //Socket implementation

        // const receiverSocketId = getReceiverSocketId(recieverId)
        // if(receiverSocketId){
        //     io.to(receiverSocketId).emit("newMessage",newMessage)
        // }
        const receiverSocketId = getReceiverSocketId(recieverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        return res.status(201).json({
            success:true,
            message:"Message sent successfully",
            newMessage
        })
    }catch(err){
        res.status(500).json({
            success:false,
            err
        })
    }
}


// exports.sendMessage = async (req, res) => {
//     try {
//         const senderId = req.id;
//         const receiverId = req.params.id;  // Fixed typo: recieverId to receiverId

//         const { message } = req.body;

//         let gotConversation = await Conversation.findOne({
//             participants: { $all: [senderId, receiverId] }
//         });

//         if (!gotConversation) {
//             gotConversation = await Conversation.create({
//                 participants: [senderId, receiverId]
//             });
//         }

//         const newMessage = await Message.create({
//             senderId,
//             receiverId,  // Fixed typo: recieverId to receiverId
//             message
//         });

//         if (newMessage) {
//             gotConversation.messages.push(newMessage._id);
//         }

//         await Promise.all([gotConversation.save(), newMessage.save()]);

//         // Socket implementation
//         const receiverSocketId = getReceiverSocketId(receiverId);  // Fixed typo: recieverId to receiverId
//         if (receiverSocketId) {
//             io.to(receiverSocketId).emit("newMessage", newMessage);
//         }

//         return res.status(201).json({
//             success: true,
//             message: "Message sent successfully",
//             newMessage
//         });
//     } catch (err) {
//         console.error("Error sending message:", err);  // Enhanced logging
//         res.status(500).json({
//             success: false,
//             err
//         });
//     }
// };


exports.getMessage = async(req, res)=>{
    try{
        const senderId = req.id;
        const recieverId = req.params.id;

        const conversation = await Conversation.findOne({
            participants:{$all:[senderId,recieverId]}
        }).populate("messages")

        return res.status(200).json({
            success:true,
            conversation
        })
    }catch(err){
        res.status(500).json({
            success:false,
            err
        })
    }
}