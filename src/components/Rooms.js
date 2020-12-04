import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ROOMS } from '../apollo/gql';

const Rooms = ({ activeRoom, setActiveRoom }) => {
  const { loading, error, data } = useQuery(QUERY_ROOMS);

  const serveChatRooms = () => {
    return data.rooms.map(room => {
      if (room.id === activeRoom) {
        return <li className="btn btn-selected" key={room.id} onClick={() => { setActiveRoom(room.id) }}>{room.name}</li>;
      } else {
        return <li className="btn btn-unselected" key={room.id} onClick={() => { setActiveRoom(room.id) }}>{room.name}</li>;
      }
    });
  }

  if (error) return <h2 style={{ color: 'red' }}>{error.message}</h2>;
  if (loading) return <h1>Loading rooms...</h1>;

  return (
    <div id="rooms" className="flex w-full justify-center items-center py-4 bg-custom-purple">
      <span className="text-white">Select chat room:</span>
      <ul className="flex">
        {serveChatRooms()}
      </ul>
    </div>
  );
}

export default Rooms;