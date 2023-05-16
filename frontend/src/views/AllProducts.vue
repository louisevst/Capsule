<template>
  <div
    class="h-screen w-screen bg-black/80 absolute"
    :class="showFilters ? 'absolute' : 'hidden'"
    @click="toggleFilters()"
  ></div>
  <main class="text-notBlack font-text text-body">
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
    <section
      class="border-y border-notBlack overflow-auto whitespace-nowrap flex justify-center items-center"
    >
      <button
        @click="changeCat(['all'])"
        :class="{
          ' underline underline-offset-2':
            type.includes('all') || type.length === 0,
        }"
        class="p-4 inline-block"
      >
        All
      </button>
      <button
        @click="changeCat(['Swimsuit'])"
        :class="{ ' underline underline-offset-2': type.includes('Swimsuit') }"
        class="p-4 inline-block"
      >
        Swimsuit
      </button>
      <button
        @click="changeCat(['Jewellery'])"
        :class="{ ' underline underline-offset-2': type.includes('Jewellery') }"
        class="p-4 inline-block"
      >
        Jewellery
      </button>
      <button
        @click="changeCat(['Blouse', 'Top'])"
        :class="{
          ' underline underline-offset-2':
            type.includes('Blouse') || type.includes('Top'),
        }"
        class="p-4 inline-block"
      >
        Blouse & Tops
      </button>
      <button
        @click="changeCat(['Jacket'])"
        :class="{ ' underline underline-offset-2': type.includes('Jacket') }"
        class="p-4 inline-block"
      >
        Jackets
      </button>
      <button
        @click="changeCat(['Pant', 'Skirt'])"
        :class="{
          ' underline underline-offset-2':
            type.includes('Pant') || type.includes('Skirt'),
        }"
        class="p-4 inline-block"
      >
        Pants & Skirt
      </button>
      <button
        @click="changeCat(['Sweater'])"
        :class="{ ' underline underline-offset-2': type.includes('Sweater') }"
        class="p-4 inline-block"
      >
        Sweaters
      </button>
      <button
        @click="changeCat(['Dress', 'Jumpsuit'])"
        :class="{
          ' underline underline-offset-2':
            type.includes('Dress') || type.includes('Jumpsuit'),
        }"
        class="p-4 inline-block"
      >
        Dress & Jumpsuits
      </button>
    </section>
    <div class="grid grid-cols-2">
      <button
        class="border-b border-l border-r border-notBlack p-2 relative flex justify-center w-full items-center"
        @click="showSort()"
      >
        Sort by <img :src="expandMore" alt="Sort by." class="w-6 h-6" />
      </button>
      <div
        :class="sort ? 'absolute w-1/2 border text-center mt-14 ' : 'hidden'"
      >
        <div
          @click="sortProducts('ascending')"
          class="bg-notWhite cursor-pointer"
        >
          Low to high
        </div>
        <div
          @click="sortProducts('descending')"
          class="bg-notWhite cursor-pointer"
        >
          High to low
        </div>
      </div>
      <div
        v-if="isReadyToRender"
        class="border-b border-r border-notBlack p-2 w-full"
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
    <div v-if="isReadyToRender">
      <section class="grid grid-cols-2 lg:grid-cols-4">
        <div v-for="product in filteredProducts" :key="product._id">
          <Product
            :onClick="() => navigateToProductDetails(product._id)"
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
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Product from "../components/Product.vue";
import Filter from "../components/Filter.vue";
import { ref } from "vue";
import expandMore from "../assets/expand_more.svg";

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
  props: {
    cat: {
      type: Array<string>,
      required: true,
    },
  },
  watch: {
    cat(cat) {
      console.log(cat);
      this.categorizeProducts(cat);
    },
  },
  components: { Product, Filter },
  data() {
    let showFilters = ref(false);
    return {
      expandMore,
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
      sortOrder: "",
      sort: false,
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
  emits: ["colorSelected", "typeSelected"],
  methods: {
    showSort() {
      this.sort = !this.sort;
    },
    changeCat(category: string[]) {
      console.log(this.types, category);
      this.categorizeProducts(category);
    },
    handleColorSelected(color: string) {
      console.log(color);
      this.selectedColor = [color.toLowerCase()];
      this.filterProductsByColor();
    },
    handleTypeSelected(type: string) {
      console.log(type);
      this.selectedType = [type];
      this.type = [type];
      this.categorizeProducts(this.type);
    },
    filterProductsByColor() {
      if (this.types.length > 0) {
        if (this.types.includes("all")) {
          this.filteredProducts = this.products;
          this.type = ["all"];
        } else {
          this.filteredProducts = this.products.filter((product: Product) =>
            this.types.includes(product.type)
          );
          this.type = this.types;
        }
      }
      if (this.selectedColor.length > 0) {
        this.filteredProducts = this.filteredProducts.filter((product) => {
          return product.colors.includes(this.selectedColor[0]);
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
    categorizeProducts(types: string[]): void {
      try {
        console.log(types);
        if (types.length < 1) {
          console.log(this.type);
          this.$router.push(`/products/${types.join("")}`);
        } else this.$router.push(`/products/${types[0]}`);
        if (types.includes("all")) {
          this.filteredProducts = this.products;
          this.type = ["all"];
        } else {
          console.log(types);
          this.filteredProducts = [];
          this.type = [];
          types.forEach((type) => this.type.push(type));
          console.log(this.filteredProducts, this.type);
          // Loop through each product in the array
          this.products.forEach((product) => {
            // Check if the product's type is included in the selected types array
            if (types.includes(product.type)) {
              // If yes, add the product to the filtered products array
              this.filteredProducts.push(product);
            }
            return this.filteredProducts;
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    sortProducts(sort: string) {
      const products = [...this.filteredProducts];
      if (sort === "ascending") {
        return (this.filteredProducts = products.sort(
          (a, b) => a.price - b.price
        ));
      } else {
        return (this.filteredProducts = products.sort(
          (a, b) => b.price - a.price
        ));
      }
    },
    navigateToProductDetails(productId: string) {
      // Use the $router instance to programmatically navigate to the product details page
      this.$router.push({ name: "product", params: { id: productId } });
    },
  },
});
</script>
