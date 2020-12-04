import React from 'react';
import { useSubscription } from '@apollo/client';
import { SUBSCRIPTION_ROOM_MESSAGES } from '../apollo/gql';

const Messages = ({ activeRoom }) => {
  const { loading, error, data } = useSubscription(SUBSCRIPTION_ROOM_MESSAGES, {
    variables: { id: activeRoom }
  });

  const serveMessages = () => {
    if (data.rooms_by_pk.messages.length > 0) {
      return data.rooms_by_pk.messages.map(message => {
        return (
          <li key={message.id} className="bg-custom-purpleLight m-2 py-2 px-4 rounded-md flex flex-col">
            <span className="font-bold">{message.author}</span>
            <span>{message.content}</span>
          </li>
        );
      })
    } else {
      return <li>No messages in this chat room. Connect and leave one!</li>
    }
  }

  if (error) return <h2 style={{ color: 'red' }}>{error.message}</h2>;
  if (loading) return <h1>Loading messages...</h1>;

  return (
    <div id="messages" className="flex flex-col px-4 ">
      <ul>
        {serveMessages()}
      </ul>
    </div>
  );
}

export default Messages;