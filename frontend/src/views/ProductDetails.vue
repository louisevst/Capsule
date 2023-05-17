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
  <main
    v-if="isFetchingProduct"
    class="h-screen flex justify-center items-center"
  >
    <div role="status">
      <svg
        aria-hidden="true"
        class="w-20 h-20 mr-2 text-gray-200 animate-spin fill-terracota"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span class="sr-only">Loading...</span>
    </div>
  </main>
  <main v-else class="grid lg:grid-cols-2 text-notBlack font-text">
    <section
      class="flex flex-col order-2 p-4 pb-12 space-y-2 lg:space-y-4 lg:justify-end lg:px-20 xl:px-40"
    >
      <div
        class="bg-notWhite/50 lg:bg-transparent lg:static lg:w-12 lg:h-12 w-8 h-8 rounded-full absolute top-20 cursor-pointer flex justify-end items-center"
      >
        <img
          :src="back"
          @click="goBack"
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
  components: { CTA, PopUp },
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

      this.bag.product_variant_id = variant?._id;

      // Check if the bag already exists
      if (this.bagExists()) {
        await this.updateExistingBag();
      } else {
        await this.createBag();
      }
    },
    bagExists() {
      return this.bag_id !== "";
    },
    async updateExistingBag() {
      try {
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

        if (!data) {
          // Bag doesn't exist, create a new bag
          await this.createBag();
        } else {
          // Bag exists, update the existing bag
          const updateResponse = await fetch(
            `http://localhost:8000/api/bag/${data._id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(this.bag),
            }
          );
          console.log(updateResponse);
        }
      } catch (error) {
        console.log(error);
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
