import React from "react";
import ReactDOM from "react-dom/client";

/* 
Header
  - Logo
  - Nav items

Body
  - Search
  -RestaurantContainer
    - RestaurantCard
      -Image
      -Name of res
      -Star rating
      -Cuisine
      -Time to Delivery

Footer
  -Copyright
  -Links
  -Address
  -Contact
 */

/* Inline icons - keeps the app dependency free */
const Icon = ({ children }) => (
  <svg
    className="icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

const HomeIcon = () => (
  <Icon>
    <path d="M3 10.2 12 3l9 7.2" />
    <path d="M5.6 9.3V20h12.8V9.3" />
  </Icon>
);

const AboutIcon = () => (
  <Icon>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 16v-4.5" />
    <path d="M12 8.2h.01" />
  </Icon>
);

const ContactIcon = () => (
  <Icon>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m3.8 6.8 8.2 6 8.2-6" />
  </Icon>
);

const CartIcon = () => (
  <Icon>
    <path d="M2.8 3.6h2.4l2.2 10.8h10.4l1.8-7.7H6.2" />
    <circle cx="9.5" cy="19.4" r="1.4" />
    <circle cx="17.5" cy="19.4" r="1.4" />
  </Icon>
);

const SearchIcon = () => (
  <Icon>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.6-3.6" />
  </Icon>
);

const ClockIcon = () => (
  <Icon>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5.3l3.2 1.9" />
  </Icon>
);

const Header = () => {
  return (
    <div className="header">
      <div className="logo-container">
        <img
          className="logo"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaoThzKaJLb84oGjtV_iBuuQIp3P2OPFglJ_Mj_3VPELbE9aUCM1JvrM4&s=10"
          alt=""
        />
      </div>
      <div className="nav-items">
        <ul>
          <li>
            <HomeIcon />
            Home
          </li>
          <li>
            <AboutIcon />
            About
          </li>
          <li>
            <ContactIcon />
            Contact
          </li>
          <li className="nav-cart">
            <CartIcon />
            Cart
          </li>
        </ul>
      </div>
    </div>
  );
};

const restaurantList = [
  {
    info: {
      id: "151648",
      name: "Mr. Gurung Momo & Chinese Corner",
      cloudinaryImageId: "h7oibtpm7kqks8cqz3gh",
      locality: "Teacher's Colony",
      areaName: "Mohan Nagar",
      costForTwo: "₹150 for two",
      cuisines: ["Momos", "Chinese", "Fast Food"],
      avgRating: 4.4,
      veg: true,
      parentId: "140255",
      avgRatingString: "4.4",
      totalRatingsString: "1.2K+",
      sla: {
        deliveryTime: 43,
        lastMileTravel: 13.7,
        serviceability: "SERVICEABLE",
        slaString: "40-45 mins",
        lastMileTravelString: "13.7 km",
        iconType: "ICON_TYPE_EMPTY",
      },
      availability: {
        nextCloseTime: "2026-08-07 23:30:00",
        opened: true,
      },
      badges: {
        imageBadges: [
          {
            imageId: "v1695133679/badges/Pure_Veg111.png",
            description:
              "Serves only 100% vegetarian food, with no non-veg items.",
          },
        ],
      },
      isOpen: true,
      type: "F",
      badgesV2: {
        entityBadges: {
          imageBased: {
            badgeObject: [
              {
                attributes: {
                  description:
                    "Serves only 100% vegetarian food, with no non-veg items.",
                  imageId: "v1695133679/badges/Pure_Veg111.png",
                  theme: "",
                },
              },
            ],
          },
          textBased: {},
          textExtendedBadges: {},
        },
      },
      aggregatedDiscountInfoV3: {
        header: "ITEMS",
        subHeader: "AT ₹99",
      },
      differentiatedUi: {
        displayType: "ADS_UI_DISPLAY_TYPE_ENUM_DEFAULT",
        differentiatedUiMediaDetails: {
          lottie: {},
          video: {},
        },
      },
      reviewsSummary: {},
      displayType: "RESTAURANT_DISPLAY_TYPE_DEFAULT",
      restaurantOfferPresentationInfo: {},
      externalRatings: {
        aggregatedRating: {
          rating: "--",
        },
      },
      ratingsDisplayPreference: "RATINGS_DISPLAY_PREFERENCE_SHOW_SWIGGY",
    },
    analytics: {
      context: "seo-data-48b08a83-465a-49b9-ba1d-20841232809b",
    },
    cta: {
      link: "https://www.swiggy.com/city/chhindwara/mr-gurung-momo-and-chinese-corner-teachers-colony-mohan-nagar-rest151648",
      type: "WEBLINK",
    },
  },
  {
    info: {
      id: "151656",
      name: "Dev International",
      cloudinaryImageId: "enj3srsnhbltbom2ovvh",
      locality: "khajri road",
      areaName: "Mohan Nagar",
      costForTwo: "₹100 for two",
      cuisines: ["Chinese", "Fast Food", "Beverages"],
      avgRating: 4.2,
      parentId: "71556",
      avgRatingString: "4.2",
      totalRatingsString: "776",
      sla: {
        deliveryTime: 42,
        lastMileTravel: 13.6,
        serviceability: "SERVICEABLE",
        slaString: "40-45 mins",
        lastMileTravelString: "13.6 km",
        iconType: "ICON_TYPE_EMPTY",
      },
      availability: {
        nextCloseTime: "2026-08-07 22:30:00",
        opened: true,
      },
      badges: {},
      isOpen: true,
      type: "F",
      badgesV2: {
        entityBadges: {
          imageBased: {},
          textBased: {},
          textExtendedBadges: {},
        },
      },
      aggregatedDiscountInfoV3: {
        header: "ITEMS",
        subHeader: "AT ₹149",
      },
      differentiatedUi: {
        displayType: "ADS_UI_DISPLAY_TYPE_ENUM_DEFAULT",
        differentiatedUiMediaDetails: {
          lottie: {},
          video: {},
        },
      },
      reviewsSummary: {},
      displayType: "RESTAURANT_DISPLAY_TYPE_DEFAULT",
      restaurantOfferPresentationInfo: {},
      externalRatings: {
        aggregatedRating: {
          rating: "--",
        },
      },
      ratingsDisplayPreference: "RATINGS_DISPLAY_PREFERENCE_SHOW_SWIGGY",
    },
    analytics: {
      context: "seo-data-48b08a83-465a-49b9-ba1d-20841232809b",
    },
    cta: {
      link: "https://www.swiggy.com/city/chhindwara/dev-international-khajri-road-mohan-nagar-rest151656",
      type: "WEBLINK",
    },
  },
  {
    info: {
      id: "151518",
      name: "Bakery World",
      cloudinaryImageId: "mt2aggiscfl3yviatwng",
      locality: "Parasia Road",
      areaName: "Parasia Road",
      costForTwo: "₹250 for two",
      cuisines: ["Bakery", "Ice Cream", "Snacks", "Beverages"],
      avgRating: 4.3,
      veg: true,
      parentId: "40363",
      avgRatingString: "4.3",
      totalRatingsString: "329",
      sla: {
        deliveryTime: 40,
        lastMileTravel: 14,
        serviceability: "SERVICEABLE",
        slaString: "40-45 mins",
        lastMileTravelString: "14.0 km",
        iconType: "ICON_TYPE_EMPTY",
      },
      availability: {
        nextCloseTime: "2026-08-07 22:30:00",
        opened: true,
      },
      badges: {
        imageBadges: [
          {
            imageId: "v1695133679/badges/Pure_Veg111.png",
            description:
              "Serves only 100% vegetarian food, with no non-veg items.",
          },
        ],
      },
      isOpen: true,
      aggregatedDiscountInfoV2: {},
      type: "F",
      badgesV2: {
        entityBadges: {
          imageBased: {
            badgeObject: [
              {
                attributes: {
                  description:
                    "Serves only 100% vegetarian food, with no non-veg items.",
                  imageId: "v1695133679/badges/Pure_Veg111.png",
                  theme: "",
                },
              },
            ],
          },
          textBased: {},
          textExtendedBadges: {},
        },
      },
      differentiatedUi: {
        displayType: "ADS_UI_DISPLAY_TYPE_ENUM_DEFAULT",
        differentiatedUiMediaDetails: {
          lottie: {},
          video: {},
        },
      },
      reviewsSummary: {},
      displayType: "RESTAURANT_DISPLAY_TYPE_DEFAULT",
      restaurantOfferPresentationInfo: {},
      externalRatings: {
        aggregatedRating: {
          rating: "--",
        },
      },
      ratingsDisplayPreference: "RATINGS_DISPLAY_PREFERENCE_SHOW_SWIGGY",
    },
    analytics: {
      context: "seo-data-48b08a83-465a-49b9-ba1d-20841232809b",
    },
    cta: {
      link: "https://www.swiggy.com/city/chhindwara/bakery-world-parasia-road-rest151518",
      type: "WEBLINK",
    },
  },
  {
    info: {
      id: "234875",
      name: "Adil Hotel",
      cloudinaryImageId: "gp1ityra6utvzqn6ghnv",
      locality: "Rautha Wada",
      areaName: "Chhindwara Locality",
      costForTwo: "₹150 for two",
      cuisines: ["Biryani", "Tandoor"],
      avgRating: 4.3,
      parentId: "27123",
      avgRatingString: "4.3",
      totalRatingsString: "1.5K+",
      sla: {
        deliveryTime: 36,
        lastMileTravel: 12.6,
        serviceability: "SERVICEABLE",
        slaString: "35-40 mins",
        lastMileTravelString: "12.6 km",
        iconType: "ICON_TYPE_EMPTY",
      },
      availability: {
        nextCloseTime: "2026-08-07 23:00:00",
        opened: true,
      },
      badges: {},
      isOpen: true,
      type: "F",
      badgesV2: {
        entityBadges: {
          imageBased: {},
          textBased: {},
          textExtendedBadges: {},
        },
      },
      aggregatedDiscountInfoV3: {
        header: "₹30 OFF",
        subHeader: "ABOVE ₹299",
        discountTag: "FLAT DEAL",
      },
      differentiatedUi: {
        displayType: "ADS_UI_DISPLAY_TYPE_ENUM_DEFAULT",
        differentiatedUiMediaDetails: {
          lottie: {},
          video: {},
        },
      },
      reviewsSummary: {},
      displayType: "RESTAURANT_DISPLAY_TYPE_DEFAULT",
      restaurantOfferPresentationInfo: {},
      externalRatings: {
        aggregatedRating: {
          rating: "--",
        },
      },
      ratingsDisplayPreference: "RATINGS_DISPLAY_PREFERENCE_SHOW_SWIGGY",
    },
    analytics: {
      context: "seo-data-48b08a83-465a-49b9-ba1d-20841232809b",
    },
    cta: {
      link: "https://www.swiggy.com/city/chhindwara/adil-hotel-rautha-wada-chhindwara-locality-rest234875",
      type: "WEBLINK",
    },
  },
  {
    info: {
      id: "150591",
      name: "Satkar Restaurant",
      cloudinaryImageId: "rvxp5xbniat84r6efku2",
      locality: "Sinchai Colony",
      areaName: "Satkar Chowk",
      costForTwo: "₹250 for two",
      cuisines: ["South Indian", "Indian", "Salads", "Desserts"],
      avgRating: 4.4,
      veg: true,
      parentId: "21553",
      avgRatingString: "4.4",
      totalRatingsString: "3.6K+",
      sla: {
        deliveryTime: 37,
        lastMileTravel: 13.4,
        serviceability: "SERVICEABLE",
        slaString: "35-40 mins",
        lastMileTravelString: "13.4 km",
        iconType: "ICON_TYPE_EMPTY",
      },
      availability: {
        nextCloseTime: "2026-08-07 22:45:00",
        opened: true,
      },
      badges: {},
      isOpen: true,
      type: "F",
      badgesV2: {
        entityBadges: {
          imageBased: {},
          textBased: {},
          textExtendedBadges: {},
        },
      },
      aggregatedDiscountInfoV3: {
        header: "ITEMS",
        subHeader: "AT ₹49",
      },
      differentiatedUi: {
        displayType: "ADS_UI_DISPLAY_TYPE_ENUM_DEFAULT",
        differentiatedUiMediaDetails: {
          lottie: {},
          video: {},
        },
      },
      reviewsSummary: {},
      displayType: "RESTAURANT_DISPLAY_TYPE_DEFAULT",
      restaurantOfferPresentationInfo: {},
      externalRatings: {
        aggregatedRating: {
          rating: "--",
        },
      },
      ratingsDisplayPreference: "RATINGS_DISPLAY_PREFERENCE_SHOW_SWIGGY",
    },
    analytics: {
      context: "seo-data-48b08a83-465a-49b9-ba1d-20841232809b",
    },
    cta: {
      link: "https://www.swiggy.com/city/chhindwara/satkar-restaurant-sinchai-colony-satkar-chowk-rest150591",
      type: "WEBLINK",
    },
  },
  {
    info: {
      id: "625927",
      name: "Kathi Junction",
      cloudinaryImageId: "nigqvxgzvyxtfjuqasgg",
      locality: "Bunglow Madhuvan Colony",
      areaName: "Prasia Road",
      costForTwo: "₹200 for two",
      cuisines: ["rolls", "Burgers", "Pizzas", "Fast Food"],
      avgRating: 4.1,
      parentId: "1935",
      avgRatingString: "4.1",
      totalRatingsString: "464",
      sla: {
        deliveryTime: 46,
        lastMileTravel: 13.5,
        serviceability: "SERVICEABLE",
        slaString: "45-50 mins",
        lastMileTravelString: "13.5 km",
        iconType: "ICON_TYPE_EMPTY",
      },
      availability: {
        nextCloseTime: "2026-08-07 23:15:00",
        opened: true,
      },
      badges: {},
      isOpen: true,
      type: "F",
      badgesV2: {
        entityBadges: {
          imageBased: {},
          textBased: {},
          textExtendedBadges: {},
        },
      },
      aggregatedDiscountInfoV3: {
        header: "20% OFF",
        subHeader: "UPTO ₹50",
      },
      differentiatedUi: {
        displayType: "ADS_UI_DISPLAY_TYPE_ENUM_DEFAULT",
        differentiatedUiMediaDetails: {
          lottie: {},
          video: {},
        },
      },
      reviewsSummary: {},
      displayType: "RESTAURANT_DISPLAY_TYPE_DEFAULT",
      restaurantOfferPresentationInfo: {},
      externalRatings: {
        aggregatedRating: {
          rating: "--",
        },
      },
      ratingsDisplayPreference: "RATINGS_DISPLAY_PREFERENCE_SHOW_SWIGGY",
    },
    analytics: {
      context: "seo-data-48b08a83-465a-49b9-ba1d-20841232809b",
    },
    cta: {
      link: "https://www.swiggy.com/city/chhindwara/kathi-junction-bunglow-madhuvan-colony-prasia-road-rest625927",
      type: "WEBLINK",
    },
  },
  {
    info: {
      id: "658210",
      name: "The Fusion Lounge",
      cloudinaryImageId: "fa4944f0cfdcbca2bec1f3ab8e3db3f7",
      locality: "Triloki nagar",
      areaName: "Railway Station",
      costForTwo: "₹300 for two",
      cuisines: [
        "South Indian",
        "Chinese",
        "Beverages",
        "Fast Food",
        "Desserts",
      ],
      avgRating: 4.1,
      parentId: "395453",
      avgRatingString: "4.1",
      totalRatingsString: "388",
      sla: {
        deliveryTime: 51,
        lastMileTravel: 12.4,
        serviceability: "SERVICEABLE",
        slaString: "50-60 mins",
        lastMileTravelString: "12.4 km",
        iconType: "ICON_TYPE_EMPTY",
      },
      availability: {
        nextCloseTime: "2026-08-07 23:00:00",
        opened: true,
      },
      badges: {
        imageBadges: [
          {
            imageId: "v1695133679/badges/Pure_Veg111.png",
            description:
              "Serves only 100% vegetarian food, with no non-veg items.",
          },
        ],
      },
      isOpen: true,
      type: "F",
      badgesV2: {
        entityBadges: {
          imageBased: {
            badgeObject: [
              {
                attributes: {
                  description:
                    "Serves only 100% vegetarian food, with no non-veg items.",
                  imageId: "v1695133679/badges/Pure_Veg111.png",
                  theme: "",
                },
              },
            ],
          },
          textBased: {},
          textExtendedBadges: {},
        },
      },
      aggregatedDiscountInfoV3: {
        header: "ITEMS",
        subHeader: "AT ₹149",
      },
      differentiatedUi: {
        displayType: "ADS_UI_DISPLAY_TYPE_ENUM_DEFAULT",
        differentiatedUiMediaDetails: {
          lottie: {},
          video: {},
        },
      },
      reviewsSummary: {},
      displayType: "RESTAURANT_DISPLAY_TYPE_DEFAULT",
      restaurantOfferPresentationInfo: {},
      externalRatings: {
        aggregatedRating: {
          rating: "--",
        },
      },
      ratingsDisplayPreference: "RATINGS_DISPLAY_PREFERENCE_SHOW_SWIGGY",
    },
    analytics: {
      context: "seo-data-48b08a83-465a-49b9-ba1d-20841232809b",
    },
    cta: {
      link: "https://www.swiggy.com/city/chhindwara/the-fusion-lounge-triloki-nagar-railway-station-rest658210",
      type: "WEBLINK",
    },
  },
  {
    info: {
      id: "385824",
      name: "The Belgian Waffle Co.",
      cloudinaryImageId:
        "RX_THUMBNAIL/IMAGES/VENDOR/2025/1/17/a38d20d7-bbb7-4b67-8bdd-7740e85cd4af_385824.JPG",
      locality: "Sinchai Colony",
      areaName: "Mohan Nagar",
      costForTwo: "₹200 for two",
      cuisines: ["Waffle", "Desserts", "Ice Cream", "Beverages"],
      avgRating: 4.6,
      veg: true,
      parentId: "2233",
      avgRatingString: "4.6",
      totalRatingsString: "395",
      sla: {
        deliveryTime: 40,
        lastMileTravel: 13.4,
        serviceability: "SERVICEABLE",
        slaString: "40-45 mins",
        lastMileTravelString: "13.4 km",
        iconType: "ICON_TYPE_EMPTY",
      },
      availability: {
        nextCloseTime: "2026-08-07 22:45:00",
        opened: true,
      },
      badges: {
        imageBadges: [
          {
            imageId: "v1695133679/badges/Pure_Veg111.png",
            description:
              "Serves only 100% vegetarian food, with no non-veg items.",
          },
        ],
      },
      isOpen: true,
      aggregatedDiscountInfoV2: {},
      type: "F",
      badgesV2: {
        entityBadges: {
          imageBased: {
            badgeObject: [
              {
                attributes: {
                  description:
                    "Serves only 100% vegetarian food, with no non-veg items.",
                  imageId: "v1695133679/badges/Pure_Veg111.png",
                  theme: "",
                },
              },
            ],
          },
          textBased: {},
          textExtendedBadges: {},
        },
      },
      differentiatedUi: {
        displayType: "ADS_UI_DISPLAY_TYPE_ENUM_DEFAULT",
        differentiatedUiMediaDetails: {
          lottie: {},
          video: {},
        },
      },
      reviewsSummary: {},
      displayType: "RESTAURANT_DISPLAY_TYPE_DEFAULT",
      restaurantOfferPresentationInfo: {},
      externalRatings: {
        aggregatedRating: {
          rating: "--",
        },
      },
      ratingsDisplayPreference: "RATINGS_DISPLAY_PREFERENCE_SHOW_SWIGGY",
    },
    analytics: {
      context: "seo-data-48b08a83-465a-49b9-ba1d-20841232809b",
    },
    cta: {
      link: "https://www.swiggy.com/city/chhindwara/the-belgian-waffle-co-sinchai-colony-mohan-nagar-rest385824",
      type: "WEBLINK",
    },
  },
  {
    info: {
      id: "522144",
      name: "Blue Chilli Restaurant",
      cloudinaryImageId: "je6qlse8csxgcfpuoybe",
      locality: "Ambedkar Nagar",
      areaName: "Prasia Road",
      costForTwo: "₹150 for two",
      cuisines: ["South Indian", "Indian", "Fast Food"],
      avgRating: 3.5,
      veg: true,
      parentId: "311804",
      avgRatingString: "3.5",
      totalRatingsString: "236",
      sla: {
        deliveryTime: 48,
        lastMileTravel: 13,
        serviceability: "SERVICEABLE",
        slaString: "45-50 mins",
        lastMileTravelString: "13.0 km",
        iconType: "ICON_TYPE_EMPTY",
      },
      availability: {
        nextCloseTime: "2026-08-07 23:00:00",
        opened: true,
      },
      badges: {
        imageBadges: [
          {
            imageId: "v1695133679/badges/Pure_Veg111.png",
            description:
              "Serves only 100% vegetarian food, with no non-veg items.",
          },
        ],
      },
      isOpen: true,
      type: "F",
      badgesV2: {
        entityBadges: {
          imageBased: {
            badgeObject: [
              {
                attributes: {
                  description:
                    "Serves only 100% vegetarian food, with no non-veg items.",
                  imageId: "v1695133679/badges/Pure_Veg111.png",
                  theme: "",
                },
              },
            ],
          },
          textBased: {},
          textExtendedBadges: {},
        },
      },
      aggregatedDiscountInfoV3: {
        header: "ITEMS",
        subHeader: "AT ₹60",
      },
      differentiatedUi: {
        displayType: "ADS_UI_DISPLAY_TYPE_ENUM_DEFAULT",
        differentiatedUiMediaDetails: {
          lottie: {},
          video: {},
        },
      },
      reviewsSummary: {},
      displayType: "RESTAURANT_DISPLAY_TYPE_DEFAULT",
      restaurantOfferPresentationInfo: {},
      externalRatings: {
        aggregatedRating: {
          rating: "--",
        },
      },
      ratingsDisplayPreference: "RATINGS_DISPLAY_PREFERENCE_SHOW_SWIGGY",
    },
    analytics: {
      context: "seo-data-48b08a83-465a-49b9-ba1d-20841232809b",
    },
    cta: {
      link: "https://www.swiggy.com/city/chhindwara/blue-chilli-restaurant-ambedkar-nagar-prasia-road-rest522144",
      type: "WEBLINK",
    },
  },
];

const Body = () => {
  return (
    <div className="body">
      <div className="search">
        <SearchIcon />
        <span className="search-text">
          Search for restaurants, cuisines and dishes
        </span>
      </div>
      <div className="section-head">
        <h2 className="section-title">Restaurants near you</h2>
        <span className="section-count">{restaurantList.length} places</span>
      </div>
      <div className="res-container">
        {restaurantList.map((restaurant) => (
          <RestaurantCard
            key={restaurant.info.id}
            restaurantData={restaurant}
          />
        ))}
      </div>
    </div>
  );
};

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
        <img
          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/${cloudinaryImageId}`}
          alt="res-logo"
        />
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

const AppLayout = () => {
  return (
    <div className="app">
      {/* Header - This can be called as <Header /> and also {Header()}*/}
      <Header />
      {/* Body */}
      <Body />
      {/* Footer */}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />); // root.render(AppLayout());
