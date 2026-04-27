// Mock data layer — simulates a backend for menu items, gallery & reviews.
// In production, swap the resolver for real fetches.

export type MenuCategory = "breakfast" | "coffee" | "baguettes" | "panini" | "cold";

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: MenuCategory;
  popular?: boolean;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption: string;
  tag: "interior" | "food" | "drink" | "place";
  ratio: "portrait" | "landscape" | "square";
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  body: string;
}

import heroBreakfast from "@/assets/hero-breakfast.jpg";
import coffee from "@/assets/coffee.jpg";
import interior from "@/assets/interior.jpg";
import exterior from "@/assets/exterior.jpg";
import sandwich from "@/assets/sandwich.jpg";
import omelette from "@/assets/omelette.jpg";
import panini from "@/assets/panini.jpg";
import avocado from "@/assets/avocado-toast.jpg";
import birmingham from "@/assets/birmingham.jpg";
import bread from "@/assets/bread.jpg";
import espresso from "@/assets/espresso.jpg";

export const MENU: MenuItem[] = [
  // Breakfast
  { id: "be1", name: "The Big Breakfast", description: "Bacon, sausage, fried egg, beans, mushrooms, grilled tomato & sourdough toast.", price: 9.95, category: "breakfast", popular: true },
  { id: "be2", name: "Cheese Omelette", description: "Three free-range eggs folded with melted mozzarella & fresh herbs.", price: 6.50, category: "breakfast", popular: true },
  { id: "be3", name: "Avocado on Sourdough", description: "Smashed avocado, chilli flakes, lemon, olive oil.", price: 7.25, category: "breakfast" },
  { id: "be4", name: "Eggs Benedict", description: "Poached eggs, crispy bacon, hollandaise on a toasted muffin.", price: 8.50, category: "breakfast" },
  { id: "be5", name: "House Granola", description: "Oats, honey, almonds, seasonal fruit, Greek yoghurt.", price: 5.95, category: "breakfast" },

  // Coffee & hot drinks
  { id: "co1", name: "Espresso", price: 2.30, category: "coffee" },
  { id: "co2", name: "Flat White", price: 3.10, category: "coffee", popular: true },
  { id: "co3", name: "Cappuccino", price: 3.10, category: "coffee" },
  { id: "co4", name: "Americano", price: 2.80, category: "coffee" },
  { id: "co5", name: "Mocha", price: 3.40, category: "coffee" },
  { id: "co6", name: "Loose-leaf Tea", price: 2.40, category: "coffee" },

  // Baguettes & sandwiches
  { id: "ba1", name: "Roast Pepper & Mozzarella", description: "Slow-roasted peppers, buffalo mozzarella, rocket on stone-baked baguette.", price: 6.75, category: "baguettes" },
  { id: "ba2", name: "Smoked Ham & Cheddar", description: "Wiltshire ham, mature cheddar, English mustard.", price: 6.50, category: "baguettes" },
  { id: "ba3", name: "Tuna Niçoise", description: "Line-caught tuna, olives, egg, capers, lemon.", price: 6.95, category: "baguettes" },

  // Panini & ciabatta
  { id: "pa1", name: "BBQ Chicken & Cheese", description: "Pulled chicken, smoked cheese, slow BBQ sauce.", price: 7.25, category: "panini", popular: true },
  { id: "pa2", name: "Mediterranean Vegetable", description: "Courgette, aubergine, peppers, pesto, mozzarella.", price: 6.95, category: "panini" },
  { id: "pa3", name: "The Spicy Veg", description: "Mushroom, olive, jalapeño, three-cheese blend.", price: 6.95, category: "panini" },

  // Cold
  { id: "cd1", name: "Pastrami on Rye", description: "House-cured pastrami, gherkin, mustard mayo.", price: 7.50, category: "cold" },
  { id: "cd2", name: "Chicken Caesar Wrap", description: "Roast chicken, baby gem, parmesan, anchovy dressing.", price: 6.95, category: "cold" },
  { id: "cd3", name: "Hummus & Roast Veg", description: "House hummus, roasted root veg, dukkah.", price: 6.25, category: "cold" },
];

export const GALLERY: GalleryImage[] = [
  { id: "g1", src: heroBreakfast, alt: "Full English breakfast on a navy ceramic plate", caption: "The Big Breakfast — served until close.", tag: "food", ratio: "portrait" },
  { id: "g2", src: interior, alt: "Pub interior with brass pendants and navy wainscoting", caption: "The bar room, just before service.", tag: "interior", ratio: "landscape" },
  { id: "g3", src: coffee, alt: "Flat white with gold-tinged latte art", caption: "Single-origin flat white.", tag: "drink", ratio: "square" },
  { id: "g4", src: exterior, alt: "Pub exterior on a quiet Birmingham street at blue hour", caption: "7 Stephenson St, B2 4BL.", tag: "place", ratio: "portrait" },
  { id: "g5", src: omelette, alt: "Cheese omelette folded on warm beige plate", caption: "Mozzarella omelette, herb-flecked.", tag: "food", ratio: "portrait" },
  { id: "g6", src: panini, alt: "Stone-baked panini cut in half with melted cheese", caption: "BBQ chicken panini.", tag: "food", ratio: "portrait" },
  { id: "g7", src: sandwich, alt: "Baguette with roasted peppers and rocket", caption: "Roast pepper baguette.", tag: "food", ratio: "square" },
  { id: "g8", src: avocado, alt: "Avocado on sourdough", caption: "Avocado, chilli, lemon.", tag: "food", ratio: "square" },
  { id: "g9", src: birmingham, alt: "Birmingham Grand Central station at blue hour", caption: "Two minutes from New Street.", tag: "place", ratio: "landscape" },
  { id: "g10", src: bread, alt: "Sourdough loaves in basket", caption: "Bread baked each morning.", tag: "food", ratio: "square" },
  { id: "g11", src: espresso, alt: "Espresso shot pulling into a beige cup", caption: "First pour of the day.", tag: "drink", ratio: "portrait" },
];

export const REVIEWS: Review[] = [
  {
    id: "r1",
    author: "Paniw N.",
    rating: 5,
    date: "A month ago",
    body: "One of the best coffees I've had in a long time — honestly amazing. The staff are kind and welcoming, and the team in the kitchen are really friendly too.",
  },
  {
    id: "r2",
    author: "Darryl Osborne",
    rating: 5,
    date: "Two months ago",
    body: "A fabulous place near the station. I wanted a full English before heading home by train and was not disappointed. Perfectly cooked, and the cheesy egg with mozzarella was a lovely touch.",
  },
  {
    id: "r3",
    author: "Arthur Morgan",
    rating: 5,
    date: "Five months ago",
    body: "A delightful little café very close to New Street. Cosy, welcoming, family-run feel and the staff couldn't have been friendlier. Worth the queue.",
  },
];

// Mock async resolver — mimics a backend call
export const fetchMenu = (): Promise<MenuItem[]> =>
  new Promise((resolve) => setTimeout(() => resolve(MENU), 300));

export const fetchGallery = (): Promise<GalleryImage[]> =>
  new Promise((resolve) => setTimeout(() => resolve(GALLERY), 300));

export const fetchReviews = (): Promise<Review[]> =>
  new Promise((resolve) => setTimeout(() => resolve(REVIEWS), 200));
