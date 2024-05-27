
/*const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const http = require('http').createServer(app);
const socketIo = require('socket.io')(http, {
  cors: {
    origin: "*"
  }
});
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/chat-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define message schema and model
const messageSchema = new mongoose.Schema({
  username: String,
  message: String,
  timestamp: Date,
});
const Message = mongoose.model('Message', messageSchema);

http.listen(3000, function() {
  console.log('Server listening on port 3000');
});
// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.get('/messages', async (req, res) => {
    try {
      const messages = await Message.find().sort({ timestamp: -1 });
      res.json(messages);
    } catch (error) {
      console.error('Error retrieving messages:', error);
      res.status(500).json({ message: 'Error retrieving messages' });
    }
  });


socketIo.sockets.on('connection', function(socket) {
    socket.on('username', function(username) {
        socket.username = username;
        socketIo.emit(socket.username + ' join the chat');
    });

    socket.on('disconnect', function(username) {
        socketIo.emit(socket.username + ' left the chat');
    })

    socket.on('chat_message', async function(message) {
        const newMessage = new Message({
          username: socket.username,
          message: message,
          timestamp: new Date(),
        });

        try {
          await newMessage.save();
          console.log('Message saved to database');
        } catch (error) {
          console.error('Error saving message to database:', error);
        }

        socketIo.emit('chat_message',  `[${socket.username}]: ${message}`);
    });

});*/


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const http = require('http').createServer(app);
const socketIo = require('socket.io')(http, {
  cors: {
    origin: "*"
  }
});
const mongoose = require('mongoose');
const { File } = require('buffer');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/chat-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define message schema and model
const messageSchema = new mongoose.Schema({
  username: String,
  image:String,
  message: String,
  cin:String,
  timestamp: Date,
  color:String
});
const Message = mongoose.model('Message', messageSchema);

http.listen(3000, function() {
  console.log('Server listening on port 3000');
});
// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.get('/messages', async (req, res) => {
    try {
      const messages = await Message.find().sort({ timestamp: 1 });
      res.json(messages);
    } catch (error) {
      console.error('Error retrieving messages:', error);
      res.status(500).json({ message: 'Error retrieving messages' });
    }
  });


socketIo.sockets.on('connection', function(socket) {
    socket.on('username', function(username) {
        socket.username = username;
        socketIo.emit(socket.username + ' join the chat');
    });
    socket.on('image', function(image) {
      socket.image = image;
      socketIo.emit(socket.image + ' join the chat');
  });
  socket.on('cin', function(cin) {
    socket.cin = cin;
    socketIo.emit(socket.cin + ' join the chat');
});

    socket.on('disconnect', function(username) {
        socketIo.emit(socket.username + ' left the chat');
    })

    socket.on('chat_message', async function(message) {
        const newMessage = new Message({
          username: socket.username,
          image:socket.image,
          message: message,
          cin:socket.cin,
          timestamp: new Date(),
          color:''
        });

        try {
          await newMessage.save();
          console.log('Message saved to database');
        } catch (error) {
          console.error('Error saving message to database:', error);
        }

        socketIo.emit('chat_message',newMessage);
    });

});