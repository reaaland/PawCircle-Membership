import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const openDeletionStatuses = [
  "pending",
  "identity_verified",
  "processing",
];

function formatDeletionStatus(status) {
  const labels = {
    pending: "Request received",
    identity_verified: "Identity verified",
    processing: "Deletion in progress",
    completed: "Completed",
    declined: "Unable to complete",
    canceled: "Canceled",
  };

  return labels[status] || "Under review";
}

function formatRequestDate(value) {
  if (!value) return "";

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function AccountSettings() {
  const navigate = useNavigate();
  const [showCancelWarning, setShowCancelWarning] = useState(false);
  const [showDeletionWarning, setShowDeletionWarning] = useState(false);
  const [accessAllowed, setAccessAllowed] = useState(false);
  const [membershipStatus, setMembershipStatus] = useState("");
  const [accountUser, setAccountUser] = useState(null);
  const [deletionRequest, setDeletionRequest] = useState(null);
  const [deletionConfirmed, setDeletionConfirmed] = useState(false);
  const [deletionSubmitting, setDeletionSubmitting] = useState(false);
  const [deletionMessage, setDeletionMessage] = useState("");
  const [deletionError, setDeletionError] = useState("");

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
        .maybeSingle();

      if (error || !profile) {
        navigate("/membership");
        return;
      }

      const { data: latestDeletionRequest, error: deletionRequestError } =
        await supabase
          .from("account_deletion_requests")
          .select(
            "id, status, requested_at, updated_at, confirmation_sent_at, completed_at",
          )
          .eq("user_id", user.id)
          .order("requested_at", { ascending: false })
          .limit(1)
          .maybeSingle();

      if (deletionRequestError) {
        console.error(
          "Could not load account deletion request:",
          deletionRequestError,
        );
      }

      setAccountUser(user);
      setMembershipStatus(profile.membership_status || "inactive");
      setDeletionRequest(latestDeletionRequest || null);
      setAccessAllowed(true);
    }

    checkAccess();
  }, [navigate]);

  async function submitDeletionRequest() {
    if (
      !deletionConfirmed ||
      !accountUser?.id ||
      !accountUser?.email ||
      deletionSubmitting
    ) {
      return;
    }

    setDeletionSubmitting(true);
    setDeletionMessage("");
    setDeletionError("");

    const normalizedEmail = accountUser.email.toLowerCase().trim();

    const { data: request, error: requestError } = await supabase
      .from("account_deletion_requests")
      .insert({
        user_id: accountUser.id,
        account_email: normalizedEmail,
      })
      .select(
        "id, status, requested_at, updated_at, confirmation_sent_at, completed_at",
      )
      .single();

    if (requestError) {
      if (requestError.code === "23505") {
        const { data: existingRequest } = await supabase
          .from("account_deletion_requests")
          .select(
            "id, status, requested_at, updated_at, confirmation_sent_at, completed_at",
          )
          .eq("user_id", accountUser.id)
          .in("status", openDeletionStatuses)
          .order("requested_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        if (existingRequest) {
          setDeletionRequest(existingRequest);
          setDeletionMessage(
            "Your account deletion request is already recorded and under review.",
          );
          setShowDeletionWarning(false);
          setDeletionConfirmed(false);
          setDeletionSubmitting(false);
          return;
        }
      }

      console.error("Account deletion request failed:", requestError);
      setDeletionError(
        "Your request could not be submitted. Please try again or email hello@pawcirclemembership.com.",
      );
      setDeletionSubmitting(false);
      return;
    }

    setDeletionRequest(request);

    const { error: notificationError } = await supabase.functions.invoke(
      "send-account-deletion-request",
      { body: { request_id: request.id } },
    );

    if (notificationError) {
      console.error(
        "Account deletion request receipt failed:",
        notificationError,
      );
      setDeletionMessage(
        "Your request was saved successfully. The email receipt could not be sent, but PawCircle Membership can still review the recorded request.",
      );
    } else {
      setDeletionMessage(
        "Your request was received. A confirmation was sent to your account email.",
      );
    }

    setShowDeletionWarning(false);
    setDeletionConfirmed(false);
    setDeletionSubmitting(false);
  }

  if (!accessAllowed) {
    return (
      <section id="account-settings">
        <div className="container">
          <div className="row row__column">
            <div className="profile-loading">Checking membership...</div>
          </div>
        </div>
      </section>
    );
  }

  const membershipActive = membershipStatus === "active";
  const returnPath = membershipActive ? "/dashboard" : "/details";
  const deletionRequestOpen = openDeletionStatuses.includes(
    deletionRequest?.status,
  );

  return (
    <section id="account-settings">
      <div className="container">
        <div className="row row__column">
          <div className="page__header">
            <h2>Account Settings</h2>

            <Link to={returnPath} className="page__close">
              ✕
            </Link>
          </div>

          <div className="settings__card">
            <h3>Membership Status</h3>

            <p>
              <strong>Status:</strong>{" "}
              {membershipActive ? "Active" : "Inactive"}
            </p>

            {membershipActive ? (
              <p>
                Legacy account status is shown for recordkeeping only. Live
                member access and billing are disabled.
              </p>
            ) : (
              <p>
                The original paid membership has closed. This account is retained
                only while PawCircle completes member data requests.
              </p>
            )}
          </div>

          {membershipActive ? (
            <>
              <div className="settings__card">
                <h3>Profile Settings</h3>

                <p>
                  Update your profile information, services, availability,
                  contact preferences, and visibility settings.
                </p>

                <Link to="/profile" className="btn">
                  Edit Profile
                </Link>
              </div>

              <div className="settings__card">
                <h3>Message Center</h3>

                <p>View incoming messages and PawCircle Membership introductions.</p>

                <Link to="/messages" className="btn">
                  Open Message Center
                </Link>
              </div>
            </>
          ) : (
            <div className="settings__card">
              <h3>Member Features Unavailable</h3>

              <p>
                Profile editing, member directories, and intro messages become
                unavailable after the paid membership period ends.
              </p>
            </div>
          )}

          <div className="settings__card">
            <h3>Membership</h3>

            <p>
              Review your membership status, pricing, and account details.
            </p>

            <div className="settings__actions">
              <Link to="/details" className="btn">
                View Membership Details
              </Link>

              {membershipActive ? (
                <button
                  className="btn btn--secondary"
                  onClick={() => setShowCancelWarning(true)}
                >
                  Manage or Cancel Membership
                </button>
              ) : (
                <Link to="/membership" className="btn btn--secondary">
                  View Membership Options
                </Link>
              )}
            </div>
          </div>

          {showCancelWarning && membershipActive && (
            <div className="modal__backdrop">
              <div className="modal">
                <h3>Manage or Cancel Membership</h3>

                <p>
                  Canceling does not provide a refund. Your PawCircle Membership access
                  is no longer available because live memberships have closed.
                </p>

                <p>
                  The public PawCircle site is now a portfolio demonstration
                  with fictional profiles and no live billing.
                </p>

                <div className="modal__actions">
                  <button
                    className="btn btn--secondary"
                    onClick={() => setShowCancelWarning(false)}
                  >
                    Go Back
                  </button>

                  <Link to="/case-study" className="btn">
                    View Portfolio Case Study
                  </Link>
                </div>
              </div>
            </div>
          )}

          <div className="settings__card">
            <h3>Account and Data Deletion</h3>

            <p>
              Request permanent deletion of your PawCircle Membership account and personal
              data. This is separate from managing or canceling a membership.
            </p>

            <p className="settings__warning">
              Submitting a deletion request does not automatically cancel
              billing, immediately delete your account, or create a refund.
              Membership fees already paid remain non-refundable.
            </p>

            {deletionRequest && (
              <div className="membership__summary">
                <p>
                  <strong>Status:</strong>{" "}
                  {formatDeletionStatus(deletionRequest.status)}
                </p>
                <p>
                  <strong>Requested:</strong>{" "}
                  {formatRequestDate(deletionRequest.requested_at)}
                </p>
                <p>
                  <strong>Request ID:</strong>{" "}
                  {deletionRequest.id}
                </p>
              </div>
            )}

            {deletionMessage && <p>{deletionMessage}</p>}
            {deletionError && (
              <p role="alert" className="settings__warning">
                {deletionError}
              </p>
            )}

            {deletionRequestOpen ? (
              <p>
                PawCircle Membership will contact you at your account email after reviewing
                identity, membership status, and deletion timing.
              </p>
            ) : (
              <button
                className="btn btn--secondary"
                onClick={() => {
                  setDeletionError("");
                  setDeletionMessage("");
                  setDeletionConfirmed(false);
                  setShowDeletionWarning(true);
                }}
              >
                Request Account Deletion
              </button>
            )}

            <p>
              Review the <Link to="/privacy">Privacy Policy</Link> for more
              information about deletion and limited record retention.
            </p>
          </div>

          {showDeletionWarning && (
            <div className="modal__backdrop">
              <div className="modal">
                <h3>Request Account and Data Deletion</h3>

                <p>
                  After verifying your request, PawCircle Membership will coordinate the
                  removal of your account, profile, uploaded profile photos,
                  messages, and member preferences.
                </p>

                <p>
                  Some payment, tax, security, fraud-prevention, legal, and
                  deletion-request records may be retained when reasonably
                  necessary or required. Stripe may also retain payment records
                  under its own policies.
                </p>

                {membershipActive && (
                  <p>
                    Your membership is currently active. PawCircle Membership will confirm
                    whether deletion should occur now or after your paid access
                    period ends. Choosing earlier deletion ends remaining access
                    when deletion is completed and does not create a refund.
                  </p>
                )}

                <label className="agreement__choice">
                  <input
                    type="checkbox"
                    checked={deletionConfirmed}
                    onChange={(event) =>
                      setDeletionConfirmed(event.target.checked)
                    }
                  />
                  <span>
                    I understand this is an account deletion request, not a
                    refund request. Membership fees already paid are
                    non-refundable.
                  </span>
                </label>

                <div className="modal__actions">
                  <button
                    className="btn btn--secondary"
                    disabled={deletionSubmitting}
                    onClick={() => {
                      setShowDeletionWarning(false);
                      setDeletionConfirmed(false);
                    }}
                  >
                    Go Back
                  </button>

                  <button
                    className="btn"
                    disabled={!deletionConfirmed || deletionSubmitting}
                    onClick={submitDeletionRequest}
                  >
                    {deletionSubmitting
                      ? "Submitting Request..."
                      : "Submit Deletion Request"}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="settings__card">
            <h3>Support</h3>

            <p>Questions about your account, membership, or PawCircle Membership profile?</p>

            <Link to="/contact" className="btn">
              Contact PawCircle Membership
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AccountSettings;
