import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CDN_URL } from "../utils/constants";
import { useRestaurantMenu } from "../utils/useRestaurantMenu";
import { ClockIcon } from "./Icons";
import { MenuSkeleton } from "./Skeleton";
import {
  btnGreen,
btnRed,
  pageShell,
  ratingPill,
  ratingTextTone,
  ratingTone,
  vegMark,
  vegMarkTone,
} from "../utils/styles";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, toCartItem } from "../utils/redux/cartSlice";

// Swiggy stores prices in paise, so 14900 means ₹149
const toRupees = (paise) => `₹${Math.round(paise / 100)}`;

// One size for the photo AND for the placeholder that stands in for a missing
// photo, so a row never changes shape depending on whether the CDN answered.
const IMAGE_BOX =
  "block h-[160px] w-full rounded-md bg-line-soft object-cover " +
  "sm:h-[92px] md:h-[118px]";

// Both buttons sit in the same place, straddling the bottom edge of the image
// box the way Swiggy does it. Only the colour differs, so they can never drift
// out of alignment with each other.
const BUTTON_POSITION =
  "absolute bottom-0 left-1/2 min-w-[96px] -translate-x-1/2 " +
  "whitespace-nowrap shadow-sm";

const ADD_BUTTON = `${btnGreen} ${BUTTON_POSITION}`;
const REMOVE_BUTTON = `${btnRed} ${BUTTON_POSITION}`;

/* ------------------------------------------------------------------
   One dish row
   ------------------------------------------------------------------ */
