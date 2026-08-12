import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CDN_URL } from "../utils/constants";
import { useRestaurantMenu } from "../utils/useRestaurantMenu";
import { ClockIcon } from "./Icons";
import Skeleton from "./Skeleton";

// Swiggy stores prices in paise, so 14900 means ₹149
const toRupees = (paise) => `₹${Math.round(paise / 100)}`;

const ratingTone = (rating) =>
  rating >= 4 ? "good" : rating >= 3 ? "average" : "poor";

/* ------------------------------------------------------------------
   One dish row
   ------------------------------------------------------------------ */
const MenuItem = ({ item }) => {
  const {
    name,
    description,
    imageId,
    isVeg,
    inStock,
    defaultPrice,
    price,
    ratings,
    itemAttribute,
  } = item?.card?.info ?? {};

  // Not every dish has a photo, and Swiggy's CDN sometimes rejects the request.
  // Track it so we can drop the image box entirely rather than leave a grey hole
  // with the ADD button floating over nothing.
  const [hasImage, setHasImage] = useState(Boolean(imageId));

  const rupees = toRupees(defaultPrice ?? price ?? 0);
  const rating = ratings?.aggregatedRating?.rating;
  const ratingCount = ratings?.aggregatedRating?.ratingCountV2;
  const soldOut = inStock === 0;

  return (
    <div className={`menu-item ${soldOut ? "sold-out" : ""}`}>
      <div className="menu-item-text">
        <span className={`veg-mark ${isVeg ? "veg" : "nonveg"}`} />

        <h4 className="menu-item-name">{name}</h4>

        <p className="menu-item-price">
          {rupees}
          {itemAttribute?.portionSize && (
            <span className="menu-item-portion">
              {" "}
              · {itemAttribute.portionSize}
            </span>
          )}
        </p>

        {rating && (
          <span className={`menu-item-rating ${ratingTone(Number(rating))}`}>
            <span className="star">★</span>
            {rating}
            {ratingCount && <span className="count"> ({ratingCount})</span>}
          </span>
        )}

        {description && <p className="menu-item-desc">{description}</p>}
      </div>

      <div className={`menu-item-media ${hasImage ? "" : "no-image"}`}>
        {hasImage && (
          <img
            src={`${CDN_URL}${imageId}`}
            alt={name}
            loading="lazy"
            onError={() => setHasImage(false)}
          />
        )}
        <button className="add-btn" disabled={soldOut}>
          {soldOut ? "Sold out" : "ADD"}
        </button>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------
   One collapsible category
   ------------------------------------------------------------------ */
const MenuCategory = ({ title, items, isOpen, onToggle }) => (
  <div className="menu-category">
    <button className="menu-category-head" onClick={onToggle}>
      <span>
        {title} ({items.length})
      </span>
      <span className={`chevron ${isOpen ? "open" : ""}`}>⌄</span>
    </button>

    {isOpen && (
      <div className="menu-category-body">
        {items.map((item, index) => (
          <MenuItem key={item?.card?.info?.id ?? index} item={item} />
        ))}
      </div>
    )}
  </div>
);

/* ------------------------------------------------------------------
   Loading skeleton
   ------------------------------------------------------------------ */
const MenuSkeleton = () => (
  <div className="menu-page">
    <Skeleton width={220} height={14} />
    <Skeleton width={280} height={34} radius={10} />
    <Skeleton width="100%" height={260} radius={20} />
    <div className="menu-meta-skeleton">
      <Skeleton width={150} height={18} />
      <Skeleton width={120} height={18} />
    </div>
    <Skeleton width={180} height={22} />
    {[0, 1, 2].map((i) => (
      <div className="menu-item" key={i}>
        <div className="menu-item-text">
          <Skeleton width="60%" height={17} />
          <Skeleton width={70} height={14} />
          <Skeleton width="90%" height={13} />
        </div>
        <Skeleton width={130} height={110} radius={14} />
      </div>
    ))}
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
      <div className="menu-page">
        <h2 className="section-title">Menu not available</h2>
        <p className="menu-empty">
          We could not load this restaurant. <Link to="/">Go back home</Link>.
        </p>
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
    <div className="menu-page">
      {/* breadcrumb */}
      <nav className="crumbs">
        <Link to="/">Home</Link>
        <span>/</span>
        <span>{city}</span>
        <span>/</span>
        <strong>{name}</strong>
      </nav>

      <h1 className="menu-title">{name}</h1>

      {cloudinaryImageId && (
        <div className="menu-hero">
          <img src={`${CDN_URL}${cloudinaryImageId}`} alt={name} />
        </div>
      )}

      {/* rating / cost / cuisines / timings */}
      <div className="menu-meta">
        <div className="menu-meta-row">
          <span className={`res-rating ${ratingTone(avgRating)}`}>
            <span className="star">★</span>
            {avgRating}
          </span>
          {totalRatingsString && (
            <span className="menu-meta-muted">({totalRatingsString})</span>
          )}
          <span className="dot" />
          <span className="menu-meta-strong">{costForTwoMessage}</span>
        </div>

        {cuisines?.length > 0 && (
          <p className="menu-cuisines">{cuisines.join(", ")}</p>
        )}

        {timingsInfo && (
          <p className="menu-timings">
            <span className="open-now">{timingsInfo.status}</span>
            <span className="dot" />
            {timingsInfo.message}
          </p>
        )}

        <div className="menu-outlet">
          <div>
            <span className="menu-outlet-label">Outlet</span>
            <span className="menu-meta-muted">{areaName}</span>
          </div>
          <div className="menu-outlet-time">
            <ClockIcon />
            {sla?.slaString}
            {sla?.lastMileTravelString && (
              <span className="menu-meta-muted"> · {sla.lastMileTravelString}</span>
            )}
          </div>
        </div>
      </div>

      {/* offers */}
      {offers.length > 0 && (
        <section className="menu-section">
          <h2 className="menu-section-title">Deals for you</h2>
          <div className="offer-strip">
            {offers.map((offer, index) => (
              <div className="offer-card" key={index}>
                {offer?.info?.offerTag && (
                  <span className="offer-tag">{offer.info.offerTag}</span>
                )}
                <span className="offer-header">{offer?.info?.header}</span>
                <span className="offer-sub">
                  {offer?.info?.couponCode ?? offer?.info?.description}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* the menu */}
      <section className="menu-section">
        <h2 className="menu-section-title">Menu</h2>
        {categories.length === 0 ? (
          <p className="menu-empty">No items listed for this restaurant.</p>
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
            />
          ))
        )}
      </section>

      {address && (
        <section className="menu-section">
          <h2 className="menu-section-title">About {name}</h2>
          <p className="menu-address">{address}</p>
        </section>
      )}
    </div>
  );
};

export default RestaurantMenu;
