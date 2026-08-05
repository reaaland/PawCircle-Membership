import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import {
  getMessagePreferences,
  getMessages,
  markConversationRead,
  sendMessage,
  setMessagePreference,
} from "../Services/supabaseService";
import "../messages.css";

function Messages() {
  const navigate = useNavigate();
  const messageBodyRef = useRef(null);

  const [accessAllowed, setAccessAllowed] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUserName, setCurrentUserName] = useState("PawCircle Member");
  const [messages, setMessages] = useState([]);
  const [preferences, setPreferences] = useState({});
  const [selectedMember, setSelectedMember] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [updatingMessageId, setUpdatingMessageId] = useState(null);
  const [messageError, setMessageError] = useState("");

  useEffect(() => {
    async function loadMessageCenter() {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        navigate("/");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("membership_status, display_name")
        .eq("id", user.id)
        .single();

      if (profileError || profile?.membership_status !== "active") {
        navigate("/membership");
        return;
      }

      setCurrentUserId(user.id);
      setCurrentUserName(profile.display_name || "PawCircle Member");
      setAccessAllowed(true);

      const [messagesResult, preferencesResult] = await Promise.all([
        getMessages(),
        getMessagePreferences(),
      ]);

      if (messagesResult.error) {
        setMessageError("Your messages could not be loaded. Please try again.");
        setIsLoading(false);
        return;
      }

      if (preferencesResult.error) {
        setMessageError(
          "Your messages loaded, but saved-message settings could not be loaded."
        );
      }

      setMessages(messagesResult.data);
      setPreferences(preferencesResult.data);

      const firstVisibleMessage = messagesResult.data.find(
        (message) => !preferencesResult.data[message.id]?.is_deleted
      );

      if (firstVisibleMessage) {
        setSelectedMember(
          firstVisibleMessage.sender_id === user.id
            ? firstVisibleMessage.recipient
            : firstVisibleMessage.sender
        );
      }

      setIsLoading(false);
    }

    loadMessageCenter();
  }, [navigate]);

  const visibleMessages = useMemo(
    () => messages.filter((message) => !preferences[message.id]?.is_deleted),
    [messages, preferences]
  );

  const conversationSummaries = useMemo(
    () =>
      visibleMessages
        .reduce((conversations, message) => {
          const otherMember =
            message.sender_id === currentUserId
              ? message.recipient
              : message.sender;

          if (!otherMember) return conversations;

          let conversation = conversations.find(
            (item) => item.member.id === otherMember.id
          );

          if (!conversation) {
            conversation = {
              member: otherMember,
              lastMessage: message,
              unreadCount: 0,
            };
            conversations.push(conversation);
          }

          if (
            new Date(message.created_at).getTime() >
            new Date(conversation.lastMessage.created_at).getTime()
          ) {
            conversation.lastMessage = message;
          }

          if (
            message.sender_id === otherMember.id &&
            message.recipient_id === currentUserId &&
            !message.is_read
          ) {
            conversation.unreadCount += 1;
          }

          return conversations;
        }, [])
        .sort(
          (a, b) =>
            new Date(b.lastMessage.created_at).getTime() -
            new Date(a.lastMessage.created_at).getTime()
        ),
    [visibleMessages, currentUserId]
  );

  useEffect(() => {
    if (
      selectedMember &&
      !conversationSummaries.some(
        ({ member }) => member.id === selectedMember.id
      )
    ) {
      setSelectedMember(conversationSummaries[0]?.member || null);
    }
  }, [conversationSummaries, selectedMember]);

  const conversationMessages = useMemo(() => {
    if (!selectedMember) return [];

    return visibleMessages.filter((message) => {
      const belongsToConversation =
        (message.sender_id === currentUserId &&
          message.recipient_id === selectedMember.id) ||
        (message.sender_id === selectedMember.id &&
          message.recipient_id === currentUserId);

      return (
        belongsToConversation &&
        (!showSavedOnly || preferences[message.id]?.is_saved)
      );
    });
  }, [
    currentUserId,
    preferences,
    selectedMember,
    showSavedOnly,
    visibleMessages,
  ]);

  useEffect(() => {
    const messageBody = messageBodyRef.current;
    if (messageBody) messageBody.scrollTop = messageBody.scrollHeight;
  }, [conversationMessages.length, selectedMember]);

  useEffect(() => {
    async function updateReadStatus() {
      if (!selectedMember || !currentUserId) return;

      const unreadMessagesExist = visibleMessages.some(
        (message) =>
          message.sender_id === selectedMember.id &&
          message.recipient_id === currentUserId &&
          !message.is_read
      );

      if (!unreadMessagesExist) return;

      const { error } = await markConversationRead(selectedMember.id);

      if (error) {
        setMessageError(
          "The conversation opened, but its read status could not be updated."
        );
        return;
      }

      setMessages((currentMessages) =>
        currentMessages.map((message) =>
          message.sender_id === selectedMember.id &&
          message.recipient_id === currentUserId &&
          !message.is_read
            ? { ...message, is_read: true }
            : message
        )
      );
    }

    updateReadStatus();
  }, [selectedMember, currentUserId, visibleMessages]);

  function formatMessageTime(createdAt) {
    const messageDate = new Date(createdAt);
    const today = new Date();
    const messageDay = new Date(
      messageDate.getFullYear(),
      messageDate.getMonth(),
      messageDate.getDate()
    );
    const todayDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const differenceInDays = (todayDay - messageDay) / 86400000;
    const time = messageDate.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });

    if (differenceInDays === 0) return `Today • ${time}`;
    if (differenceInDays === 1) return `Yesterday • ${time}`;

    return `${messageDate.toLocaleDateString([], {
      month: "short",
      day: "numeric",
      year:
        messageDate.getFullYear() !== today.getFullYear()
          ? "numeric"
          : undefined,
    })} • ${time}`;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const trimmedMessage = newMessage.trim();

    if (!trimmedMessage || !selectedMember || isSending) return;

    setIsSending(true);
    setMessageError("");

    const { data, error } = await sendMessage(
      selectedMember.id,
      trimmedMessage
    );
    setIsSending(false);

    if (error) {
      setMessageError("Your message could not be sent. Please try again.");
      return;
    }

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        ...data,
        sender: { id: currentUserId, display_name: currentUserName },
        recipient: selectedMember,
      },
    ]);
    setNewMessage("");
  }

  async function handleSaveToggle(message) {
    const isSaved = Boolean(preferences[message.id]?.is_saved);
    setUpdatingMessageId(message.id);
    setMessageError("");

    const { error } = await setMessagePreference(message.id, {
      is_saved: !isSaved,
      is_deleted: false,
    });

    setUpdatingMessageId(null);

    if (error) {
      setMessageError("That message could not be saved. Please try again.");
      return;
    }

    setPreferences((current) => ({
      ...current,
      [message.id]: {
        ...current[message.id],
        is_saved: !isSaved,
        is_deleted: false,
      },
    }));
  }

  async function handleDelete(message) {
    const confirmed = window.confirm(
      "Delete this message from your PawCircle inbox? The other member will still keep their copy."
    );

    if (!confirmed) return;

    setUpdatingMessageId(message.id);
    setMessageError("");

    const { error } = await setMessagePreference(message.id, {
      is_saved: false,
      is_deleted: true,
    });

    setUpdatingMessageId(null);

    if (error) {
      setMessageError("That message could not be deleted. Please try again.");
      return;
    }

    setPreferences((current) => ({
      ...current,
      [message.id]: {
        ...current[message.id],
        is_saved: false,
        is_deleted: true,
      },
    }));
  }

  if (!accessAllowed || isLoading) {
    return (
      <section className="messages">
        <div className="container">
          <div className="profile-loading">Loading PawCircle messages...</div>
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

        <p className="messages__intro">
          <span className="purple">PawCircle</span> intro messages help pet
          owners and pet service providers make an initial connection. What
          happens next is up to you.
        </p>

        {messageError && (
          <p className="message__error" role="alert">
            {messageError}
          </p>
        )}

        {conversationSummaries.length === 0 ? (
          <div className="message-thread message-thread--empty">
            <p className="message-empty">
              You do not have any intro messages yet.
            </p>
          </div>
        ) : (
          <div className="messages__layout">
            <aside className="messages__conversations">
              <h2>Conversations</h2>
              <div className="messages__conversation-list">
                {conversationSummaries.map(
                  ({ member, lastMessage, unreadCount }) => (
                    <button
                      type="button"
                      key={member.id}
                      className={`messages__conversation-button ${
                        selectedMember?.id === member.id
                          ? "messages__conversation-button--active"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedMember(member);
                        setShowSavedOnly(false);
                        setMessageError("");
                      }}
                    >
                      <span className="messages__conversation-top">
                        <span className="messages__conversation-name">
                          🐾 {member.display_name || "PawCircle Member"}
                        </span>
                        {unreadCount > 0 && (
                          <span className="messages__unread-badge">
                            {unreadCount}
                          </span>
                        )}
                      </span>
                      <span className="messages__conversation-preview">
                        {lastMessage.message_text}
                      </span>
                      <span className="messages__conversation-time">
                        {formatMessageTime(lastMessage.created_at)}
                      </span>
                    </button>
                  )
                )}
              </div>
            </aside>

            <div className="message-thread">
              <div className="message-thread__header">
                <div>
                  <h3>
                    🐾 {selectedMember?.display_name || "PawCircle Member"}
                  </h3>
                  <p>Intro conversation</p>
                </div>
                <button
                  type="button"
                  className={`message-thread__saved-filter ${
                    showSavedOnly
                      ? "message-thread__saved-filter--active"
                      : ""
                  }`}
                  onClick={() => setShowSavedOnly((current) => !current)}
                  aria-pressed={showSavedOnly}
                >
                  {showSavedOnly ? "Show all" : "Saved only"}
                </button>
              </div>

              <div className="message-thread__body" ref={messageBodyRef}>
                {conversationMessages.length === 0 ? (
                  <div className="message-empty">
                    <p>
                      {showSavedOnly
                        ? "No saved messages in this conversation."
                        : "🐾 No messages in this conversation yet."}
                    </p>
                  </div>
                ) : (
                  conversationMessages.map((message) => {
                    const sentByCurrentUser =
                      message.sender_id === currentUserId;
                    const isSaved = Boolean(
                      preferences[message.id]?.is_saved
                    );
                    const isUpdating = updatingMessageId === message.id;

                    return (
                      <div
                        key={message.id}
                        className={`message ${
                          sentByCurrentUser
                            ? "message--sent"
                            : "message--received"
                        }`}
                      >
                        {!sentByCurrentUser && (
                          <strong className="message__sender">
                            {selectedMember?.display_name ||
                              "PawCircle Member"}
                          </strong>
                        )}
                        <p>{message.message_text}</p>
                        <small className="message__time">
                          {formatMessageTime(message.created_at)}
                        </small>
                        <div
                          className="message__options"
                          aria-label="Message options"
                        >
                          <button
                            type="button"
                            className={
                              isSaved ? "message__save--active" : ""
                            }
                            onClick={() => handleSaveToggle(message)}
                            disabled={isUpdating}
                          >
                            {isSaved ? "★ Saved" : "☆ Save"}
                          </button>
                          <button
                            type="button"
                            className="message__delete"
                            onClick={() => handleDelete(message)}
                            disabled={isUpdating}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <form className="message-form" onSubmit={handleSubmit}>
                <textarea
                  placeholder={`Write a message to ${
                    selectedMember?.display_name || "this member"
                  }...`}
                  value={newMessage}
                  onChange={(event) => {
                    setNewMessage(event.target.value);
                    if (messageError) setMessageError("");
                  }}
                  maxLength={1000}
                  disabled={isSending}
                  required
                />
                <div className="message-form__footer">
                  <p
                    className={`message__character-count ${
                      newMessage.length >= 980
                        ? "message__character-count--danger"
                        : newMessage.length >= 900
                          ? "message__character-count--warning"
                          : ""
                    }`}
                  >
                    {newMessage.length}/1000
                  </p>
                  <button
                    type="submit"
                    disabled={!newMessage.trim() || isSending}
                  >
                    {isSending ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Messages;
