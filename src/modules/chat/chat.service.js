import pool from "../../../config/db.js";
import chatDal from "./chat.dal.js";
class chatService
{
    async insertChatConversation(data){

        const client = await pool.connect();
        try{
            if(data.senderid !== data.receiverid){
                const result = await chatDal.insertChatConversation(client,data);
                const response = {
                    status : 201 , 
                    message : 'New Conversation created Successfully',
                    data : result.id 
                };
                return response ;
            }else{
                const response = {
                    status : 400 , 
                    data : 'SENDER ID AND RECEIVER ID CANNOT BE SAME '
                };
                throw response ; 
            }
        }catch(error){
            console.log(error); 
            throw error ;
        }finally{
            client.release();
        }
    }


    async insertChat(data){
        const client = await pool.connect(); 
        try{
            const result = await chatDal.insertChat(client,data);
            const response = {
                status : 201 , 
                message : 'Chat Inserted' , 
                data : result.id
            }
            return response ; 
        }catch(error){
            throw error ;
        }finally{
            client.release();
        }
    }

}

export default new chatService() ; 