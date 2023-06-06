<template>
  <button
    v-if="!showFilter"
    class="p-2 w-full flex justify-center items-center lg:pr-5 lg:p-0 lg:pt-4 lg:justify-end"
    @click="toggleFilter"
  >
    Filter <img class="h-6 w-6 ml-2" :src="filter" alt="Filter." />
  </button>
  <section
    v-else
    class="w-full h-full flex-col bg-notBlack/90 fixed top-0 z-50 flex justify-center md:px-8 lg:px-0 lg:items-end"
  >
    <div
      class="w-screen h-screen absolut hidden lg:w-1/2"
      @click="toggleFilter"
    ></div>
    <div
      class="px-4 py-4 pb-8 md:px-8 flex justify-center xl:justify-between flex-col bg-notWhite border border-notBlack lg:w-1/2 lg:h-screen"
    >
      <img
        :src="close"
        alt="Close filter pop-up"
        class="h-8 w-8 ml-auto lg:h-10 lg:w-10 cursor-pointer"
        @click="toggleFilter"
      />
      <!-- Colors filter -->
      <section class="pb-4">
        <button
          class="flex justify-between items-center text-xs-sub lg:text-sub pb-4"
        >
          Colors
          <div
            :class="
              selectedColors.length > 0
                ? 'text-notWhite mx-2 w-5 h-5 lg:w-6 lg:h-6 bg-terracota rounded-full flex justify-center items-center text-body'
                : 'hidden'
            "
          >
            {{ selectedColors.length }}
          </div>
        </button>
        <ul class="bg-notWhite grid grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-1">
          <li
            v-for="color in availableColors"
            :key="color"
            class="flex justify-end items-center flex-row-reverse"
          >
            <label :for="color" class="px-1">{{ color }}</label>
            <div
              :class="`w-4 h-4 2xl:w-6 2xl:h-6 bg-${color} rounded-full outline outline-[0.5px] mx-1 md:mx-2`"
            ></div>
            <input
              type="checkbox"
              :id="color"
              :value="color"
              v-model="selectedColors"
              class="bg-notWhite border-notBlack text-notBlack focus:ring-terracota 2xl:w-8 2xl:h-8"
            />
          </li>
        </ul>
      </section>

      <!-- Categories filter -->
      <section
        class="relative"
        v-if="availableCategories && availableCategories.length > 1"
      >
        <button
          class="flex justify-between items-center text-xs-sub lg:text-sub pb-4"
        >
          Categories
          <div
            :class="
              selectedCategories.length > 0
                ? 'text-body m-1 text-notWhite w-5 h-5 lg:w-6 lg:h-6 bg-terracota rounded-full flex justify-center items-center'
                : 'hidden'
            "
          >
            {{ selectedCategories.length }}
          </div>
        </button>
        <ul
          class="bg-notWhite lg:space-y-1"
          :class="
            availableCategories.length < 4
              ? 'grid'
              : 'grid grid-cols-2 lg:grid-cols-3'
          "
        >
          <li v-for="category in availableCategories" :key="category">
            <input
              type="checkbox"
              :id="`category-${category}`"
              :value="category"
              v-model="selectedCategories"
              class="bg-notWhite border-notBlack text-notBlack focus:ring-terracota 2xl:w-8 2xl:h-8"
            /><label :for="category" class="pl-4"> {{ category }}</label>
          </li>
        </ul>
      </section>
      <div class="w-full pt-8">
        <button
          @click="applyFilter"
          class="border border-notBlack bg-notBlack text-notWhite w-1/2 py-4"
        >
          Save
        </button>
        <button
          @click="resetFilters"
          class="w-1/2 bg-notWhite border border-notBlack py-4"
        >
          Reset all filters
        </button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Color, Type } from "../types/Product";
import close from "../assets/close.svg";
import filter from "../assets/filter.svg";

export default {
  props: {
    availableColors: {
      type: Array<Color>,
      required: true,
    },

    availableCategories: {
      type: Array<Type>,
      required: false,
    },
  },
  data() {
    return {
      selectedColors: [],

      selectedCategories: [],
      close,
      filter,
      showFilter: false,
    };
  },

  methods: {
    toggleFilter() {
      this.showFilter = !this.showFilter;
    },
    applyFilter() {
      const filterCriteria = {
        colors: this.selectedColors,
        categories: this.selectedCategories,
      };

      // Emit the event with the filter criteria or an empty object if not provided
      this.$emit("filter-applied", filterCriteria || {});
      this.showFilter = false;
    },
    resetFilters() {
      // Reset all selected filters
      this.selectedColors = [];
      this.selectedCategories = [];

      // Emit an event with empty filter criteria to reset the filters in the parent component
      this.$emit("filter-applied", {});
    },
  },
};
</script>
