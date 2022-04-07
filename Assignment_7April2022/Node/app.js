const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const port = 3001;
const index = require('./routes/index');
const app = express();

app.use(index);
const server = http.createServer(app);
server.listen(port, () => console.log(`Activated port ${port}`));

const io = socketIo(server, {cors: {origin: '*'}});
let interval;
io.on('connection', (socket) => {
  console.log('New Socket client connected');
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on('disconnect', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });
});

const getApiAndEmit = (socket) => {
  function kart_date_formatter(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
    return strTime;
  }
  const response = kart_date_formatter(new Date());
  socket.emit('GetTime', response);
};
