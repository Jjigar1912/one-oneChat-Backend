class chat 
{

    async checkExistingConversation(client,data){
        try{
            const query = 'SELECT * FROM chatconversation WHERE senderid = $1 AND receiverid = $2 OR senderid = $3 AND receiverid = $4';
            const result = await client.query(query,[data.senderid,data.receiverid,data.receiverid,data.senderid]);
            return result.rows.length > 0  ? 1 : 0 ;
        }catch(error){
            console.log(error);
            throw error ;
        }

    }

    async checkExistingSenderAndReceiver(client,arr){
        try{
            const query = `SELECT 
                                * 
                           FROM 
                                users 
                           WHERE EXISTS ( SELECT * FROM users WHERE id = $1)
                           AND EXISTS ( SELECT * FROM users WHERE id = $2 )`;
            const result = await client.query(query,[arr[0],arr[1]]);
            console.log(result.rows.length)
            return result.rows.length > 0 ? true : false ; 
        }catch(error){
            console.log(error);
            throw error ;
        }
    }

    async insertChatConversation(client,data){
        try{
            const x = await this.checkExistingConversation(client,data);
            const y = await this.checkExistingSenderAndReceiver(client,[data.senderid,data.receiverid]);
            console.log(y);
            if(!x && y){
                const query = 'INSERT INTO chatconversation(senderid,receiverid) VALUES($1,$2) RETURNING *' ; 
                const response  = await client.query(query,[data.senderid,data.receiverid]);
                return response.rows[0];
            }else if(!y){
                const response = {
                    status : 404 , 
                    data : 'Sender id and receiver id must be valid'
                }
                throw response ;
            }
            else{
                const query = 'SELECT * FROM chatconversation WHERE senderid = $1 AND receiverid = $2 OR senderid = $3 AND receiverid = $4';
                const result = await client.query(query,[data.senderid,data.receiverid,data.receiverid,data.senderid]);
                return result.rows[0];
            }     
        }catch(error){
            console.log(error); 
            throw error ; 
        }
    }

    async checkExistingSender(client,senderId){
        try{
            const query = 'SELECT * FROM users WHERE id = $1 ';
            const result = await client.query(query,[senderId]);
            return result.rows.length > 0 ? true : false ;
        }catch(error){  
            throw error ;
        }
    }


    async checkConversationPeople(client,senderid,conversationid){
        try{
            const query = 'SELECT * FROM chatconversation WHERE senderid = $1 OR receiverid = $2 AND id = $3';
            const result = await client.query(query,[senderid,senderid,conversationid]);
            return result.rows.length > 0 ? true : false ; 
        }catch(error){
            console.log(error);
            throw error ; 
        }
    }

    async checkExistingConversationId(client,data){
        try{
            const query = 'SELECT * FROM chatconversation WHERE id = $1 ';
            const result = await client.query(query,[data]);
            return result.rows.length > 0 ? true : false ; 
        }catch(error){
            throw error ;
        }
    }
    async insertChat(client,data){
        
        try{

            const isSenderExists = await this.checkExistingSender(client,data.senderid);
            const isConversationExists = await this.checkExistingConversationId(client,data.conversationid);
            const isConversationPeopleExists = await this.checkConversationPeople(client,data.senderid,data.conversationid);
            if(isSenderExists && isConversationExists && isConversationPeopleExists) {
                const query = 'INSERT INTO chat(senderid,message,conversationid) VALUES($1,$2,$3) RETURNING *';
                const result = await client.query(query,[data.senderid,data.message,data.conversationid]);
                return result.rows[0] ;
            }else if(!isSenderExists){
                const response = {
                    status : 404 , 
                    message : 'Sender Does Not Exists'
                }
                throw response ; 
            }else if(!isConversationExists){
                const response = {
                    status : 404 , 
                    message : 'ConversationId Does Not Exists'
                }
                throw response ; 
            }else if(!isConversationPeopleExists){
                const response = {
                    status : 404 , 
                    message : 'senderId Does Not part of conversation'
                }
                throw response ; 
            }
        }catch(error){
            throw error ;
        }
    
    }
}

export default new chat() ; 