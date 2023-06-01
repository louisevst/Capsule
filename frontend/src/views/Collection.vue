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
          @click="updateFilteredProducts()"
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
    <FilterProducts
      @filter-applied="updateFilteredProducts($event)"
      :availableColors="availableColors"
      :availableCategories="availableCategories"
    />

    <ul class="grid grid-cols-2 lg:grid-cols-4">
      <li
        v-for="product in filterProducts.length > 0
          ? filterProducts
          : filteredProducts"
        :key="product._id"
        v-if="!loading"
      >
        <Product
          :onClick="() => navigateToProductDetails(product._id)"
          :name="product.name"
          :description="product.alt"
          :price="typeof product.price === 'number' ? product.price : 0"
          :colors="product.colors"
          :image="product.image"
          :productId="product._id"
          :is-liked="isProductLiked(product._id)"
        />
      </li>
    </ul>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IProduct, Theme, IWishlist, Type, Color } from "../types/Product";
import Product from "../components/Product.vue";
import Loader from "../components/Loader.vue";
import FilterProducts from "../components/FilterProducts.vue";

export default defineComponent({
  name: "Collection",
  components: { Product, Loader, FilterProducts },
  data() {
    const userId: string = this.$cookies.get("id") || "";
    return {
      loading: true,
      collections: [] as Array<Theme>,
      availableCategories: [] as Array<Type>,
      availableColors: [] as Array<Color>,
      products: [] as Array<IProduct>,
      wishlist: [] as unknown as IWishlist,
      user_id: userId,
      filterProducts: [] as Array<IProduct>,
    };
  },
  computed: {
    collection(): String {
      return this.$route.params.slug as String;
    },
    filteredProducts(): Array<IProduct> {
      let filteredProducts: Array<IProduct>;

      if (this.collection === "All") {
        filteredProducts = this.products;
      } else {
        filteredProducts = this.products.filter(
          (product) => product.theme === this.collection
        );
      }

      // Update available colors based on the filtered products
      const colors = Array.from(
        new Set(filteredProducts.flatMap((product) => product.colors))
      );
      this.availableColors = colors.map((color) => {
        switch (color) {
          // Map color values to display strings if needed
          default:
            return color;
        }
      });

      // Update available categories based on the filtered products
      const categories = Array.from(
        new Set(filteredProducts.flatMap((product) => product.type))
      );
      this.availableCategories = categories.map((category) => {
        switch (category) {
          // Map category values to display strings if needed
          default:
            return category;
        }
      });

      return filteredProducts;
    },
  },
  mounted() {
    this.fetchCategoryProducts();
    this.fetchWishlist();
  },
  methods: {
    updateFilteredProducts(filterCriteria?: any) {
      if (!filterCriteria) {
        this.filterProducts = []; // Reset the filterProducts array
        return; // Exit the method
      }

      // Apply the filter criteria to the list of products
      this.filterProducts = this.filteredProducts.filter((product) => {
        // Check if the product matches the selected filter criteria
        const colorMatch =
          filterCriteria.colors.length === 0 ||
          filterCriteria.colors.includes(product.colors);

        const collectionMatch =
          filterCriteria.collections.length === 0 ||
          filterCriteria.collections.includes(product.theme);
        const categoryMatch =
          filterCriteria.categories.length === 0 ||
          filterCriteria.categories.includes(product.type);

        // Return true if all criteria match
        return colorMatch && collectionMatch && categoryMatch;
      });

      // Check if the collection has changed
      const collectionChanged =
        this.collection !== filterCriteria.collections[0];

      if (collectionChanged) {
        // Update available colors based on the filtered products
        const colors = Array.from(
          new Set(this.filterProducts.flatMap((product) => product.colors))
        );
        this.availableColors = colors.map((color) => {
          // Map color values to display strings if needed
          switch (color) {
            default:
              return color;
          }
        });

        // Update available categories based on the filtered products
        const categories = Array.from(
          new Set(this.filteredProducts.flatMap((product) => product.type))
        );
        this.availableCategories = categories.map((category) => {
          // Map category values to display strings if needed
          switch (category) {
            default:
              return category;
          }
        });
      }
    },
    isProductLiked(productId: string): boolean {
      if (this.user_id !== "") {
        return this.wishlist.product_id.some(
          (product) => product._id === productId
        );
      } else return false;
    },

    async fetchWishlist() {
      try {
        if (this.user_id === "") {
          return;
        }
        const response = await fetch(
          `http://localhost:8000/api/wishlist/${this.user_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          console.log(data);
          this.wishlist = data[0];
          console.log(this.wishlist);
        } else {
          console.error("Failed to check wishlist:", response.statusText);
        }
      } catch (error) {
        console.log(error);
      }
    },
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
