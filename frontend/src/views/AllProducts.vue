<template>
  <div>
    <h1>Products</h1>
    <div class="m-40">
      <button @click="filterProducts('all')">All</button>
      <button @click="filterProducts('Swimsuit')">Swimsuit</button>
      <button @click="filterProducts('Jewellery')">Jewellery</button>
      <button @click="filterProducts('Necklace')">Necklace</button>
    </div>
    <div>
      <section class="grid grid-cols-2 lg:grid-cols-4">
        <div v-for="product in filteredProducts" :key="product.id">
          <Product
            :name="product.name"
            :description="product.alt"
            :price="typeof product.price === 'number' ? product.price : 0"
            :colors="getProductColors(product.id)"
            :image="product.image"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Product from "../components/Product.vue";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  type: string;
  alt: string;
}
interface Details {
  id: number;
  product_id: number;
  images: Array<string>;
  fit: string;
  size: string;
  color: string;
}
interface colorDetails {
  colors: [];
}
export default defineComponent({
  components: { Product },
  data() {
    return {
      products: [] as Product[],
      filteredProducts: [] as Product[],
      productDetails: [] as Details[],
      colorDetails: [] as colorDetails[],
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await fetch("http://localhost:8000/api/product", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        this.products = data
          .filter((item: Product) => item.type !== undefined)
          .sort((a: Product, b: Product) => a.type.localeCompare(b.type));
        console.log(this.products);
        this.filteredProducts = data;
      } catch (error) {
        console.log(error);
        // notify(
        //   {
        //     group: "bottom",
        //     title: "Error",
        //     text: "Failed to fetch products.",
        //   },
        //   4000
        // );
      }
      try {
        const response = await fetch(
          "http://localhost:8000/api/product/details",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        this.productDetails = data;
        this.colorDetails = data;
      } catch (error) {
        console.log(error);
      }
    },

    getProductColors(id: number): string[] {
      const productDetails = this.productDetails.filter(
        (product) => product.product_id === id
      );
      const colors = productDetails.map((product) => product.color);
      console.log(colors);
      return colors;
    },

    filterProducts(type: string): void {
      try {
        if (type === "all") {
          this.filteredProducts = this.products;
        } else {
          this.filteredProducts = this.products.filter(
            (product: Product) => product.type === type
          );
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>
