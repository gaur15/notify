import { useState, useEffect, useMemo } from "react";
import io from "socket.io-client";

export default function Page() {
    const [notifications, setNotifications] = useState([]);

    // Establish WebSocket connection
    const socket = useMemo(() => io("http://localhost:4000"), []);

    useEffect(() => {
        socket.on("notification", (data) => {
            setNotifications((prev) => [...prev, data]);
        });

        socket.on("connect_error", (error) => {
            console.error("Connection Error:", error);
        });

        return () => {
            socket.disconnect();
        };
    }, [socket]);

    return (
        <div>
            <h1>Real-Time Notifications</h1>
            <ul>
                {notifications.map((notif, index) => (
                    <li key={index}>
                        {notif.name}: {notif.message}
                    </li>
                ))}
            </ul>
        </div>
    );
}
