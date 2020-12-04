import React from 'react';
import { useSubscription } from '@apollo/client';
import { SUBSCRIPTION_USERS_ONLINE } from '../apollo/gql';

const Users = ({ userId }) => {
  const { loading, error, data } = useSubscription(SUBSCRIPTION_USERS_ONLINE);

  const serveUsers = () => {
    if (data.users_online.length > 0) {
      return data.users_online.map(user => {
        if (user.id === userId) {
          return <li className="text-custom-purple font-bold" key={user.id}>{user.name}</li>
        } else {
          return <li key={user.id}>{user.name}</li>
        }
      })
    } else {
      return <li>No users connected!</li>
    }
  }

  if (error) return <h2 style={{ color: 'red' }}>{error.message}</h2>;
  if (loading) return <h1>Loading users...</h1>;

  return (
    <div id="users" className="p-4 bg-custom-purpleLight flex-1">
      <span>Users online:</span>
      <ul>
        {serveUsers()}
      </ul>
    </div>
  );
}

export default Users;