import io from "socket.io-client";
let socket = null;
console.log("socket changed?");
const socketService = {
  on,
  emit,
  terminate,
  init,
};

function init() {
  socket = io("/");
}

function terminate() {
  socket = null;
}

function on(eventName, cb) {
  socket.on(eventName, cb);
}

function emit(eventName, cb) {
  socket.emit(eventName, cb);
}

export default socketService