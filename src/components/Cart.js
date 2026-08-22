import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CloseIcon } from "./Icons";
import PerksStrip from "./PerksStrip";
import {
  addItem,
  clearCart,
  deleteItem,
  removeItem,
} from "../utils/redux/cartSlice";
import {
  btnGreen,
  card,
  emptyState,
  notice,
  noticeInfo,
  pageEyebrow,
  pageSection,
  pageShell,
  pageSubtitle,
  pageTitle,
  sectionCount,
  sectionHead,
  sectionSub,
  sectionTitle,
  vegMark,
  vegMarkTone,
} from "../utils/styles";

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
  <div className="flex flex-wrap items-center gap-4 border-b border-line-soft py-4">
    {/* not every dish has a photo, so the placeholder keeps the row the
        same height either way */}
    {item.image ? (
      <img className="h-16 w-16 flex-none rounded-sm bg-line-soft object-cover" src={item.image} alt={item.name} loading="lazy" />
    ) : (
      <div className="flex h-16 w-16 flex-none items-center justify-center rounded-sm border border-dashed border-line bg-line-soft text-xl opacity-30" aria-hidden="true">
        🍽️
      </div>
    )}

    <div className="min-w-0 flex-1">
      <span className={`${vegMark} ${vegMarkTone(item.isVeg)}`} />
      <h4 className="mb-[3px] mt-1.5 text-[14.5px] font-semibold">{item.name}</h4>
      <p className="text-xs text-ink-300">
        {[item.restaurant, item.unit].filter(Boolean).join(" · ")}
      </p>
    </div>

    <div className="flex w-full flex-none items-center justify-between gap-4 sm:w-auto sm:justify-start">
      <div className="inline-flex items-center overflow-hidden rounded-lg border border-rating-good">
        <button className="h-[30px] w-7 text-[15px] font-bold text-rating-good hover:bg-rating-good/10" onClick={() => onRemove(item.id)} aria-label="Remove one">−</button>
        <span className="min-w-[22px] text-center text-[13px] font-bold text-rating-good">{item.quantity}</span>
        <button className="h-[30px] w-7 text-[15px] font-bold text-rating-good hover:bg-rating-good/10" onClick={() => onAdd(item.id)} aria-label="Add one">+</button>
      </div>

      <div className="flex min-w-[74px] flex-col items-end">
        <strong className="text-[14.5px] font-bold">₹{item.price * item.quantity}</strong>
        {item.mrp > item.price && <s className="text-[11.5px] text-ink-300">₹{item.mrp * item.quantity}</s>}
      </div>

      <button
        className="text-ink-300 transition-colors hover:text-rating-poor"
        onClick={() => onDelete(item.id)}
        aria-label={`Remove ${item.name}`}
      >
        <CloseIcon className="h-4 w-4" />
      </button>
    </div>
  </div>
);

/* ------------------------------------------------------------------
   The page
   ------------------------------------------------------------------ */
