const sendMessage = (req, res, next) => {
    
    try {

        const io = req.app.get('IO');
        io.to(req.body.conversationid).emit('sendMessage',req.body.message);
        next();

    } catch (error) {
        console.log(error);
    }

}

export default sendMessage;