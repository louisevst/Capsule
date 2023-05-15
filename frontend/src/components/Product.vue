<template>
  <article class="bg-notWhite/20 rounded-xl text-notBlack text-body p-4 m-1">
    <img
      :src="image"
      class="h-[200px] lg:h-[400px] xl:h-[600px] object-cover w-full"
    />
    <div class="flex items-center lg:flex-row">
      <p class="lg:self-center">
        <b>{{ name }}</b>
      </p>
      <img
        :src="hearth"
        class="w-8 h-8 lg:w-12 lg:h-12 ml-auto p-1"
        @click="toggleHearth"
      />
    </div>
    <div class="flex flex-col items-stretch">
      <p>{{ description }}</p>
      <p class="my-2">{{ price }} €</p>

      <div class="flex flex-wrap justify-stretch">
        <div
          v-for="color in colors"
          :key="color"
          class="w-6 h-6 lg:w-8 lg:h-8 rounded-full mr-1 mb-1 border-black border"
          :class="`bg-${color}`"
        ></div>
      </div>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import hearth from "../assets/hearth.svg";
import filledHearth from "../assets/hearth-full.svg";

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
    };
  },
  methods: {
    toggleHearth() {
      this.isHearthFilled = !this.isHearthFilled;
      this.hearth = this.isHearthFilled ? this.filledHearth : hearth;
    },
  },
});
</script>
