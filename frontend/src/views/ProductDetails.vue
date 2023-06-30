<template>
  <PopUp
    :showModal="isModalVisible"
    title="Hi there !"
    @update:show-modal="isModalVisible = $event"
    :onClick1="() => navigate('login')"
    :onClick2="() => navigate('sign-up')"
  >
    <p>To add an item to your cart please login or sign up if you're new.</p>
  </PopUp>
  <loader :is-fetching="isFetchingProduct" />
  <main
    v-if="productDetails.length > 1"
    class="grid lg:grid-cols-2 text-notBlack font-text"
  >
    <section
      class="flex flex-col order-2 p-4 pb-12 space-y-2 lg:space-y-4 lg:justify-end xl:justify-center lg:px-20 xl:px-40 lg:pt-20"
    >
      <div
        class="bg-notWhite/50 lg:bg-transparent lg:w-12 lg:h-12 w-8 h-8 rounded-full absolute top-24 lg:top-[7.6rem] lg:left-16 cursor-pointer flex justify-end items-center"
        @click="goBack"
      >
        <img
          :src="back"
          class="lg:w-12 lg:h-12 w-6 h-6 lg:static lg:-translate-x-8"
        />
      </div>

      <h1 class="font-title text-xs-headline lg:text-headline">
        {{ product.name }}
      </h1>
      <p class="text-xs-sub lg:text-sub">{{ product.price }} €</p>
      <p>{{ product.description }}</p>

      <div class="relative">
        <div
          class="flex items-center justify-between w-full py-2.5 text-sm text-notBlack border-b border-notBlack cursor-pointer"
          @click="toggleSizeDropdown"
        >
          <div v-if="selectedSize">
            {{ selectedSize }}
          </div>
          <span v-else>Select a size here</span>
          <div
            class="absolute inset-y-0 right-0 flex items-center pointer-events-none"
          >
            <svg
              class="w-5 h-5 text-notBlack transition-transform duration-300 transform"
              :class="{ 'rotate-180': isSizeDropdownOpen }"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
        <div
          class="absolute z-10 w-full mt-2 bg-notWhite border border-notBlack divide-y rounded-md shadow-lg"
          v-if="isSizeDropdownOpen"
        >
          <div
            v-for="(size, index) in uniqueSizes"
            :key="index"
            class="flex items-center py-2.5 px-4 cursor-pointer hover:bg-gray-100"
            @click="
              () => {
                selectedSize = size;
                toggleSizeDropdown();
              }
            "
          >
            <span>{{ size }}</span>
          </div>
        </div>
      </div>

      <div class="relative">
        <div
          class="flex items-center justify-between w-full py-2.5 text-sm text-notBlack border-b border-notBlack cursor-pointer"
          @click="toggleDropdown"
        >
          <div v-if="selectedColor" class="flex items-center">
            <div
              class="w-4 h-4 rounded-full"
              :class="`bg-${selectedColor}`"
            ></div>
            <p class="px-2">{{ selectedColor }}</p>
          </div>
          <span v-else>Select a color here</span>
          <svg
            class="w-5 h-5 text-gray-700 transition-transform duration-300 transform"
            :class="{ 'rotate-180': isDropdownOpen }"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        <div
          class="absolute z-10 w-full mt-2 bg-notWhite border border-notBlack divide-y rounded-md shadow-lg"
          v-if="isDropdownOpen"
        >
          <div
            v-for="(color, index) in uniqueColors"
            :key="index"
            class="flex items-center py-2.5 px-4 cursor-pointer hover:bg-gray-100"
            @click="
              () => {
                selectedColor = color;
                toggleDropdown();
              }
            "
          >
            <div class="w-4 h-4 rounded-full mr-2" :class="`bg-${color}`"></div>
            <span>{{ color }}</span>
          </div>
        </div>
      </div>

      <div class="relative">
        <div
          class="flex items-center justify-between w-full py-2.5 text-sm text-notBlack border-b border-notBlack cursor-pointer"
          @click="toggleFitDropdown"
        >
          <div v-if="selectedFit">
            {{ selectedFit }}
          </div>

          <span v-else>Select a fit here</span>
          <div
            class="absolute inset-y-0 right-0 flex items-center pointer-events-none"
          >
            <svg
              class="w-5 h-5 text-gray-700 transition-transform duration-300 transform"
              :class="{ 'rotate-180': isFitDropdownOpen }"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
        <div
          class="absolute z-10 w-full mt-2 bg-notWhite border border-notBlack divide-y rounded-md shadow-lg"
          v-if="isFitDropdownOpen"
        >
          <div
            v-for="(fit, index) in uniqueFits"
            :key="index"
            class="flex items-center py-2.5 px-4 cursor-pointer hover:bg-gray-100"
            @click="
              () => {
                selectedFit = fit;
                toggleFitDropdown();
              }
            "
          >
            <span>{{ fit }}</span>
          </div>
        </div>
      </div>

      <CTA
        text="Add to cart"
        :onClick="updateBag"
        :class="'py-4 flex justify-end'"
        :buttonColor="
          selectedColor === ''
            ? 'bg-notBlack'
            : `
            bg-${selectedColor}`
        "
        :textColor="
          selectedColor === 'Black' ||
          selectedColor === 'Blue-Grey' ||
          selectedColor === 'Khaki' ||
          selectedColor === 'Jungle-Green' ||
          selectedColor === 'Raspberry' ||
          selectedColor === 'Silver' ||
          selectedColor === 'Gold' ||
          selectedColor === '' ||
          selectedColor === 'Blue'
            ? 'text-notWhite'
            : 'text-notBlack'
        "
        :bgColor="
          selectedColor === 'Black' ||
          selectedColor === 'Blue-Grey' ||
          selectedColor === 'Khaki' ||
          selectedColor === 'Jungle-Green' ||
          selectedColor === 'Raspberry' ||
          selectedColor === 'Silver' ||
          selectedColor === 'Gold' ||
          selectedColor === '' ||
          selectedColor === 'Blue'
            ? 'bg-notWhite'
            : 'bg-notBlack'
        "
      />
    </section>
    <section class="lg:-order-first lg:flex lg:items-start">
      <img
        :src="selectedImage ? selectedImage : product.image"
        :alt="product.alt"
        class="md:w-full lg:w-auto md:max-h-screen"
      />
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import hearth from "../assets/hearth.svg";
import filledHearth from "../assets/hearth-full.svg";
import CTA from "../components/CTA.vue";
import back from "../assets/arrow_back.svg";
import PopUp from "../components/PopUp.vue";
import { useRouter } from "vue-router";
import Loader from "../components/Loader.vue";
import {
  IProduct,
  ProductVariantId,
  ProductId,
  Fit,
  Size,
  Color,
} from "../types/Product";

