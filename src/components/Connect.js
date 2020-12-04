import React, { useState } from 'react';

const Connect = ({ handleUserConnect }) => {
  const [userInput, setUserInput] = useState('');

  return (
    <div className="flex flex-col justify-center py-2">
      <span className="text-white my-2">Welcome! Type your nickname and click connect...</span>
      <div className="flex justify-between">
        <input
          className="flex-1 rounded-md px-2"
          type="text"
          placeholder="johnsmith"
          onChange={(e) => setUserInput(e.target.value)}
          value={userInput}
        />
        <div className="btn btn-unselected" onClick={() => handleUserConnect(userInput)}>Connect</div>
      </div>

    </div>
  );
}

export default Connect;