import app from '../app.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import envConfig from '../env.js';

const server = createServer(app);

const io = new Server(server, {
    transports: ['websocket']
});


app.set('IO', io);

io.on('connect', (socket) => {

    socket.on('disconnect', () => {
        console.log(`${socket.id} Is Disconnected.`);
    })

    socket.on('storeId', (userId) => {
        socket.id = userId;
    });

    
    socket.on('join', conversationId => {
        socket.join(conversationId);
    });

    console.log('User Connected.', socket.id);

})

server.listen(envConfig.PORT, () => console.log('Server Started.'))