const MenuItem = ({ item, restaurantName }) => {
  // Keep the whole info object around, not just the fields we render - the
  // cart needs it to build its own copy of the dish.
  const info = item?.card?.info ?? {};
  const {
    id,
    name,
    description,
    imageId,
    isVeg,
    inStock,
    defaultPrice,
    price,
    ratings,
    itemAttribute,
  } = info;

  // Not every dish has a photo, and the CDN sometimes rejects the request.
  // Track it so we can drop the image box rather than leave a grey hole.
  const [hasImage, setHasImage] = useState(Boolean(imageId));

  const rupees = toRupees(defaultPrice ?? price ?? 0);
  const rating = ratings?.aggregatedRating?.rating;
  const ratingCount = ratings?.aggregatedRating?.ratingCountV2;
  const soldOut = inStock === 0;

  const dispatch = useDispatch();

  // Subscribe to THIS dish's quantity only, not the whole cart. useSelector
  // re-renders when its selected value changes, so adding a different dish
  // no longer re-renders every row on the menu.
  const quantity = useSelector(
    (state) => state.cart.items.find((line) => line.id === id)?.quantity ?? 0,
  );

  // addItem carries the whole dish, because the cart has to be able to render
  // it later without going back to the menu response.
  const handleAddItem = () => dispatch(addItem(toCartItem(info, restaurantName)));

  // removeItem only carries the id - that is all it takes to find the row.
  const handleRemoveItem = () => dispatch(removeItem(id));

  return (
    <div
      className={`flex flex-col gap-3.5 border-t border-line-soft py-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6 ${
        soldOut ? "opacity-55" : ""
      }`}
    >
      <div className="min-w-0 flex-1">
        <span className={`${vegMark} ${vegMarkTone(isVeg)}`} />

        <h4 className="mb-1 text-base font-semibold tracking-tight">{name}</h4>

        <p className="mb-1.5 text-[14.5px] font-semibold text-ink-700">
          {rupees}
          {itemAttribute?.portionSize && (
            <span className="font-normal text-ink-300">
              {" "}
              · {itemAttribute.portionSize}
            </span>
          )}
        </p>

        {rating && (
          <span
            className={`mb-2 inline-flex items-center gap-[3px] text-[12.5px] font-bold ${ratingTextTone(
              Number(rating),
            )}`}
          >
            <span className="text-[11px]">★</span>
            {rating}
            {ratingCount && (
              <span className="font-medium text-ink-300"> ({ratingCount})</span>
            )}
          </span>
        )}

        {description && (
          <p className="line-clamp-2 text-[13px] leading-relaxed text-ink-500 sm:line-clamp-3">
            {description}
          </p>
        )}
      </div>

      {/* The media box is ALWAYS rendered at this size, photo or not. A dish
          without a photo gets a placeholder of the exact same dimensions, so
          every row keeps the same shape and the button always has a
          positioned box to anchor to. Previously a photo-less dish collapsed
          to w-auto with no height and the absolute button escaped the row. */}
      <div className="relative w-full flex-none pb-[18px] sm:w-[104px] md:w-[140px]">
        {hasImage ? (
          <img
            className={IMAGE_BOX}
            src={`${CDN_URL}${imageId}`}
            alt={name}
            loading="lazy"
            onError={() => setHasImage(false)}
          />
        ) : (
          <div
            className={`${IMAGE_BOX} flex items-center justify-center border border-dashed border-line`}
            aria-hidden="true"
          >
            <span className="text-[30px] leading-none opacity-25 sm:text-[22px] md:text-[26px]">
              🍽️
            </span>
          </div>
        )}

        {quantity > 0 ? (
          <button className={REMOVE_BUTTON} onClick={handleRemoveItem}>
            REMOVE{quantity > 1 && ` (${quantity})`}
          </button>
        ) : (
          <button
            className={ADD_BUTTON}
            onClick={handleAddItem}
            disabled={soldOut}
          >
            {soldOut ? "Sold out" : "ADD"}
          </button>
        )}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------
   One collapsible category
   ------------------------------------------------------------------ */
const MenuCategory = ({ title, items, isOpen, onToggle, restaurantName }) => (
  <div className="border-b border-line">
    <button
      className="flex w-full items-center justify-between py-[18px] text-left text-[16.5px] font-bold text-ink-900 transition-colors hover:text-brand"
      onClick={onToggle}
    >
      <span>
        {title} ({items.length})
      </span>
      <span
        className={`text-xl leading-none text-ink-500 transition-transform duration-[250ms] ease-smooth ${
          isOpen ? "rotate-180" : ""
        }`}
      >
        ⌄
      </span>
    </button>

    {isOpen && (
      <div className="pb-2">
        {items.map((item, index) => (
          <MenuItem
            key={item?.card?.info?.id ?? index}
            item={item}
            restaurantName={restaurantName}
          />
        ))}
      </div>
    )}
  </div>
);

/* ------------------------------------------------------------------
   The page
   ------------------------------------------------------------------ */
const RestaurantMenu = () => {
  // :resId from the route - this is what makes the page reusable.
  // One component serves every restaurant.
  const { resId } = useParams();

  const { isLoading, restaurant, offers, categories } =
    useRestaurantMenu(resId);

  // only the first category starts expanded, like Swiggy
  const [openCategory, setOpenCategory] = useState(0);

  if (isLoading) return <MenuSkeleton />;

  if (!restaurant) {
    return (
      <div
        className={`${pageShell} flex flex-col items-center pt-16 text-center`}
      >
        <span className="mb-4 text-[44px]">🍽️</span>
        <h2 className="mb-2 text-2xl font-bold tracking-tight">
          Menu not available
        </h2>
        <p className="mb-5 max-w-[420px] text-[14.5px] leading-relaxed text-ink-500">
          We could not load this restaurant.
        </p>
        <Link
          className="rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-surface no-underline transition-colors hover:bg-brand"
          to="/"
        >
          Back to all restaurants
        </Link>
      </div>
    );
  }

  const {
    name,
    cuisines,
    avgRating,
    totalRatingsString,
    costForTwoMessage,
    areaName,
    city,
    cloudinaryImageId,
    sla,
    timingsInfo,
    labels,
  } = restaurant;

  const address = labels?.find((l) => l.title === "Address")?.message;

  return (
    <div className={`${pageShell} flex flex-col gap-3.5`}>
      {/* breadcrumb */}
      <nav className="flex items-center gap-2 text-[12.5px] text-ink-300">
        <Link className="text-ink-300 no-underline hover:text-brand" to="/">
          Home
        </Link>
        <span>/</span>
        <span>{city}</span>
        <span>/</span>
        <strong className="font-semibold text-ink-900">{name}</strong>
      </nav>

      <h1 className="text-2xl font-extrabold tracking-tight sm:text-[30px]">
        {name}
      </h1>

      {cloudinaryImageId && (
        <div className="h-[180px] overflow-hidden rounded-lg border border-line bg-line-soft sm:h-[220px] lg:h-[280px]">
          <img
            className="h-full w-full object-cover"
            src={`${CDN_URL}${cloudinaryImageId}`}
            alt={name}
          />
        </div>
      )}

      {/* rating / cost / cuisines / timings */}
      <div className="flex flex-col gap-2 border-b border-line pb-[18px]">
        <div className="flex items-center gap-2.5 text-[14.5px]">
          <span className={`${ratingPill} ${ratingTone(avgRating)}`}>
            <span className="text-[10.5px] leading-none">★</span>
            {avgRating}
          </span>
          {totalRatingsString && (
            <span className="text-[13.5px] text-ink-300">
              ({totalRatingsString})
            </span>
          )}
          <span className="h-[3px] w-[3px] rounded-full bg-[#c9cad0]" />
          <span className="font-semibold text-ink-700">
            {costForTwoMessage}
          </span>
        </div>

        {cuisines?.length > 0 && (
          <p className="text-[13.5px] font-medium text-brand underline underline-offset-[3px]">
            {cuisines.join(", ")}
          </p>
        )}

        {timingsInfo && (
          <p className="flex items-center gap-2.5 text-[13.5px] text-ink-500">
            <span className="font-semibold text-rating-good">
              {timingsInfo.status}
            </span>
            <span className="h-[3px] w-[3px] rounded-full bg-[#c9cad0]" />
            {timingsInfo.message}
          </p>
        )}

        <div className="mt-2 flex flex-col gap-1.5 border-l-2 border-line pl-3.5 text-[13.5px]">
          <div>
            <span className="mr-2.5 font-semibold">Outlet</span>
            <span className="text-ink-300">{areaName}</span>
          </div>
          <div className="flex items-center gap-1.5 font-semibold text-ink-700">
            <ClockIcon className="h-[15px] w-[15px] text-ink-300" />
            {sla?.slaString}
            {sla?.lastMileTravelString && (
              <span className="font-normal text-ink-300">
                · {sla.lastMileTravelString}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* offers */}
      {offers.length > 0 && (
        <section className="mt-5">
          <h2 className="mb-3.5 text-xl font-bold tracking-tight">
            Deals for you
          </h2>
          <div className="flex gap-3.5 overflow-x-auto pb-1.5">
            {offers.map((offer, index) => (
              <div
                className="flex w-[210px] flex-none flex-col gap-[3px] rounded-md border border-line bg-surface px-4 py-3.5 shadow-xs transition-shadow hover:shadow-sm sm:w-[250px]"
                key={index}
              >
                {offer?.info?.offerTag && (
                  <span className="self-start rounded bg-brand-soft px-[7px] py-[2px] text-[10px] font-bold uppercase tracking-wider text-brand">
                    {offer.info.offerTag}
                  </span>
                )}
                <span className="text-base font-bold tracking-tight">
                  {offer?.info?.header}
                </span>
                <span className="text-[11.5px] font-semibold uppercase tracking-wide text-ink-300">
                  {offer?.info?.couponCode ?? offer?.info?.description}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* the menu */}
      <section className="mt-5">
        <h2 className="mb-3.5 text-xl font-bold tracking-tight">Menu</h2>
        {categories.length === 0 ? (
          <p className="text-[13.5px] leading-relaxed text-ink-500">
            No items listed for this restaurant.
          </p>
        ) : (
          categories.map((category, index) => (
            <MenuCategory
              key={category.title ?? index}
              title={category.title}
              items={category.items}
              isOpen={openCategory === index}
              onToggle={() =>
                setOpenCategory(openCategory === index ? -1 : index)
              }
              restaurantName={name}
            />
          ))
        )}
      </section>

      {address && (
        <section className="mt-5">
          <h2 className="mb-3.5 text-xl font-bold tracking-tight">
            About {name}
          </h2>
          <p className="text-[13.5px] leading-relaxed text-ink-500">
            {address}
          </p>
        </section>
      )}
    </div>
  );
};

export default RestaurantMenu;
