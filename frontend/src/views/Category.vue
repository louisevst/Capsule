<template>
  <main class="2xl:pt-28 pt-20 xl:pt-24 pb-8">
    <h2
      class="font-title text-xs-xlheadline lg:text-xlheadline text-center md:pb-4"
    >
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
          <router-link
            :to="`/products/category/All`"
            @click="
              updateFilteredProducts({ colors: [], categories: [] }, 'All')
            "
          >
            All
          </router-link>
        </li>
        <li
          :class="{
            ' underline underline-offset-2': category === 'TopBlouse',
          }"
          class="p-4 inline-block"
        >
          <router-link
            :to="`/products/category/TopBlouse`"
            @click="
              updateFilteredProducts(
                { colors: [], categories: [] },
                'TopBlouse'
              )
            "
          >
            Tops & Blouses
          </router-link>
        </li>
        <li
          :class="{
            ' underline underline-offset-2': category === 'PantSkirt',
          }"
          class="p-4 inline-block"
        >
          <router-link
            :to="`/products/category/PantSkirt`"
            @click="
              updateFilteredProducts(
                { colors: [], categories: [] },
                'PantSkirt'
              )
            "
          >
            Pants & Skirts
          </router-link>
        </li>
        <li
          :class="{
            ' underline underline-offset-2': category === 'DressJumpsuit',
          }"
          class="p-4 inline-block"
        >
          <router-link
            :to="`/products/category/DressJumpsuit`"
            @click="
              updateFilteredProducts(
                { colors: [], categories: [] },
                'DressJumpsuit'
              )
            "
          >
            Dresses & Jumpsuits
          </router-link>
        </li>
        <li
          :class="{
            ' underline underline-offset-2': category === 'Swimsuit',
          }"
          class="p-4 inline-block"
        >
          <router-link
            :to="`/products/category/Swimsuit`"
            @click="
              updateFilteredProducts({ colors: [], categories: [] }, 'Swimsuit')
            "
          >
            Swimsuits
          </router-link>
        </li>
        <li
          :class="{
            ' underline underline-offset-2': category === 'Sweater',
          }"
          class="p-4 inline-block"
        >
          <router-link
            :to="`/products/category/Sweater`"
            @click="
              updateFilteredProducts({ colors: [], categories: [] }, 'Sweater')
            "
          >
            Sweaters
          </router-link>
        </li>
        <li
          :class="{
            ' underline underline-offset-2': category === 'Jacket',
          }"
          class="p-4 inline-block"
        >
          <router-link
            :to="`/products/category/Jacket`"
            @click="
              updateFilteredProducts({ colors: [], categories: [] }, 'Jacket')
            "
          >
            Jackets
          </router-link>
        </li>
        <li
          :class="{
            ' underline underline-offset-2': category === 'Jewellery',
          }"
          class="p-4 inline-block"
        >
          <router-link
            :to="`/products/category/Jewellery`"
            @click="
              updateFilteredProducts(
                { colors: [], categories: [] },
                'Jewellery'
              )
            "
          >
            Jewellery
          </router-link>
        </li>
      </ul>
    </nav>
    <FilterProducts
      v-if="!loading"
      @filter-applied="updateFilteredProducts($event)"
      :availableColors="availableColors"
      :availableCategories="availableCategories"
    />
    <Loader :isFetching="loading" />
    <ul v-if="!loading" class="grid grid-cols-2 lg:grid-cols-4">
      <li
        v-for="product in filterProducts.length < 0
          ? filterProducts
          : filteredProducts"
        :key="product._id"
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
import { IProduct, Type, IWishlist, Color, Theme } from "../types/Product";
import Product from "../components/Product.vue";
import Loader from "../components/Loader.vue";
import FilterProducts from "../components/FilterProducts.vue";

