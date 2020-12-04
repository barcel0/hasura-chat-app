import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Rooms from '../components/Rooms'
import Messages from '../components/Messages'
import MessageInput from '../components/MessageInput';
import Users from '../components/Users';
import Connect from '../components/Connect';
import { MUTATION_ADD_MESSAGE, MUTATION_CREATE_USER, MUTATION_UPDATE_USER } from '../apollo/gql';

const Chat = () => {
  const [user, setUser] = useState();
  const [userId, setUserId] = useState();
  const [activeRoom, setActiveRoom] = useState('e66887f1-d7df-4986-a097-3c8afe1ea8e9');
  const [addMessage] = useMutation(MUTATION_ADD_MESSAGE);
  const [addUser] = useMutation(MUTATION_CREATE_USER);
  const [updateUser] = useMutation(MUTATION_UPDATE_USER);
  const [test, setTest] = useState();

  const handleMessageSend = (content) => {
    addMessage({
      variables: {
        author: user,
        content: content,
        room: activeRoom
      }
    });
  };

  const handleUserConnect = (user) => {
    const currentTime = new Date();
    addUser({
      variables: {
        name: user,
        last_online: currentTime.toISOString()
      }
    }).then(res => {
      setUser(res.data.insert_users_one.name);
      setUserId(res.data.insert_users_one.id);
      setTest(setInterval(() => {
        updateUser({ variables: { id: res.data.insert_users_one.id } });
        console.log('triggered!'); //debug
      }, 2000));
    })
  }

  const handleUserDisconnect = () => {
    setUser();
    setTest(clearInterval(test));
  };

  return (
    <div id="container" className="flex flex-col items-center h-screen">
      <Rooms setActiveRoom={setActiveRoom} activeRoom={activeRoom} />
      <div id="chat-container" className="flex w-full flex-grow overflow-hidden">
        <div id="left-col" className="flex flex-col flex-grow flex-shrink overflow-auto">
          <Messages activeRoom={activeRoom} />
        </div>
        <div id="right-col" className="flex flex-col w-1/6 max-w-5xl overflow-auto">
          <Users userId={userId} />
        </div>
      </div>
      <div className="flex w-full justify-center items-center py-2 bg-custom-purple">
        {user ?
          <MessageInput activeRoom={activeRoom} user={user} handleMessageSend={handleMessageSend} handleUserDisconnect={handleUserDisconnect} /> :
          <Connect handleUserConnect={handleUserConnect} />
        }
      </div>
    </div>
  );
}

export default Chat;