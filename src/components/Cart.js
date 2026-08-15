import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CloseIcon } from "./Icons";
import PerksStrip from "./PerksStrip";

// Seeded so the page has something to show. Real carts live in a store -
// this is deliberately local, because cart state is not what this page is
// demonstrating.
const INITIAL_ITEMS = [
  {
    id: "ci1",
    name: "Tandoori Paneer Pizza",
    restaurant: "Pizza Hut",
    unit: "Personal · Pan",
    price: 369,
    mrp: 449,
    isVeg: true,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&q=80",
  },
  {
    id: "ci2",
    name: "Cheese Garlic Bread",
    restaurant: "Pizza Hut",
    unit: "6 pieces",
    price: 165,
    mrp: 199,
    isVeg: true,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=300&q=80",
  },
  {
    id: "ci3",
    name: "Choco Volcano",
    restaurant: "Pizza Hut",
    unit: "Serves 1",
    price: 119,
    mrp: 149,
    isVeg: true,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&q=80",
  },
];

const SUGGESTIONS = [
  { id: "s1", name: "Masala Lemonade", price: 99, image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=300&q=80" },
  { id: "s2", name: "Pepsi 475ml", price: 57, image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=300&q=80" },
  { id: "s3", name: "Butter Naan", price: 45, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&q=80" },
  { id: "s4", name: "Gulab Jamun", price: 89, image: "https://images.unsplash.com/photo-1666190092159-3171cf0fbb12?w=300&q=80" },
];

const CART_PERKS = [
  { id: "cp1", icon: "🔒", title: "Secure payments", text: "Cards, UPI and wallets, all encrypted" },
  { id: "cp2", icon: "🧾", title: "Itemised bills", text: "Every charge explained, no mystery fees" },
  { id: "cp3", icon: "↩️", title: "Easy refunds", text: "Straight back to source, within 48 hours" },
  { id: "cp4", icon: "🛵", title: "Live tracking", text: "Watch the rider from kitchen to door" },
];

const DELIVERY_FEE = 39;
const FREE_DELIVERY_OVER = 499;
const PLATFORM_FEE = 6;

/* ------------------------------------------------------------------
   One line in the cart
   ------------------------------------------------------------------ */
const CartRow = ({ item, onAdd, onRemove, onDelete }) => (
  <div className="cart-row">
    <img className="cart-row-img" src={item.image} alt={item.name} loading="lazy" />

    <div className="cart-row-text">
      <span className={`veg-mark ${item.isVeg ? "veg" : "nonveg"}`} />
      <h4 className="cart-row-name">{item.name}</h4>
      <p className="cart-row-meta">
        {item.restaurant} · {item.unit}
      </p>
    </div>

    <div className="cart-row-right">
      <div className="cart-stepper">
        <button onClick={() => onRemove(item.id)} aria-label="Remove one">−</button>
        <span>{item.quantity}</span>
        <button onClick={() => onAdd(item.id)} aria-label="Add one">+</button>
      </div>

      <div className="cart-row-price">
        <strong>₹{item.price * item.quantity}</strong>
        {item.mrp > item.price && <s>₹{item.mrp * item.quantity}</s>}
      </div>

      <button
        className="cart-row-delete"
        onClick={() => onDelete(item.id)}
        aria-label={`Remove ${item.name}`}
      >
        <CloseIcon />
      </button>
    </div>
  </div>
);

/* ------------------------------------------------------------------
   The page
   ------------------------------------------------------------------ */
const Cart = () => {
  const [items, setItems] = useState(INITIAL_ITEMS);

  const addOne = (id) =>
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i)),
    );

  const removeOne = (id) =>
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0),
    );

  const deleteItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  // Everything below is derived from items - nothing is stored twice
  const itemTotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const savings = items.reduce(
    (sum, i) => sum + (i.mrp - i.price) * i.quantity,
    0,
  );
  const deliveryFee = itemTotal >= FREE_DELIVERY_OVER ? 0 : DELIVERY_FEE;
  const toFreeDelivery = Math.max(0, FREE_DELIVERY_OVER - itemTotal);
  const grandTotal = itemTotal + deliveryFee + (items.length ? PLATFORM_FEE : 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="page">
      <header className="page-hero">
        <span className="page-eyebrow">Almost there</span>
        <h1 className="page-title">Your cart</h1>
        <p className="page-subtitle">
          {items.length
            ? `${itemCount} ${itemCount === 1 ? "item" : "items"} from Pizza Hut, Chhindwara City.`
            : "Nothing here yet — but that is easily fixed."}
        </p>
      </header>

      {items.length === 0 ? (
        <div className="empty-state">
          <span className="empty-state-icon">🛒</span>
          <h3 className="empty-state-title">Your cart is empty</h3>
          <p className="empty-state-text">
            Add something from a restaurant and it will show up here.
          </p>
          <Link className="empty-state-btn" to="/">
            Browse restaurants
          </Link>
        </div>
      ) : (
        <div className="cart-split">
          {/* items */}
          <section className="cart-items">
            <div className="section-head">
              <div>
                <h2 className="section-title">Order summary</h2>
                <p className="section-sub">Pizza Hut · 45–50 mins</p>
              </div>
              <span className="section-count">{itemCount} items</span>
            </div>

            {items.map((item) => (
              <CartRow
                key={item.id}
                item={item}
                onAdd={addOne}
                onRemove={removeOne}
                onDelete={deleteItem}
              />
            ))}

            {toFreeDelivery > 0 && (
              <p className="notice notice-info">
                Add <strong>₹{toFreeDelivery}</strong> more to get free delivery.
              </p>
            )}
          </section>

          {/* bill */}
          <aside className="cart-bill">
            <h3 className="bill-title">Bill details</h3>

            <div className="bill-row">
              <span>Item total</span>
              <span>₹{itemTotal}</span>
            </div>

            <div className="bill-row">
              <span>Delivery fee</span>
              <span className={deliveryFee === 0 ? "bill-free" : ""}>
                {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
              </span>
            </div>

            <div className="bill-row">
              <span>Platform fee</span>
              <span>₹{PLATFORM_FEE}</span>
            </div>

            {savings > 0 && (
              <div className="bill-row bill-savings">
                <span>Savings</span>
                <span>−₹{savings}</span>
              </div>
            )}

            <div className="bill-row bill-total">
              <span>To pay</span>
              <span>₹{grandTotal}</span>
            </div>

            <button className="bill-cta">Proceed to pay ₹{grandTotal}</button>

            <p className="bill-note">
              You save <strong>₹{savings}</strong> on this order
            </p>
          </aside>
        </div>
      )}

      {/* suggestions */}
      <section className="page-section">
        <div className="section-head">
          <div>
            <h2 className="section-title">People also added</h2>
            <p className="section-sub">Goes well with what you have</p>
          </div>
        </div>

        <div className="suggest-row">
          {SUGGESTIONS.map((s) => (
            <div className="suggest-card" key={s.id}>
              <img src={s.image} alt={s.name} loading="lazy" />
              <div className="suggest-body">
                <h4>{s.name}</h4>
                <div className="suggest-footer">
                  <strong>₹{s.price}</strong>
                  <button className="suggest-add">ADD</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <PerksStrip perks={CART_PERKS} />
    </div>
  );
};

export default Cart;
