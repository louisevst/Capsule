<template>
  <article
    class="relative bg-notWhite/20 rounded-xl text-notBlack text-body m-2 lg:flex lg:justify-between grid grid-cols-2 border lg:rounded-none border-notBlack"
  >
    <img
      :src="image"
      :alt="alt"
      class="h-[300px] lg:h-[500px] object-cover w-full rounded-l-xl lg:rounded-none lg:w-1/2"
      @click="($event: MouseEvent) => onClick($event)"
    />

    <div class="flex flex-col justify-evenly p-4 lg:w-1/2">
      <img
        class="w-8 h-8 lg:w-12 lg:h-12 self-end lg:absolute lg:top-0 lg:right-0 lg:bg-notWhite/10 lg:rounded-full cursor-pointer"
        :src="close"
        @click.prevent="deleteProduct"
      />

      <p class="space-x-2">
        <b>{{ name }}</b>
        {{ price }} €
      </p>
      <section class="space-y-2">
        <div class="flex justify-center items-center">
          <select
            class="block py-2.5 px-0 w-full text-sm text-notBlack bg-transparent border-0 border-b border-notBlack appearance-none focus:outline-none focus:ring-0 focus:border-terracota peer"
            v-model="selectedColor"
          >
            <option value="" disabled selected>Select a color</option>
            <option
              v-for="color in capitalizedColors"
              :key="color"
              :value="color"
            >
              {{ color }}
            </option>
          </select>
        </div>
        <div class="flex justify-center items-center">
          <select
            class="block py-2.5 w-full text-sm text-notBlack bg-transparent border-0 border-b border-notBlack appearance-none focus:outline-none focus:ring-0 focus:border-terracota peer px-0"
            v-model="selectedSize"
          >
            <option value="" disabled selected>Select a size</option>
            <option v-for="size in sizes" :key="size" :value="size">
              {{ size }}
            </option>
          </select>
        </div>
        <div class="flex justify-center items-center">
          <select
            class="block py-2.5 px-0 w-full text-sm text-notBlack bg-transparent border-0 border-b border-notBlack appearance-none focus:outline-none focus:ring-0 focus:border-terracota peer"
            v-model="selectedFit"
          >
            <option value="" disabled selected>Select a fit</option>

            <option v-for="fit in fits" :key="fit" :value="fit">
              {{ fit }}
            </option>
          </select>
        </div>
      </section>
      <button
        class="flex justify-around lg:px-8 2xl:px-16 w-full items-center px-4 font-semibold lg:font-light mt-4 lg:my-8 lg:text-bodyh border border-notBlack rounded-lg lg:bg-notBlack/10 focus:bg-notBlack/10 hover:bg-notBlack/0 hover:transition-opacity hover:ease-linear py-2"
        @click="findProductId()"
      >
        {{ success ? "Added" : isAdding ? "" : "Add to bag" }}
        <successIcon :fetchSuccessful="success" :loading="isAdding" />
      </button>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import hearth from "../assets/bag-outline.svg";
import filledHearth from "../assets/bag.svg";
import close from "../assets/close.svg";
import successIcon from "./successIcon.vue";
import { ProductDetails, Color, Size, Fit } from "../types/Product";

