const { Socket } = require('socket.io')

const io= require('socket.io')(8000,{
  cors:{
    origin:'http://127.0.0.1:5501'
  }
});

const user={};

io.on('connection',socket =>{
    socket.on('new-user-joined',names =>{
        console.log("new user joined",names);
        user[socket.id]=names;
        socket.broadcast.emit('user-joined',names);

    });

    socket.on('send',message =>{
        socket.broadcast.emit('recieve',{message: message, name:user[socket.id]});
        
    });
    socket.on('disconnect',message =>{
      socket.broadcast.emit('left',user[socket.id]);
      delete user[socket.id];

    })

});


