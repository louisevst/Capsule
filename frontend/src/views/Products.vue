<template>
  <main class="text-notBlack font-text text-body">
    <h2>Products</h2>
    <ul>
      <section class="grid grid-cols-2 lg:grid-cols-4">
        <li v-if="!loading" v-for="product in products" :key="product._id">
          <Product
            :onClick="() => console.log(product._id)"
            :name="product.name"
            :description="product.alt"
            :price="typeof product.price === 'number' ? product.price : 0"
            :colors="product.colors"
            :image="product.image"
            :productId="product._id"
          />
        </li>
      </section>
    </ul>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IProduct } from "../types/Product"; // Import the Product interface or type
import Product from "../components/Product.vue";

export default defineComponent({
  name: "Pr",
  components: { Product },
  data() {
    return {
      loading: true,
      products: [] as Array<IProduct>, // Declare an empty array of products
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await fetch("http://localhost:8000/api/product");
        const data = await response.json();
        this.products = data.products;

        this.loading = false;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
</script>
