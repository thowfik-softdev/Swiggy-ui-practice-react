import { useEffect, useState } from "react";
import { mockMenu } from "./mockMenu";

/* ------------------------------------------------------------------
   Extractors

   Same rule as the listing API: find things by SHAPE, never by index.
   Swiggy reorders these widgets and adds new ones, so cards[2] and
   cards[4] would break the moment they ship a new banner.
   ------------------------------------------------------------------ */

const RESTAURANT_TYPE =
  "type.googleapis.com/swiggy.presentation.food.v2.Restaurant";

// The restaurant header - name, rating, cost, delivery time
export const extractRestaurantInfo = (json) => {
  const cards = json?.data?.cards ?? [];
  return (
    cards.find((c) => c?.card?.card?.["@type"] === RESTAURANT_TYPE)?.card?.card
      ?.info ?? null
  );
};

// The offer strip
export const extractOffers = (json) => {
  const cards = json?.data?.cards ?? [];
  const offerCard = cards.find(
    (c) => c?.card?.card?.gridElements?.infoWithStyle?.offers,
  );
  return offerCard?.card?.card?.gridElements?.infoWithStyle?.offers ?? [];
};

/**
 * The menu itself.
 *
 * It is NOT in data.cards directly - it hides inside a groupedCard, under
 * cardGroupMap.REGULAR.cards. That inner array is a mixed bag: veg filters,
 * plain ItemCategory cards, and NestedItemCategory cards that hold their own
 * list of categories. We flatten all of it down to { title, items }.
 */
export const extractMenuCategories = (json) => {
  const cards = json?.data?.cards ?? [];

  const grouped = cards.find(
    (c) => c?.groupedCard?.cardGroupMap?.REGULAR?.cards,
  );
  const regular = grouped?.groupedCard?.cardGroupMap?.REGULAR?.cards ?? [];

  const categories = [];

  regular.forEach((entry) => {
    const card = entry?.card?.card;
    if (!card) return;

    // a plain category with items directly on it
    if (Array.isArray(card.itemCards) && card.itemCards.length) {
      categories.push({ title: card.title, items: card.itemCards });
      return;
    }

    // a nested category - one level deeper, holds several sub categories
    if (Array.isArray(card.categories)) {
      card.categories.forEach((sub) => {
        if (Array.isArray(sub?.itemCards) && sub.itemCards.length) {
          categories.push({ title: sub.title, items: sub.itemCards });
        }
      });
    }
  });

  return categories;
};

/* ------------------------------------------------------------------
   The hook
   ------------------------------------------------------------------ */

/**
 * Custom hook - everything a menu page needs, keyed by restaurant id.
 *
 * Keeping the data fetching in here means RestaurantMenu stays a pure UI
 * component. Swap mockMenu for a real fetch later and nothing else changes.
 */
export const useRestaurantMenu = (resId) => {
  const [menu, setMenu] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      try {
        // Live fetch is not possible from the browser - see the note at the top
        // of mockMenu.js. Simulating latency so the skeleton is visible.
        await new Promise((resolve) => setTimeout(resolve, 600));
        if (!cancelled) setMenu(mockMenu);
      } catch (error) {
        console.error("Could not load the menu", error);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    load();

    // Cleanup - if the user navigates away mid-load, do not set state on a
    // component that is no longer on screen
    return () => {
      cancelled = true;
    };
  }, [resId]);

  return {
    isLoading,
    restaurant: extractRestaurantInfo(menu),
    offers: extractOffers(menu),
    categories: extractMenuCategories(menu),
  };
};
