/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable react/button-has-type */
/* eslint-disable linebreak-style */
import React, {useState, useEffect} from 'react';
import socketIOClient from 'socket.io-client';

const API_ENDPOINT = 'http://localhost:3001';
function SocketDemo() {
  const [response, setResponse] = useState([]);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    setSocket(socketIOClient(API_ENDPOINT));
    const destructFunction = () => {
      console.log(socket);
      socket.disconnect();
    };
    return destructFunction;
  }, []);
  useEffect(() => {
    connectSocketConnection(socket);
  }, [socket]);
  const connectSocketConnection = (socket) => {
    if (socket != null) {
      socket.on('GetTime', (data) => {
        setResponse(data);
        console.log(response);
      });
    }
  };
  const socketConnect = () => {
    setSocket(socketIOClient(API_ENDPOINT));
  };
  const socketDisconnect = () => {
    socket.disconnect();
  };
  return (
    <div className="col-lg-6 col-md-8 mx-auto my-5">
      <h4 className="my-5">Current Time is {response}</h4>
      <button className="btn btn-primary col-6" onClick={socketConnect}>
        Connect
      </button>
      <button className="btn btn-warning col-6" onClick={socketDisconnect}>
        Disconnect
      </button>
    </div>
  );
}
export default SocketDemo;
