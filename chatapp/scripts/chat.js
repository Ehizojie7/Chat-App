//adds a new chat document
//sets up a real time listener
//updates the username
//updates the room

class Chatroom{
    constructor(room, username){
        this.room = room;
        this.username = username;
        this.chats = db.collection('Chatapp')
        this.unsub
    }
    async addChat(message){
        //format a chat object
        const now = new Date();
        const chat = {
            message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };

        //save to databse

        const response = await this.chats.add(chat);
        return response;
    }
    getChats(callback){
       this.unsub = this.chats
        //gets the chats from the room
        .where('room', '==', this.room)
        //puts them in order of times sent
        .orderBy('created_at')
        //gets a snapshot of the events in the data base
        .onSnapshot(snapshot => snapshot.docChanges().forEach(change => {
            if(change.type === 'added'){
                callback(change.doc.data())
            }
        }))
    }
    updateName(username){
        this.username = username;
        localStorage.setItem('username', username);
    }
    updateRoom(room){
        this.room = room
        if(this.unsub){
            this.unsub();
        }
        this.unsub();
    }
}



