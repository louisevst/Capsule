import { IUser } from "./User";

export type ProductId = string;
export type Name = string;
export type Description = string;
export type Alt = string;
export type Color = string;
export type Price = number;

export type Type =
  | "All"
  | "Pant"
  | "Blouse"
  | "Top"
  | "Jumpsuit"
  | "Dress"
  | "Skirt"
  | "Swimsuit"
  | "Jacket"
  | "Sweater"
  | "Jewellery";

export type Size = "XXS" | "XS" | "S" | "M" | "L" | "XL" | "XXL";

export type Fit = "Petite" | "Regular" | "Tall";

export type Theme =
  | "Fall/Winter"
  | "Spring/Summer"
  | "All"
  | "Party"
  | "Swimwear";

export type ProductVariantId = string;

export interface IProduct {
  _id: ProductId;
  name: Name;
  theme: Theme;
  createdAt: Date;
  description: Description;
  price: Price;
  image: string;
  type: Type;
  alt: Alt;
  colors: Array<Color>;
  sizes: Array<Size>;
  fits: Array<Fit>;
  details?: ProductDetails;
}

export interface ProductDetails {
  _id: ProductVariantId;
  product_id: ProductId;
  name: Name;
  description: Description;
  price: Price;
  images: Array<string>;
  type: Type;
  alt: Alt;
  color: Color;
  size: Size;
  fit: Fit;
}

export interface IWishlist {
  _id: string;
  user_id: string;
  product_id: Array<IProduct>;
}

export interface OrderedProducts {
  name: Name;
  order_id: string;
  price: number;
  product_variant_id: ProductDetails;
  quantity: number;
  _id: ProductId;
}

export interface IOrder {
  date_ordered: Date;
  order_items: Array<OrderedProducts>;
  total_price: number;
  user_id: IUser;
  _id: string;
}
