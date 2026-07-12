// import type { Category, FaqItem, Product, Review } from

import { Category, FaqItem, Product, Review } from "../types/Product";

// NOTE: swap this file for real API calls / a DB query layer once your
// product catalog endpoints exist. Shapes match what the UI expects.

export const CATEGORIES: Category[] = [
  { id: "chanachur", name: "Chanachur", icon: "🥨", productCount: 8 },
  { id: "nimki", name: "Nimki", icon: "🥟", productCount: 5 },
  { id: "anguli", name: "Anguli", icon: "🍢", productCount: 4 },
  { id: "bhaja", name: "Bhaja & Chips", icon: "🍟", productCount: 6 },
  { id: "sweets", name: "Sweets", icon: "🍬", productCount: 7 },
  { id: "gift-box", name: "Gift Boxes", icon: "🎁", productCount: 3 },
];

export const PRODUCTS: Product[] = [
  {
    id: "classic-chanachur",
    title: "Classic Chanachur",
    description:
      "Our original family recipe — crunchy lentils, peanuts, and a spice blend passed down three generations.",
    image:
      "https://images.unsplash.com/photo-1599490659213-e0b2604aa9a2?w=600&q=80",
    price: 220,
    compareAtPrice: 260,
    weight: "250g",
    rating: 4.8,
    reviewCount: 142,
    spiceLevel: 2,
    category: "chanachur",
    isBestSeller: true,
  },
  {
    id: "spicy-jhal-chanachur",
    title: "Jhal Chanachur (Extra Spicy)",
    description:
      "For the family member who thinks everything needs more mirchi. Not for the faint of heart.",
    image:
      "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=600&q=80",
    price: 240,
    weight: "250g",
    rating: 4.6,
    reviewCount: 98,
    spiceLevel: 3,
    category: "chanachur",
    isBestSeller: true,
  },
  {
    id: "handmade-nimki",
    title: "Handmade Nimki",
    description:
      "Flaky, golden, and lightly salted — rolled and cut by hand the way Dida used to make it.",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80",
    price: 180,
    weight: "200g",
    rating: 4.9,
    reviewCount: 76,
    spiceLevel: 1,
    category: "nimki",
    isBestSeller: true,
  },
  {
    id: "achari-nimki",
    title: "Achari Masala Nimki",
    description:
      "A tangy pickle-spice twist on the classic, finished with kalo jeera for extra crunch.",
    image:
      "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&q=80",
    price: 200,
    weight: "200g",
    rating: 4.5,
    reviewCount: 54,
    spiceLevel: 2,
    category: "nimki",
  },
  {
    id: "crispy-anguli",
    title: "Crispy Anguli",
    description:
      "Finger-shaped, deep-fried to a perfect crunch — a snack box favorite for kids and adults alike.",
    image:
      "https://images.unsplash.com/photo-1613919113640-25732ec5e61f?w=600&q=80",
    price: 190,
    weight: "200g",
    rating: 4.7,
    reviewCount: 63,
    spiceLevel: 1,
    category: "anguli",
    isBestSeller: true,
  },
  {
    id: "masala-anguli",
    title: "Masala Anguli",
    description:
      "Same beloved crunch, dusted with our house masala blend for a bolder bite.",
    image:
      "https://images.unsplash.com/photo-1599909533144-cf3b57ad3299?w=600&q=80",
    price: 210,
    weight: "200g",
    rating: 4.4,
    reviewCount: 41,
    spiceLevel: 2,
    category: "anguli",
  },
  {
    id: "aloo-bhaja",
    title: "Aloo Bhaja Chips",
    description:
      "Thin-sliced potato, fried crisp and seasoned simply — a family lunchbox staple.",
    image:
      "https://images.unsplash.com/photo-1541014741259-de529411b96a?w=600&q=80",
    price: 150,
    weight: "150g",
    rating: 4.3,
    reviewCount: 37,
    spiceLevel: 1,
    category: "bhaja",
  },
  {
    id: "notun-gur-sandesh",
    title: "Notun Gur Sandesh",
    description:
      "Soft milk sweets made with fresh date-palm jaggery, in season and while it lasts.",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80",
    price: 320,
    weight: "300g",
    rating: 4.9,
    reviewCount: 88,
    spiceLevel: 1,
    category: "sweets",
    isBestSeller: true,
  },
];

export const REVIEWS: Review[] = [
  {
    id: "r1",
    name: "Farhana Akter",
    location: "Dhaka",
    rating: 5,
    text: "Tastes exactly like my grandmother's chanachur. My kids fight over the last handful every single time.",
    avatarSeed: "Farhana",
  },
  {
    id: "r2",
    name: "Rezaul Karim",
    location: "Chattogram",
    rating: 5,
    text: "The nimki is unbelievably fresh and crunchy. Ordered for Eid and it arrived perfectly packed.",
    avatarSeed: "Rezaul",
  },
  {
    id: "r3",
    name: "Nusrat Jahan",
    location: "Sylhet",
    rating: 4,
    text: "Finally a spicy snack my whole family agrees on. The gift box was a hit at our last get-together.",
    avatarSeed: "Nusrat",
  },
];

export const FAQS: FaqItem[] = [
  {
    id: "f1",
    question: "How fresh are the snacks when they arrive?",
    answer:
      "Everything is made in small batches after you order, not stocked in a warehouse. Most items ship within 24–48 hours of preparation.",
  },
  {
    id: "f2",
    question: "Can I choose a mild spice level for kids?",
    answer:
      "Yes — every product lists a spice level from mild to spicy, and several items (like our classic nimki) are made mild by default.",
  },
  {
    id: "f3",
    question: "Do you deliver outside Dhaka?",
    answer:
      "We currently deliver nationwide across Bangladesh through our courier partners, with same-day delivery available inside Dhaka.",
  },
  {
    id: "f4",
    question: "What if my order arrives damaged?",
    answer:
      "Reach out within 24 hours of delivery with a photo and we'll send a replacement or refund — no questions asked.",
  },
  {
    id: "f5",
    question: "Are your snacks free of artificial preservatives?",
    answer:
      "Yes. Everything is made the way a home kitchen would make it — real ingredients, no artificial preservatives or colors.",
  },
];
