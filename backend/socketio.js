const server = require('./theServer');
const io = require('socket.io')(server);
const app = require('./app');
app.set('io', io);
let connectCounter = 0;
io.on('connection', (socket)=>{
  connectCounter++;
  console.log("user connected");
  console.log("user number : " + connectCounter);
  socket.on("disconnect", () => {
      connectCounter--;
      console.log("user disconnected");    
      console.log("user number : " + connectCounter);
  })
  let TicketingCounter = 0
  socket.on("joinRoom", (ticketing) => {
      socket.join(ticketing); 
      TicketingCounter++           
      console.log("A user joined "+ ticketing);
      console.log("user "+ ticketing+ " : " + TicketingCounter);
  });
  socket.on("leaveRoom", (ticketing ) => {
      socket.leave(ticketing);            
      TicketingCounter--
      console.log("A user left "+ticketing);
      console.log("user "+ ticketing+ " : " + TicketingCounter);
  });  
  
  socket.on("clientToServer", (message)=>{
    console.log("message dr client : "+ message);
    socket.to('ticketing').emit("clientToServer",message)
  });
  socket.on("TicketCountUpdate", (message)=>{
    console.log("TicketCountUpdate : "+ message);
    socket.to('ticketing').emit("TicketCountUpdate", message)
  });
  socket.on("TicketCalled", (id)=>{
    console.log("TicketCalled : "+ id);
    socket.to('ticketing').emit("TicketCountUpdate", id);
    socket.to('monitor').emit('calling', id);
  });
  socket.on("TicketReCalled", (id)=>{
    console.log("TicketReCalled : "+ id);    
    socket.to('monitor').emit('reCalling', id);
  });
  socket.on("TicketMissed", (message)=>{
    console.log("TicketMissed : "+ message);
    socket.to('ticketing').emit("TicketCountUpdate", message)
  });
  
  
});

module.exports = io;