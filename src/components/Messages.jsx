import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import {
  getConversationPreferences,
  getMessages,
  markConversationRead,
  sendMessage,
  setConversationPreference,
} from "../Services/supabaseService";
import "../messages.css";

function Messages() {
  const navigate = useNavigate();
  const messageBodyRef = useRef(null);

  const [accessAllowed, setAccessAllowed] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUserName, setCurrentUserName] = useState("PawCircle Member");
  const [messages, setMessages] = useState([]);
  const [conversationPreferences, setConversationPreferences] = useState({});
  const [selectedMember, setSelectedMember] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [showSavedConversations, setShowSavedConversations] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [isUpdatingConversation, setIsUpdatingConversation] = useState(false);
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
        getConversationPreferences(),
      ]);

      if (messagesResult.error) {
        setMessageError("Your messages could not be loaded. Please try again.");
        setIsLoading(false);
        return;
      }

      if (preferencesResult.error) {
        setMessageError(
          "Your messages loaded, but conversation settings could not be loaded."
        );
      }

      setMessages(messagesResult.data);
      setConversationPreferences(preferencesResult.data);
      setIsLoading(false);
    }

    loadMessageCenter();
  }, [navigate]);

  const conversationSummaries = useMemo(() => {
    const conversations = messages.reduce((items, message) => {
      const otherMember =
        message.sender_id === currentUserId ? message.recipient : message.sender;

      if (!otherMember) return items;

      const preference = conversationPreferences[otherMember.id];
      const deletedBefore = preference?.deleted_before
        ? new Date(preference.deleted_before).getTime()
        : null;
      const messageTime = new Date(message.created_at).getTime();

      if (deletedBefore && messageTime <= deletedBefore) return items;

      let conversation = items.find(
        (item) => item.member.id === otherMember.id
      );

      if (!conversation) {
        conversation = {
          member: otherMember,
          lastMessage: message,
          unreadCount: 0,
          isSaved: Boolean(preference?.is_saved),
        };
        items.push(conversation);
      }

      if (
        messageTime > new Date(conversation.lastMessage.created_at).getTime()
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

      return items;
    }, []);

    return conversations
      .filter((conversation) => !showSavedConversations || conversation.isSaved)
      .sort(
        (a, b) =>
          new Date(b.lastMessage.created_at).getTime() -
          new Date(a.lastMessage.created_at).getTime()
      );
  }, [
    conversationPreferences,
    currentUserId,
    messages,
    showSavedConversations,
  ]);

  useEffect(() => {
    if (conversationSummaries.length === 0) {
      setSelectedMember(null);
      return;
    }

    if (
      !selectedMember ||
      !conversationSummaries.some(
        ({ member }) => member.id === selectedMember.id
      )
    ) {
      setSelectedMember(conversationSummaries[0].member);
    }
  }, [conversationSummaries, selectedMember]);

  const conversationMessages = useMemo(() => {
    if (!selectedMember) return [];

    const deletedBefore =
      conversationPreferences[selectedMember.id]?.deleted_before;
    const deletedBeforeTime = deletedBefore
      ? new Date(deletedBefore).getTime()
      : null;

    return messages.filter((message) => {
      const belongsToConversation =
        (message.sender_id === currentUserId &&
          message.recipient_id === selectedMember.id) ||
        (message.sender_id === selectedMember.id &&
          message.recipient_id === currentUserId);

      if (!belongsToConversation) return false;

      return (
        !deletedBeforeTime ||
        new Date(message.created_at).getTime() > deletedBeforeTime
      );
    });
  }, [
    conversationPreferences,
    currentUserId,
    messages,
    selectedMember,
  ]);

  useEffect(() => {
    const messageBody = messageBodyRef.current;
    if (messageBody) messageBody.scrollTop = messageBody.scrollHeight;
  }, [conversationMessages.length, selectedMember]);

  useEffect(() => {
    async function updateReadStatus() {
      if (!selectedMember || !currentUserId) return;

      const unreadMessagesExist = conversationMessages.some(
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
  }, [conversationMessages, currentUserId, selectedMember]);

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

  async function handleSaveConversation() {
    if (!selectedMember || isUpdatingConversation) return;

    const currentPreference =
      conversationPreferences[selectedMember.id] || {};
    const nextSavedState = !currentPreference.is_saved;

    setIsUpdatingConversation(true);
    setMessageError("");

    const { error } = await setConversationPreference(selectedMember.id, {
      is_saved: nextSavedState,
      deleted_before: currentPreference.deleted_before || null,
    });

    setIsUpdatingConversation(false);

    if (error) {
      setMessageError(
        "That conversation could not be saved. Please try again."
      );
      return;
    }

    setConversationPreferences((current) => ({
      ...current,
      [selectedMember.id]: {
        ...current[selectedMember.id],
        is_saved: nextSavedState,
        deleted_before: currentPreference.deleted_before || null,
      },
    }));
  }

  async function handleDeleteConversation() {
    if (!selectedMember || isUpdatingConversation) return;

    const confirmed = window.confirm(
      `Delete your conversation with ${
        selectedMember.display_name || "this member"
      } from your PawCircle inbox? The other member will keep their copy. A new message from either of you will start the conversation again.`
    );

    if (!confirmed) return;

    const deletedBefore = new Date().toISOString();

    setIsUpdatingConversation(true);
    setMessageError("");

    const { error } = await setConversationPreference(selectedMember.id, {
      is_saved: false,
      deleted_before: deletedBefore,
    });

    setIsUpdatingConversation(false);

    if (error) {
      setMessageError(
        "That conversation could not be deleted. Please try again."
      );
      return;
    }

    setConversationPreferences((current) => ({
      ...current,
      [selectedMember.id]: {
        is_saved: false,
        deleted_before: deletedBefore,
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

  const selectedPreference = selectedMember
    ? conversationPreferences[selectedMember.id] || {}
    : {};
  const selectedConversationSaved = Boolean(selectedPreference.is_saved);

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

        <div className="messages__layout">
          <aside className="messages__conversations">
            <div className="messages__conversations-heading">
              <h2>Conversations</h2>
              <button
                type="button"
                className={`messages__saved-list-toggle ${
                  showSavedConversations
                    ? "messages__saved-list-toggle--active"
                    : ""
                }`}
                onClick={() =>
                  setShowSavedConversations((current) => !current)
                }
                aria-pressed={showSavedConversations}
              >
                {showSavedConversations ? "Show all" : "Saved"}
              </button>
            </div>

            {conversationSummaries.length === 0 ? (
              <p className="messages__no-conversations">
                {showSavedConversations
                  ? "No saved conversations yet."
                  : "You do not have any intro messages yet."}
              </p>
            ) : (
              <div className="messages__conversation-list">
                {conversationSummaries.map(
                  ({ member, lastMessage, unreadCount, isSaved }) => (
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
                        setMessageError("");
                      }}
                    >
                      <span className="messages__conversation-top">
                        <span className="messages__conversation-name">
                          🐾 {member.display_name || "PawCircle Member"}
                        </span>
                        <span className="messages__conversation-indicators">
                          {isSaved && (
                            <span
                              className="messages__saved-indicator"
                              aria-label="Saved conversation"
                              title="Saved conversation"
                            >
                              ★
                            </span>
                          )}
                          {unreadCount > 0 && (
                            <span className="messages__unread-badge">
                              {unreadCount}
                            </span>
                          )}
                        </span>
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
            )}
          </aside>

          {selectedMember ? (
            <div className="message-thread">
              <div className="message-thread__header">
                <div className="message-thread__member">
                  <h3>
                    🐾 {selectedMember.display_name || "PawCircle Member"}
                  </h3>
                  <p>Intro conversation</p>
                </div>

                <div
                  className="message-thread__actions"
                  aria-label="Conversation options"
                >
                  <button
                    type="button"
                    className={`message-thread__save ${
                      selectedConversationSaved
                        ? "message-thread__save--active"
                        : ""
                    }`}
                    onClick={handleSaveConversation}
                    disabled={isUpdatingConversation}
                    aria-pressed={selectedConversationSaved}
                  >
                    {selectedConversationSaved ? "★ Saved" : "☆ Save"}
                  </button>
                  <button
                    type="button"
                    className="message-thread__delete"
                    onClick={handleDeleteConversation}
                    disabled={isUpdatingConversation}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="message-thread__body" ref={messageBodyRef}>
                {conversationMessages.length === 0 ? (
                  <div className="message-empty">
                    <p>🐾 No messages in this conversation yet.</p>
                  </div>
                ) : (
                  conversationMessages.map((message) => {
                    const sentByCurrentUser =
                      message.sender_id === currentUserId;

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
                            {selectedMember.display_name ||
                              "PawCircle Member"}
                          </strong>
                        )}
                        <p>{message.message_text}</p>
                        <small className="message__time">
                          {formatMessageTime(message.created_at)}
                        </small>
                      </div>
                    );
                  })
                )}
              </div>

              <form className="message-form" onSubmit={handleSubmit}>
                <textarea
                  placeholder={`Write a message to ${
                    selectedMember.display_name || "this member"
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
          ) : (
            <div className="message-thread message-thread--empty">
              <p className="message-empty">
                {showSavedConversations
                  ? "Choose a saved conversation or show all conversations."
                  : "Select a conversation to view its messages."}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Messages;
