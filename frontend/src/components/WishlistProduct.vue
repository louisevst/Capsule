<template>
  <article class="bg-notWhite/20 rounded-xl text-notBlack text-body p-4 m-1">
    <img :src="image" />
    <div class="flex flex-col-reverse lg:flex-row">
      <p class="lg:self-center">
        <b>{{ name }}</b>
        {{ description }}
      </p>
      <img
        class="w-8 h-8 lg:w-12 lg:h-12 ml-auto p-1"
        :src="hearth"
        @click="toggleHearth"
      />
    </div>
    <p>{{ price }} €</p>
    <div class="flex py-2">
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
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import hearth from "../assets/bag-outline.svg";
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
  },
  data() {
    return {
      hearth,
      filledHearth,
      isHearthFilled: false,
      selectedColor: "",
      selectedSize: "",
      selectedFit: "",
    };
  },
  methods: {
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
