import { useState } from "react";
import { sendMessage } from "../Services/supabaseService";

function MessageModal({ provider, onClose }) {
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState("");

  const providerName =
    provider.display_name || provider.full_name || "PawCircle Member";

  async function handleSubmit(e) {
    e.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || isSending) return;

    setIsSending(true);
    setSendError("");

    const { error } = await sendMessage(provider.id, trimmedMessage);

    setIsSending(false);

    if (error) {
      console.error("Error sending message:", error);
      setSendError(
        "Your message could not be sent. Please try again."
      );
      return;
    }

    setIsSent(true);
    setMessage("");
  }

  return (
    <div className="modal__overlay">
      <div className="message__modal">
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          disabled={isSending}
          aria-label="Close message form"
        >
          ×
        </button>

        <h2>Contact {providerName}</h2>

        <p className="message__provider-service">
          {provider.profile_type === "both"
            ? "Pet Owner & Service Provider"
            : "Pet Service Provider"}
        </p>

        <p className="message__provider-location">
          {provider.city}, {provider.state}
        </p>

        {provider.services_offered?.length > 0 && (
          <p className="message__provider-services">
            <strong>Services:</strong>{" "}
            {provider.services_offered.join(", ")}
          </p>
        )}

        <p className="message__note">
          Send a <span className="purple">PawCircle</span> message to
          start the conversation. Members may choose to share phone or
          email later at their own discretion.
        </p>

        <div className="message__preferences">
          <p>
            <strong>Preferred Communication:</strong>{" "}
            {provider.contact_preferences?.length > 0
              ? provider.contact_preferences.join(", ")
              : "PawCircle Messages"}
          </p>

          <p>
            <strong>Contact Information:</strong>{" "}
            {provider.contact_visibility === "show_on_profile"
              ? "Visible on profile"
              : provider.contact_visibility === "after_conversation"
              ? "Shared after initial conversation"
              : "PawCircle Messages only"}
          </p>
        </div>

        {isSending ? (
          <div className="loading__container">
            <div className="loading__paw">🐾</div>
            <p>
              Sending{" "}
              <span className="purple">PawCircle</span> message...
            </p>
          </div>
        ) : isSent ? (
          <>
            <div className="message__success">
              ✓ Your message has been sent. {providerName} can now
              respond through{" "}
              <span className="purple">PawCircle</span> Messages.
            </div>

            <button
              type="button"
              className="btn"
              onClick={onClose}
            >
              Close
            </button>
          </>
        ) : (
          <form className="message__form" onSubmit={handleSubmit}>
            <label htmlFor="message">Your Message</label>

            <textarea
              id="message"
              placeholder={`Hi ${providerName}, I'm looking for pet care...`}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);

                if (sendError) {
                  setSendError("");
                }
              }}
              maxLength={1000}
              disabled={isSending}
              required
            />

            <p className="message__character-count">
              {message.length}/1000
            </p>

            {sendError && (
              <p className="message__error" role="alert">
                {sendError}
              </p>
            )}

            <div className="message__actions">
              <button
                type="submit"
                className="btn"
                disabled={!message.trim() || isSending}
              >
                {isSending ? "Sending..." : "Send Message"}
              </button>

              <button
                type="button"
                className="btn btn--secondary"
                onClick={onClose}
                disabled={isSending}
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