import { useState } from "react";


function MessageModal({ provider, onClose }) {
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
 
  function handleSubmit(e) {
    e.preventDefault();

    if (!message.trim()) return;

    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      setMessage("");
    }, 1200);
  }

  return (
    <div className="modal__overlay">
      <div className="message__modal">
        <button
          className="modal__close"
          onClick={onClose}
          disabled={isSending}
        >
          ×
        </button>

        <h2>Contact {provider.name}</h2>

        <p className="message__provider-service">{provider.service}</p>

        <p className="message__provider-location">
          {provider.city}, {provider.state}
        </p>

        <p className="message__note">
          Send a <span className="purple">PawCircle</span> Message to start the conversation. Members may choose
          to share phone or email later at their own discretion.
        </p>

        <div className="message__preferences">
          <p>
            <strong>Preferred Communication:</strong>{" "}
            {provider.preferredCommunication || "PawCircle Messages"}
          </p>

          <p>
            <strong>Contact Information:</strong>{" "}
            {provider.contactInfo || "Shared after initial conversation"}
          </p>
        </div>

        {isSending ? (
          <div className="loading__container">
            <div className="loading__paw">🐾</div>
            <p>Sending <span className="purple">PawCircle</span> Message...</p>
          </div>
        ) : isSent ? (
          <>
            <div className="message__success">
              ✓ Your message has been sent. {provider.name} can now respond
              through <span className="purple">PawCircle</span> Messages.
            </div>

           <button className="btn" onClick={onClose}>
            Close
          </button>
          </>
        ) : (
          <form className="message__form" onSubmit={handleSubmit}>
            <label htmlFor="message">Your Message</label>

            <textarea
              id="message"
              placeholder={`Hi ${provider.name}, I'm looking for pet care...`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <div className="message__actions">
              <button type="submit" className="btn">
                Send Message
              </button>

              <button
                type="button"
                className="btn btn--secondary"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default MessageModal;