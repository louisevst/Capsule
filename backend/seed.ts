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
const products = [
  {
    type: "Blazer",
    description:
      "A classic blazer that will give an elevated look to any of your outfit.",
    theme: "Spring Vibes",
    image: "https://example.com/shirt.jpg",
    price: 100,
    variants: [
      {
        color: "Red",
        fit: "Regular",
        size: "M",
        images: ["https://example.com/tshirt-red.jpg"],
      },
      {
        color: "Blue",
        fit: "Regular",
        size: "M",
        images: ["https://example.com/tshirt-blue.jpg"],
      },
      {
        color: "Green",
        fit: "Slim",
        size: "L",
        images: ["https://example.com/tshirt-green.jpg"],
      },
    ],
  },
  {
    type: "Suit pants",
    description:
      "A pair of suit pants that fits just right. We have matching blazer if you like the full look.",
    theme: "Spring Vibes",
    image: "https://example.com/jeans.jpg",
    price: 89,
    variants: [
      {
        color: "Red",
        fit: "Regular",
        size: "M",
        images: ["https://example.com/tshirt-red.jpg"],
      },
      {
        color: "Blue",
        fit: "Regular",
        size: "M",
        images: ["https://example.com/tshirt-blue.jpg"],
      },
      {
        color: "Green",
        fit: "Slim",
        size: "L",
        images: ["https://example.com/tshirt-green.jpg"],
      },
    ],
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
