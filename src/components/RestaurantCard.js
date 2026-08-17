import React from "react";
import { ClockIcon } from "./Icons";
import { CDN_URL } from "../utils/constants";
import { card, ratingPill, ratingTone } from "../utils/styles";

const RestaurantCard = ({ restaurantData }) => {
  const {
    name,
    cuisines,
    cloudinaryImageId,
    avgRating,
    costForTwo,
    areaName,
    veg,
    sla,
  } = restaurantData.info;
  const offer = restaurantData.info.aggregatedDiscountInfoV3 || {};

  return (
    <div className={`${card} cursor-pointer group`}>
      <div className="relative h-[152px] overflow-hidden bg-line-soft">
        <img
          className="block h-full w-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-[1.06]"
          src={`${CDN_URL}${cloudinaryImageId}`}
          alt="res-logo"
        />

        {/* pure veg mark */}
        {veg && (
          <span
            className="absolute right-2.5 top-2.5 z-10 h-[18px] w-[18px] rounded border-2 border-rating-good bg-white
                       after:absolute after:left-1/2 after:top-1/2 after:h-2 after:w-2 after:-translate-x-1/2
                       after:-translate-y-1/2 after:rounded-full after:bg-rating-good after:content-['']"
            title="Pure Veg"
          />
        )}

        {/* Offer sits at the BOTTOM of the image, where Swiggy puts it. The
            top-left corner is reserved for the Top Rated ribbon, so keeping
            them apart means they can never collide. */}
        {offer.header && (
          <div className="absolute inset-x-0 bottom-0 z-10 flex items-baseline gap-1 bg-gradient-to-t from-black/75 to-transparent px-2.5 pb-2 pt-6 text-white">
            <span className="text-[13px] font-extrabold uppercase tracking-tight">
              {offer.header}
            </span>
            {offer.subHeader && (
              <span className="text-[9.5px] font-semibold uppercase tracking-wide opacity-90">
                {offer.subHeader}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col px-3.5 pt-3">
        <h3 className="mb-2 truncate text-[15px] font-semibold tracking-tight">
          {name}
        </h3>

        <div className="mb-2 flex items-center gap-2.5 text-[13.5px] font-semibold text-ink-700">
          <span className={`${ratingPill} ${ratingTone(avgRating)}`}>
            <span className="text-[10.5px] leading-none">★</span>
            {avgRating}
          </span>
          <span className="h-[3px] w-[3px] rounded-full bg-[#c9cad0]" />
          <span className="inline-flex items-center gap-1.5">
            <ClockIcon className="h-3.5 w-3.5 text-ink-300" />
            {sla.deliveryTime} mins
          </span>
        </div>

        <p className="mb-3 truncate text-[11px] font-semibold uppercase tracking-wide text-ink-300">
          {cuisines.join(", ")}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2.5 border-t border-line-soft py-[11px] pb-[13px] text-xs text-ink-300">
          <span className="truncate">{areaName}</span>
          <span className="flex-none font-semibold text-ink-700">
            {costForTwo}
          </span>
        </div>
      </div>
    </div>
  );
};

/**
 * Higher Order Component - takes a component, returns an enhanced one.
 *
 * The HOC adds ONE thing (the ribbon) and passes everything else straight
 * through with {...props}. That is the whole contract: it must not know or
 * care what the wrapped component needs.
 */
export const withTopRatedLabel = (RestaurantCard) => {
  return (props) => {
    const isTopRated = props?.restaurantData?.info?.avgRating >= 4.3;

    return (
      // relative, so the absolutely positioned ribbon anchors to this box
      <div className="relative h-full">
        {isTopRated && (
          <span className="absolute left-2 top-2 z-20 rounded-md bg-ink-900/90 px-2 py-1 text-[9.5px] font-bold uppercase tracking-wide text-white shadow-sm backdrop-blur-sm">
            ★ Top Rated
          </span>
        )}
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
