import React, { Component } from "react";
import User from "./User";
import UserClass from "./UserClass";
import PerksStrip from "./PerksStrip";
import {
  cardPad,
  chip,
  chipRow,
  gridThree,
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

const STATS = [
  { id: "st1", value: "8", label: "Episodes documented" },
  { id: "st2", value: "40k+", label: "Words of notes" },
  { id: "st3", value: "109kB", label: "Gzipped bundle" },
  { id: "st4", value: "0", label: "UI libraries used" },
];

const STACK = [
  { id: "s1", emoji: "⚛️", label: "React 19" },
  { id: "s2", emoji: "🧭", label: "React Router 7" },
  { id: "s3", emoji: "📦", label: "Parcel" },
  { id: "s4", emoji: "🎨", label: "Tailwind CSS" },
  { id: "s5", emoji: "🪝", label: "Custom hooks" },
  { id: "s6", emoji: "🌐", label: "Swiggy API" },
];

const FEATURES = [
  {
    id: "f1",
    icon: "🔍",
    title: "Debounced search",
    text: "A custom useDebounce hook, so typing does not fire a filter on every keystroke.",
  },
  {
    id: "f2",
    icon: "⚡",
    title: "Code split routes",
    text: "Grocery and the menu page are separate chunks, preloaded on hover so the click feels instant.",
  },
  {
    id: "f3",
    icon: "🦴",
    title: "Skeleton loading",
    text: "Placeholders that hold the layout, instead of a spinner that makes the page jump.",
  },
  {
    id: "f4",
    icon: "🛡️",
    title: "Error boundaries",
    text: "A failed chunk download shows a retry, not a blank white page.",
  },
  {
    id: "f5",
    icon: "📡",
    title: "Offline aware",
    text: "A useOnlineStatus hook listens to the browser and tells you when the connection drops.",
  },
  {
    id: "f6",
    icon: "📐",
    title: "Responsive",
    text: "Five breakpoints chosen where the layout actually breaks, not from a device list.",
  },
];

const BUILD_PERKS = [
  { id: "bp1", icon: "📚", title: "Learning in public", text: "Every episode written up in full" },
  { id: "bp2", icon: "🧪", title: "Built from scratch", text: "No component library, every component hand built" },
  { id: "bp3", icon: "🔬", title: "Measured, not guessed", text: "A bundle budget runs in CI" },
  { id: "bp4", icon: "🚀", title: "Still going", text: "New episode, new features, every week" },
];

class About extends Component {
  constructor(props) {
    super(props);
    // console.log("Parent Component Constructor");
  }

  componentDidMount() {
    // console.log("Parent Component Mounted");
  }

  render() {
    // console.log("Parent Component Rendered");
    return (
      <div className={pageShell}>
        <header className="mb-7">
          <span className={pageEyebrow}>Who built this</span>
          <h1 className={pageTitle}>About</h1>
          <p className={pageSubtitle}>
            A food ordering app built while working through the Namaste React
            course — every feature written from scratch, and every episode
            documented along the way.
          </p>
        </header>

        {/* stats */}
        <section className="mb-11 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div className="flex flex-col gap-1 rounded-md border border-line bg-surface p-4 sm:p-[22px]" key={stat.id}>
              <span className="text-2xl font-extrabold leading-none tracking-tight text-brand sm:text-3xl">{stat.value}</span>
              <span className="text-[12.5px] text-ink-500">{stat.label}</span>
            </div>
          ))}
        </section>

        {/* the two cards - function vs class */}
        <section className={pageSection}>
          <div className={sectionHead}>
            <div>
              <h2 className={sectionTitle}>The same card, twice</h2>
              <p className={sectionSub}>
                One written as a function, one as a class — episode 8
              </p>
            </div>
            <span className={sectionCount}>2 components</span>
          </div>

          <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-stretch sm:justify-center">
            <User name="Function component" />
            <UserClass name="Class component" />
          </div>
        </section>

        {/* stack */}
        <section className={pageSection}>
          <div className={sectionHead}>
            <div>
              <h2 className={sectionTitle}>Built with</h2>
              <p className={sectionSub}>No UI library, no CSS framework</p>
            </div>
          </div>

          <div className={chipRow}>
            {STACK.map((tech) => (
              <span className={chip} key={tech.id}>
                <span className="text-base leading-none">{tech.emoji}</span>
                {tech.label}
              </span>
            ))}
          </div>
        </section>

        {/* features */}
        <section className={pageSection}>
          <div className={sectionHead}>
            <div>
              <h2 className={sectionTitle}>What is in here</h2>
              <p className={sectionSub}>
                The parts that took the longest to get right
              </p>
            </div>
            <span className={sectionCount}>{FEATURES.length} features</span>
          </div>

          <div className={gridThree}>
            {FEATURES.map((feature) => (
              <article className={`${cardPad} lift hover:-translate-y-1 hover:shadow-md`} key={feature.id}>
                <span className="mb-3 block text-[26px]">{feature.icon}</span>
                <h3 className="mb-1.5 text-[15.5px] font-bold tracking-tight">{feature.title}</h3>
                <p className="text-[13px] leading-relaxed text-ink-500">{feature.text}</p>
              </article>
            ))}
          </div>
        </section>

        <PerksStrip perks={BUILD_PERKS} />
      </div>
    );
  }
}

export default About;