export default defineComponent({
  components: { successIcon },
  props: {
    _id: { type: String, required: true },
    name: {
      type: String,
      required: true,
    },
    description: { type: String, required: true },
    price: {
      type: Number,
      required: true,
    },
    colors: {
      type: Array as () => Color[],
      required: true,
    },
    sizes: {
      type: Array as () => Size[],
      required: true,
    },
    fits: {
      type: Array as () => Fit[],
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    alt: { type: String, required: true },
    onDelete: {
      type: Function as PropType<() => void>,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    onClick: {
      type: Function as PropType<(event: MouseEvent) => void>,
      required: true,
    },
  },
  data() {
    return {
      close,
      hearth,
      filledHearth,
      isHearthFilled: false,
      selectedColor: "",
      selectedSize: "",
      selectedFit: "",
      showColors: false,
      showFits: false,
      showSizes: false,
      success: false,
      isAdding: false,
    };
  },
  computed: {
    capitalizedColors(): string[] {
      const words = this.colors.map((color) => color.split("-"));
      const capitalizedWords = words.map((word) => {
        return word
          .map((subword) => subword.charAt(0).toUpperCase() + subword.slice(1))
          .join("-");
      });

      return capitalizedWords;
    },
  },
  methods: {
    async findProductId() {
      const id = this._id;
      const detailsResponse = await fetch(
        `https://capsule-wardrobe.onrender.com:8000/api/details/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const productVariants = await detailsResponse.json();
      console.log(productVariants);
      const matchingProductVariant = productVariants.find(
        (variant: ProductDetails) => {
          return (
            variant.color.toLowerCase() === this.selectedColor.toLowerCase() &&
            variant.fit.toLowerCase() === this.selectedFit.toLowerCase() &&
            variant.size.toLowerCase() === this.selectedSize.toLowerCase()
          );
        }
      );

      if (matchingProductVariant) {
        console.log("Matching product variant ID:", matchingProductVariant._id);
        this.addToCart(matchingProductVariant._id);
      } else {
        console.log("No matching product variant found");
        // Handle the case when no matching product variant is found
      }
    },
    async addToCart(product_variant: string) {
      try {
        this.isAdding = true;
        // Check if the user already has a bag
        const bagResponse = await fetch(
          `https://capsule-wardrobe.onrender.com:8000/api/bag/${this.user_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!bagResponse.ok) {
          if (bagResponse.status === 404) {
            console.log("Bag not found. Creating a new bag...");

            // Create a new bag
            const createBagResponse = await fetch(
              "https://capsule-wardrobe.onrender.com:8000/api/bag",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  product_variant_id: [product_variant],
                  user_id: this.user_id,
                }),
              }
            );

            if (!createBagResponse.ok) {
              console.error(
                "Failed to create bag:",
                createBagResponse.statusText
              );
              return;
            }

            const createdBagData = await createBagResponse.json();
            const bagId = createdBagData._id;

            // Continue with adding the item to the bag
            const payload = {
              product_variant_id: [product_variant],
            };

            const addToCartResponse = await fetch(
              `https://capsule-wardrobe.onrender.com:8000/api/bag/${bagId}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
              }
            );

            if (addToCartResponse.ok) {
              this.isAdding = false;
              this.success = true;
              console.log("Item added to the cart successfully");
              console.log(await addToCartResponse.json());
            } else {
              console.error(
                "Failed to add item to the cart:",
                addToCartResponse.statusText
              );
            }
          } else {
            console.error("Failed to retrieve bag:", bagResponse.statusText);
          }

          return;
        }

        // Continue with adding the item to the existing bag
        const bagData = await bagResponse.json();
        const bagId = bagData[0]._id;

        // Prepare the payload for the PUT request
        const payload = {
          product_variant_id: [product_variant],
        };

        const addToCartResponse = await fetch(
          `https://capsule-wardrobe.onrender.com:8000/api/bag/${bagId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        if (addToCartResponse.ok) {
          this.isAdding = false;
          this.success = true;
          console.log("Item added to the cart successfully");
          console.log(await addToCartResponse.json());
        } else {
          console.error(
            "Failed to add item to the cart:",
            addToCartResponse.statusText
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.success = true;
      }
    },
    deleteProduct() {
      this.onDelete();
    },
    toggleHearth() {
      this.isHearthFilled = !this.isHearthFilled;
      this.hearth = this.isHearthFilled ? this.filledHearth : hearth;
    },
    selectColor(color: string) {
      this.selectedColor = color;
    },
    selectSize(size: string) {
      this.selectedSize = size;
    },
    selectFit(fit: string) {
      this.selectedFit = fit;
    },
    toggleSizes() {
      this.showSizes = !this.showSizes;
    },
    toggleFits() {
      this.showFits = !this.showFits;
    },
    toggleColors() {
      this.showColors = !this.showColors;
    },
  },
});
</script>
