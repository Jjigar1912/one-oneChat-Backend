import Joi from 'joi' ; 

const chatConversation = Joi.object({

    senderid : Joi.string().trim().required() , 
    receiverid : Joi.string().trim().required() , 

})

const chat = Joi.object({
    senderid : Joi.string().trim().required() , 
    message : Joi.string().trim().required() , 
    conversationid  : Joi.string().trim().required() 
});

export { chatConversation , chat } ; 