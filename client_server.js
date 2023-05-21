const socket = io('http://localhost:8000');
const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageinp');
const messagecontainer=document.querySelector('.container');

const append=(message,position)=>{
    const messageelement = document.createElement('div');
    messageelement.innerText=message;
    messageelement.classList.add('message');
    messageelement.classList.add(position);
    messagecontainer.append(messageelement);




}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You:${message}`,'right');
    socket.emit('send',message);
    messageInput.value=" ";


})

const names=prompt("enter name");
socket.emit('new-user-joined',names); 

socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'right');

})

socket.on('recieve',data=>{
    append(`${data.name}:${data.message}`,'left');
})

socket.on('left',data=>{
    append(`${data} left the chat`,'right');
})