interface Details {
  _id: ProductVariantId;
  product_id: ProductId;
  images: Array<string>;
  fit: Fit;
  size: Size;
  color: Color;
}

export default defineComponent({
  components: { CTA, PopUp, Loader },
  data() {
    const isFetchingProduct = true;
    const userId = this.$cookies.get("id") || "";
    const uniqueSizes: string[] = [];
    const selectedSize = uniqueSizes.length === 1 ? "One Size" : "";

    return {
      isModalVisible: false,
      back,
      hearth,
      filledHearth,
      isDropdownOpen: false,
      isSizeDropdownOpen: false,
      isFitDropdownOpen: false,
      isHearthFilled: false,
      productDetails: [] as Array<Details>,
      product: {} as IProduct,
      uniqueColors: [] as Array<string>,
      uniqueSizes: uniqueSizes,
      uniqueFits: [] as Array<Fit>,
      selectedColor: "" as string,
      selectedFit: "" as string,
      selectedSize: selectedSize,
      selectedImage: "" as string,
      bag: {
        user_id: userId,
        product_variant_id: "",
        quantity: 1,
      },
      bag_id: "",
      isFetchingProduct: isFetchingProduct,
    };
  },
  watch: {
    selectedColor() {
      const colorvariant = this.productDetails.find(
        (detail) =>
          detail.color.toLowerCase() === this.selectedColor.toLowerCase()
      );

      if (colorvariant) {
        this.selectedImage = colorvariant.images[0];
      } else {
        this.selectedImage = this.product.image;
        this.bag.product_variant_id = "";
      }
    },
  },
  mounted() {
    const product_id = this.$route.params.id;
    this.fetchProductDetails(product_id);
  },
  methods: {
    toggleSizeDropdown() {
      this.isSizeDropdownOpen = !this.isSizeDropdownOpen;
    },
    toggleFitDropdown() {
      this.isFitDropdownOpen = !this.isFitDropdownOpen;
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    goBack() {
      this.$router.go(-1);
    },
    toggleHearth() {
      this.isHearthFilled = !this.isHearthFilled;
      this.hearth = this.isHearthFilled ? this.filledHearth : hearth;
    },
    async fetchProductDetails(productId: string | string[]) {
      try {
        const response = await fetch(
          `http://capsule-wardrobe.onrender.com:8000/api/product/${productId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        this.product = data;
      } catch (error) {
        console.log(error);
      }
      try {
        const response = await fetch(
          `http://capsule-wardrobe.onrender.com:8000/api/details/${productId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        this.productDetails = data;

        // Calculate unique sizes after populating productDetails
        this.calculateUniqueColors();
        this.calculateUniqueSizes();
        this.calculateUniqueFits();
      } catch (error) {
        console.log(error);
      } finally {
        this.isFetchingProduct = false; // Set isFetchingProduct flag to false
      }
    },
    calculateUniqueColors() {
      const uniqueColorSet = new Set();
      this.uniqueColors = this.productDetails.reduce(
        (uniqueColors: Array<string>, product) => {
          if (!uniqueColorSet.has(product.color)) {
            uniqueColorSet.add(product.color);
            const capitalizedColor = product.color
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join("-");
            uniqueColors.push(capitalizedColor);
          }
          return uniqueColors;
        },
        []
      );
    },
    calculateUniqueSizes() {
      const uniqueSizeSet = new Set();
      this.uniqueSizes = this.productDetails.reduce(
        (uniqueSizes: Array<Size>, product) => {
          if (!uniqueSizeSet.has(product.size)) {
            uniqueSizeSet.add(product.size);
            uniqueSizes.push(product.size);
          }
          return uniqueSizes;
        },
        []
      );
    },
    calculateUniqueFits() {
      const uniqueFitSet = new Set();
      this.uniqueFits = this.productDetails.reduce(
        (uniqueFits: Array<Fit>, product) => {
          if (!uniqueFitSet.has(product.fit)) {
            uniqueFitSet.add(product.fit);
            uniqueFits.push(product.fit);
          }
          return uniqueFits;
        },
        []
      );
    },
    async updateBag() {
      // Set the product variant ID based on the selected size and color
      const variant = this.productDetails.find(
        (detail) =>
          detail.size.toLowerCase() === this.selectedSize.toLowerCase() &&
          detail.color.toLowerCase() === this.selectedColor.toLowerCase() &&
          detail.fit.toLowerCase() === this.selectedFit.toLowerCase()
      );

      if (!variant?._id) {
        console.error("Selected variant not found");
        return;
      }

      this.bag.product_variant_id = variant?._id;

      // Check if the bag already exists
      if (this.bagExists()) {
        await this.updateExistingBag();
      } else {
        await this.createBag();
      }
    },
    bagExists() {
      return !!this.bag.user_id;
    },

    async updateExistingBag() {
      try {
        if (this.bagExists()) {
          const response = await fetch(
            `http://capsule-wardrobe.onrender.com:8000/api/bag/${this.bag.user_id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json();

          if (!data) {
            // Bag doesn't exist, create a new bag
            await this.createBag();
          } else {
            // Bag exists, update the existing bag
            console.log(data[0]._id);
            const bagId = data[0]._id;
            const updateResponse = await fetch(
              `http://capsule-wardrobe.onrender.com:8000/api/bag/${bagId}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  ...this.bag,
                  product_variant_id: [this.bag.product_variant_id],
                }),
              }
            );
            console.log(updateResponse);
          }
        } else {
          console.error("User ID is missing");
        }
      } catch (error) {
        console.log(error);
        await this.createBag();
      }
    },
    async createBag() {
      try {
        if (this.$cookies.get("id")) {
          this.bag.user_id = this.$cookies.get("id");

          const response = await fetch(
            "http://capsule-wardrobe.onrender.com:8000/api/bag",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(this.bag),
            }
          );
          console.log(await response.json());
        } else {
          this.isModalVisible = true;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  setup() {
    const router = useRouter();

    function navigate(to: string, cat?: string) {
      const routeParams = cat ? { cat } : {};
      router.push({ name: to, params: routeParams });
    }

    return {
      navigate,
    };
  },
});
</script>
