// Static page furniture for the home screen. Real image URLs, verified.
const img = (id, w = 800) => `https://images.unsplash.com/${id}?w=${w}&q=80`;

export const CUISINE_CHIPS = [
  { id: "pizza", label: "Pizza", emoji: "🍕" },
  { id: "biryani", label: "Biryani", emoji: "🍛" },
  { id: "burger", label: "Burger", emoji: "🍔" },
  { id: "cake", label: "Cakes", emoji: "🍰" },
  { id: "chinese", label: "Chinese", emoji: "🥡" },
  { id: "coffee", label: "Coffee", emoji: "☕" },
  { id: "dosa", label: "Dosa", emoji: "🥞" },
  { id: "ice cream", label: "Ice Cream", emoji: "🍦" },
];

export const HOME_BANNERS = [
  {
    id: "hb1",
    title: "50% off your first order",
    subtitle: "On orders above ₹199, no code needed",
    cta: "New here",
    image: img("photo-1504674900247-0877df9cc836"),
  },
  {
    id: "hb2",
    title: "Late night cravings",
    subtitle: "Kitchens open past midnight, near you",
    cta: "Open now",
    image: img("photo-1414235077428-338989a2e8c0"),
  },
  {
    id: "hb3",
    title: "Free delivery all week",
    subtitle: "On every order above ₹149",
    cta: "No fees",
    image: img("photo-1552566626-52f8b828add9"),
  },
];

export const TOP_PICKS = [
  {
    id: "tp1",
    title: "Pizzas",
    subtitle: "38 places",
    image: img("photo-1513104890138-7c749659a591", 500),
  },
  {
    id: "tp2",
    title: "Biryani",
    subtitle: "24 places",
    image: img("photo-1563379091339-03b21ab4a4f8", 500),
  },
  {
    id: "tp3",
    title: "Burgers",
    subtitle: "19 places",
    image: img("photo-1568901346375-23c9450c58cd", 500),
  },
  {
    id: "tp4",
    title: "Desserts",
    subtitle: "41 places",
    image: img("photo-1565299624946-b28f40a0ae38", 500),
  },
  {
    id: "tp5",
    title: "South Indian",
    subtitle: "27 places",
    image: img("photo-1567620905732-2d1ec7ab7445", 500),
  },
  {
    id: "tp6",
    title: "Coffee",
    subtitle: "16 places",
    image: img("photo-1512621776951-a57141f2eefd", 500),
  },
];

export const HOME_PERKS = [
  {
    id: "hp1",
    icon: "🛵",
    title: "Delivered hot",
    text: "Insulated bags and the shortest route we can find",
  },
  {
    id: "hp2",
    icon: "⭐",
    title: "Only good places",
    text: "Ratings come from people who actually ordered",
  },
  {
    id: "hp3",
    icon: "💸",
    title: "No surprise fees",
    text: "The price you see at checkout is the price you pay",
  },
  {
    id: "hp4",
    icon: "🎧",
    title: "Help that answers",
    text: "Real support, every hour of every day",
  },
];
