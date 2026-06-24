import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function Messages() {
  const navigate = useNavigate();
  const [accessAllowed, setAccessAllowed] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const selectedMember = {
    display_name: "PawCircle Member",
  };

  useEffect(() => {
    async function checkAccess() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/");
        return;
      }

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("membership_status")
        .or(`id.eq.${user.id},email.eq.${user.email?.toLowerCase().trim()}`)
        .single();

      if (error || profile?.membership_status !== "active") {
        navigate("/membership");
        return;
      }

      setAccessAllowed(true);
    }

    checkAccess();
  }, [navigate]);

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

  if (!accessAllowed) {
    return (
      <section className="messages">
        <div className="container">
          <div className="row row__column">
            <div className="profile-loading">Checking membership...</div>
          </div>
        </div>
      </section>
    );
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
            <p className="message-empty">No intro message has been sent yet.</p>
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