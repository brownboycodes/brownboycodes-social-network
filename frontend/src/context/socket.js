import React from "react";
import {io} from "socket.io-client";

const SOCKET_URL=process.env.REACT_APP_API_SERVER;

export const socket=io(SOCKET_URL,{transports:['websocket', 'polling', 'flashsocket']});

export const SocketContext=React.createContext();