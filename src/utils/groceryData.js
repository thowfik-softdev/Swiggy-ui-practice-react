// All image URLs are real Unsplash CDN links, verified to resolve.
// Prices are in rupees. mrp is the struck-through original.

const img = (id, w = 400) => `https://images.unsplash.com/${id}?w=${w}&q=80`;

export const CATEGORIES = [
  { id: "fruits", label: "Fruits", emoji: "🍎" },
  { id: "vegetables", label: "Vegetables", emoji: "🥦" },
  { id: "dairy", label: "Dairy & Eggs", emoji: "🥛" },
  { id: "bakery", label: "Bakery", emoji: "🍞" },
  { id: "snacks", label: "Snacks", emoji: "🍪" },
  { id: "beverages", label: "Beverages", emoji: "🥤" },
  { id: "staples", label: "Staples", emoji: "🌾" },
  { id: "personal", label: "Personal Care", emoji: "🧴" },
];

export const BANNERS = [
  {
    id: "b1",
    title: "Fresh from the farm",
    subtitle: "Fruits & vegetables picked this morning",
    cta: "Up to 40% off",
    image: img("photo-1610832958506-aa56368176cf", 900),
  },
  {
    id: "b2",
    title: "Dairy essentials",
    subtitle: "Milk, curd, paneer and more",
    cta: "Delivered in 15 mins",
    image: img("photo-1550583724-b2692b85b150", 900),
  },
  {
    id: "b3",
    title: "Midnight cravings",
    subtitle: "Snacks and drinks, any hour",
    cta: "Flat ₹75 off above ₹399",
    image: img("photo-1600271886742-f049cd451bba", 900),
  },
];