const Cart = () => {
  // The cart no longer owns its data - it reads the store and dispatches.
  // Which is why the count in the Header stays in sync for free.
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // addItem wants the whole dish, so we hand back the row we already hold.
  const addOne = (id) => {
    const line = items.find((i) => i.id === id);
    if (line) dispatch(addItem(line));
  };

  const removeOne = (id) => dispatch(removeItem(id));
  const deleteLine = (id) => dispatch(deleteItem(id));

  // The restaurant is the same for every line, so the first row can name it.
  const restaurantName = items[0]?.restaurant;

  // Everything below is derived from items - nothing is stored twice
  const itemTotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  // Swiggy's menu response carries no MRP, so mrp is usually absent and this
  // comes out as zero. Kept because the seeded suggestions do have one.
  const savings = items.reduce(
    (sum, i) => sum + ((i.mrp ?? i.price) - i.price) * i.quantity,
    0,
  );
  const deliveryFee = itemTotal >= FREE_DELIVERY_OVER ? 0 : DELIVERY_FEE;
  const toFreeDelivery = Math.max(0, FREE_DELIVERY_OVER - itemTotal);
  const grandTotal = itemTotal + deliveryFee + (items.length ? PLATFORM_FEE : 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className={pageShell}>
      <header className="mb-7">
        <span className={pageEyebrow}>Almost there</span>
        <h1 className={pageTitle}>Your cart</h1>
        <p className={pageSubtitle}>
          {items.length
            ? `${itemCount} ${itemCount === 1 ? "item" : "items"}${
                restaurantName ? ` from ${restaurantName}` : ""
              }.`
            : "Nothing here yet — but that is easily fixed."}
        </p>
      </header>

      {items.length === 0 ? (
        <div className={emptyState}>
          <span className="mb-3.5 text-[38px]">🛒</span>
          <h3 className="mb-1.5 text-[19px] font-bold tracking-tight">Your cart is empty</h3>
          <p className="max-w-[420px] text-sm leading-relaxed text-ink-500">
            Add something from a restaurant and it will show up here.
          </p>
          <Link className="mt-5 rounded-full border border-line bg-surface px-5 py-2.5 text-[13.5px] font-semibold text-ink-700 no-underline transition-colors hover:border-brand hover:text-brand" to="/">
            Browse restaurants
          </Link>
        </div>
      ) : (
        <div className="mb-11 grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.6fr_1fr]">
          {/* items */}
          <section className="min-w-0">
            <div className={sectionHead}>
              <div>
                <h2 className={sectionTitle}>Order summary</h2>
                <p className={sectionSub}>
                  {restaurantName ? `${restaurantName} · ` : ""}45–50 mins
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className={sectionCount}>{itemCount} items</span>
                <button
                  className="rounded-full border border-rating-poor px-3.5 py-[7px] text-xs font-bold tracking-wide text-rating-poor transition-colors duration-200 ease-smooth hover:bg-rating-poor hover:text-white"
                  onClick={() => dispatch(clearCart())}
                >
                  CLEAR CART
                </button>
              </div>
            </div>

            {items.map((item) => (
              <CartRow
                key={item.id}
                item={item}
                onAdd={addOne}
                onRemove={removeOne}
                onDelete={deleteLine}
              />
            ))}

            {toFreeDelivery > 0 && (
              <p className={`${notice} ${noticeInfo}`}>
                Add <strong>₹{toFreeDelivery}</strong> more to get free delivery.
              </p>
            )}
          </section>

          {/* bill */}
          <aside className="rounded-lg border border-line bg-surface p-6 shadow-xs lg:sticky lg:top-24">
            <h3 className="mb-4 border-b border-line pb-3.5 text-base font-bold">Bill details</h3>

            <div className="flex items-center justify-between gap-3 py-[7px] text-[13.5px] text-ink-500">
              <span>Item total</span>
              <span>₹{itemTotal}</span>
            </div>

            <div className="flex items-center justify-between gap-3 py-[7px] text-[13.5px] text-ink-500">
              <span>Delivery fee</span>
              <span className={deliveryFee === 0 ? "font-bold text-rating-good" : ""}>
                {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3 py-[7px] text-[13.5px] text-ink-500">
              <span>Platform fee</span>
              <span>₹{PLATFORM_FEE}</span>
            </div>

            {savings > 0 && (
              <div className="flex items-center justify-between gap-3 py-[7px] text-[13.5px] font-semibold text-rating-good">
                <span>Savings</span>
                <span>−₹{savings}</span>
              </div>
            )}

            <div className="mt-2.5 flex items-center justify-between gap-3 border-t border-line pt-3.5 text-base font-extrabold text-ink-900">
              <span>To pay</span>
              <span>₹{grandTotal}</span>
            </div>

            <button className="mt-[18px] w-full rounded-full bg-rating-good py-3.5 text-[14.5px] font-bold text-white transition hover:brightness-110">Proceed to pay ₹{grandTotal}</button>

            {savings > 0 && (
              <p className="mt-3 text-center text-xs text-rating-good">
                You save <strong>₹{savings}</strong> on this order
              </p>
            )}
          </aside>
        </div>
      )}

      {/* suggestions */}
      <section className={pageSection}>
        <div className={sectionHead}>
          <div>
            <h2 className={sectionTitle}>People also added</h2>
            <p className={sectionSub}>Goes well with what you have</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {SUGGESTIONS.map((s) => (
            <div className={card} key={s.id}>
              <img className="block h-[118px] w-full bg-line-soft object-cover" src={s.image} alt={s.name} loading="lazy" />
              <div className="px-3.5 pb-3.5 pt-3">
                <h4 className="mb-2.5 truncate text-[13.5px] font-semibold">{s.name}</h4>
                <div className="flex items-center justify-between gap-2">
                  <strong className="text-sm font-bold">₹{s.price}</strong>
                  <button className={btnGreen}>ADD</button>
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
