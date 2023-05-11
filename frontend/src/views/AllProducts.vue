<template>
  <div
    class="h-screen w-screen top-0 bg-black/80 absolute"
    :class="showFilters ? 'absolute' : 'hidden'"
    @click="toggleFilters()"
  ></div>
  <div class="text-notBlack font-text text-body">
    <h1
      class="font-title text-xs-xlheadline lg:text-xlheadline text-center pt-20"
    >
      {{ type === "all" ? "All the collection" : type }}
    </h1>
    <p class="text-center py-4">
      We have everything you need to build the perfect capsule wardrobe.
    </p>
    <div class="border-y border-notBlack overflow-auto whitespace-nowrap">
      <button
        @click="categorizeProducts('all')"
        :class="{ ' underline underline-offset-2': type === 'all' }"
        class="p-4 inline-block"
      >
        All
      </button>
      <button
        @click="categorizeProducts('Swimsuit')"
        :class="{ ' underline underline-offset-2': type === 'Swimsuit' }"
        class="p-4 inline-block"
      >
        Swimsuit
      </button>
      <button
        @click="categorizeProducts('Jewellery')"
        :class="{ ' underline underline-offset-2': type === 'Jewellery' }"
        class="p-4 inline-block"
      >
        Jewellery
      </button>
      <button
        @click="categorizeProducts('Blouse')"
        :class="{ ' underline underline-offset-2': type === 'Blouse' }"
        class="p-4 inline-block"
      >
        Blouse & Tops
      </button>
      <button
        @click="categorizeProducts('Jacket')"
        :class="{ ' underline underline-offset-2': type === 'Jacket' }"
        class="p-4 inline-block"
      >
        Jackets
      </button>
      <button
        @click="categorizeProducts('Dress')"
        :class="{ ' underline underline-offset-2': type === 'Dress' }"
        class="p-4 inline-block"
      >
        Dress
      </button>
    </div>
    <div class="grid grid-cols-2">
      <button class="border-b border-l border-notBlack p-2">Sort</button>
      <div
        v-if="isReadyToRender"
        class="border-b border-r border-l border-notBlack p-2 w-full"
      >
        <Filter
          :types="types"
          :colors="colors"
          :toggleFilter="toggleFilters"
          :showFilter="showFilters"
        />
      </div>
    </div>
    <div>
      <section class="grid grid-cols-2 lg:grid-cols-4">
        <div v-for="product in filteredProducts" :key="product._id">
          <Product
            :name="product.name"
            :description="product.alt"
            :price="typeof product.price === 'number' ? product.price : 0"
            :colors="getColorDetails(product._id).colors"
            :image="product.image"
            :productId="product._id"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Product from "../components/Product.vue";
import Filter from "../components/Filter.vue";
import { ref } from "vue";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  type: string;
  alt: string;
}
interface Details {
  id: string;
  product_id: string;
  images: Array<string>;
  fit: string;
  size: string;
  color: string;
}
interface colorsDetails {
  id: string;
  colors: string[];
}
interface AllColors {
  [productId: string]: string[];
}

export default defineComponent({
  components: { Product, Filter },
  data() {
    let showFilters = ref(false);
    return {
      showFilters,
      products: [] as Product[],
      filteredProducts: [] as Product[],
      productDetails: [] as Details[],
      colorDetails: [] as colorsDetails[],
      type: "all",
      isDataFetched: false,
      isDataDetailsFetched: false,
      colors: [],
      types: [],
    };
  },
  mounted() {
    this.fetchProducts();
  },
  computed: {
    isReadyToRender() {
      return this.isDataFetched;
    },
  },
  methods: {
    toggleFilters() {
      this.showFilters = !this.showFilters;
      if (this.showFilters) {
        document.body.classList.add("no-scroll");
      } else {
        document.body.classList.remove("no-scroll");
      }
    },
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

        this.filteredProducts = data;

        data.forEach((item: Product) => {
          if (!this.types.includes(item.type)) {
            this.types.push(item.type);
          }
        });

        this.isDataFetched = true;
      } catch (error) {
        console.log(error);
      }
      try {
        const response = await fetch("http://localhost:8000/api/details/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        this.productDetails = data;

        // create a new array of objects containing the product id and all colors available for that product
        const allColors: AllColors = {};

        data.forEach((detail: Details) => {
          const { product_id, color } = detail;
          if (!allColors[product_id]) {
            allColors[product_id] = [];
          }
          if (!allColors[product_id].includes(color)) {
            allColors[product_id].push(color);
          }
        });
        this.colorDetails = Object.entries(allColors).map(([id, colors]) => ({
          id,
          colors,
        }));
        // Combine all unique colors into one final array
        this.colorDetails.forEach((item) => {
          item.colors.forEach((color) => {
            if (!this.colors.includes(color)) {
              this.colors.push(color);
            }
          });
        });
        console.log(this.colors);
        this.isDataDetailsFetched = true;
      } catch (error) {
        console.log(error);
      }
    },
    getColorDetails(productId: string): colorsDetails {
      if (this.colorDetails.length === 0) {
        return { id: productId, colors: [] };
      }

      const details: colorsDetails | undefined = this.colorDetails.find(
        (detail: colorsDetails) => detail.id === productId
      );

      if (!details) {
        return { id: productId, colors: [] };
      }

      const capitalizedColors = details.colors.map((color) =>
        color.replace(/^\w/, (c) => c.toUpperCase())
      );

      return { id: details.id, colors: capitalizedColors };
    },
    //All Swimsuit blouses
    categorizeProducts(type: string): void {
      try {
        if (type === "all") {
          this.filteredProducts = this.products;
        } else {
          this.filteredProducts = this.products.filter(
            (product: Product) => product.type === type
          );
          this.type = type;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>
