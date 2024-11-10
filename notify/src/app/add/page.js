import { useState } from "react";

export default function AddNotification() {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:4000/api", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, message })
            });
            const data = await response.json();
            console.log("Notification sent:", data);
        } catch (error) {
            console.error("Error sending notification:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
            </div>
            <div>
                <label>
                    Message:
                    <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} required />
                </label>
            </div>
            <button type="submit">Send Notification</button>
        </form>
    );
}
