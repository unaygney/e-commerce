import { Schema, model, models } from "mongoose";
import { IProduct } from "./definitions";

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  images: [{ type: String }],
  sku: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  attributes: { type: Map, of: String },
  discount: { type: Number },
  isPublished: { type: Boolean, default: true },
  features: [{ type: String }],
  fabricCare: { type: String },
  shipping: { type: String },
});

export default models.Product || model<IProduct>("Product", ProductSchema);
