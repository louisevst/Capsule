<template>
  <section
    class="relative w-full p-4 pb-8 h-full text-notBlack md:px-10 lg:px-20 2xl:px-40 lg:py-8 lg:pb-12"
    :class="class"
    data-carousel="slide"
  >
    <h4 class="text-xs-headline font-title lg:text-headline">{{ title }}</h4>
    <Loader :is-fetching="!isReady" />
    <ul
      class="overflow-hidden grid grid-cols-2 lg:grid-cols-4"
      v-if="products.length > 0"
    >
      <li
        v-for="(product, index) in products"
        :key="product._id"
        :class="{
          hidden:
            index < currentSlideIndex ||
            index >= currentSlideIndex + (isScreenSmaller ? 2 : 4),
        }"
        data-carousel-item
      >
        <Product
          :onClick="() => navigateToProductDetails(product._id)"
          :name="product.name"
          :description="product.alt"
          :price="product.price"
          :colors="product.colors"
          :image="product.image"
          :productId="product._id"
        />
      </li>
    </ul>
    <!-- Slider controls -->
    <button
      type="button"
      class="absolute top-0 left-0 z-30 flex items-center justify-center h-full cursor-pointer group focus:outline-none lg:ml-10 2xl:ml-20"
      data-carousel-prev
      @click="goToPreviousSlide"
    >
      <span
        class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-notWhite/50 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none"
        @click="goToPreviousSlide"
      >
        <svg
          aria-hidden="true"
          class="w-6 h-6 text-notBlack"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
        <span class="sr-only">Previous</span>
      </span>
    </button>
    <button
      type="button"
      class="absolute top-0 right-0 z-30 flex items-center justify-center h-full cursor-pointer group focus:outline-none lg:mr-10 2xr:ml-20"
      data-carousel-next
      @click="goToNextSlide"
    >
      <span
        class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-notWhite/50 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
        @click="goToNextSlide"
      >
        <svg
          aria-hidden="true"
          class="w-6 h-6 text-notBlack"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
        <span class="sr-only">Next</span>
      </span>
    </button>
  </section>
</template>

<script lang="ts">
import Product from "./Product.vue";
import { IProduct } from "../types/Product";
import Loader from "./Loader.vue";

export default {
  name: "YouMightLike",
  components: {
    Product,
    Loader,
  },
  props: {
    displayedProduct: {
      type: Object as () => IProduct | null,
      default: null,
    },
    class: { type: String, required: false },
    title: { type: String, required: true },
  },
  data() {
    return {
      isReady: false,
      screenWidth: window.innerWidth,
      products: [] as IProduct[],
      currentSlideIndex: 0,
    };
  },
  computed: {
    isScreenSmaller() {
      return this.screenWidth < 1024;
    },
  },
  mounted() {
    this.fetchFeaturedProducts();
    window.addEventListener("resize", this.handleResize);
  },
  destroyed() {
    // Clean up the event listener when the component is destroyed

    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    async fetchFeaturedProducts() {
      try {
        const response = await fetch(
          "https://capsule-wardrobe.onrender.com/api/product"
        );
        const data = await response.json();
        this.products = data.products.splice(0, 13);
        this.isReady = true;
      } catch (error) {
        console.error(error);
      }
    },
    navigateToProductDetails(productId: string) {
      this.$router.push({ name: "product", params: { id: productId } });
    },
    goToSlide(index: number) {
      this.currentSlideIndex = index;
    },
    goToPreviousSlide() {
      if (this.currentSlideIndex === 0) {
        this.currentSlideIndex =
          this.products.length - (this.isScreenSmaller ? 2 : 4);
      } else {
        this.currentSlideIndex--;
      }
    },
    goToNextSlide() {
      if (
        this.currentSlideIndex ===
        this.products.length - (this.isScreenSmaller ? 2 : 4)
      ) {
        this.currentSlideIndex = 0;
      } else {
        this.currentSlideIndex++;
      }
    },
    handleResize() {
      this.screenWidth = window.innerWidth;
    },
  },
};
</script>
