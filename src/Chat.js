import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { collection, addDoc, getDocs, getFirestore } from 'firebase/firestore';
import { ChatFeed, Message } from 'react-chat-ui';

const firebaseConfig = {
  apiKey: "AIzaSyAqb-fVEhDyWPEJdMmFq-fCmQ6LuxpG994",
  authDomain: "miau-database.firebaseapp.com",
  projectId: "miau-database",
  storageBucket: "miau-database.appspot.com",
  messagingSenderId: "241980715406",
  appId: "1:241980715406:web:a771069d73e8188235b4df"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      const chatCol = collection(db, "chat");
      const querySnapshot = await getDocs(chatCol);
      const messageList = querySnapshot.docs.map(doc => doc.data());
      setMessages(messageList);
    };

    fetchMessages();
  }, []);

  const handleInputChange = e => {
    setNewMessage(e.target.value);
  };

  const sendMessage = async () => {
    const message = {
      name: 'Usuário',
      text: newMessage
    };
    await addDoc(collection(db, "chat"), message);
    setNewMessage('');
  };

  return (
    <div>
      <ChatFeed
        messages={messages.map(message => new Message({ id: message.id, message: message.text, senderName: message.name }))}
      />
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={newMessage}
          onChange={handleInputChange}
          style={styles.input}
          placeholder="Digite sua mensagem..."
        />
        <button onClick={sendMessage} style={styles.button}>
          Enviar
        </button>
      </div>
    </div>
  );
};

const styles = {
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
  },
  input: {
    flex: 1,
    padding: '8px',
    marginRight: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    outline: 'none',
  },
  button: {
    padding: '8px 16px',
    borderRadius: '4px',
    background: 'blue',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
};

export default Chat;
