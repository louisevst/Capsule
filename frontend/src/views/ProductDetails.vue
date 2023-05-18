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
      class="flex flex-col order-2 p-4 pb-12 space-y-2 lg:space-y-4 lg:justify-end lg:px-20 xl:px-40"
    >
      <div
        class="bg-notWhite/50 lg:bg-transparent lg:static lg:w-12 lg:h-12 w-8 h-8 rounded-full absolute top-24 cursor-pointer flex justify-end items-center"
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
      <p>Size: {{ selectedSize }}</p>
      <div class="flex flex-wrap justify-stretch">
        <div
          v-for="(size, index) in uniqueSizes"
          :key="index"
          class="px-2 py-1 lg:px-4 rounded-full mr-4 mb-4 border-black border cursor-pointer lg:text-bodyh"
          :class="{
            'outline outline-1 outline-offset-4 lg:outline-offset-8':
              size === selectedSize,
          }"
          @click="selectedSize = size"
        >
          {{ size }}
        </div>
      </div>
      <p>Color: {{ selectedColor }}</p>
      <div class="flex flex-wrap justify-start items-center">
        <div
          v-for="(color, index) in uniqueColors"
          :key="index"
          class="w-8 h-8 lg:w-16 lg:h-16 rounded-full mr-4 mb-4 border-black border cursor-pointer"
          :class="[
            {
              'outline outline-1 outline-offset-4 lg:outline-offset-8':
                color === selectedColor,
            },
            `bg-${color}`,
          ]"
          @click="selectedColor = color"
        ></div>
      </div>
      <p>Fit: {{ selectedFit }}</p>
      <div class="flex flex-wrap justify-stretch">
        <div
          v-for="(fit, index) in uniqueFits"
          :key="index"
          class="px-2 py-1 lg:px-4 rounded-full mr-4 mb-1 border-black border cursor-pointer lg:text-bodyh"
          :class="{
            'outline outline-1 outline-offset-4 lg:outline-offset-8':
              fit === selectedFit,
          }"
          @click="selectedFit = fit"
        >
          {{ fit }}
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
          selectedColor === ''
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
          selectedColor === ''
            ? 'bg-notWhite'
            : 'bg-notBlack'
        "
      />
    </section>
    <section class="lg:-order-first">
      <img
        :src="selectedImage ? selectedImage : product.image"
        :alt="product.alt"
        class="lg:max-h-screen lg:max-w-full lg:p-4 lg:pt-20 xl:pt-36 lg:m-auto"
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
  _id: string;
  product_id: string;
  images: Array<string>;
  fit: string;
  size: string;
  color: string;
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
      isHearthFilled: false,
      productDetails: [] as Array<Details>,
      product: {} as Product,
      uniqueColors: [] as Array<string>,
      uniqueSizes: uniqueSizes,
      uniqueFits: [] as Array<string>,
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
    goBack() {
      console.log("ck");
      this.$router.go(-1);
    },
    toggleHearth() {
      this.isHearthFilled = !this.isHearthFilled;
      this.hearth = this.isHearthFilled ? this.filledHearth : hearth;
    },
    async fetchProductDetails(productId: string | string[]) {
      try {
        const response = await fetch(
          `http://localhost:8000/api/product/${productId}`,
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
          `http://localhost:8000/api/details/${productId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        this.productDetails = data;
        console.log(data);
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
        (uniqueColors, product) => {
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
      this.uniqueSizes = this.productDetails.reduce((uniqueSizes, product) => {
        if (!uniqueSizeSet.has(product.size)) {
          uniqueSizeSet.add(product.size);
          uniqueSizes.push(product.size);
        }
        return uniqueSizes;
      }, []);
    },
    calculateUniqueFits() {
      const uniqueFitSet = new Set();
      this.uniqueFits = this.productDetails.reduce((uniqueFits, product) => {
        if (!uniqueFitSet.has(product.fit)) {
          uniqueFitSet.add(product.fit);
          uniqueFits.push(product.fit);
        }
        return uniqueFits;
      }, []);
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
      console.log(variant);
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
          console.log("User ID:", this.bag.user_id);
          const response = await fetch(
            `http://localhost:8000/api/bag/${this.bag.user_id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json();
          console.log(data);
          if (!data) {
            // Bag doesn't exist, create a new bag
            await this.createBag();
          } else {
            // Bag exists, update the existing bag
            console.log(data[0]._id);
            const bagId = data[0]._id;
            const updateResponse = await fetch(
              `http://localhost:8000/api/bag/${bagId}`,
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

          const response = await fetch("http://localhost:8000/api/bag", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.bag),
          });
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
