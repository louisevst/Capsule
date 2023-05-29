<template>
  <main class="2xl:pt-28">
    <h2 class="font-title text-xs-xlheadline lg:text-xlheadline text-center">
      {{ category }}
    </h2>
    <nav>
      <ul
        class="border-y border-notBlack overflow-auto whitespace-nowrap flex justify-center items-center"
      >
        <li
          :class="{
            ' underline underline-offset-2': category === 'All',
          }"
          class="p-4 inline-block"
        >
          <router-link :to="`/category/All`"> All the collection </router-link>
        </li>
        <li
          v-for="cat in categories"
          :key="cat"
          :class="{
            ' underline underline-offset-2': cat === category,
          }"
          class="p-4 inline-block"
        >
          <router-link :to="`/category/${cat}`">{{ cat }}</router-link>
        </li>
      </ul>
    </nav>
    <ul class="grid grid-cols-2 lg:grid-cols-4">
      <li v-for="product in filteredProducts" :key="product._id">
        <Product
          :onClick="() => navigateToProductDetails(product._id)"
          :name="product.name"
          :description="product.alt"
          :price="typeof product.price === 'number' ? product.price : 0"
          :colors="product.colors"
          :image="product.image"
          :productId="product._id"
        />
      </li>
    </ul>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IProduct, Type } from "../types/Product";
import Product from "../components/Product.vue";

export default defineComponent({
  name: "Category",
  components: { Product },
  data() {
    return {
      categories: [] as Array<Type>,
      products: [] as Array<IProduct>,
    };
  },
  computed: {
    category(): Type {
      return this.$route.params.slug as Type;
    },
    filteredProducts(): Array<IProduct> {
      if (this.category === "All") {
        return this.products;
      } else
        return this.products.filter(
          (product) => product.type === this.category
        );
    },
  },
  mounted() {
    this.fetchCategoryProducts();
  },
  methods: {
    async fetchCategoryProducts() {
      try {
        const response = await fetch("http://localhost:8000/api/product");
        const data = await response.json();

        this.products = data.products;
        this.categories = Array.from(
          new Set(this.products.map((product) => product.type))
        );
      } catch (error) {
        console.error(error);
      }
    },
    navigateToProductDetails(productId: string) {
      this.$router.push({ name: "product", params: { id: productId } });
    },
  },
});
</script>
