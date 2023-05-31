<template>
  <Loader :isFetching="loading" />
  <main class="2xl:pt-28 pt-20 xl:pt-24">
    <h2 class="font-title text-xs-xlheadline lg:text-xlheadline text-center">
      {{
        collection === "All"
          ? "All the collection"
          : collection === "Fall/Winter"
          ? "Sweater Weather"
          : collection === "Spring/Summer"
          ? "Spring Vibes"
          : collection === "Party"
          ? "Party Time"
          : collection === "Swimwear"
          ? "Beach Wear"
          : `${collection}`
      }}
    </h2>
    <nav>
      <ul
        class="border-y border-notBlack overflow-auto whitespace-nowrap flex justify-center items-center"
      >
        <li
          :class="{
            ' underline underline-offset-2': collection === 'All',
          }"
          class="p-4 inline-block"
        >
          <router-link :to="`/products/collection/All`">
            All the collections
          </router-link>
        </li>
        <li
          :key="cat"
          v-for="cat in collections"
          :class="{
            ' underline underline-offset-2': cat === collection,
          }"
          class="p-4 inline-block"
        >
          <router-link :to="`/products/collection/${encodeURIComponent(cat)}`">
            {{
              cat === "All"
                ? "All the collection"
                : cat === "Fall/Winter"
                ? "Sweater Weather"
                : cat === "Spring/Summer"
                ? "Spring Vibes"
                : cat === "Party"
                ? "Party Time"
                : cat === "Swimwear"
                ? "Beach Wear"
                : `${cat}`
            }}</router-link
          >
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
import { IProduct, Theme } from "../types/Product";
import Product from "../components/Product.vue";
import Loader from "../components/Loader.vue";

export default defineComponent({
  name: "Collection",
  components: { Product, Loader },
  data() {
    return {
      loading: true,
      collections: [] as Array<Theme>,
      products: [] as Array<IProduct>,
    };
  },
  computed: {
    collection(): String {
      return this.$route.params.slug as String;
    },
    filteredProducts(): Array<IProduct> {
      if (this.collection === "All") {
        return this.products;
      } else
        return this.products.filter(
          (product) => product.theme === this.collection
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
        this.collections = Array.from(
          new Set(this.products.map((product) => product.theme))
        );
        this.loading = false;
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
