<template>
  <section class="flex w-full justify-between">
    <!-- Colors filter -->
    <h3>Colors</h3>
    <ul>
      <li v-for="color in availableColors" :key="color">
        <label :for="color">{{ color }}</label>
        <input
          type="checkbox"
          :id="color"
          :value="color"
          v-model="selectedColors"
        />
      </li>
    </ul>

    <!-- Collections filter -->
    <h3 v-if="availableCollections">Collections</h3>
    <ul v-if="availableCollections">
      <li v-for="collection in availableCollections" :key="collection">
        <label :for="collection">{{ collection }}</label>
        <input
          type="checkbox"
          :id="collection"
          :value="collection"
          v-model="selectedCollections"
        />
      </li>
    </ul>

    <!-- Categories filter -->
    <h3 v-if="availableCategories">Categories</h3>
    <ul v-if="availableCategories">
      <li v-for="category in availableCategories" :key="category">
        <label :for="category">{{ category }}</label>
        <input
          type="checkbox"
          :id="category"
          :value="category"
          v-model="selectedCategories"
        />
      </li>
    </ul>

    <!-- Apply filter and Reset buttons -->
    <div>
      <button @click="applyFilter">Apply Filter</button>
      <button @click="resetFilters">Reset</button>
    </div>
  </section>
</template>

<script lang="ts">
import { Color, Type, Theme } from "../types/Product";
export default {
  props: {
    availableColors: {
      type: Array<Color>,
      required: true,
    },
    availableCollections: {
      type: Array<Theme>,
      required: false,
    },
    availableCategories: {
      type: Array<Type>,
      required: false,
    },
  },
  data() {
    return {
      selectedColors: [],
      selectedCollections: [],
      selectedCategories: [],
    };
  },
  methods: {
    applyFilter() {
      const filterCriteria = {
        colors: this.selectedColors,

        collections: this.selectedCollections,
        categories: this.selectedCategories,
      };

      // Emit the event with the filter criteria or an empty object if not provided
      this.$emit("filter-applied", filterCriteria || {});
    },
    resetFilters() {
      // Reset all selected filters
      this.selectedColors = [];
      this.selectedCollections = [];
      this.selectedCategories = [];

      // Emit an event with empty filter criteria to reset the filters in the parent component
      this.$emit("filter-applied", {});
    },
  },
};
</script>
