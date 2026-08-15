import React, { useState } from "react";
import { SearchIcon, CloseIcon } from "./Icons";
import { useDebounce } from "../utils/useDebounce";
import PromoBanners from "./PromoBanners";
import PerksStrip from "./PerksStrip";
import { BANNERS, CATEGORIES, PERKS, SECTIONS } from "../utils/groceryData";
import {
  btnGreen,
  card,
  chip,
  chipActive,
  chipRow,
  gridProducts,
  pageEyebrow,
  pageShell,
  pageSubtitle,
  pageTitle,
  searchBox,
  searchInput,
  sectionCount,
  sectionHead,
  sectionSub,
  sectionTitle,
} from "../utils/styles";

const SEARCH_DELAY = 300;

/* ------------------------------------------------------------------
   1. Category chip
   ------------------------------------------------------------------ */
const CategoryChip = ({ category, isActive, onSelect }) => (
  <button
    className={`${chip} ${isActive ? chipActive : ""}`}
    onClick={() => onSelect(category.id)}
  >
    <span className="text-base leading-none">{category.emoji}</span>
    {category.label}
  </button>
);

/* ------------------------------------------------------------------
   2. Product card - the smallest reusable piece
   ------------------------------------------------------------------ */
const ProductCard = ({ product, quantity, onAdd, onRemove }) => {
  const { name, unit, price, mrp, rating, image } = product;
  const discount = Math.round(((mrp - price) / mrp) * 100);

  return (
    <div className={card}>
      <div className="relative h-[130px] bg-line-soft">
        {discount > 0 && (
          <span className="absolute left-2 top-2 z-10 rounded-md bg-rating-good px-[7px] py-[3px] text-[10px] font-bold tracking-wide text-white">
            {discount}% OFF
          </span>
        )}
        <img
          className="block h-full w-full object-cover"
          src={image}
          alt={name}
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col p-3 pb-3.5">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-300">
          {unit}
        </span>

        <h4 className="my-1 line-clamp-2 min-h-[36px] text-[13.5px] font-semibold leading-tight tracking-tight">
          {name}
        </h4>

        {rating && (
          <span className="self-start text-[11.5px] font-bold text-rating-good">
            ★ {rating}
          </span>
        )}

        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <div className="flex min-w-0 flex-col">
            <strong className="text-[14.5px] font-bold">₹{price}</strong>
            {mrp > price && <s className="text-[11.5px] text-ink-300">₹{mrp}</s>}
          </div>

          {quantity === 0 ? (
            <button className={btnGreen} onClick={() => onAdd(product.id)}>
              ADD
            </button>
          ) : (
            <div className="inline-flex flex-none items-center overflow-hidden rounded-lg bg-rating-good">
              <button
                className="h-[30px] w-[26px] text-base font-bold leading-none text-white hover:bg-black/15"
                onClick={() => onRemove(product.id)}
              >
                −
              </button>
              <span className="min-w-[20px] text-center text-[13px] font-bold text-white">
                {quantity}
              </span>
              <button
                className="h-[30px] w-[26px] text-base font-bold leading-none text-white hover:bg-black/15"
                onClick={() => onAdd(product.id)}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------
   3. A titled row of products
   ------------------------------------------------------------------ */
const ProductSection = ({ section, cart, onAdd, onRemove }) => (
  <section className="mb-11" id={section.id}>
    <div className={sectionHead}>
      <div>
        <h2 className={sectionTitle}>{section.title}</h2>
        <p className={sectionSub}>{section.subtitle}</p>
      </div>
      <span className={sectionCount}>{section.products.length} items</span>
    </div>

    <div className={gridProducts}>
      {section.products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          quantity={cart[product.id] ?? 0}
          onAdd={onAdd}
          onRemove={onRemove}
        />
      ))}
    </div>
  </section>
);

/* ------------------------------------------------------------------
   4. The page
   ------------------------------------------------------------------ */
const Grocery = () => {
  const [searchText, setSearchText] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [cart, setCart] = useState({}); // { productId: quantity }

  const debouncedSearch = useDebounce(searchText, SEARCH_DELAY);
  const query = debouncedSearch.trim().toLowerCase();

  const addToCart = (id) =>
    setCart((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));

  const removeFromCart = (id) =>
    setCart((prev) => {
      const next = (prev[id] ?? 0) - 1;
      if (next <= 0) {
        const { [id]: _removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: next };
    });

  // Everything below is DERIVED from the three state values above,
  // so nothing can drift out of sync - same rule as episode 6.
  const visibleSections = SECTIONS.filter(
    (section) => !activeCategory || section.id === activeCategory,
  )
    .map((section) => ({
      ...section,
      products: section.products.filter((product) =>
        query ? product.name.toLowerCase().includes(query) : true,
      ),
    }))
    .filter((section) => section.products.length > 0);

  const itemCount = Object.values(cart).reduce((sum, n) => sum + n, 0);

  const cartTotal = SECTIONS.flatMap((s) => s.products).reduce(
    (sum, product) => sum + (cart[product.id] ?? 0) * product.price,
    0,
  );

  return (
    <div className={`${pageShell} pb-32`}>
      <header className="mb-7">
        <span className={pageEyebrow}>Instamart</span>
        <h1 className={pageTitle}>Groceries in 15 minutes</h1>
        <p className={pageSubtitle}>
          Fresh produce, daily essentials and midnight snacks, delivered from a
          store minutes away from you.
        </p>

        <div className={`${searchBox} mt-6 w-full max-w-[620px]`}>
          <SearchIcon className="h-5 w-5 text-brand" />
          <input
            type="text"
            className={searchInput}
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search for atta, milk, bananas…"
            aria-label="Search groceries"
          />
          {searchText && (
            <button
              className="flex-none text-ink-300 transition-colors hover:text-brand"
              onClick={() => setSearchText("")}
              aria-label="Clear search"
            >
              <CloseIcon />
            </button>
          )}
        </div>
      </header>

      <div className={chipRow}>
        <button
          className={`${chip} ${!activeCategory ? chipActive : ""}`}
          onClick={() => setActiveCategory(null)}
        >
          <span className="text-base leading-none">🛒</span>
          All
        </button>

        {CATEGORIES.map((category) => (
          <CategoryChip
            key={category.id}
            category={category}
            isActive={activeCategory === category.id}
            onSelect={(id) =>
              setActiveCategory(id === activeCategory ? null : id)
            }
          />
        ))}
      </div>

      <PromoBanners banners={BANNERS} />

      {visibleSections.length === 0 ? (
        <p className="py-12 text-[15px] text-ink-500">
          Nothing matches <strong>“{debouncedSearch}”</strong>. Try something
          else.
        </p>
      ) : (
        visibleSections.map((section) => (
          <ProductSection
            key={section.id}
            section={section}
            cart={cart}
            onAdd={addToCart}
            onRemove={removeFromCart}
          />
        ))
      )}

      <PerksStrip perks={PERKS} />

      {/* sticky cart bar, only once something is in it */}
      {itemCount > 0 && (
        <div className="fixed inset-x-3 bottom-3 z-30 flex items-center justify-between gap-5 rounded-full bg-ink-900 py-2.5 pl-6 pr-2.5 text-sm text-surface shadow-lg sm:inset-x-auto sm:bottom-6 sm:left-1/2 sm:-translate-x-1/2 sm:justify-start">
          <span>
            <strong>{itemCount}</strong> {itemCount === 1 ? "item" : "items"}
          </span>
          <span className="font-bold">₹{cartTotal}</span>
          <button className="rounded-full bg-brand px-[18px] py-2.5 text-[13.5px] font-bold text-white transition-colors hover:bg-brand-dark">
            Checkout →
          </button>
        </div>
      )}
    </div>
  );
};

export default Grocery;
