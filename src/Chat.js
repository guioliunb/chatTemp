import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { collection, addDoc, getDocs, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAqb-fVEhDyWPEJdMmFq-fCmQ6LuxpG994",
  authDomain: "miau-database.firebaseapp.com",
  projectId: "miau-database",
  storageBucket: "miau-database.appspot.com",
  messagingSenderId: "241980715406",
  appId: "1:241980715406:web:a771069d73e8188235b4df",
  measurementId: "G-KBTQK3YJWL"
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
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            <strong>{message.name}:</strong> {message.text}
          </li>
        ))}
      </ul>
      <input type="text" value={newMessage} onChange={handleInputChange} />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
};

export default Chat;
