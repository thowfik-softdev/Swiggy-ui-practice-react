import React, { useState } from "react";
import { SearchIcon, CloseIcon } from "./Icons";
import { useDebounce } from "../utils/useDebounce";
import {
  BANNERS,
  CATEGORIES,
  PERKS,
  SECTIONS,
} from "../utils/groceryData";

const SEARCH_DELAY = 300;

/* ------------------------------------------------------------------
   1. Category chip
   ------------------------------------------------------------------ */
const CategoryChip = ({ category, isActive, onSelect }) => (
  <button
    className={`grocery-chip ${isActive ? "active" : ""}`}
    onClick={() => onSelect(category.id)}
  >
    <span className="grocery-chip-emoji">{category.emoji}</span>
    {category.label}
  </button>
);

/* ------------------------------------------------------------------
   2. Promotional banner
   ------------------------------------------------------------------ */
const GroceryBanner = ({ banner }) => (
  <article className="grocery-banner">
    <img src={banner.image} alt={banner.title} loading="lazy" />
    <div className="grocery-banner-body">
      <span className="grocery-banner-cta">{banner.cta}</span>
      <h3 className="grocery-banner-title">{banner.title}</h3>
      <p className="grocery-banner-sub">{banner.subtitle}</p>
    </div>
  </article>
);

/* ------------------------------------------------------------------
   3. Product card - the smallest reusable piece
   ------------------------------------------------------------------ */
const ProductCard = ({ product, quantity, onAdd, onRemove }) => {
  const { name, unit, price, mrp, rating, image } = product;
  const discount = Math.round(((mrp - price) / mrp) * 100);

  return (
    <div className="grocery-card">
      <div className="grocery-card-media">
        {discount > 0 && <span className="grocery-discount">{discount}% OFF</span>}
        <img src={image} alt={name} loading="lazy" />
      </div>

      <div className="grocery-card-body">
        <span className="grocery-unit">{unit}</span>
        <h4 className="grocery-name">{name}</h4>

        <span className="grocery-rating">★ {rating}</span>

        <div className="grocery-card-footer">
          <div className="grocery-price">
            <strong>₹{price}</strong>
            {mrp > price && <s>₹{mrp}</s>}
          </div>

          {quantity === 0 ? (
            <button className="grocery-add" onClick={() => onAdd(product.id)}>
              ADD
            </button>
          ) : (
            <div className="grocery-stepper">
              <button onClick={() => onRemove(product.id)}>−</button>
              <span>{quantity}</span>
              <button onClick={() => onAdd(product.id)}>+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------
   4. A titled row of products
   ------------------------------------------------------------------ */
const ProductSection = ({ section, cart, onAdd, onRemove }) => (
  <section className="grocery-section" id={section.id}>
    <div className="grocery-section-head">
      <div>
        <h2 className="grocery-section-title">{section.title}</h2>
        <p className="grocery-section-sub">{section.subtitle}</p>
      </div>
      <span className="grocery-section-count">
        {section.products.length} items
      </span>
    </div>

    <div className="grocery-grid">
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
   5. Why shop with us strip
   ------------------------------------------------------------------ */
const PerksStrip = () => (
  <section className="grocery-perks">
    {PERKS.map((perk) => (
      <div className="grocery-perk" key={perk.id}>
        <span className="grocery-perk-icon">{perk.icon}</span>
        <h4>{perk.title}</h4>
        <p>{perk.text}</p>
      </div>
    ))}
  </section>
);

/* ------------------------------------------------------------------
   6. The page
   ------------------------------------------------------------------ */
const Grocery = () => {
  const [searchText, setSearchText] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [cart, setCart] = useState({});   // { productId: quantity }

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
  const visibleSections = SECTIONS
    .filter((section) => !activeCategory || section.id === activeCategory)
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
    <div className="grocery-page">
      {/* hero */}
      <header className="grocery-hero">
        <span className="page-eyebrow">Instamart</span>
        <h1 className="page-title">Groceries in 15 minutes</h1>
        <p className="page-subtitle">
          Fresh produce, daily essentials and midnight snacks, delivered from a
          store minutes away from you.
        </p>

        <div className="search grocery-search">
          <SearchIcon />
          <input
            type="text"
            className="search-input"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search for atta, milk, bananas…"
          />
          {searchText && (
            <button
              className="grocery-search-clear"
              onClick={() => setSearchText("")}
              aria-label="Clear search"
            >
              <CloseIcon />
            </button>
          )}
        </div>
      </header>

      {/* categories */}
      <div className="grocery-chips">
        <button
          className={`grocery-chip ${!activeCategory ? "active" : ""}`}
          onClick={() => setActiveCategory(null)}
        >
          <span className="grocery-chip-emoji">🛒</span>
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

      {/* banners */}
      <div className="grocery-banners">
        {BANNERS.map((banner) => (
          <GroceryBanner key={banner.id} banner={banner} />
        ))}
      </div>

      {/* product sections */}
      {visibleSections.length === 0 ? (
        <p className="grocery-empty">
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

      <PerksStrip />

      {/* sticky cart bar, only once something is in it */}
      {itemCount > 0 && (
        <div className="grocery-cartbar">
          <span>
            <strong>{itemCount}</strong> {itemCount === 1 ? "item" : "items"}
          </span>
          <span className="grocery-cartbar-total">₹{cartTotal}</span>
          <button className="grocery-cartbar-btn">Checkout →</button>
        </div>
      )}
    </div>
  );
};

export default Grocery;
