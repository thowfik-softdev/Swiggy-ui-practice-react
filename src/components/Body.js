import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SearchIcon, CloseIcon } from "./Icons";
import RestaurantCard from "./RestaurantCard";
import Skeleton, { RestaurantCardSkeleton } from "./Skeleton";
import { SWIGGY_API_URL } from "../utils/constants";
import { useDebounce } from "../utils/useDebounce";
import { useOnlineStatus } from "../utils/useOnlineStatus";
import { RestaurantMenu } from "../utils/lazyRoutes";
import PromoBanners from "./PromoBanners";
import PerksStrip from "./PerksStrip";
import {
  CUISINE_CHIPS,
  HOME_BANNERS,
  HOME_PERKS,
  TOP_PICKS,
} from "../utils/homeData";
import {
  btnOutline,
  chip,
  chipActive,
  chipRow,
  emptyState,
  gridCards,
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

const SKELETON_COUNT = 8;
const CARD_IMAGE_HEIGHT = 152;
const SEARCH_DELAY = 300;

// The API returns Swiggy's whole homepage layout, not just restaurants.
// TWO widgets carry a restaurants array, so we search by shape - hardcoding
// cards[4] breaks whenever Swiggy reorders its widgets.
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
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isFiltered, setIsFiltered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { onlineStatus } = useOnlineStatus();

  const debouncedSearch = useDebounce(searchText, SEARCH_DELAY);
  const query = debouncedSearch.trim().toLowerCase();

  // Both the search and the chip are DERIVED, never stored, so they cannot
  // drift out of sync with allRestaurants.
  const visibleRestaurants = allRestaurants
    .filter((restaurant) =>
      query ? restaurant.info.name.toLowerCase().includes(query) : true,
    )
    .filter((restaurant) =>
      isFiltered ? restaurant.info.avgRating > 4.5 : true,
    );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(SWIGGY_API_URL);
      const json = await data.json();
      const restaurants = extractRestaurants(json);

      if (restaurants.length) setAllRestaurants(restaurants);
    } catch (error) {
      console.error("Could not load restaurants", error);
    } finally {
      // finally runs whether the fetch succeeded or threw, so the skeleton
      // can never get stuck on screen forever
      setIsLoading(false);
    }
  };

  if (!onlineStatus) {
    return (
      <div className={`${pageShell} flex flex-col items-center pt-16 text-center`}>
        <span className="mb-4 text-[44px]">📡</span>
        <h2 className="mb-2 text-2xl font-bold tracking-tight">You're offline</h2>
        <p className="max-w-[420px] text-[14.5px] leading-relaxed text-ink-500">
          Check your connection. This page will recover on its own once you are
          back online.
        </p>
      </div>
    );
  }

  return (
    <div className={pageShell}>
      <header className="mb-7">
        <span className={pageEyebrow}>Food delivery</span>
        <h1 className={pageTitle}>Order food you actually want</h1>
        <p className={pageSubtitle}>
          The best restaurants near you, delivered hot. Search by name, or just
          browse what is open right now.
        </p>

        <div className={`${searchBox} mt-6 w-full max-w-[620px]`}>
          <SearchIcon className="h-5 w-5 text-brand" />
          <input
            type="text"
            className={searchInput}
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search for restaurants, cuisines and dishes"
            aria-label="Search restaurants"
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

      {/* Cuisine chips double as a one-tap search - they just set searchText,
          reusing the filtering that is already there. */}
      <div className={chipRow}>
        <button
          className={`${chip} ${!isFiltered && !searchText ? chipActive : ""}`}
          onClick={() => {
            setIsFiltered(false);
            setSearchText("");
          }}
        >
          <span className="text-base leading-none">🍽️</span>
          All
        </button>

        <button
          className={`${chip} ${isFiltered ? chipActive : ""}`}
          onClick={() => setIsFiltered(!isFiltered)}
        >
          <span className="text-base leading-none">⭐</span>
          Rating 4.5+
        </button>

        {CUISINE_CHIPS.map((cuisine) => (
          <button
            key={cuisine.id}
            className={`${chip} ${
              searchText.toLowerCase() === cuisine.id ? chipActive : ""
            }`}
            onClick={() =>
              setSearchText(
                searchText.toLowerCase() === cuisine.id ? "" : cuisine.id,
              )
            }
          >
            <span className="text-base leading-none">{cuisine.emoji}</span>
            {cuisine.label}
          </button>
        ))}
      </div>

      <PromoBanners banners={HOME_BANNERS} />

      <section className="mb-10">
        <div className={sectionHead}>
          <div>
            <h2 className={sectionTitle}>What's on your mind?</h2>
            <p className={sectionSub}>Pick a craving, we will do the rest</p>
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 sm:gap-6">
          {TOP_PICKS.map((pick) => (
            <button
              className="group flex w-[82px] flex-none flex-col items-center gap-1 sm:w-[120px]"
              key={pick.id}
              onClick={() => setSearchText(pick.title)}
            >
              <div className="h-[74px] w-[74px] overflow-hidden rounded-full border border-line bg-line-soft transition duration-[250ms] ease-smooth group-hover:-translate-y-1 group-hover:shadow-md sm:h-[108px] sm:w-[108px]">
                <img
                  className="block h-full w-full object-cover"
                  src={pick.image}
                  alt={pick.title}
                  loading="lazy"
                />
              </div>
              <span className="mt-2 text-[13.5px] font-semibold text-ink-900">
                {pick.title}
              </span>
              <span className="text-[11.5px] text-ink-300">{pick.subtitle}</span>
            </button>
          ))}
        </div>
      </section>

      <div className={sectionHead}>
        <div>
          <h2 className={sectionTitle}>Restaurants near you</h2>
          <p className={sectionSub}>
            {isFiltered ? "Only the highest rated" : "Everything open nearby"}
          </p>
        </div>
        {isLoading ? (
          <Skeleton width={82} height={26} radius={999} />
        ) : (
          <span className={sectionCount}>
            {visibleRestaurants.length} places
          </span>
        )}
      </div>

      {isLoading ? (
        <div className={gridCards}>
          {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
            <RestaurantCardSkeleton
              key={index}
              imageHeight={CARD_IMAGE_HEIGHT}
            />
          ))}
        </div>
      ) : visibleRestaurants.length === 0 ? (
        <div className={emptyState}>
          <span className="mb-3.5 text-[38px]">🔍</span>
          <h3 className="mb-1.5 text-[19px] font-bold tracking-tight">
            No restaurants match
          </h3>
          <p className="max-w-[420px] text-sm leading-relaxed text-ink-500">
            Nothing here for{" "}
            <strong>{debouncedSearch || "that filter"}</strong>. Try a different
            search.
          </p>
          <button
            className={`${btnOutline} mt-5`}
            onClick={() => {
              setSearchText("");
              setIsFiltered(false);
            }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className={gridCards}>
          {visibleRestaurants.map((restaurant) => (
            <Link
              className="block min-w-0 no-underline"
              key={restaurant.info.id}
              to={`/restaurant/${restaurant.info.id}`}
              // warm the menu chunk while the pointer is still travelling
              onMouseEnter={() => RestaurantMenu.preload()}
              onFocus={() => RestaurantMenu.preload()}
            >
              <RestaurantCard restaurantData={restaurant} />
            </Link>
          ))}
        </div>
      )}

      <PerksStrip perks={HOME_PERKS} />
    </div>
  );
};

export default Body;
