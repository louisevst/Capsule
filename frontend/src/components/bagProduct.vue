<template>
  <article
    class="bg-notWhite/20 rounded-xl text-notBlack text-body p-4 m-1 border border-notBlack"
  >
    <div class="grid grid-cols-4">
      <img :src="image" />
      <div class="flex justify-center flex-col mx-4 col-span-2">
        <p class="lg:text-bodyh font-semibold lg:font-light">
          {{ name }}
        </p>
        <p>Price: {{ price }} €</p>
        <div class="flex items-center space-x-1">
          <p>Color:</p>
          <div
            :class="`bg-${capitalizedColors}`"
            class="w-4 h-4 border border-notBlack rounded-full lg:w-8 lg:h-8"
          ></div>
        </div>

        <p>Fit: {{ fit }}</p>
        <p>Size: {{ size }}</p>
      </div>
      <img
        class="w-8 h-8 lg:w-12 lg:h-12 ml-auto cursor-pointer"
        :src="close"
        @click="deleteProduct"
      />
    </div>
    <!-- <div class="flex py-2">
      <div
        v-for="color in colors"
        :key="color"
        class="cursor-pointer w-4 h-4 lg:w-8 lg:h-8 rounded-full mr-1 border-black border"
        :class="{
          'outline outline-1 outline-notBlack border-notWhite border-4 ':
            selectedColor === color,
        }"
        @click="selectColor(color)"
      ></div>
    </div>

    <div class="flex py-2">
      <div
        v-for="size in sizes"
        :key="size"
        class="cursor-pointer w-8 h-8 rounded-full mr-2 border border-notBlack flex justify-center items-center p-2"
        :class="{ 'bg-notBlack text-notWhite': selectedSize === size }"
        @click="selectSize(size)"
      >
        {{ size }}
      </div>
    </div>

    <div class="flex py-2">
      <div
        v-for="fit in fits"
        :key="fit"
        class="cursor-pointer p-2 rounded-full mr-2 border border-notBlack flex justify-center items-center"
        :class="{ 'bg-notBlack text-notWhite': selectedFit === fit }"
        @click="selectFit(fit)"
      >
        {{ fit }}
      </div>
    </div> -->
  </article>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import close from "../assets/close.svg";
import filledHearth from "../assets/bag.svg";

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    description: { type: String, required: true },
    price: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    fit: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    onDelete: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
  computed: {
    capitalizedColors(): string {
      const words = this.color.split("-");
      const capitalizedWords = words.map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      });

      return capitalizedWords.join("-");
    },
  },
  data() {
    return {
      close,
      filledHearth,
      isHearthFilled: false,
      selectedColor: "",
      selectedSize: "",
      selectedFit: "",
    };
  },
  methods: {
    selectColor(color: string) {
      this.selectedColor = color;
    },
    selectSize(size: string) {
      this.selectedSize = size;
    },
    selectFit(fit: string) {
      this.selectedFit = fit;
    },
    deleteProduct() {
      // Call the onDelete method when the delete action is triggered
      this.onDelete();
    },
  },
});
</script>
