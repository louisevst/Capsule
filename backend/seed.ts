import mongoose, { MongooseOptions } from "mongoose";
import Product from "./models/product";
import Product_Variant from "./models/poduct_variant";
import dotenv from "dotenv";
dotenv.config();

const password = process.env.MONGODB_PASSWORD;

const options: MongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as MongooseOptions;

mongoose.connect(
  `mongodb+srv://louisevassart:${password}@cluster.xltoske.mongodb.net/?retryWrites=true&w=majority`,
  options
);
//categories// jacket // Pants // skirt // top // blouses // Sweater // Dress // jumpsuit // Jewellery // Swimwear
const products = [
  {
    name: "Allia",
    type: "Pant",
    description:
      "An high-waisted suit pant to stay classy and comfortable for any occasion.",
    theme: "Fall/Winter",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
    price: 130,
    variants: [
      {
        color: "Blue-grey",
        fit: "Regular",
        size: "XXS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Blue-grey",
        fit: "Regular",
        size: "XS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Blue-grey",
        fit: "Regular",
        size: "S",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Blue-grey",
        fit: "Regular",
        size: "M",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Blue-grey",
        fit: "Regular",
        size: "L",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Blue-grey",
        fit: "Regular",
        size: "XL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Blue-grey",
        fit: "Regular",
        size: "XXL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Blue-grey",
        fit: "Petite",
        size: "XXS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Blue-grey",
        fit: "Petite",
        size: "XS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Blue-grey",
        fit: "Petite",
        size: "S",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Blue-grey",
        fit: "Petite",
        size: "M",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Blue-grey",
        fit: "Petite",
        size: "L",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Blue-grey",
        fit: "Petite",
        size: "XL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Blue-grey",
        fit: "Petite",
        size: "XXL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Blue-grey",
        fit: "Tall",
        size: "XXS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Blue-grey",
        fit: "Tall",
        size: "XS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Blue-grey",
        fit: "Tall",
        size: "S",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Blue-grey",
        fit: "Tall",
        size: "M",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Blue-grey",
        fit: "Tall",
        size: "L",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Blue-grey",
        fit: "Tall",
        size: "XL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Blue-grey",
        fit: "Tall",
        size: "XXL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },

      {
        color: "Jungle green",
        fit: "Regular",
        size: "XXS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Jungle green",
        fit: "Regular",
        size: "XS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Jungle green",
        fit: "Regular",
        size: "S",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Jungle green",
        fit: "Regular",
        size: "M",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Jungle green",
        fit: "Regular",
        size: "L",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Jungle green",
        fit: "Regular",
        size: "XL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Jungle green",
        fit: "Regular",
        size: "XXL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Jungle green",
        fit: "Petite",
        size: "XXS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Jungle green",
        fit: "Petite",
        size: "XS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Jungle green",
        fit: "Petite",
        size: "S",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Jungle green",
        fit: "Petite",
        size: "M",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Jungle green",
        fit: "Petite",
        size: "L",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Jungle green",
        fit: "Petite",
        size: "XL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Jungle green",
        fit: "Petite",
        size: "XXL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Jungle green",
        fit: "Tall",
        size: "XXS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Jungle green",
        fit: "Tall",
        size: "XS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Jungle green",
        fit: "Tall",
        size: "S",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Jungle green",
        fit: "Tall",
        size: "M",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Jungle green",
        fit: "Tall",
        size: "L",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Jungle green",
        fit: "Tall",
        size: "XL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Jungle green",
        fit: "Tall",
        size: "XXL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },

      {
        color: "Khaki",
        fit: "Regular",
        size: "XXS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Khaki",
        fit: "Regular",
        size: "XS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Khaki",
        fit: "Regular",
        size: "S",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Khaki",
        fit: "Regular",
        size: "M",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Khaki",
        fit: "Regular",
        size: "L",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Khaki",
        fit: "Regular",
        size: "XL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Khaki",
        fit: "Regular",
        size: "XXL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Khaki",
        fit: "Petite",
        size: "XXS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Khaki",
        fit: "Petite",
        size: "XS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Khaki",
        fit: "Petite",
        size: "S",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Khaki",
        fit: "Petite",
        size: "M",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Khaki",
        fit: "Petite",
        size: "L",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Khaki",
        fit: "Petite",
        size: "XL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Khaki",
        fit: "Petite",
        size: "XXL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Khaki",
        fit: "Tall",
        size: "XXS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Khaki",
        fit: "Tall",
        size: "XS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Khaki",
        fit: "Tall",
        size: "S",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Khaki",
        fit: "Tall",
        size: "M",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Khaki",
        fit: "Tall",
        size: "L",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Khaki",
        fit: "Tall",
        size: "XL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Khaki",
        fit: "Tall",
        size: "XXL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },

      {
        color: "Teal",
        fit: "Regular",
        size: "XXS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Teal",
        fit: "Regular",
        size: "XS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Teal",
        fit: "Regular",
        size: "S",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Teal",
        fit: "Regular",
        size: "M",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Teal",
        fit: "Regular",
        size: "L",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Teal",
        fit: "Regular",
        size: "XL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Teal",
        fit: "Regular",
        size: "XXL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Teal",
        fit: "Petite",
        size: "XXS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Teal",
        fit: "Petite",
        size: "XS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Teal",
        fit: "Petite",
        size: "S",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Teal",
        fit: "Petite",
        size: "M",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Teal",
        fit: "Petite",
        size: "L",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Teal",
        fit: "Petite",
        size: "XL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Teal",
        fit: "Petite",
        size: "XXL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Teal",
        fit: "Tall",
        size: "XXS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Teal",
        fit: "Tall",
        size: "XS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Teal",
        fit: "Tall",
        size: "S",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Teal",
        fit: "Tall",
        size: "M",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Teal",
        fit: "Tall",
        size: "L",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Teal",
        fit: "Tall",
        size: "XL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Teal",
        fit: "Tall",
        size: "XXL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Raspberry",
        fit: "Regular",
        size: "XXS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Raspberry",
        fit: "Regular",
        size: "XS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Raspberry",
        fit: "Regular",
        size: "S",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Raspberry",
        fit: "Regular",
        size: "M",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Raspberry",
        fit: "Regular",
        size: "L",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Raspberry",
        fit: "Regular",
        size: "XL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Raspberry",
        fit: "Regular",
        size: "XXL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Raspberry",
        fit: "Petite",
        size: "XXS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Raspberry",
        fit: "Petite",
        size: "XS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Raspberry",
        fit: "Petite",
        size: "S",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Raspberry",
        fit: "Petite",
        size: "M",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Raspberry",
        fit: "Petite",
        size: "L",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Raspberry",
        fit: "Petite",
        size: "XL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Raspberry",
        fit: "Petite",
        size: "XXL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Raspberry",
        fit: "Tall",
        size: "XXS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Raspberry",
        fit: "Tall",
        size: "XS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Raspberry",
        fit: "Tall",
        size: "S",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Raspberry",
        fit: "Tall",
        size: "M",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Raspberry",
        fit: "Tall",
        size: "L",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Raspberry",
        fit: "Tall",
        size: "XL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Raspberry",
        fit: "Tall",
        size: "XXL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Blue-grey",
        fit: "Regular",
        size: "XXS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Mustard",
        fit: "Regular",
        size: "XS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Mustard",
        fit: "Regular",
        size: "S",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Mustard",
        fit: "Regular",
        size: "M",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Mustard",
        fit: "Regular",
        size: "L",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Mustard",
        fit: "Regular",
        size: "XL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Mustard",
        fit: "Regular",
        size: "XXL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Mustard",
        fit: "Petite",
        size: "XXS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Mustard",
        fit: "Petite",
        size: "XS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Mustard",
        fit: "Petite",
        size: "S",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Mustard",
        fit: "Petite",
        size: "M",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Mustard",
        fit: "Petite",
        size: "L",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Mustard",
        fit: "Petite",
        size: "XL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Mustard",
        fit: "Petite",
        size: "XXL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Mustard",
        fit: "Tall",
        size: "XXS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Mustard",
        fit: "Tall",
        size: "XS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Mustard",
        fit: "Tall",
        size: "S",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Mustard",
        fit: "Tall",
        size: "M",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Mustard",
        fit: "Tall",
        size: "L",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Mustard",
        fit: "Tall",
        size: "XL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Mustard",
        fit: "Tall",
        size: "XXL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Off-white",
        fit: "Regular",
        size: "XXS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Off-white",
        fit: "Regular",
        size: "XS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Off-white",
        fit: "Regular",
        size: "S",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Off-white",
        fit: "Regular",
        size: "M",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Off-white",
        fit: "Regular",
        size: "L",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Off-white",
        fit: "Regular",
        size: "XL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Off-white",
        fit: "Regular",
        size: "XXL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Off-white",
        fit: "Petite",
        size: "XXS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Off-white",
        fit: "Petite",
        size: "XS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Off-white",
        fit: "Petite",
        size: "S",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Off-white",
        fit: "Petite",
        size: "M",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Off-white",
        fit: "Petite",
        size: "L",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Off-white",
        fit: "Petite",
        size: "XL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Off-white",
        fit: "Petite",
        size: "XXL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Off-white",
        fit: "Tall",
        size: "XXS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Off-white",
        fit: "Tall",
        size: "XS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Off-white",
        fit: "Tall",
        size: "S",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Off-white",
        fit: "Tall",
        size: "M",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Off-white",
        fit: "Tall",
        size: "L",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Off-white",
        fit: "Tall",
        size: "XL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Off-white",
        fit: "Tall",
        size: "XXL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "White",
        fit: "Regular",
        size: "XXS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "White",
        fit: "Regular",
        size: "XS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "White",
        fit: "Regular",
        size: "S",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "White",
        fit: "Regular",
        size: "M",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "White",
        fit: "Regular",
        size: "L",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "White",
        fit: "Regular",
        size: "XL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "White",
        fit: "Regular",
        size: "XXL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "White",
        fit: "Petite",
        size: "XXS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "White",
        fit: "Petite",
        size: "XS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "White",
        fit: "Petite",
        size: "S",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "White",
        fit: "Petite",
        size: "M",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "White",
        fit: "Petite",
        size: "L",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "White",
        fit: "Petite",
        size: "XL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "White",
        fit: "Petite",
        size: "XXL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "White",
        fit: "Tall",
        size: "XXS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "White",
        fit: "Tall",
        size: "XS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "White",
        fit: "Tall",
        size: "S",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "White",
        fit: "Tall",
        size: "M",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "White",
        fit: "Tall",
        size: "L",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "White",
        fit: "Tall",
        size: "XL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "White",
        fit: "Tall",
        size: "XXL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Beige",
        fit: "Regular",
        size: "XXS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Beige",
        fit: "Regular",
        size: "XS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Beige",
        fit: "Regular",
        size: "S",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Beige",
        fit: "Regular",
        size: "M",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Beige",
        fit: "Regular",
        size: "L",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Beige",
        fit: "Regular",
        size: "XL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Beige",
        fit: "Regular",
        size: "XXL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Beige",
        fit: "Petite",
        size: "XXS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Beige",
        fit: "Petite",
        size: "XS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Beige",
        fit: "Petite",
        size: "S",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Beige",
        fit: "Petite",
        size: "M",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Beige",
        fit: "Petite",
        size: "L",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Beige",
        fit: "Petite",
        size: "XL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Beige",
        fit: "Petite",
        size: "XXL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Beige",
        fit: "Tall",
        size: "XXS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Beige",
        fit: "Tall",
        size: "XS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Beige",
        fit: "Tall",
        size: "S",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Beige",
        fit: "Tall",
        size: "M",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Beige",
        fit: "Tall",
        size: "L",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Beige",
        fit: "Tall",
        size: "XL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Beige",
        fit: "Tall",
        size: "XXL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Black",
        fit: "Regular",
        size: "XXS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Black",
        fit: "Regular",
        size: "XS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Black",
        fit: "Regular",
        size: "S",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Black",
        fit: "Regular",
        size: "M",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Black",
        fit: "Regular",
        size: "L",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Black",
        fit: "Regular",
        size: "XL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Black",
        fit: "Regular",
        size: "XXL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Black",
        fit: "Petite",
        size: "XXS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Black",
        fit: "Petite",
        size: "XS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Black",
        fit: "Petite",
        size: "S",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Black",
        fit: "Petite",
        size: "M",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Black",
        fit: "Petite",
        size: "L",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Black",
        fit: "Petite",
        size: "XL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Black",
        fit: "Petite",
        size: "XXL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Black",
        fit: "Tall",
        size: "XXS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Black",
        fit: "Tall",
        size: "XS",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Black",
        fit: "Tall",
        size: "S",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Black",
        fit: "Tall",
        size: "M",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Black",
        fit: "Tall",
        size: "L",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Black",
        fit: "Tall",
        size: "XL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
      {
        color: "Black",
        fit: "Tall",
        size: "XXL",
        images: [
          "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
        ],
      },
    ],
  },
  {
    name: "Amber",
    type: "Top",
    description: "The perfect basic long sleeve top that go with everything.",
    theme: "Fall/Winter",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Allia-suit-pant-top-amber.jpg",
    alt: "Long sleeve top.",
    price: 70,
    variants: [],
  },
  {
    name: "Ama",
    type: "Pant",
    description: "Light flared linen trousers.",
    theme: "Spring/Summer",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Ama-pant-Amy-blazer.jpg",
    alt: "Light flared linen trousers.",
    price: 70,
    variants: [],
  },
  {
    name: "Amber",
    type: "Jacket",
    description:
      "Light linen blazer. We have matching pant if you like full looks.",
    theme: "Spring/Summer",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Fall/Ama-pant-Amy-blazer.jpg",
    alt: "Linen blazer.",
    price: 70,
    variants: [],
  },
  {
    name: "Anna",
    type: "Top",
    description: "Cropped sleeveless turtleneck top.",
    theme: "Fall/Winter",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938798/Collection/Fall/Anna-top.jpg",
    alt: "Cropped sleeveless turtleneck top.",
    price: 60,
    variants: [],
  },
  {
    name: "Anita",
    type: "Jacket",
    description: "A fresh twist on a trench coat.",
    theme: "Fall/Winter",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938798/Collection/Fall/Anita-jacket.jpg",
    alt: "Collard long coat.",
    price: 260,
    variants: [],
  },
  {
    name: "Alexia",
    type: "Sweater",
    description: "A fresh twist on a trench coat.",
    theme: "Fall/Winter",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938797/Collection/Fall/Alexia-sweater.jpg",
    alt: "Woolen sweater.",
    price: 160,
    variants: [],
  },
  {
    name: "Alma",
    type: "Sweater",
    description: "A fresh twist on a trench coat.",
    theme: "Fall/Winter",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938797/Collection/Fall/Alma-sweater-jacket.jpg",
    alt: "Woolen sweater.",
    price: 150,
    variants: [],
  },
  {
    name: "Alma",
    type: "Jacket",
    description: "Elegant long coat. 100% virgin whool.",
    theme: "Fall/Winter",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938797/Collection/Fall/Alma-sweater-jacket.jpg",
    alt: "Woolen coat.",
    price: 260,
    variants: [],
  },
  {
    name: "Aria",
    type: "Dress",
    description: "A belted suit dress.",
    theme: "Fall/Winter",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938796/Collection/Fall/Aria-dress.jpg",
    alt: "A belted suit dress.",
    price: 150,
    variants: [],
  },
  {
    name: "Alba",
    type: "Sweater",
    description:
      "Warm and cozy sweater with rolled turtleneck. 100% virgin whool.",
    theme: "Fall/Winter",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938796/Collection/Fall/Alba-sweater.jpg",
    alt: "Woolen sweater.",
    price: 140,
    variants: [],
  },
  {
    name: "Maddison",
    type: "Jacket",
    description: "Elegant belted blazer. 100% virgin whool.",
    theme: "Fall/Winter",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938795/Collection/Fall/Maddison-jacket.jpg",
    alt: "Woolen blazer.",
    price: 260,
    variants: [],
  },
  {
    name: "Melissa",
    type: "Sweater",
    description: "Cozy and warm sweater. 100% virgin whool.",
    theme: "Fall/Winter",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938796/Collection/Fall/Melissa-sweater.jpg",
    alt: "Woolen sweater.",
    price: 160,
    variants: [],
  },
  {
    name: "Mei",
    type: "Jacket",
    description: "Elegant long coat. 100% ananas leather.",
    theme: "Fall/Winter",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938796/Collection/Fall/Mei-jacket.jpg",
    alt: "Long trench leather jacket.",
    price: 260,
    variants: [],
  },
  {
    name: "Maeva",
    type: "Sweater",
    description: "Stylish light sweater with cuff details. 100% virgin whool.",
    theme: "Fall/Winter",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938796/Collection/Fall/Maeva-sweater.jpg",
    alt: "Woolen sweater.",
    price: 140,
    variants: [],
  },
  {
    name: "Alireza",
    type: "Jacket",
    description: "Elegant long coat. 100% recycled cotton.",
    theme: "Fall/Winter",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938793/Collection/Fall/Alireza-jacket.jpg",
    alt: "Cotton trench coat.",
    price: 260,
    variants: [],
  },
  {
    name: "Andrea",
    type: "Sweater",
    description: "Cropped sweater. 100% virgin whool.",
    theme: "Fall/Winter",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938796/Collection/Fall/Andrea-sweater.jpg",
    alt: "Woolen cropped sweater.",
    price: 120,
    variants: [],
  },
  {
    name: "Valentina",
    type: "Pant",
    description:
      "Straight leg pant. Inspired by masculine suit pant those pant can be dressed up or down.",
    theme: "Fall/Winter",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938796/Collection/Fall/Valentina-pant.jpg",
    alt: "Straight leg pant.",
    price: 140,
    variants: [],
  },
  {
    name: "Juliana",
    type: "Sweater",
    description: "Woolen cardigan. 100% virgin whool.",
    theme: "Fall/Winter",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938796/Collection/Fall/Juliana-sweater.jpg",
    alt: "Woolen cardigan.",
    price: 150,
    variants: [],
  },
  {
    name: "Aude",
    type: "Sweater",
    description: "Cozy and comfy wollen V-neck sweater. 100% virgin whool.",
    theme: "Fall/Winter",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938796/Collection/Fall/Aude-sweater.jpg",
    alt: "Woolen sweater.",
    price: 260,
    variants: [],
  },
  {
    name: "Miko",
    type: "Jacket",
    description: "Elegant long coat. 100% virgin whool.",
    theme: "Fall/Winter",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938796/Collection/Fall/Miko-jacket.jpg",
    alt: "Woolen coat.",
    price: 260,
    variants: [],
  },
  {
    name: "Ama",
    type: "Pant",
    description: "Light flared linen trousers.",
    theme: "Spring/Summer",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Spring/Ama-pant-Amy-blazer.jpg",
    alt: "Light flared linen trousers.",
    price: 70,
    variants: [],
  },
  {
    name: "Amber",
    type: "Jacket",
    description:
      "Light linen blazer. We have matching pant if you like full looks.",
    theme: "Spring/Summer",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Spring/Ama-pant-Amy-blazer.jpg",
    alt: "Linen blazer.",
    price: 70,
    variants: [],
  },
  {
    name: "Olivia",
    type: "Dress",
    description: "Long flowy dress with original back.",
    theme: "Spring/Summer",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Spring/Olivia-dress.jpg",
    alt: "Long flowy dress.",
    price: 200,
    variants: [],
  },
  {
    name: "Aurora",
    type: "Skirt",
    description: "Long skirt with slit. Flowy and confortable.",
    theme: "Spring/Summer",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Spring/Aurora-skirt.jpg",
    alt: "Long skirt with slit.",
    price: 70,
    variants: [],
  },
  {
    name: "Dina",
    type: "Jumpsuit",
    description: "Square neck belted linen jumpsuit.",
    theme: "Spring/Summer",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Spring/Dina-jumpsuit.jpg",
    alt: "Linen jumpsuit.",
    price: 180,
    variants: [],
  },
  {
    name: "Chloé",
    type: "Blouse",
    description: "Feminine flowy wrap blouse.",
    theme: "Spring/Summer",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Spring/Chloé-blouse.jpg",
    alt: "Flowy blouse.",
    price: 70,
    variants: [],
  },
  {
    name: "Chloé",
    type: "Pants",
    description: "Feminine belted linen pants.",
    theme: "Spring/Summer",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Spring/Chloé-blouse.jpg",
    alt: "Belted linen pants.",
    price: 90,
    variants: [],
  },
  {
    name: "Dita",
    type: "Top",
    description: "One shoulder top.",
    theme: "Spring/Summer",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Spring/Dita-top-skirt.jpg",
    alt: "Flowy blouse.",
    price: 70,
    variants: [],
  },
  {
    name: "Dita",
    type: "Skirt",
    description: "Midi lenght skirt.",
    theme: "Spring/Summer",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Spring/Dita-top-skirt.jpg",
    alt: "Midi lenght skirt.",
    price: 70,
    variants: [],
  },
  {
    name: "Tamara",
    type: "Blouse",
    description: "Lace blouse.",
    theme: "Spring/Summer",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Spring/Tamara-blouse.jpg",
    alt: "Lace blouse.",
    price: 170,
    variants: [],
  },
  {
    name: "Charly",
    type: "Blouse",
    description: "Linen collared shirt.",
    theme: "Spring/Summer",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Spring/Charly-blouse.jpg",
    alt: "Linen collared shirt.",
    price: 170,
    variants: [],
  },
  {
    name: "Dahlia",
    type: "Dress",
    description: "Buttonned V-neck dress.",
    theme: "Spring/Summer",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Spring/Dahlia-dress.jpg",
    alt: "Buttonned V-neck dres.",
    price: 170,
    variants: [],
  },
  {
    name: "Rachel",
    type: "Dress",
    description: "Open back dress.",
    theme: "Spring/Summer",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Spring/Rachel-dress.jpg",
    alt: "Open back dress.",
    price: 170,
    variants: [],
  },
  {
    name: "Maryia",
    type: "Jacket",
    description: "Classic trench coat.",
    theme: "Spring/Summer",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Spring/Maryia-jacket.jpg",
    alt: "Trench coat.",
    price: 170,
    variants: [],
  },
  {
    name: "Aleksandra",
    type: "Jacket",
    description: "Intemporal blazer jacket.",
    theme: "Spring/Summer",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Spring/Aleksandra-jacket.jpg",
    alt: "Blazer jacket.",
    price: 170,
    variants: [],
  },
  {
    name: "Cassandra",
    type: "Jacket",
    description: "Cropped blazer jacket.",
    theme: "Spring/Summer",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Spring/Cassandra-pant.jpg",
    alt: "Blazer jacket.",
    price: 170,
    variants: [],
  },
  {
    name: "Cassandra",
    type: "Pant",
    description: "Suit pant with side slits.",
    theme: "Spring/Summer",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Spring/Cassandra-pant.jpg",
    alt: "Pants.",
    price: 170,
    variants: [],
  },
  {
    name: "Marie",
    type: "Jacket",
    description: "Long lightweight blazer jacket.",
    theme: "Spring/Summer",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Spring/Marie-jacket.jpg",
    alt: "Blazer jacket.",
    price: 170,
    variants: [],
  },
  {
    name: "Marie",
    type: "Pant",
    description: "Flowy suit pant.",
    theme: "Spring/Summer",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Spring/Marie-jacket.jpg",
    alt: "Pants.",
    price: 170,
    variants: [],
  },
  {
    name: "Victoria",
    type: "Jewellery",
    description: "Necklace.",
    theme: "Spring/Summer",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Spring/Victoria-necklace.jpg",
    alt: "Necklace.",
    price: 170,
    variants: [],
  },
  {
    name: "Isabella",
    type: "Jewellery",
    description: "Necklace.",
    theme: "Spring/Summer",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Spring/Isabella-necklaces.jpg",
    alt: "Necklace.",
    price: 170,
    variants: [],
  },
  {
    name: "Kateryna",
    type: "Jewellery",
    description: "Necklace.",
    theme: "Spring/Summer",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Spring/Kateryna-necklaces.jpg",
    alt: "Necklace.",
    price: 170,
    variants: [],
  },
  {
    name: "Mia",
    type: "Top",
    description: "Basic crop top.",
    theme: "Spring/Summer",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Spring/Mia-top.jpg",
    alt: "Basic crop top.",
    price: 70,
    variants: [],
  },
  {
    name: "Lilly",
    type: "Jewellery",
    description: "Necklace.",
    theme: "Spring/Summer",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Spring/Lilly-necklace.jpg",
    alt: "Necklace.",
    price: 170,
    variants: [],
  },
  {
    name: "Dare",
    type: "Dress",
    description: "Dress.",
    theme: "Party",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Party/Dare-dress.jpg",
    alt: "Dress.",
    price: 170,
    variants: [],
  },
  {
    name: "Nova",
    type: "Dress",
    description: "Dress.",
    theme: "Party",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Party/Nova-dress.jpg",
    alt: "Dress.",
    price: 170,
    variants: [],
  },
  {
    name: "Goldie",
    type: "Dress",
    description: "Dress.",
    theme: "Party",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Party/Goldie-dress.jpg",
    alt: "Dress.",
    price: 170,
    variants: [],
  },
  {
    name: "Glow",
    type: "Dress",
    description: "Dress.",
    theme: "Party",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Party/Glow-dress.jpg",
    alt: "Dress.",
    price: 170,
    variants: [],
  },
  {
    name: "Celeste",
    type: "Dress",
    description: "Dress.",
    theme: "Party",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Party/Celeste-dress.jpg",
    alt: "Dress.",
    price: 170,
    variants: [],
  },
  {
    name: "Wilder",
    type: "Blouse",
    description: "Blouse.",
    theme: "Party",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Party/Wilder-blouse.jpg",
    alt: "Blouse.",
    price: 170,
    variants: [],
  },
  {
    name: "Luna",
    type: "Jacket",
    description: "Jacket.",
    theme: "Party",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Party/Luna-jacket.jpg",
    alt: "Jacket.",
    price: 170,
    variants: [],
  },
  {
    name: "Honey",
    type: "Jewellery",
    description: "Earring.",
    theme: "Party",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Party/Honey-earring.jpg",
    alt: "Earring.",
    price: 170,
    variants: [],
  },
  {
    name: "Olya",
    type: "Jewellery",
    description: "Necklace.",
    theme: "Party",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Party/Olya-necklace.jpg",
    alt: "Necklace.",
    price: 170,
    variants: [],
  },
  {
    name: "Darling",
    type: "Jewellery",
    description: "Earring.",
    theme: "Party",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Party/Darling-earring.jpg",
    alt: "Earring.",
    price: 170,
    variants: [],
  },
  {
    name: "Sweetie",
    type: "Jewellery",
    description: "Earring.",
    theme: "Party",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Party/Sweetie-earring.jpg",
    alt: "Earring.",
    price: 170,
    variants: [],
  },
  {
    name: "Blaze",
    type: "Dress",
    description: "Dress.",
    theme: "Party",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Party/Blaze-dress.jpg",
    alt: "Dress.",
    price: 170,
    variants: [],
  },
  {
    name: "Dream",
    type: "Jewellery",
    description: "Earring.",
    theme: "Party",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Party/Dream-earring.jpg",
    alt: "Earring.",
    price: 170,
    variants: [],
  },
  {
    name: "Marisol",
    type: "Jewellery",
    description: "Earring.",
    theme: "Swimwear",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Swim/Marisol-earring.jpg",
    alt: "Earring.",
    price: 170,
    variants: [],
  },
  {
    name: "Rayna",
    type: "Swimsuit",
    description: "Swimsuit.",
    theme: "Swimwear",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Swim/Rayna-Swimsuit.jpg",
    alt: "Swimsuit.",
    price: 170,
    variants: [],
  },
  {
    name: "Nami",
    type: "Swimsuit",
    description: "Swimsuit.",
    theme: "Swimwear",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Swim/Nami-Swimsuit.jpg",
    alt: "Swimsuit.",
    price: 170,
    variants: [],
  },
  {
    name: "Nami",
    type: "Swimsuit",
    description: "Swimsuit.",
    theme: "Swimwear",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Swim/Nami-Swimsuit.jpg",
    alt: "Swimsuit.",
    price: 170,
    variants: [],
  },
  {
    name: "Tansy",
    type: "Jewellery",
    description: "Necklaces.",
    theme: "Swimwear",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Swim/Tansy-necklaces.jpg",
    alt: "Necklaces.",
    price: 170,
    variants: [],
  },
  {
    name: "Oceana",
    type: "Jewellery",
    description: "Necklaces.",
    theme: "Swimwear",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Swim/Oceana-necklaces.jpg",
    alt: "Necklaces.",
    price: 170,
    variants: [],
  },
  {
    name: "Solana",
    type: "Swimsuit",
    description: "One-shoulder swimsuit.",
    theme: "Swimwear",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Swim/Solana-swimsuit.jpg",
    alt: "Swimsuit.",
    price: 170,
    variants: [],
  },
  {
    name: "Kailani",
    type: "Swimsuit",
    description: "Thin strap bikini.",
    theme: "Swimwear",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Swim/Kailani-swimsuit.jpg",
    alt: "Swimsuit.",
    price: 170,
    variants: [],
  },
  {
    name: "Kalypso",
    type: "Swimsuit",
    description: "Cut out swimsuit.",
    theme: "Swimwear",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Swim/Kalypso-swimsuit.jpg",
    alt: "Swimsuit.",
    price: 170,
    variants: [],
  },
  {
    name: "Paloma",
    type: "Swimsuit",
    description: "Square neck swimsuit.",
    theme: "Swimwear",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Swim/Paloma-swimsuit.jpg",
    alt: "Swimsuit.",
    price: 170,
    variants: [],
  },
  {
    name: "Sunny",
    type: "Swimsuit",
    description: "Cut out straps swimsuit.",
    theme: "Swimwear",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Swim/Sunny-swimsuit.jpg",
    alt: "Swimsuit.",
    price: 170,
    variants: [],
  },
  {
    name: "Tahlia",
    type: "Swimsuit",
    description: "Deep V-neck swimsuit.",
    theme: "Swimwear",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Swim/Tahlia-swimsuit.jpg",
    alt: "Swimsuit.",
    price: 170,
    variants: [],
  },
  {
    name: "Helia",
    type: "Swimsuit",
    description: "Bandeau swimsuit.",
    theme: "Swimwear",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Swim/Helia-swimsuit.jpg",
    alt: "Swimsuit.",
    price: 170,
    variants: [],
  },
  {
    name: "Coral",
    type: "Swimsuit",
    description: "Backless swimsuit.",
    theme: "Swimwear",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Swim/Coral-swimsuit.jpg",
    alt: "Swimsuit.",
    price: 170,
    variants: [],
  },
  {
    name: "Jennie",
    type: "Jewellery",
    description: "Earring.",
    theme: "Swimwear",
    image:
      "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938799/Collection/Swim/Jennie-earring.jpg",
    alt: "Earring.",
    price: 170,
    variants: [],
  },
];
async function seed() {
  for (const product of products) {
    const newProduct = new Product(product);
    await newProduct.save();

    for (const variant of product.variants) {
      const newVariant = new Product_Variant({
        product_id: newProduct._id,
        ...variant,
      });
      await newVariant.save();
    }
  }

  console.log("Database seeded successfully");
  mongoose.disconnect();
}

seed();
