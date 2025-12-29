console.clear()
import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import path from "path";
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from "cors";
import registerSocketHandlers from './socketHandlers.js';

const __dirname = path.resolve();
const app = express();
const httpServer = createServer(app);

// CORS config - akceptuje połączenia z dowolnego IP w sieci lokalnej
const io = new Server(httpServer, {
  cors: { 
    origin: "*",  // Akceptuj połączenia z dowolnego źródła
    methods: ["GET", "POST"],
    credentials: true
  },
});

// Express CORS - akceptuje z dowolnego źródła
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

app.use("/", (req, res) => {
  res.setHeader('Set-Cookie', 'visited=true; Max-Age=3000; HttpOnly, Secure');
  res.sendFile(path.join(__dirname, "/index.html"));
});

io.on("connection", (socket) => {
  registerSocketHandlers(io, socket);
});

const PORT = process.env.PORT || 3001;
const HOST = '0.0.0.0';  // Nasłuchuj na wszystkich interfejsach sieciowych
httpServer.listen(PORT, HOST, () => {
  console.log(`listening on ${HOST}:${PORT}`);
});
