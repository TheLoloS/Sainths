import { v4 as uuidv4 } from 'uuid';

const maxRoomPlayers = 10;
let rooms = [];

function Room(id, roomKey, users, mainUser, mainUserID, roomStage, status) {
  return {
    id: id,
    roomKey: roomKey,
    users: users,
    mainUser: mainUser,
    mainUserID: mainUserID,
    roomStage: roomStage,
    status: status
  };
}

function generateKey() {
  return Math.floor(Math.random() * 90000) + 10000;
}

export function RandomIntBetweenAndUnic(count) {
  let arrayOfInts = [];
  let arrayWithInts = [];
  for (let i = count - 1; i >= 0; i--) {
    arrayOfInts.push(i)
  }
  for (let i = count - 1; i >= 0; i--) {
    const a = Math.floor(Math.random() * i)
    arrayWithInts.push(arrayOfInts[a]);
    arrayOfInts.splice(a, 1);
  }
  return arrayWithInts;
}

export const roomService = {
  getRooms: () => rooms,
  
  findRoomByMainUser: (address) => {
    return rooms.find((element) => element.mainUser === address);
  },

  findRoomById: (id) => {
    return rooms.find((room) => String(room.id) === String(id));
  },
  
  findRoomByIdAndKey: (id, key) => {
      return rooms.find((room) => String(room.id) === String(id) && String(room.roomKey) === String(key));
  },

  createRoom: (address, socketId) => {
    const room = Room(generateKey(), uuidv4(), [], address, socketId, 0, "waiting");
    rooms.push(room);
    return room;
  },

  updateMainUserSocket: (room, socketId) => {
      room.mainUserID = socketId;
      return room;
  },

  addUserToRoom: (room, user) => {
      room.users.push(user);
      return room;
  },
  
  maxRoomPlayers
};
