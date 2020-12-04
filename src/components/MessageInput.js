import React, { useState } from 'react';

const MessageInput = ({ handleMessageSend, handleUserDisconnect, user }) => {
  const [content, setContent] = useState('');

  const handleSendClick = (content) => {
    handleMessageSend(content);
    setContent('');
  };

  return (
    <div id="send-message" className="w-3/4">
      <div className="text-white flex items-end">
        <span>Connected as </span>
        <span className="italic ml-1">{user}.</span>
        <div className="btn btn-unselected" onClick={handleUserDisconnect}>Disconnect</div>
      </div>

      <div className="flex justify-center items-start my-2 w-full h-full">
        <textarea
          className="w-full border border-gray-400 rounded-md p-2"
          placeholder="Type your message..."
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
        <div className="btn btn-unselected" onClick={() => handleSendClick(content)}>SEND</div>
      </div>

    </div>
  );
}

export default MessageInput;