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
