<template>
  <Loader :isFetching="loading" />
  <main class="2xl:pt-28 pt-20 xl:pt-24">
    <h2 class="font-title text-xs-xlheadline lg:text-xlheadline text-center">
      {{
        category === "All"
          ? "All the collection"
          : category === "TopBlouse"
          ? "Tops & Blouses"
          : category === "DressJumpsuit"
          ? "Dresses & Jumpsuits"
          : category === "PantSkirt"
          ? "Pants & Skirts"
          : category === "Jewellery"
          ? category
          : `${category}s`
      }}
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
          <router-link :to="`/products/category/All`"> All </router-link>
        </li>
        <li
          :class="{
            ' underline underline-offset-2': category === 'TopBlouse',
          }"
          class="p-4 inline-block"
        >
          <router-link :to="`/products/category/TopBlouse`">
            Tops & Blouses
          </router-link>
        </li>
        <li
          :class="{
            ' underline underline-offset-2': category === 'PantSkirt',
          }"
          class="p-4 inline-block"
        >
          <router-link :to="`/products/category/PantSkirt`">
            Pants & Skirts
          </router-link>
        </li>
        <li
          :class="{
            ' underline underline-offset-2': category === 'DressJumpsuit',
          }"
          class="p-4 inline-block"
        >
          <router-link :to="`/products/category/DressJumpsuit`">
            Dresses & Jumpsuits
          </router-link>
        </li>
        <li
          :class="{
            ' underline underline-offset-2': category === 'Swimsuit',
          }"
          class="p-4 inline-block"
        >
          <router-link :to="`/products/category/Swimsuit`">
            Swimsuits
          </router-link>
        </li>
        <li
          :class="{
            ' underline underline-offset-2': category === 'Sweater',
          }"
          class="p-4 inline-block"
        >
          <router-link :to="`/products/category/Sweater`">
            Sweaters
          </router-link>
        </li>
        <li
          :class="{
            ' underline underline-offset-2': category === 'Jacket',
          }"
          class="p-4 inline-block"
        >
          <router-link :to="`/products/category/Jacket`"> Jackets </router-link>
        </li>
        <li
          :class="{
            ' underline underline-offset-2': category === 'Jewellery',
          }"
          class="p-4 inline-block"
        >
          <router-link :to="`/products/category/Jewellery`">
            Jewellery
          </router-link>
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
      loading: true,
      categories: [] as Array<Type>,
      products: [] as Array<IProduct>,
    };
  },
  computed: {
    category(): String {
      return this.$route.params.slug as String;
    },
    filteredProducts(): Array<IProduct> {
      switch (this.category) {
        case "All":
          return this.products;
        case "PantSkirt":
          return this.products.filter(
            (product) => product.type === "Pant" || product.type === "Skirt"
          );
        case "TopBlouse":
          return this.products.filter(
            (product) => product.type === "Top" || product.type === "Blouse"
          );
        case "DressJumpsuit":
          return this.products.filter(
            (product) => product.type === "Dress" || product.type === "Jumpsuit"
          );
        default:
          return this.products.filter(
            (product) => product.type === this.category
          );
      }
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
        console.log(this.products);
        this.categories = Array.from(
          new Set(this.products.map((product) => product.type))
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
