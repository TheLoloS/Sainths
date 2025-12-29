import { roomService, RandomIntBetweenAndUnic } from './services/roomService.js';

export default function registerSocketHandlers(io, socket) {
  socket.on("createGame", () => {
    const found = roomService.findRoomByMainUser(socket.handshake.address);
    
    if (found) {
      roomService.updateMainUserSocket(found, socket.id);
    }
    
    const room = !found
      ? roomService.createRoom(socket.handshake.address, socket.id)
      : found;

    if (room) {
      socket.join("Room_" + room.id);
      socket.emit("createGame", room);
    } else {
      socket.emit("createGame", room);
    }
  });

  socket.on("joinToGame", (data) => {
    let found = roomService.findRoomById(data.id);
    const user = {
      login: data.login,
      socketID: socket.id,
      ip: socket.handshake.address,
      points: 0,
      onlineStatus: true,
    };
    
    if (found) {
      if (found.users.length <= roomService.maxRoomPlayers) {
        socket.join("Room_" + found.id);

        const existingUser = found.users.find((user) => user.login === data.login);
        if (existingUser) {
          if (existingUser.onlineStatus) {
            socket.emit("message", {
              type: "error",
              title: "Błąd",
              value: "istnieje gracz o takim samym nicku i jest aktywny",
            });
          } else {
            existingUser.socketID = socket.id;
            existingUser.onlineStatus = true;
            socket.emit("joinToGame", found);
            socket.emit("message", {
              type: "success",
              title: "Udało się! 🥳🥂",
              value: "Powróciłeś do nas!",
            });
            socket.in("Room_" + found.id).emit("message", {
              type: "info",
              title: "Jest i on! 🎈🎀",
              value: data.login + " Powrócił do gry!",
            });
            socket.in("Room_" + found.id).emit("refreshTab", found);
          }
        } else {
          const existingIpUser = found.users.find((user) => user.ip === socket.handshake.address);
          if (existingIpUser) {
            socket.emit("message", {
              type: "error",
              title: "Błąd",
              value: `Jeżeli próbujesz ponownie dołączyć wpisz poprawny nick: ${existingIpUser.login}`,
            });
          } else {
            roomService.addUserToRoom(found, user);
            socket.emit("joinToGame", found);
            socket.emit("message", {
              type: "success",
              title: "Udało się! 🥳🥂",
              value: "Dołączyłeś do gry!",
            });
            socket.in("Room_" + found.id).emit("message", {
              type: "info",
              title: "Rodzinka się powieksza! 🎈🎀",
              value: data.login + " Dołączył do gry!",
            });
            socket.in("Room_" + found.id).emit("refreshTab", found);
          }
        }
      } else {
        socket.emit("message", {
          type: "error",
          title: "Błąd",
          value: "Ten pokój osiągnął juz maksymalną ilość graczy 😥",
        });
      }
    } else {
      socket.emit("message", {
        type: "error",
        title: "Błąd",
        value: "nie ma takiego pokoju",
      });
    }
  });

  socket.on("startGame", (data) => {
    let found = roomService.findRoomByIdAndKey(data?.id, data?.roomKey);
    if (found) {
      found.status = "active";
      found.roomStage = 1;
      found.gameType = data.gameType || 'default';
      // let usersRand = RandomIntBetweenAndUnic(found.users.length); // Unused variable

      socket.emit("refreshTab", found);
      socket.emit("message", {
        type: "success",
        title: "Zaczynamy gre!",
        value: "Powodzonka! 🤗",
      });
      
      socket.in("Room_" + found.id).emit("refreshTab", found);
      socket.in("Room_" + found.id).emit("message", {
        type: "success",
        title: "Zaczynamy gre!",
        value: "Powodzonka! 🤗",
      });
    } else {
      socket.emit("message", {
        type: "error",
        title: "Błąd",
        value: "Pokój jest pusty!",
      });
    }
  });

  socket.on("stageOne", (data) => {
    RandomIntBetweenAndUnic(100);
    console.log(data);
  });

  socket.on("startGameOne", (data) => {
    let found = roomService.findRoomByIdAndKey(data?.id, data?.roomKey);
    if (found) {
        socket.in("Room_" + found.id).emit("startGameOne");
    }
  });

  socket.on("timeEndGameOne", (data) => {
    let found = roomService.findRoomByIdAndKey(data?.id, data?.roomKey);
    if (found) {
        socket.in("Room_" + found.id).emit("timeEndGameOne");
    }
  });

  socket.on("disconnect", () => {
    const rooms = roomService.getRooms();
    const a = rooms.find((item) =>
      item.users.find((user) => user.socketID === socket.id)
    );
    const b = a?.users.find((user) => user.socketID === socket.id);
    if (b) {
      b.onlineStatus = false;
    }
  });
}
