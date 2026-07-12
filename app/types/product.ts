export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  compareAtPrice?: number;
  weight: string; // e.g. "250g"
  rating: number; // 0–5
  reviewCount: number;
  spiceLevel: 1 | 2 | 3; // 1 mild – 3 spicy
  category: string;
  isBestSeller?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string; // emoji, keeps this dependency-free
  productCount: number;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatarSeed: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
