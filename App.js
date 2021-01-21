import io from "socket.io-client";

import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

export function App() {
  var socket;
  socket = io("http://localhost:3000");

  socket.on("chat message", msg1 => {
    const message = [{
      _id: msg1.id,
      text: msg1.msg,
      createdAt: new Date(),
      user: {
        _id: 1,
        avatar: "https://randomuser.me/api/portraits/women/79.jpg",
        name: msg1.user
      }
    }]
    state.load = false;
    onSend(message)

  })


  const [messages, setMessages] = useState([]);
  var state = {
    load: true,
  }
  useEffect(() => {


    setMessages([
      {
        _id: 2,
        text: 'Hello developer',

        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },

      {
        _id: 1,
        text: 'Hello developer',

        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]
    );
  }, []);


  const onSend = ((messages) => {
    console.log("msg : ", { messages });
    if (state.load) {
      let data = {
        user: 'AT&T Pvt limited',
        reply: 'Client',
        msg: messages[0].text
      }
      socket.emit('chat message', data);
    } else { state.load = true }
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  })

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}

    />
  );
}

export default App;
