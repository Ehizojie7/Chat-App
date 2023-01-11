// dom queries
const chatList = document.querySelector('.chat-list-group');
const newChatForm  = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMsg = document.querySelector('.update-mssg');
const  rooms = document.querySelector('.chat-rooms');

//add a new chat
newChatForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
    .then(() => newChatForm.reset())
    .catch(err => console.log(err));
});

// Update username
newNameForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    //update name via chatroom
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);
    newNameForm.reset();
    
    //show user the name is being updated
    updateMsg.innerText = `Your name was updated to ${newName}`;
    setTimeout(() => {
        updateMsg.innerText = ''
    }, 3000)
});

rooms.addEventListener('click', (e) =>{
    if(e.target.TAGNAME === 'button'){
        ChatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat => ChatUI.render(chat));
    }
});



//check local stirage for a name
const username = localStorage.username ? localStorage.username : 'anon';



//class instances
const chatInterface = new ChatUI (chatList)
const chatroom = new Chatroom('gaming', username);


//gets the chat and render
chatroom.getChats((data) => {
   chatInterface.render(data);
});