export const SECTIONS = [
  {
    id: "fruits",
    title: "Fresh Fruits",
    subtitle: "Handpicked, sourced daily",
    products: [
      { id: "f1", name: "Bananas (Robusta)", unit: "1 kg", price: 54, mrp: 68, rating: 4.5, image: img("photo-1571771894821-ce9b6c11b08e") },
      { id: "f2", name: "Royal Gala Apples", unit: "4 pcs", price: 189, mrp: 240, rating: 4.6, image: img("photo-1619546813926-a78fa6372cd2") },
      { id: "f3", name: "Alphonso Mangoes", unit: "1 kg", price: 449, mrp: 599, rating: 4.8, image: img("photo-1553279768-865429fa0078") },
      { id: "f4", name: "Fresh Strawberries", unit: "200 g", price: 129, mrp: 165, rating: 4.3, image: img("photo-1518977676601-b53f82aba655") },
      { id: "f5", name: "Nagpur Oranges", unit: "1 kg", price: 89, mrp: 110, rating: 4.2, image: img("photo-1587049352846-4a222e784d38") },
      { id: "f6", name: "Green Grapes", unit: "500 g", price: 76, mrp: 95, rating: 4.1, image: img("photo-1596040033229-a9821ebd058d") },
    ],
  },
  {
    id: "vegetables",
    title: "Fresh Vegetables",
    subtitle: "Straight from local farms",
    products: [
      { id: "v1", name: "Tomatoes (Local)", unit: "1 kg", price: 32, mrp: 45, rating: 4.0, image: img("photo-1546094096-0df4bcaaa337") },
      { id: "v2", name: "Broccoli", unit: "1 pc", price: 68, mrp: 90, rating: 4.4, image: img("photo-1584270354949-c26b0d5b4a0c") },
      { id: "v3", name: "Baby Spinach", unit: "250 g", price: 45, mrp: 60, rating: 4.5, image: img("photo-1576045057995-568f588f82fb") },
      { id: "v4", name: "Red Bell Pepper", unit: "500 g", price: 98, mrp: 130, rating: 4.3, image: img("photo-1563636619-e9143da7973b") },
      { id: "v5", name: "Onions", unit: "2 kg", price: 74, mrp: 96, rating: 3.9, image: img("photo-1508747703725-719777637510") },
      { id: "v6", name: "Carrots", unit: "500 g", price: 41, mrp: 55, rating: 4.2, image: img("photo-1582515073490-39981397c445") },
    ],
  },
  {
    id: "dairy",
    title: "Dairy, Eggs & Bakery",
    subtitle: "Chilled and delivered fast",
    products: [
      { id: "d1", name: "Amul Toned Milk", unit: "1 L", price: 68, mrp: 72, rating: 4.7, image: img("photo-1550583724-b2692b85b150") },
      { id: "d2", name: "Farm Eggs", unit: "12 pcs", price: 96, mrp: 120, rating: 4.5, image: img("photo-1518569656558-1f25e69d93d7") },
      { id: "d3", name: "Fresh Paneer", unit: "200 g", price: 105, mrp: 130, rating: 4.4, image: img("photo-1631452180519-c014fe946bc7") },
      { id: "d4", name: "Cheddar Cheese Block", unit: "250 g", price: 265, mrp: 320, rating: 4.6, image: img("photo-1486297678162-eb2a19b0a32d") },
      { id: "d5", name: "Whole Wheat Bread", unit: "400 g", price: 52, mrp: 60, rating: 4.1, image: img("photo-1509440159596-0249088772ff") },
      { id: "d6", name: "Butter Croissants", unit: "4 pcs", price: 149, mrp: 199, rating: 4.8, image: img("photo-1555507036-ab1f4038808a") },
    ],
  },
  {
    id: "snacks",
    title: "Snacks & Beverages",
    subtitle: "For the 4pm slump",
    products: [
      { id: "s1", name: "Salted Potato Chips", unit: "150 g", price: 55, mrp: 70, rating: 4.2, image: img("photo-1566478989037-eec170784d0b") },
      { id: "s2", name: "Dark Chocolate 70%", unit: "100 g", price: 185, mrp: 220, rating: 4.7, image: img("photo-1548907040-4baa42d10919") },
      { id: "s3", name: "Cold Brew Coffee", unit: "300 ml", price: 149, mrp: 180, rating: 4.5, image: img("photo-1517093602195-b40af9688b46") },
      { id: "s4", name: "Orange Juice", unit: "1 L", price: 129, mrp: 160, rating: 4.3, image: img("photo-1621506289937-a8e4df240d0b") },
      { id: "s5", name: "Mixed Nuts", unit: "500 g", price: 649, mrp: 799, rating: 4.6, image: img("photo-1508061253366-f7da158b6d46") },
      { id: "s6", name: "Green Tea Bags", unit: "25 pcs", price: 210, mrp: 260, rating: 4.4, image: img("photo-1627435601361-ec25f5b1d0e5") },
    ],
  },
  {
    id: "staples",
    title: "Staples & Pantry",
    subtitle: "The things you always run out of",
    products: [
      { id: "p1", name: "Basmati Rice", unit: "5 kg", price: 685, mrp: 820, rating: 4.5, image: img("photo-1586201375761-83865001e31c") },
      { id: "p2", name: "Whole Wheat Atta", unit: "5 kg", price: 289, mrp: 340, rating: 4.4, image: img("photo-1574323347407-f5e1ad6d020b") },
      { id: "p3", name: "Toor Dal", unit: "1 kg", price: 178, mrp: 210, rating: 4.3, image: img("photo-1596797038530-2c107229654b") },
      { id: "p4", name: "Cold Pressed Olive Oil", unit: "1 L", price: 899, mrp: 1150, rating: 4.7, image: img("photo-1474979266404-7eaacbcd87c5") },
      { id: "p5", name: "Raw Honey", unit: "500 g", price: 425, mrp: 520, rating: 4.8, image: img("photo-1587049352851-8d4e89133924") },
      { id: "p6", name: "Sea Salt", unit: "1 kg", price: 62, mrp: 75, rating: 4.1, image: img("photo-1518110925495-5fe2fda0442c") },
    ],
  },
];

export const PERKS = [
  { id: "p1", icon: "⚡", title: "15 minute delivery", text: "From dark stores minutes away from you" },
  { id: "p2", icon: "🥬", title: "Fresh guarantee", text: "Not fresh? We refund it, no questions" },
  { id: "p3", icon: "💰", title: "Lowest prices", text: "We match any local store price" },
  { id: "p4", icon: "↩️", title: "Easy returns", text: "Return at the doorstep, instantly" },
];
