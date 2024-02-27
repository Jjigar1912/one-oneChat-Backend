-- migrate:up

CREATE TABLE IF NOT EXISTS chatConversation
(
    id SERIAL NOT NULL PRIMARY KEY , 
    senderId INTEGER NOT NULL REFERENCES users(id) , 
    receiverId INTEGER NOT NULL REFERENCES users(id),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP  

);

CREATE TABLE IF NOT EXISTS chat
(
    id SERIAL NOT NULL PRIMARY KEY , 
    senderId INTEGER NOT NULL REFERENCES users(id) , 
    message TEXT NOT NULL , 
    conversationId Integer not null REFERENCES chatConversation(id) , 
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP  
);

-- migrate:down
DROP TABLE IF EXISTS chat,chatConversation;