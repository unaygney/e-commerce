import { Document, ObjectId } from "mongoose";

export interface IProduct extends Document {
  _id?: ObjectId | string;
  id?: string | undefined;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
  sku: string;
  createdAt: Date;
  updatedAt: Date;
  attributes: string;
  discount?: number;
  isPublished: boolean;
  features: string[];
  fabricCare: string;
  shipping: string;
}
interface Category {
  category_id: string;
  name: string;
  created_at: string;
}

interface Collection {
  collection_id: string;
  name: string;
  description: string;
  image_url: string;
  created_at: string;
}

interface Image {
  color: string;
  image_url: string;
}

interface Info {
  title: string;
  description: string[];
}

interface Inventory {
  sku: string;
  color: string;
  size: string | number;
  list_price: number;
  discount: number | null;
  discount_percentage: number;
  sale_price: number;
  sold: number;
  stock: number | null | undefined;
}

interface PriceRange {
  highest: number;
  lowest: number;
}

export interface Product {
  product_id: string;
  name: string;
  description: string;
  category: Category;
  collection: Collection;
  created_at: string;
  colors: string[];
  images: Image[];
  info: Info[];
  inventory: Inventory[];
  priceRange: PriceRange;
  rating: number;
  reviews: number;
  sizes: (string | number)[];
  sold: number;
}

export interface ErrorResponse {
  error?: boolean;
  status?: number;
  message?: string;
}

interface User {
  name: string;
  user_id: string;
  avatar_url: string;
}

interface Review {
  rating: number;
  content: string;
  created_at: string;
  user: User;
}

interface Count {
  count: number;
  rating: number;
}

interface Aggregate {
  counts: Count[];
  rating: number;
  total: number;
}

interface Pagination {
  has_more: boolean;
  page: number;
  per_page: number;
  total: number;
}

export interface ReviewsResponse {
  aggregate: Aggregate;
  data: Review[];
  pagination: Pagination;
}

export interface Collections {
  collection_id: string;
  name: string;
  description: string;
  image_url: string;
  created_at: string;
}
export interface Coupon {
  coupon_code: string;
  discount_amount: number | null;
  discount_percentage: null | number;
}
export type GetAllProductsParams = {
  page?: number;
  per_page?: number;
  collection?: string[];
  category?: string[];
  color?: string[];
  rating?: number[];
  sort?: "created" | "rating" | "popularity" | "price";
  direction?: "asc" | "desc";
};
