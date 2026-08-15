import React, { useState } from "react";
import { ContactIcon, LocationIcon } from "./Icons";
import PerksStrip from "./PerksStrip";

const CHANNELS = [
  {
    id: "c1",
    icon: "💬",
    title: "Live chat",
    text: "Fastest way to reach us. Usually answers in under a minute.",
    action: "Start a chat",
    meta: "24 / 7",
  },
  {
    id: "c2",
    icon: "📞",
    title: "Call support",
    text: "For an order that has gone wrong and needs a person.",
    action: "+91 95142 50719",
    meta: "8am – 11pm",
  },
  {
    id: "c3",
    icon: "✉️",
    title: "Email us",
    text: "Best for refunds, invoices and anything with attachments.",
    action: "thowfik.softdev@gmail.com",
    meta: "Replies within a day",
  },
  {
    id: "c4",
    icon: "🤝",
    title: "Partner with us",
    text: "List your restaurant or store and start taking orders.",
    action: "Become a partner",
    meta: "Onboarding in 48h",
  },
];

const OFFICES = [
  {
    id: "o1",
    city: "Chennai",
    label: "Head office",
    address: "Tidel Park, Taramani, Chennai, Tamil Nadu 600113",
    hours: "Mon – Fri, 9:30am – 6:30pm",
  },
  {
    id: "o2",
    city: "Bengaluru",
    label: "Engineering",
    address: "80 Feet Road, Koramangala 4th Block, Bengaluru 560034",
    hours: "Mon – Fri, 10am – 7pm",
  },
  {
    id: "o3",
    city: "Chhindwara",
    label: "Operations hub",
    address: "Parasia Road, Chhindwara, Madhya Pradesh 480002",
    hours: "Mon – Sat, 9am – 8pm",
  },
];

const FAQS = [
  {
    id: "f1",
    q: "My order is late. What do I do?",
    a: "Open the order and tap Track. If the rider has not moved in ten minutes, start a live chat and we will call the restaurant for you.",
  },
  {
    id: "f2",
    q: "Something was missing from my order",
    a: "Report it within 24 hours from the order page. Missing items are refunded to your original payment method, usually within two working days.",
  },
  {
    id: "f3",
    q: "How do I cancel an order?",
    a: "Free until the restaurant accepts it. After that we may charge a part of the bill, because the food is already being made.",
  },
  {
    id: "f4",
    q: "Can I change my delivery address after ordering?",
    a: "Only to an address in the same area, and only before the rider picks the order up. Chat is the quickest way to do it.",
  },
];

const SUPPORT_PERKS = [
  { id: "sp1", icon: "⚡", title: "Under a minute", text: "Median first response on live chat" },
  { id: "sp2", icon: "🧑‍💼", title: "Real people", text: "No bots deciding whether you get a refund" },
  { id: "sp3", icon: "🔁", title: "One touch resolution", text: "84% of issues closed on first contact" },
  { id: "sp4", icon: "🌐", title: "Six languages", text: "English, Hindi, Tamil, Telugu, Kannada, Bengali" },
];

/* ------------------------------------------------------------------
   Contact channel card
   ------------------------------------------------------------------ */
const ChannelCard = ({ channel }) => (
  <article className="channel-card">
    <span className="channel-icon">{channel.icon}</span>
    <h3 className="channel-title">{channel.title}</h3>
    <p className="channel-text">{channel.text}</p>
    <span className="channel-action">{channel.action}</span>
    <span className="channel-meta">{channel.meta}</span>
  </article>
);

/* ------------------------------------------------------------------
   One FAQ row
   ------------------------------------------------------------------ */
const FaqRow = ({ faq, isOpen, onToggle }) => (
  <div className="faq-row">
    <button className="faq-question" onClick={onToggle}>
      <span>{faq.q}</span>
      <span className={`chevron ${isOpen ? "open" : ""}`}>⌄</span>
    </button>
    {isOpen && <p className="faq-answer">{faq.a}</p>}
  </div>
);

/* ------------------------------------------------------------------
   The page
   ------------------------------------------------------------------ */
const Contact = () => {
  const [openFaq, setOpenFaq] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const canSubmit = form.name && form.email && form.message;

  const handleSubmit = (event) => {
    event.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  const update = (field) => (event) =>
    setForm((prev) => ({ ...prev, [field]: event.target.value }));

  return (
    <div className="page">
      <header className="page-hero">
        <span className="page-eyebrow">We're listening</span>
        <h1 className="page-title">Contact us</h1>
        <p className="page-subtitle">
          Something went wrong with an order, or you just want to talk to a
          human? Pick whichever way suits you.
        </p>
      </header>

      {/* channels */}
      <section className="page-section">
        <div className="section-head">
          <div>
            <h2 className="section-title">Ways to reach us</h2>
            <p className="section-sub">All four go to the same team</p>
          </div>
          <span className="section-count">Avg 42s reply</span>
        </div>

        <div className="channel-grid">
          {CHANNELS.map((channel) => (
            <ChannelCard key={channel.id} channel={channel} />
          ))}
        </div>
      </section>

      {/* form + offices, side by side */}
      <section className="page-section">
        <div className="section-head">
          <div>
            <h2 className="section-title">Send us a message</h2>
            <p className="section-sub">We reply to every one of these</p>
          </div>
        </div>

        <div className="contact-split">
          <form className="contact-form" onSubmit={handleSubmit}>
            {sent && (
              <p className="notice notice-success">
                Thanks — we have your message and will reply shortly.
              </p>
            )}

            <label className="field">
              <span className="field-label">Your name</span>
              <input
                className="field-input"
                type="text"
                value={form.name}
                onChange={update("name")}
                placeholder="Thowfik Juhair"
              />
            </label>

            <label className="field">
              <span className="field-label">Email</span>
              <input
                className="field-input"
                type="email"
                value={form.email}
                onChange={update("email")}
                placeholder="you@example.com"
              />
            </label>

            <label className="field">
              <span className="field-label">How can we help?</span>
              <textarea
                className="field-input field-textarea"
                value={form.message}
                onChange={update("message")}
                rows={5}
                placeholder="Tell us what happened…"
              />
            </label>

            <button className="field-submit" type="submit" disabled={!canSubmit}>
              Send message
            </button>
          </form>

          <aside className="office-list">
            {OFFICES.map((office) => (
              <div className="office-card" key={office.id}>
                <span className="office-label">{office.label}</span>
                <h4 className="office-city">
                  <LocationIcon />
                  {office.city}
                </h4>
                <p className="office-address">{office.address}</p>
                <p className="office-hours">{office.hours}</p>
              </div>
            ))}
          </aside>
        </div>
      </section>

      {/* faqs */}
      <section className="page-section">
        <div className="section-head">
          <div>
            <h2 className="section-title">Common questions</h2>
            <p className="section-sub">The four we get asked most</p>
          </div>
          <span className="section-count">{FAQS.length} answers</span>
        </div>

        <div className="faq-list">
          {FAQS.map((faq, index) => (
            <FaqRow
              key={faq.id}
              faq={faq}
              isOpen={openFaq === index}
              onToggle={() => setOpenFaq(openFaq === index ? -1 : index)}
            />
          ))}
        </div>
      </section>

      <PerksStrip perks={SUPPORT_PERKS} />
    </div>
  );
};

export default Contact;
