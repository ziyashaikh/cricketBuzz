const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const connectDB = require('./db');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "https://cricketbuzz.netlify.app", 
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

connectDB();

// Pass io to matchRoutes
const matchRoutes = require('./routs/matchRouts')(io);
app.use('/api', matchRoutes);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
