/**
 * Shared Tailwind class strings.
 *
 * WHY THIS FILE EXISTS:
 * Tailwind's answer to "the same 12 classes on every card" is either repeat
 * them, or extract them. Repeating means a design change is a find-and-replace
 * across twelve files and you WILL miss one. @apply just recreates CSS files
 * with extra steps.
 *
 * Plain exported strings keep the single source of truth that .res-card gave
 * us, while the utilities stay visible at the usage site. Change `card` here
 * and every card on the site changes - exactly like the old CSS, minus the
 * naming problem.
 */

/* ---------- layout ---------- */

export const pageShell =
  "w-full max-w-shell min-w-0 mx-auto px-4 md:px-6 lg:px-10 pt-7 md:pt-12 pb-24";

export const pageEyebrow =
  "inline-block mb-2.5 px-[11px] py-1 rounded-full bg-brand-soft " +
  "text-[11.5px] font-bold uppercase tracking-wider text-brand";

export const pageTitle =
  "text-[26px] sm:text-[30px] lg:text-[38px] font-extrabold leading-[1.1] tracking-tight";

export const pageSubtitle =
  "mt-2.5 max-w-[560px] text-sm sm:text-base leading-relaxed text-ink-500";

export const pageSection = "mb-10 md:mb-12";

/* ---------- section head ---------- */

export const sectionHead =
  "flex flex-wrap items-end justify-between gap-2 md:gap-4 mb-5 pb-3.5 border-b border-line";

export const sectionTitle =
  "text-xl md:text-[22px] font-bold tracking-tight";

export const sectionSub = "mt-[3px] text-[13.5px] text-ink-300";

export const sectionCount =
  "flex-none rounded-full border border-line bg-surface px-[11px] py-1 " +
  "text-[12.5px] font-medium text-ink-300";

/* ---------- chips ---------- */

export const chipRow = "flex gap-2.5 overflow-x-auto pb-2 mb-7";

export const chip =
  "inline-flex flex-none items-center gap-[7px] h-10 px-4 rounded-full " +
  "border border-line bg-surface text-sm font-medium text-ink-700 " +
  "whitespace-nowrap cursor-pointer transition-colors duration-200 ease-smooth " +
  "hover:border-[#dcdddf]";

export const chipActive =
  "border-brand bg-brand-soft font-semibold text-brand hover:border-brand";

/* ---------- cards ---------- */

export const card =
  "lift flex flex-col min-w-0 rounded-md border border-line bg-surface " +
  "overflow-hidden transition duration-[250ms] ease-smooth " +
  "hover:-translate-y-1 hover:shadow-md";

export const cardPad =
  "rounded-md border border-line bg-surface p-5 md:p-6 transition duration-[250ms] ease-smooth";

/* ---------- search ---------- */

export const searchBox =
  "flex min-w-0 shrink items-center gap-3.5 rounded-md border border-line " +
  "bg-surface px-5 py-[15px] shadow-xs cursor-text " +
  "transition-[border-color,box-shadow] duration-200 ease-smooth " +
  "hover:border-[#dcdddf] focus-within:border-brand focus-within:shadow-[0_0_0_3px_rgba(255,82,0,0.12)]";

export const searchInput =
  "flex-1 min-w-0 border-0 bg-transparent p-0 text-[15px] tracking-tight " +
  "text-ink-900 outline-none placeholder:text-ink-300";

/* ---------- buttons ---------- */

export const btnDark =
  "rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-surface " +
  "cursor-pointer transition-colors duration-200 ease-smooth hover:bg-brand " +
  "disabled:opacity-45 disabled:cursor-not-allowed disabled:hover:bg-ink-900";

export const btnOutline =
  "rounded-full border border-line bg-surface px-5 py-2.5 text-[13.5px] " +
  "font-semibold text-ink-700 cursor-pointer transition-colors duration-200 " +
  "ease-smooth hover:border-brand hover:text-brand";

export const btnGreen =
  "rounded-lg border border-rating-good bg-surface px-3.5 py-[7px] text-xs " +
  "font-bold tracking-wide text-rating-good cursor-pointer " +
  "transition-colors duration-200 ease-smooth hover:bg-rating-good hover:text-white " +
  "disabled:text-ink-300 disabled:border-line disabled:cursor-not-allowed " +
  "disabled:hover:bg-surface";

/* ---------- rating pill ---------- */

export const ratingPill =
  "inline-flex items-center gap-1 rounded-md px-2 py-[3px] text-[12.5px] font-bold text-white";

export const ratingTone = (rating) =>
  rating >= 4
    ? "bg-rating-good"
    : rating >= 3
      ? "bg-rating-average"
      : "bg-rating-poor";

export const ratingTextTone = (rating) =>
  rating >= 4
    ? "text-rating-good"
    : rating >= 3
      ? "text-rating-average"
      : "text-rating-poor";

/* ---------- notices and states ---------- */

export const notice =
  "flex flex-wrap items-center justify-between gap-3.5 mb-6 rounded-sm px-4 py-3 text-[13.5px] leading-relaxed";

export const noticeWarn = "border border-[#f6d79a] bg-[#fff8e8] text-[#7a5406]";
export const noticeInfo = "border border-[#bcd9f5] bg-[#eef6fd] text-[#1c5a8c] mt-4";
export const noticeSuccess = "border border-[#b6e3c6] bg-[#eefaf1] text-[#1d6b3a]";

export const emptyState =
  "flex flex-col items-center text-center rounded-lg border border-dashed " +
  "border-line bg-surface px-5 py-12 md:py-16";

/* ---------- veg mark ---------- */

export const vegMark =
  "relative block w-[15px] h-[15px] mb-[7px] rounded-[3px] border-[1.5px] " +
  "after:content-[''] after:absolute after:top-1/2 after:left-1/2 " +
  "after:-translate-x-1/2 after:-translate-y-1/2 after:w-[7px] after:h-[7px] " +
  "after:rounded-full";

export const vegMarkTone = (isVeg) =>
  isVeg
    ? "border-rating-good after:bg-rating-good"
    : "border-[#b3261e] after:bg-[#b3261e]";

/* ---------- grids ---------- */

export const gridCards =
  "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5";

export const gridProducts =
  "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4";

export const gridFour =
  "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4";

export const gridThree =
  "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4";
