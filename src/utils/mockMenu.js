/**
 * A real capture of Swiggy's menu response, trimmed to the fields the UI uses.
 *
 * Why this file exists: /dapi/menu/pl sits behind AWS WAF. It only answers
 * requests that carry an aws-waf-token cookie, which is issued after a browser
 * solves a JS challenge on swiggy.com. A cross-origin fetch from localhost can
 * never present that cookie, so the endpoint replies 202 with an empty body.
 * No CORS proxy fixes it either - the proxy's server gets blocked the same way.
 *
 * The SHAPE below is exactly the live one, so swapping in a real response later
 * needs no component changes at all.
 */
export const mockMenu = {
  statusCode: 0,
  data: {
    statusMessage: "done successfully",
    cards: [
      {
        card: {
          card: {
            "@type": "type.googleapis.com/swiggy.gandalf.widgets.v2.TextBoxV2",
            text: "Pizza Hut",
          },
        },
      },
      {
        card: {
          card: {
            "@type":
              "type.googleapis.com/swiggy.gandalf.widgets.v2.RestaurantBlTab",
            tabs: [{ id: "Order Online", title: "Order Online" }],
          },
        },
      },
      {
        card: {
          card: {
            "@type": "type.googleapis.com/swiggy.presentation.food.v2.Restaurant",
            info: {
              id: "1003414",
              name: "Pizza Hut",
              city: "Chhindwara",
              cloudinaryImageId:
                "RX_THUMBNAIL/IMAGES/VENDOR/2026/6/15/65fba3aa-5620-4e05-afdc-50bf11ef7f0f_1003414.JPG",
              locality: "Chhindwara",
              areaName: "Chhindwara City",
              costForTwoMessage: "₹350 for two",
              cuisines: ["Pizzas"],
              avgRating: 4.4,
              avgRatingString: "4.4",
              totalRatingsString: "319 ratings",
              sla: {
                deliveryTime: 48,
                slaString: "45-50 MINS",
                lastMileTravelString: "14.1 km",
              },
              availability: { opened: true },
              aggregatedDiscountInfo: { header: "50% off" },
              labels: [
                {
                  title: "Address",
                  message:
                    "Pizza Hut, Shop no 3&4, Plot No.2/11, Block no 45, Parasia Road, Chhindwara, Madhya Pradesh-480002",
                },
                { title: "Cuisines", message: "Pizzas" },
              ],
              isOpen: true,
              timingsInfo: {
                status: "Open now",
                message: "Closes 12:00 am",
              },
            },
          },
        },
      },
      {
        card: {
          card: {
            "@type": "type.googleapis.com/swiggy.gandalf.widgets.v2.GridWidget",
            id: "offerCollectionWidget_UX4",
            gridElements: {
              infoWithStyle: {
                "@type":
                  "type.googleapis.com/swiggy.presentation.food.v2.OfferInfoWithStyle",
                offers: [
                  {
                    info: {
                      header: "FLAT 50% OFF",
                      couponCode: "NO CODE REQUIRED",
                      description: "ON SELECT ITEMS",
                    },
                  },
                  {
                    info: {
                      header: "ITEMS AT ₹99",
                      offerTag: "DEAL OF DAY",
                      description: "ON SELECT ITEMS",
                    },
                  },
                  {
                    info: {
                      header: "FLAT ₹200 OFF",
                      offerTag: "FLAT DEAL",
                      couponCode: "USE CELEBRATIONS",
                      description: "ABOVE ₹999",
                    },
                  },
                  {
                    info: {
                      header: "40% OFF UPTO ₹300",
                      couponCode: "USE SBIVISADC40",
                      description: "ABOVE ₹400",
                    },
                  },
                  {
                    info: {
                      header: "10% OFF UPTO ₹75",
                      couponCode: "USE VISAPLATINUMDC",
                      description: "ABOVE ₹300",
                    },
                  },
                ],
              },
            },
          },
        },
      },
      {
        groupedCard: {
          cardGroupMap: {
            REGULAR: {
              cards: [
                {
                  card: {
                    card: {
                      "@type":
                        "type.googleapis.com/swiggy.presentation.food.v2.MenuVegFilterAndBadge",
                    },
                  },
                },
                {
                  card: {
                    card: {
                      "@type":
                        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
                      title: "Recommended",
                      itemCards: [
                        {
                          card: {
                            info: {
                              id: "157431682",
                              name: "Margherita",
                              category: "Veg Pizza",
                              description:
                                "Pizza topped with our herb-infused signature pan sauce and mozzarella cheese. A classic treat for all cheese lovers out there!",
                              imageId:
                                "FOOD_CATALOG/IMAGES/CMS/2026/1/5/41b56b0c-c864-4081-8c9c-ed4585cb3a5c_e725dfb8-341d-4ef3-9914-e7a2634187aa.jpg",
                              inStock: 1,
                              isVeg: 1,
                              defaultPrice: 14900,
                              ratings: {
                                aggregatedRating: {
                                  rating: "4.2",
                                  ratingCountV2: "8",
                                },
                              },
                              itemAttribute: { vegClassifier: "VEG" },
                            },
                          },
                        },
                        {
                          card: {
                            info: {
                              id: "157431684",
                              name: "Veggie Feast",
                              category: "Veg Pizza",
                              description:
                                "Serves 1 | Herbed onion and green capsicum, juicy sweet corn & mozzarella cheese with flavourful pan sauce.",
                              imageId:
                                "FOOD_CATALOG/IMAGES/CMS/2026/1/5/185b654c-4ff2-42ca-991e-11caf0781cb5_9fd71142-80db-4471-bec2-f80db3b1e08f.jpg",
                              inStock: 1,
                              isVeg: 1,
                              defaultPrice: 22900,
                              ratings: {
                                aggregatedRating: {
                                  rating: "4.7",
                                  ratingCountV2: "4",
                                },
                              },
                              itemAttribute: {
                                vegClassifier: "VEG",
                                portionSize: "Serves 1",
                              },
                            },
                          },
                        },
                        {
                          card: {
                            info: {
                              id: "157431686",
                              name: "Tandoori Paneer",
                              category: "Veg Pizza",
                              description:
                                "Serves 1 | It's our signature. Spiced paneer, crunchy onions & green capsicum, spicy red paprika with delicious tandoori sauce and mozzarella cheese!",
                              imageId:
                                "FOOD_CATALOG/IMAGES/CMS/2026/1/5/413649b2-52b2-42d8-afcf-fff2174192b2_71809375-48ba-48f6-bdba-b464956098bb.jpg",
                              inStock: 1,
                              isVeg: 1,
                              defaultPrice: 36900,
                              ratings: {
                                aggregatedRating: {
                                  rating: "5.0",
                                  ratingCountV2: "10",
                                },
                              },
                              itemAttribute: {
                                vegClassifier: "VEG",
                                portionSize: "Serves 1",
                              },
                            },
                          },
                        },
                        {
                          card: {
                            info: {
                              id: "147511347",
                              name: "Choco Volcano",
                              category: "Desserts",
                              description:
                                "Serves 1 | Warm choco cake with gooey center (262 Kcal/100g). Contains Cereals containing Gluten (Wheat), Soya and Milk & Milk Products.",
                              inStock: 1,
                              isVeg: 1,
                              defaultPrice: 11900,
                              ratings: {
                                aggregatedRating: {
                                  rating: "4.2",
                                  ratingCountV2: "16",
                                },
                              },
                              itemAttribute: {
                                vegClassifier: "VEG",
                                portionSize: "Serves 1",
                              },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
                {
                  card: {
                    card: {
                      "@type":
                        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
                      title: "Sides & Beverages",
                      itemCards: [
                        {
                          card: {
                            info: {
                              id: "147511351",
                              name: "Cheese Garlic Bread",
                              category: "Sides",
                              description:
                                "Freshly baked garlic bread loaded with mozzarella cheese.",
                              inStock: 1,
                              isVeg: 1,
                              defaultPrice: 16500,
                              itemAttribute: { vegClassifier: "VEG" },
                            },
                          },
                        },
                        {
                          card: {
                            info: {
                              id: "147511356",
                              name: "Indi Cheese Pocket",
                              category: "Sides",
                              description:
                                "Crispy pockets stuffed with spiced cheese filling.",
                              inStock: 1,
                              isVeg: 1,
                              defaultPrice: 10900,
                              itemAttribute: { vegClassifier: "VEG" },
                            },
                          },
                        },
                        {
                          card: {
                            info: {
                              id: "147511355",
                              name: "Pepsi Pet",
                              category: "Beverages",
                              description: "Chilled 475ml bottle.",
                              inStock: 1,
                              isVeg: 1,
                              defaultPrice: 5700,
                              itemAttribute: { vegClassifier: "VEG" },
                            },
                          },
                        },
                        {
                          card: {
                            info: {
                              id: "147511348",
                              name: "Masala Lemonade",
                              category: "Beverages",
                              description:
                                "Tangy lemonade with a hit of Indian spices.",
                              inStock: 0,
                              isVeg: 1,
                              defaultPrice: 9900,
                              itemAttribute: { vegClassifier: "VEG" },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              ],
            },
          },
        },
      },
    ],
  },
};
