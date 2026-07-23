import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import {
  getMessages,
  sendMessage,
  markConversationRead,
} from "../Services/supabaseService";

function Messages() {
  const navigate = useNavigate();

  const [accessAllowed, setAccessAllowed] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [messageError, setMessageError] = useState("");
  const messageBodyRef = useRef(null);
  const [currentUserName, setCurrentUserName] =
  useState("PawCircle Member");

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

      if (
        profileError ||
        profile?.membership_status !== "active"
      ) {
        navigate("/membership");
        return;
      }

      setCurrentUserId(user.id);
      setCurrentUserName(
      profile.display_name || "PawCircle Member"
      );
      setAccessAllowed(true);

      const { data, error } = await getMessages();

      if (error) {
        setMessageError(
          "Your messages could not be loaded. Please try again."
        );
        setIsLoading(false);
        return;
      }

      setMessages(data);

      if (data.length > 0) {
        const firstMessage = data[0];

        const otherMember =
          firstMessage.sender_id === user.id
            ? firstMessage.recipient
            : firstMessage.sender;

        setSelectedMember(otherMember);
      }

      setIsLoading(false);
    }

    loadMessageCenter();
  }, [navigate]);

  const conversationSummaries = messages
  .reduce((conversations, message) => {
    const otherMember =
      message.sender_id === currentUserId
        ? message.recipient
        : message.sender;

    if (!otherMember) {
      return conversations;
    }

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

    const currentLastMessageTime = new Date(
      conversation.lastMessage.created_at
    ).getTime();

    const newMessageTime = new Date(
      message.created_at
    ).getTime();

    if (newMessageTime > currentLastMessageTime) {
      conversation.lastMessage = message;
    }

    const isUnreadIncomingMessage =
      message.sender_id === otherMember.id &&
      message.recipient_id === currentUserId &&
      !message.is_read;

    if (isUnreadIncomingMessage) {
      conversation.unreadCount += 1;
    }

    return conversations;
  }, [])
  .sort(
    (a, b) =>
      new Date(b.lastMessage.created_at).getTime() -
      new Date(a.lastMessage.created_at).getTime()
  );
 
  const conversationMessages = selectedMember
    ? messages.filter(
        (message) =>
          (message.sender_id === currentUserId &&
            message.recipient_id === selectedMember.id) ||
          (message.sender_id === selectedMember.id &&
            message.recipient_id === currentUserId)
      )
    : [];

    useEffect(() => {
      const messageBody = messageBodyRef.current;

      if (!messageBody) return;

      messageBody.scrollTop = messageBody.scrollHeight;
    }, [conversationMessages.length, selectedMember]);

    useEffect(() => {
  async function updateReadStatus() {
    if (!selectedMember || !currentUserId) return;

    const unreadMessagesExist = messages.some(
      (message) =>
        message.sender_id === selectedMember.id &&
        message.recipient_id === currentUserId &&
        !message.is_read
    );

    if (!unreadMessagesExist) return;

    const { error } = await markConversationRead(
      selectedMember.id
    );

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
          ? {
              ...message,
              is_read: true,
            }
          : message
      )
    );
  }

  updateReadStatus();
}, [selectedMember, currentUserId, messages]);

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

  const differenceInDays =
    (todayDay - messageDay) / (1000 * 60 * 60 * 24);

  const time = messageDate.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  if (differenceInDays === 0) {
    return `Today • ${time}`;
  }

  if (differenceInDays === 1) {
    return `Yesterday • ${time}`;
  }

  return `${messageDate.toLocaleDateString([], {
    month: "short",
    day: "numeric",
    year:
      messageDate.getFullYear() !== today.getFullYear()
        ? "numeric"
        : undefined,
  })} • ${time}`;
}

  async function handleSubmit(e) {
    e.preventDefault();

    const trimmedMessage = newMessage.trim();

    if (
      !trimmedMessage ||
      !selectedMember ||
      isSending
    ) {
      return;
    }

    setIsSending(true);
    setMessageError("");

    const { data, error } = await sendMessage(
      selectedMember.id,
      trimmedMessage
    );

    setIsSending(false);

    if (error) {
      console.error("Error sending reply:", error);

      setMessageError(
        "Your message could not be sent. Please try again."
      );

      return;
    }

    const newSavedMessage = {
      ...data,
      sender: {
        id: currentUserId,
        display_name: currentUserName,
      },
      recipient: selectedMember,
    };

    setMessages((currentMessages) => [
      ...currentMessages,
      newSavedMessage,
    ]);

    setNewMessage("");
  }

  if (!accessAllowed || isLoading) {
    return (
      <section className="messages">
        <div className="container">
          <div className="row row__column">
            <div className="profile-loading">
              Loading PawCircle messages...
            </div>
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
          <span className="purple">PawCircle</span> intro messages
          help pet owners and pet service providers make an initial
          connection. What happens next is up to you.
        </p>

        {messageError && (
          <p className="message__error" role="alert">
            {messageError}
          </p>
        )}

        {conversationSummaries.length === 0 ? (
          <div className="message-thread">
            <p className="message-empty">
              You do not have any intro messages yet.
            </p>
          </div>
        ) : (
          <div className="messages__layout">
            <aside className="messages__conversations">
              <h2>Conversations</h2>

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
                      setMessageError("");
                    }}
                  >
                    <span className="messages__conversation-top">
                      <span className="messages__conversation-name">
                        🐾 {member.display_name || "PawCircle Member"}
                      </span>

                      {unreadCount > 0 && (
                        <span
                          className="messages__unread-badge"
                          aria-label={`${unreadCount} unread ${
                            unreadCount === 1 ? "message" : "messages"
                          }`}
                        >
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
            </aside>

            <div className="message-thread">
            <div className="message-thread__header">
              <div>
                <h3>
                  🐾{" "}
                  {selectedMember?.display_name ||
                    "PawCircle Member"}
                </h3>

                <p>Intro conversation</p>
              </div>
            </div>

            <div
              className="message-thread__body"
              ref={messageBodyRef}
            >
              {conversationMessages.length === 0 ? (
                <div className="message-empty">
                  <p>🐾 No messages in this conversation yet.</p>
                  <p>Send a short introduction to get started.</p>
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
                {selectedMember?.display_name ||
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

  <form
    className="message-form"
    onSubmit={handleSubmit}
  >
    <textarea
      placeholder={`Write a message to ${
        selectedMember?.display_name ||
        "this member"
      }...`}
      value={newMessage}
      onChange={(e) => {
        setNewMessage(e.target.value);

        if (messageError) {
          setMessageError("");
        }
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