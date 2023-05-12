<template>
  <div
    class="h-screen w-screen bg-black/80 absolute"
    :class="showFilters ? 'absolute' : 'hidden'"
    @click="toggleFilters()"
  ></div>
  <div class="text-notBlack font-text text-body">
    <h1
      class="font-title text-xs-xlheadline lg:text-xlheadline text-center pt-20"
    >
      {{
        type.length === 0 || type.includes("all")
          ? "All the collection"
          : type.length > 1
          ? type.join(" & ")
          : type.toString()
      }}
    </h1>
    <p class="text-center py-4">
      We have everything you need to build the perfect capsule wardrobe.
    </p>
    <div class="border-y border-notBlack overflow-auto whitespace-nowrap">
      <button
        @click="categorizeProducts('all')"
        :class="{
          ' underline underline-offset-2':
            type.includes('all') || type.length === 0,
        }"
        class="p-4 inline-block"
      >
        All
      </button>
      <button
        @click="categorizeProducts('Swimsuit')"
        :class="{ ' underline underline-offset-2': type.includes('Swimsuit') }"
        class="p-4 inline-block"
      >
        Swimsuit
      </button>
      <button
        @click="categorizeProducts('Jewellery')"
        :class="{ ' underline underline-offset-2': type.includes('Jewellery') }"
        class="p-4 inline-block"
      >
        Jewellery
      </button>
      <button
        @click="categorizeProductsWithTwoTypes('Blouse', 'Top')"
        :class="{
          ' underline underline-offset-2':
            type.includes('Blouse') || type.includes('Top'),
        }"
        class="p-4 inline-block"
      >
        Blouse & Tops
      </button>
      <button
        @click="categorizeProducts('Jacket')"
        :class="{ ' underline underline-offset-2': type.includes('Jacket') }"
        class="p-4 inline-block"
      >
        Jackets
      </button>
      <button
        @click="categorizeProductsWithTwoTypes('Pant', 'Skirt')"
        :class="{
          ' underline underline-offset-2':
            type.includes('Pant') || type.includes('Skirt'),
        }"
        class="p-4 inline-block"
      >
        Pants & Skirt
      </button>
      <button
        @click="categorizeProducts('Sweater')"
        :class="{ ' underline underline-offset-2': type.includes('Sweater') }"
        class="p-4 inline-block"
      >
        Sweaters
      </button>
      <button
        @click="categorizeProductsWithTwoTypes('Dress', 'Jumpsuit')"
        :class="{
          ' underline underline-offset-2':
            type.includes('Dress') || type.includes('Jumpsuit'),
        }"
        class="p-4 inline-block"
      >
        Dress & Jumpsuits
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
          @colorSelected="handleColorSelected"
          @typeSelected="handleTypeSelected"
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
  colors: Array<string>;
  sizes: Array<string>;
  fits: Array<string>;
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
      type: [] as string[],
      isDataFetched: false,
      isDataDetailsFetched: false,
      colors: [] as string[],
      types: [] as string[],
      selectedColor: [] as string[],
      selectedType: [] as string[],
    };
  },
  mounted() {
    this.fetchProducts();
  },
  computed: {
    isReadyToRender() {
      return this.isDataFetched;
    },

    // filteredProducts() {
    //   if (this.selectedColor.length === 0 && this.selectedType.length === 0) {
    //     return this.products;
    //   }
    //   return this.products.filter((product) => {
    //     const matchColor =
    //       this.selectedColor.length === 0 ||
    //       product.color === this.selectedColor;
    //     const matchType =
    //       this.selectedType.length === 0 ||
    //       this.selectedType.includes(product.type);
    //     return matchColor && matchType;
    //   });
    // },
  },
  emits: ["colorSelected", "typeSelected"],
  methods: {
    handleColorSelected(color: string) {
      console.log(color);
      this.selectedColor = [color.toLowerCase()];
      this.filterProductsByColor(this.type[0]);
    },
    handleTypeSelected(type: string) {
      console.log(type);
      this.selectedType = [type];
      this.type = [type];
      this.categorizeProducts(type);
    },
    filterProductsByColor(type?: string) {
      if (this.selectedColor.length > 0) {
        this.filteredProducts = this.products.filter((product) => {
          const matchesColor = product.colors.includes(this.selectedColor[0]);
          const matchesType = type ? product.type === type : true;
          return matchesColor && matchesType;
        });
      } else {
        this.filteredProducts = this.products;
      }
    },

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

        // Create a new object containing the product id and all details available for that product
        const allDetails: { [key: string]: any } = {};

        this.productDetails.forEach((detail: any) => {
          const { product_id, size, fit, color } = detail;
          if (!allDetails[product_id]) {
            allDetails[product_id] = {
              sizes: [],
              fits: [],
              colors: [],
            };
          }
          if (!allDetails[product_id].sizes.includes(size.toLowerCase())) {
            allDetails[product_id].sizes.push(size.toLowerCase());
          }
          if (!allDetails[product_id].fits.includes(fit.toLowerCase())) {
            allDetails[product_id].fits.push(fit.toLowerCase());
          }
          if (!allDetails[product_id].colors.includes(color.toLowerCase())) {
            allDetails[product_id].colors.push(color.toLowerCase());
          }
        });

        // Add corresponding arrays of fits, sizes, and colors for each product
        this.products.forEach((product: any) => {
          const id = product._id;

          if (allDetails[id]) {
            product.sizes = allDetails[id].sizes;
            product.fits = allDetails[id].fits;
            product.colors = allDetails[id].colors;
          }
        });
        console.log(this.products);

        // create a new array of objects containing the product id and all colors available for that product
        const allColors: AllColors = {};

        data.forEach((detail: Details) => {
          const { product_id, color } = detail;
          if (!allColors[product_id]) {
            allColors[product_id] = [];
          }
          const formattedColor = color
            .toLowerCase()
            .replace(/\b\w/g, (l) => l.toUpperCase());
          if (!allColors[product_id].includes(formattedColor)) {
            allColors[product_id].push(formattedColor);
          }
        });
        this.colorDetails = Object.entries(allColors).map(([id, colors]) => ({
          id,
          colors,
        }));
        // Combine all unique colors into one final array
        this.colorDetails.forEach((item) => {
          item.colors.forEach((color) => {
            const formattedColor = color
              .toLowerCase()
              .replace(/\b\w/g, (l) => l.toUpperCase());
            if (!this.colors.includes(formattedColor)) {
              this.colors.push(formattedColor);
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
          this.type = [type];
        } else {
          this.filteredProducts = this.products.filter(
            (product: Product) => product.type === type
          );
          this.type = [type];
        }
      } catch (error) {
        console.log(error);
      }
    },
    categorizeProductsWithTwoTypes(type1: string, type2: string): void {
      try {
        if (type1 === "all" && type2 === "all") {
          this.filteredProducts = this.products;
          this.type = [type1];
        } else {
          this.filteredProducts = this.products.filter(
            (product: Product) =>
              product.type === type1 || product.type === type2
          );
          this.type = [type1, type2];
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>
