import { useState } from "react";
import { Link } from "react-router-dom";

function Messages() {
  const selectedMember = {
    display_name: "PawCircle Member",
  };

  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

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

          <h1>Intro Messages</h1>
        </div>

        <p>
          <span className="purple">PawCircle</span> intro messages help pet
          owners and pet service providers make an initial connection. What
          happens next is up to you.
        </p>

        <div className="message-thread">
          <h3>
            Intro Message with{" "}
            {selectedMember?.display_name || "PawCircle Member"}
          </h3>

          {messages.length === 0 ? (
            <p className="message-empty">
              No intro message has been sent yet.
            </p>
          ) : (
            messages.map((message) => (
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
            ))
          )}

          <form className="message-form" onSubmit={handleSubmit}>
            <textarea
              placeholder="Write your intro message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />

            <button type="submit">Send Intro Message</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Messages;