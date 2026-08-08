import { Link } from "react-router-dom";

const questions = [
  {
    question: "Is PawCircle Membership accepting new members?",
    answer:
      "No. The original paid membership has closed. The current website is a public portfolio demo and does not accept payments or create member accounts.",
  },
  {
    question: "Are the providers shown on the website real?",
    answer:
      "No. Every provider, owner, message, location detail, and availability status in the public demo is fictional and exists only to show how the product worked.",
  },
  {
    question: "Can I book pet care through the demo?",
    answer:
      "No. The demo does not send messages, arrange services, process bookings, or connect visitors with real providers.",
  },
  {
    question: "What was the original idea?",
    answer:
      "PawCircle was designed to give pet owners and independent pet-care providers another local way to find each other and communicate directly, without PawCircle taking a commission or managing the pet-care job itself.",
  },
  {
    question: "What technology was used?",
    answer:
      "I built the product with React and Vite, Supabase authentication and Postgres data, row-level security, Edge Functions, responsive CSS, GitHub, Vercel, and a Stripe subscription flow that has since been retired.",
  },
  {
    question: "Why keep the website online?",
    answer:
      "Because PawCircle shows much more than a landing page. It is a working example of the design, development, database, authentication, payments, privacy decisions, and troubleshooting involved in taking a product from idea to launch.",
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
