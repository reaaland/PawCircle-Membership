import { useState } from "react";
import { Link } from "react-router-dom";

function Messages() {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "owner",
      text: "Hi! I am looking for someone to walk my Husky three days a week.",
    },
    {
      id: 2,
      sender: "provider",
      text: "I'd be happy to discuss it. Feel free to message me here first.",
    },
  ]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      sender: "owner",
      text: newMessage,
    };

    setMessages([...messages, message]);
    setNewMessage("");
  }

  return (
    <section className="messages">
      <div className="container">
       <div className="messages__header">
        <Link to="/dashboard" className="messages__back">
            ← Dashboard
        </Link>

        <h1>Messages</h1>
        </div>

        <p>
          <span className="purple">PawCircle</span> Messages help pet owners and pet service providers make an
          initial connection. What happens next is up to you.
        </p>

        <div className="message-thread">
          <h3>Conversation with Sarah M.</h3>

          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${
                message.sender === "owner"
                  ? "message--owner"
                  : "message--provider"
              }`}
            >
              <p>{message.text}</p>
            </div>
          ))}

          <form className="message-form" onSubmit={handleSubmit}>
            <textarea
              placeholder="Write your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />

            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Messages;