export default defineComponent({
  name: "Category",
  components: { Product, Loader, FilterProducts },
  data() {
    const userId: string = this.$cookies.get("id") || "";
    return {
      loading: true,
      categories: [] as Array<Type>,
      products: [] as Array<IProduct>,
      wishlist: [] as unknown as IWishlist,
      user_id: userId,
      availableCategories: [] as Array<Type>,
      availableColors: [] as Array<Color>,
      availableCollections: [] as Array<Theme>,
      filterProducts: [] as Array<IProduct>,
    };
  },
  computed: {
    category(): String {
      return this.$route.params.slug as String;
    },
    filteredProducts(): Array<IProduct> {
      let filteredProducts: Array<IProduct>;
      if (this.filterProducts.length > 0) {
        return this.filterProducts;
      }
      switch (this.category) {
        case "All":
          filteredProducts = this.products;
          break;
        case "PantSkirt":
          filteredProducts = this.products.filter(
            (product) => product.type === "Pant" || product.type === "Skirt"
          );
          break;
        case "TopBlouse":
          filteredProducts = this.products.filter(
            (product) => product.type === "Top" || product.type === "Blouse"
          );
          break;
        case "DressJumpsuit":
          filteredProducts = this.products.filter(
            (product) => product.type === "Dress" || product.type === "Jumpsuit"
          );
          break;
        default:
          filteredProducts = this.products.filter(
            (product) => product.type === this.category
          );
          break;
      }
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
      const categories = Array.from(
        new Set(filteredProducts.map((product) => product.type))
      );
      this.availableCategories = categories;
      const Collection = Array.from(
        new Set(filteredProducts.map((product) => product.theme))
      );
      this.availableCollections = Collection;
      return filteredProducts;
    },
  },
  mounted() {
    this.fetchCategoryProducts();
    this.fetchWishlist();
  },
  methods: {
    updateFilteredProducts(
      filterCriteria: {
        colors: string[];
        categories: string | string[];
      },
      category?: string
    ) {
      if (
        !filterCriteria ||
        Object.keys(filterCriteria).length === 0 ||
        (filterCriteria.colors.length === 0 &&
          filterCriteria.categories.length === 0)
      ) {
        switch (category) {
          case "All":
            this.filterProducts = this.products;
            this.getColorsandCategories();
            break;
          case "PantSkirt":
            this.filterProducts = this.products.filter(
              (product) => product.type === "Pant" || product.type === "Skirt"
            );
            this.getColorsandCategories();
            break;
          case "TopBlouse":
            this.filterProducts = this.products.filter(
              (product) => product.type === "Top" || product.type === "Blouse"
            );
            this.getColorsandCategories();
            break;
          case "DressJumpsuit":
            this.filterProducts = this.products.filter(
              (product) =>
                product.type === "Dress" || product.type === "Jumpsuit"
            );
            this.getColorsandCategories();
            break;
          default:
            this.filterProducts = this.products.filter(
              (product) => product.type === category
            );
            this.getColorsandCategories();
            break;
        } // Reset the filterProducts array
        return; // Exit the method
      }
      // Convert categories to an array if it's a single string
      const categories = Array.isArray(filterCriteria.categories)
        ? filterCriteria.categories
        : [filterCriteria.categories];
      // Check if the categories have changed
      const categoryChanged =
        categories.length > 0 && this.category !== categories[0];

      if (categoryChanged) {
        // Update available colors based on the filtered products
        const colors = Array.from(
          new Set(this.filteredProducts.flatMap((product) => product.colors))
        );
        this.availableColors = colors.map((color) => {
          // Map color values to display strings if needed
          switch (color) {
            default:
              return color;
          }
        });

        // Update available categories based on the filtered products
        this.availableCategories = Array.from(
          new Set(this.filteredProducts.flatMap((product) => product.type))
        ).map((category) => {
          // Map category values to display strings if needed
          switch (category) {
            default:
              return category;
          }
        });
      }

      // Apply the filter criteria to the list of products
      this.filterProducts = this.filteredProducts.filter((product) => {
        // Check if the product matches the selected filter criteria
        const colorMatch =
          filterCriteria.colors.length === 0 ||
          filterCriteria.colors.some((color: Color) =>
            product.colors.includes(color)
          );

        const categoryMatch =
          categories.length === 0 || categories.includes(product.type);

        // Return true if all criteria match
        return colorMatch && categoryMatch;
      });
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
        const response = await fetch(
          `http://capsule-wardrobe.onrender.com:8000/api/wishlist/${this.user_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          this.wishlist = data[0];
        } else {
          console.error("Failed to check wishlist:", response.statusText);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async fetchCategoryProducts() {
      try {
        const response = await fetch(
          "http://capsule-wardrobe.onrender.com:8000/api/product"
        );
        const data = await response.json();

        this.products = data.products;

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
    getColorsandCategories() {
      this.availableCategories = Array.from(
        new Set(this.filterProducts.flatMap((product) => product.type))
      ).map((category) => {
        // Map category values to display strings if needed
        switch (category) {
          default:
            return category;
        }
      });

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
    },
  },
});
</script>
