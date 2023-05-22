<template>
  <article class="bg-notWhite/20 rounded-xl text-notBlack text-body p-4 m-1">
    <div class="relative">
      <img :src="image" :alt="alt" class="w-full" />
      <div class="bg-notWhite/20 rounded-full absolute top-0 m-2">
        <img
          class="w-8 h-8 lg:w-12 lg:h-12"
          :src="close"
          @click="deleteProduct"
        />
      </div>
    </div>
    <div class="flex flex-col-reverse">
      <p>{{ alt }}</p>
      <p>
        <b>{{ name }}</b>
      </p>
    </div>
    <p>{{ price }} €</p>
    <p>Color: {{ selectedColor }}</p>
    <div class="flex py-2 flex-wrap">
      <div
        v-for="color in capitalizedColors"
        :key="color"
        class="cursor-pointer w-6 h-6 lg:w-8 lg:h-8 rounded-full mr-1 mb-1 border-black border"
        :class="`bg-${color}`"
        @click="selectColor(color)"
      ></div>
    </div>
    <p>Size: {{ selectedSize }}</p>
    <div class="flex py-2 flex-wrap">
      <div
        v-for="size in sizes"
        :key="size"
        class="cursor-pointer w-8 h-8 rounded-full mr-2 mb-2 border border-notBlack flex justify-center items-center p-2"
        :class="{ 'bg-notBlack text-notWhite': selectedSize === size }"
        @click="selectSize(size)"
      >
        {{ size }}
      </div>
    </div>
    <p>Fit: {{ selectedFit }}</p>
    <div class="flex py-2 flex-wrap">
      <div
        v-for="fit in fits"
        :key="fit"
        class="cursor-pointer p-2 rounded-full mr-2 mb-2 border border-notBlack flex justify-center items-center"
        :class="{ 'bg-notBlack text-notWhite': selectedFit === fit }"
        @click="selectFit(fit)"
      >
        {{ fit }}
      </div>
    </div>
    <button
      class="flex justify-center items-center w-full border border-notBlack rounded-lg py-1"
      @click="findProductId()"
    >
      Add to cart
      <img class="w-8 h-8 lg:w-12 lg:h-12 p-1" :src="hearth" />
    </button>
  </article>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import hearth from "../assets/bag-outline.svg";
import filledHearth from "../assets/bag.svg";
import close from "../assets/close.svg";

export default defineComponent({
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
      type: Array as () => string[],
      required: true,
    },
    sizes: {
      type: Array as () => string[],
      required: true,
    },
    fits: {
      type: Array as () => string[],
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
        `http://localhost:8000/api/details/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const productVariants = await detailsResponse.json();
      console.log(productVariants);
      const matchingProductVariant = productVariants.find((variant) => {
        return (
          variant.color.toLowerCase() === this.selectedColor.toLowerCase() &&
          variant.fit.toLowerCase() === this.selectedFit.toLowerCase() &&
          variant.size.toLowerCase() === this.selectedSize.toLowerCase()
        );
      });

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
        // Check if the user already has a bag
        const bagResponse = await fetch("http://localhost:8000/api/bag", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!bagResponse.ok) {
          console.error("Failed to retrieve bag:", bagResponse.statusText);
          return;
        }

        const bagData = await bagResponse.json();

        // If the user has no bag, create a new one
        let bagId;
        if (!bagData) {
          const createBagResponse = await fetch(
            "http://localhost:8000/api/bag",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({}),
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
          bagId = createdBagData._id;
        } else {
          bagId = bagData[0]._id;
        }
        console.log(product_variant);
        // Prepare the payload for the POST request
        const payload = {
          product_variant_id: [product_variant],
        };
        console.log(bagId);
        const addToCartResponse = await fetch(
          `http://localhost:8000/api/bag/${bagId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        if (addToCartResponse.ok) {
          console.log("Item added to the cart successfully");
        } else {
          console.error(
            "Failed to add item to the cart:",
            addToCartResponse.statusText
          );
        }
      } catch (error) {
        console.error(error);
      }
    },

    // async addToCart() {
    //   try {
    //     // Prepare the payload for the POST request
    //     const payload = {
    //       user_id: this.user_id,
    //       name: this.name,
    //       description: this.description,
    //       price: this.price,
    //       color: this.selectedColor,
    //       size: this.selectedSize,
    //       fit: this.selectedFit,
    //       image: this.image,
    //       alt: this.alt,
    //     };

    //     const response = await fetch("http://localhost:8000/api/bag", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(payload),
    //     });

    //     if (response.ok) {
    //       console.log("Item added to the cart successfully");
    //     } else {
    //       console.error("Failed to add item to the cart:", response.statusText);
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
    deleteProduct() {
      // Call the onDelete method when the delete action is triggered
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
  },
});
</script>
