import { io } from "socket.io-client";

//Web Socket
export const socket = io("http://localhost:5000");