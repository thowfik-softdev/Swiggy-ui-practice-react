import React, { useEffect, useState } from "react";
import { SearchIcon, CloseIcon } from "./Icons";
import RestaurantCard from "./RestaurantCard";
import Skeleton, { RestaurantCardSkeleton } from "./Skeleton";
import { SWIGGY_API_URL } from "../utils/constants";

// how many placeholder cards to show while we wait
const SKELETON_COUNT = 8;
const CARD_IMAGE_HEIGHT = 168;

// The API returns Swiggy's whole homepage layout, not just restaurants.
// Several widgets are grid widgets, and TWO of them carry a restaurants array:
//   - "top_brands_for_you"  -> the logo carousel, widgetType WIDGET_TYPE_POPULAR_BRANDS
//   - the main listing grid -> the one we actually want
// Hardcoding cards[4] breaks whenever Swiggy reorders its widgets, so we search by shape.
const extractRestaurants = (json) => {
  const grids = (json?.data?.cards ?? [])
    .map((c) => c?.card?.card?.gridElements?.infoWithStyle)
    .filter((grid) => Array.isArray(grid?.restaurants));

  const mainListing = grids.find(
    (grid) => grid.widgetType !== "WIDGET_TYPE_POPULAR_BRANDS",
  );

  return (mainListing ?? grids[0])?.restaurants ?? [];
};

const Body = () => {
  // State Variable - super powerful variable - React will remember its value between re-renders
  // To create a super powerful variable, we need to use useState() hook

  // Only two things are real state - the data we fetched, and whether the chip is on
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // What we show is DERIVED from those two, so it does not need its own useState.
  // It is recalculated on every render, which is exactly what we want - it can
  // never go stale or drift out of sync with allRestaurants.
  const visibleRestaurants = isFiltered
    ? allRestaurants.filter((restaurant) => restaurant.info.avgRating > 4.5)
    : allRestaurants;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(SWIGGY_API_URL);
      // const text = await data.text();
      // const json = JSON.parse(text);
      const json = await data.json();
      // const buf = await data.arrayBuffer();
      // console.log(new Uint8Array(buf).slice(0, 15));

      const restaurants = extractRestaurants(json);

      // guard: if the API shape changed and we found nothing, leave the list alone
      if (restaurants.length) {
        setAllRestaurants(restaurants);
      }
    } catch (error) {
      console.error("Could not load restaurants", error);
    } finally {
      // finally runs whether the fetch succeeded or threw, so the skeleton
      // can never get stuck on screen forever
      setIsLoading(false);
    }
  };

  return (
    <div className="body">
      <div className="search-filter-row">
        <div className="search">
          <SearchIcon />
          <input
            className="search-input"
            type="text"
            placeholder="Search for restaurants, cuisines and dishes"
          />
        </div>
        <div className="filter">
          <button
            className={isFiltered ? "filter-btn active" : "filter-btn"}
            onClick={() => {
              // the whole handler is now just a toggle - the list recalculates itself
              setIsFiltered(!isFiltered);
            }}
          >
            Top Rated Restaurants
            {isFiltered && <CloseIcon />}
          </button>
        </div>
      </div>
      <div className="section-head">
        <h2 className="section-title">Restaurants near you</h2>
        {isLoading ? (
          <Skeleton width={82} height={26} radius={999} />
        ) : (
          <span className="section-count">
            {visibleRestaurants.length} places
          </span>
        )}
      </div>
      <div className="res-container">
        {isLoading
          ? Array.from({ length: SKELETON_COUNT }).map((_, index) => (
              <RestaurantCardSkeleton
                key={index}
                imageHeight={CARD_IMAGE_HEIGHT}
              />
            ))
          : visibleRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.info.id}
                restaurantData={restaurant}
              />
            ))}
      </div>
    </div>
  );
};

export default Body;
