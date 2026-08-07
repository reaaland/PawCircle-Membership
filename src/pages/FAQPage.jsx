import { Link } from "react-router-dom";

const questions = [
  {
    question: "Is PawCircle Membership accepting new members?",
    answer:
      "No. The original paid membership has closed. The current website is a public portfolio demonstration and does not accept payments or create member accounts.",
  },
  {
    question: "Are the providers shown on the website real?",
    answer:
      "No. Every provider, owner, message, location detail, and availability status in the public demo is fictional and exists only to demonstrate the interface.",
  },
  {
    question: "Can I book pet care through the demo?",
    answer:
      "No. The demo does not send messages, arrange services, process bookings, or connect visitors with real providers.",
  },
  {
    question: "What was the original product concept?",
    answer:
      "PawCircle explored a local directory and direct-introduction model for pet owners and independent pet service providers, without controlling the service transaction.",
  },
  {
    question: "What technology was used?",
    answer:
      "The product was built with React and Vite, Supabase authentication and Postgres data, row-level security, Edge Functions, responsive CSS, GitHub, Vercel, and an original Stripe subscription flow that has been retired.",
  },
  {
    question: "Why keep the website online?",
    answer:
      "It demonstrates PawCircle LLC’s ability to turn a business idea into a responsive, full-stack product with thoughtful roles, profiles, privacy controls, discovery, and messaging flows.",
  },
];

function FAQPage() {
  return (
    <section className="faq-page">
      <div className="container">
        <div className="row row__narrow">
          <h1>Frequently Asked Questions</h1>
          <p className="faq__intro">
            Current information about the PawCircle Membership portfolio demo.
          </p>

          <div className="faq__list">
            {questions.map((item) => (
              <div className="faq__item" key={item.question}>
                <h2>{item.question}</h2>
                <p>{item.answer}</p>
              </div>
            ))}

            <div className="faq__item">
              <h2>Where can I see the complete project?</h2>
              <p>
                Start with the <Link to="/demo">interactive demo</Link>, then
                read the <Link to="/case-study">project case study</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQPage;
