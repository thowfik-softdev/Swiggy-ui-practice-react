import React, { useState } from "react";
import { LocationIcon } from "./Icons";
import PerksStrip from "./PerksStrip";
import {
  btnDark,
  cardPad,
  gridFour,
  notice,
  noticeSuccess,
  pageEyebrow,
  pageSection,
  pageShell,
  pageSubtitle,
  pageTitle,
  sectionCount,
  sectionHead,
  sectionSub,
  sectionTitle,
} from "../utils/styles";

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
  <article className={`${cardPad} lift flex flex-col cursor-pointer hover:-translate-y-1 hover:border-brand hover:shadow-md`}>
    <span className="mb-3 text-[26px]">{channel.icon}</span>
    <h3 className="mb-1.5 text-[15.5px] font-bold">{channel.title}</h3>
    <p className="mb-3.5 flex-1 text-[12.5px] leading-relaxed text-ink-500">{channel.text}</p>
    <span className="break-words text-[13px] font-semibold text-brand">{channel.action}</span>
    <span className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-ink-300">{channel.meta}</span>
  </article>
);

/* ------------------------------------------------------------------
   One FAQ row
   ------------------------------------------------------------------ */
const FaqRow = ({ faq, isOpen, onToggle }) => (
  <div className="border-b border-line">
    <button className="flex w-full items-center justify-between gap-4 py-[18px] text-left text-[15px] font-semibold text-ink-900 transition-colors hover:text-brand" onClick={onToggle}>
      <span>{faq.q}</span>
      <span className={`text-xl leading-none text-ink-500 transition-transform duration-[250ms] ease-smooth ${isOpen ? "rotate-180" : ""}`}>⌄</span>
    </button>
    {isOpen && <p className="max-w-[720px] pb-[18px] text-[13.5px] leading-[1.7] text-ink-500">{faq.a}</p>}
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
    <div className={pageShell}>
      <header className="mb-7">
        <span className={pageEyebrow}>We're listening</span>
        <h1 className={pageTitle}>Contact us</h1>
        <p className={pageSubtitle}>
          Something went wrong with an order, or you just want to talk to a
          human? Pick whichever way suits you.
        </p>
      </header>

      {/* channels */}
      <section className={pageSection}>
        <div className={sectionHead}>
          <div>
            <h2 className={sectionTitle}>Ways to reach us</h2>
            <p className={sectionSub}>All four go to the same team</p>
          </div>
          <span className={sectionCount}>Avg 42s reply</span>
        </div>

        <div className={gridFour}>
          {CHANNELS.map((channel) => (
            <ChannelCard key={channel.id} channel={channel} />
          ))}
        </div>
      </section>

      {/* form + offices, side by side */}
      <section className={pageSection}>
        <div className={sectionHead}>
          <div>
            <h2 className={sectionTitle}>Send us a message</h2>
            <p className={sectionSub}>We reply to every one of these</p>
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.4fr_1fr]">
          <form className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-5 sm:p-[26px]" onSubmit={handleSubmit}>
            {sent && (
              <p className={`${notice} ${noticeSuccess}`}>
                Thanks — we have your message and will reply shortly.
              </p>
            )}

            <label className="flex flex-col gap-1.5">
              <span className="text-[12.5px] font-semibold text-ink-700">Your name</span>
              <input
                className="w-full rounded-sm border border-line bg-surface px-3.5 py-3 text-sm text-ink-900 outline-none transition placeholder:text-ink-300 focus:border-brand focus:shadow-[0_0_0_3px_rgba(255,82,0,0.12)]"
                type="text"
                value={form.name}
                onChange={update("name")}
                placeholder="Thowfik Juhair"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-[12.5px] font-semibold text-ink-700">Email</span>
              <input
                className="w-full rounded-sm border border-line bg-surface px-3.5 py-3 text-sm text-ink-900 outline-none transition placeholder:text-ink-300 focus:border-brand focus:shadow-[0_0_0_3px_rgba(255,82,0,0.12)]"
                type="email"
                value={form.email}
                onChange={update("email")}
                placeholder="you@example.com"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-[12.5px] font-semibold text-ink-700">How can we help?</span>
              <textarea
                className="w-full resize-y rounded-sm border border-line bg-surface px-3.5 py-3 text-sm leading-relaxed text-ink-900 outline-none transition placeholder:text-ink-300 focus:border-brand focus:shadow-[0_0_0_3px_rgba(255,82,0,0.12)]"
                value={form.message}
                onChange={update("message")}
                rows={5}
                placeholder="Tell us what happened…"
              />
            </label>

            <button className={`${btnDark} self-start`} type="submit" disabled={!canSubmit}>
              Send message
            </button>
          </form>

          <aside className="flex flex-col gap-3.5">
            {OFFICES.map((office) => (
              <div className="rounded-md border border-line bg-surface p-5" key={office.id}>
                <span className="mb-2 inline-block rounded-full bg-brand-soft px-[9px] py-[3px] text-[10.5px] font-bold uppercase tracking-wider text-brand">{office.label}</span>
                <h4 className="mb-1.5 flex items-center gap-[7px] text-[15px] font-bold">
                  <LocationIcon className="h-[15px] w-[15px] text-ink-300" />
                  {office.city}
                </h4>
                <p className="text-[12.5px] leading-relaxed text-ink-500">{office.address}</p>
                <p className="mt-1.5 text-[11.5px] font-semibold text-ink-300">{office.hours}</p>
              </div>
            ))}
          </aside>
        </div>
      </section>

      {/* faqs */}
      <section className={pageSection}>
        <div className={sectionHead}>
          <div>
            <h2 className={sectionTitle}>Common questions</h2>
            <p className={sectionSub}>The four we get asked most</p>
          </div>
          <span className={sectionCount}>{FAQS.length} answers</span>
        </div>

        <div className="border-t border-line">
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
