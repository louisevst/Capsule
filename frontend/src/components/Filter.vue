<template>
  <button
    class="p-2 w-full flex justify-center items-center"
    @click="toggleFilter"
  >
    Filter <img class="h-6 w-6 ml-2" :src="filter" alt="Filter." />
  </button>
  <ul
    :class="showFilter ? 'absolute' : 'hidden'"
    class="text-notBlack h-screen w-4/5 top-0 right-0 pt-10 bg-notWhite border-l z-40 border-notBlack shadow flex justify-center flex-col"
  >
    <li
      class="text-xs-sub lg:text-sub font-text relative mb-4"
      @click="toggleColor()"
    >
      color
      <div
        class="bottom-0 left-0 w-3/4 bg-notBlack absolute border-b border-solid border-notBlack"
      ></div>
    </li>
    <li
      class="text-xs-sub lg:text-sub font-text relative mb-4"
      @click="toggleCat()"
    >
      Categories
      <div
        class="bottom-0 left-0 w-3/4 bg-notBlack absolute border-b border-solid border-notBlack"
      ></div>
    </li>
  </ul>
  <ul
    :class="showColors && showFilter ? 'absolute' : 'hidden'"
    class="overflow-scroll text-notBlack h-screen w-4/5 top-0 right-0 bg-notWhite border-l z-40 py-10 pl-4 border-notBlack shadow flex justify-start items-center flex-col space-y-1"
  >
    <li
      :class="{ 'font-bold': selectedColors.includes(color) }"
      v-for="color in colors"
      :key="color"
      class="text-xs-sub lg:text-sub font-text relative w-full flex flex-row-reverse items-center justify-end"
      @click="selectColor(color)"
    >
      {{ color }}
      <div :class="`bg-${color}`" class="w-6 h-6 mx-4 rounded-full"></div>
    </li>
  </ul>
  <ul
    :class="showCat && showFilter ? 'absolute' : 'hidden'"
    class="overflow-scroll text-notBlack h-screen w-4/5 top-0 right-0 pt-10 bg-notWhite border-l z-40 border-notBlack shadow flex justify-center flex-col"
  >
    <li
      :class="{ 'font-bold': selectedTypes.includes(type) }"
      v-for="type in types"
      :key="type"
      class="text-xs-sub lg:text-sub font-text relative mb-4"
      @click="selectType(type)"
    >
      {{ type }}
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import filter from "../assets/filter.svg";

export default defineComponent({
  name: "Filter",
  emits: ["colorSelected", "typeSelected"],
  props: {
    colors: {
      type: Array<string>,
      required: true,
    },
    types: {
      type: Array<string>,
      required: true,
    },
    toggleFilter: {
      type: Function as PropType<(payload: MouseEvent) => void>,
      required: true,
    },
    showFilter: { type: Boolean, required: true },
  },
  data() {
    return {
      filter,
      showCat: false,
      showColors: false,
      selectedColors: [] as string[],
      selectedTypes: [] as string[],
    };
  },

  methods: {
    selectColor(color: string) {
      this.$emit("colorSelected", color);
      console.log(color);
    },
    selectType(type: string) {
      this.$emit("typeSelected", type);
      console.log(type);
    },
    toggleCat() {
      if (this.showFilter) {
        this.showCat = !this.showCat;
      }
    },
    toggleColor() {
      if (this.showFilter) {
        this.showColors = !this.showColors;
      }
    },
    toggleSelectedColor(color: string) {
      const index = this.selectedColors.indexOf(color);
      if (index === -1) {
        this.selectedColors.push(color);
      } else {
        this.selectedColors.splice(index, 1);
      }
      this.$emit("colorSelected", this.selectedColors);
    },
    toggleSelectedType(type: string) {
      const index = this.selectedTypes.indexOf(type);
      if (index === -1) {
        this.selectedTypes.push(type);
      } else {
        this.selectedTypes.splice(index, 1);
      }
      this.$emit("typeSelected", this.selectedTypes);
    },
  },
});
</script>
