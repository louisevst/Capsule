<template>
  <button class="text-center p-2 w-full" @click="toggleFilter">Filter</button>
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
    class="overflow-scroll text-notBlack h-screen w-4/5 top-0 right-0 pt-10 bg-notWhite border-l z-40 border-notBlack shadow flex justify-center flex-col"
  >
    <li
      v-for="color in colors"
      :key="color"
      class="text-xs-sub lg:text-sub font-text relative mb-4"
    >
      {{ color }}
    </li>
  </ul>
  <ul
    :class="showCat && showFilter ? 'absolute' : 'hidden'"
    class="overflow-scroll text-notBlack h-screen w-4/5 top-0 right-0 pt-10 bg-notWhite border-l z-40 border-notBlack shadow flex justify-center flex-col"
  >
    <li
      v-for="type in types"
      :key="type"
      class="text-xs-sub lg:text-sub font-text relative mb-4"
    >
      {{ type }}
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
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
      showCat: false,
      showColors: false,
    };
  },

  methods: {
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
  },
});
</script>
