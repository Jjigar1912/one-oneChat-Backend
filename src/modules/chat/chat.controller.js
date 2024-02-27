import chatService from '../chat/chat.service.js';

class chat {
    async insertChatConversation(req, res) {
        try {

            const data = await chatService.insertChatConversation(req.body);
            return res.status(data.status).json(data);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async insertChat(req, res) {
        try {
            const data = await chatService.insertChat(req.body);
            return res.status(data.status).json(data);
        } catch (error) {
            console.log(error);
            return res.status(error.status).json(error);
        }
    }

}

export default new chat();