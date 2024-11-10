import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";


const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Socket.io connection
io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

// POST endpoint for sending notifications
app.post("/api", (req, res) => {
    const { name, message } = req.body;
    io.emit("notification", { name, message });
    console.log(`Notification sent: ${name}, ${message}`);
    res.status(200).json({ name, message });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});
