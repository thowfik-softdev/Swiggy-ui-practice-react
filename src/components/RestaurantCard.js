import React from "react";
import { ClockIcon } from "./Icons";
import { CDN_URL } from "../utils/constants";

// Swiggy tints the rating pill by score - green, amber, then red
const ratingTone = (rating) =>
  rating >= 4 ? "good" : rating >= 3 ? "average" : "poor";

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
    <div className="res-card">
      <div className="res-card-img">
        <img src={`${CDN_URL}${cloudinaryImageId}`} alt="res-logo" />
        {veg && <span className="veg-badge" title="Pure Veg" />}
        {offer.header && (
          <div className="res-offer">
            <span className="res-offer-main">{offer.header}</span>
            {offer.subHeader && (
              <span className="res-offer-sub">{offer.subHeader}</span>
            )}
          </div>
        )}
      </div>
      <div className="res-card-info">
        <h3 className="res-name">{name}</h3>
        <div className="res-meta">
          <span className={`res-rating ${ratingTone(avgRating)}`}>
            <span className="star">★</span>
            {avgRating}
          </span>
          <span className="dot" />
          <span className="res-time">
            <ClockIcon />
            {sla.deliveryTime} mins
          </span>
        </div>
        <p className="res-cuisines">{cuisines.join(", ")}</p>
        <div className="res-footer">
          <span>{areaName}</span>
          <span>{costForTwo}</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
