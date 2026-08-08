import React, { useState } from "react";
import { SearchIcon, CloseIcon } from "./Icons";
import RestaurantCard from "./RestaurantCard";
import { restaurantList } from "../utils/mockData";

const Body = () => {
  // State Variable - super powerful variable - React will remember its value between re-renders
  // State of this component variable - listOfRestaurants
  // To create a super powerful variable, we need to use useState() hook
  const [listOfRestaurants, setListOfRestaurants] = useState(restaurantList);
  const [isFiltered, setIsFiltered] = useState(false);
  console.log(listOfRestaurants);

  // Normal JS variable
  // let listOfRestaurantsJS = restaurantList;

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
              console.log("Button Clicked");
              if (isFiltered) {
                // chip is already on, so this click clears it
                setListOfRestaurants(restaurantList);
                setIsFiltered(false);
              } else {
                setListOfRestaurants(
                  restaurantList.filter(
                    (restaurant) => restaurant.info.avgRating > 4.5,
                  ),
                );
                setIsFiltered(true);
              }
              console.log(listOfRestaurants);
            }}
          >
            Top Rated Restaurants
            {isFiltered && <CloseIcon />}
          </button>
        </div>
      </div>
      <div className="section-head">
        <h2 className="section-title">Restaurants near you</h2>
        <span className="section-count">{listOfRestaurants.length} places</span>
      </div>
      <div className="res-container">
        {listOfRestaurants.map((restaurant) => (
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
