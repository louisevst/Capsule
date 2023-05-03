<script setup lang="ts">
import { defineProps, PropType } from "vue";
import Arrow from "../assets/goto.svg";

defineProps({
  text: {
    type: String,
    required: true,
    default: "Click me!",
  },
  textColor: {
    type: String,
    default: "text-notBlack",
  },
  buttonColor: {
    type: String,
    default: "bg-notWhite",
  },
  bgColor: {
    type: String,
    default: "bg-notBlack",
  },
  borderColor: {
    type: String,
    default: "border-notBlack",
  },
  onClick: {
    type: Function as PropType<(event: MouseEvent) => void>,
    required: true,
  },
});

const arrow = Arrow;
</script>

<template>
  <div class="relative m-2 group">
    <div
      class="absolute text-xs-sub font-lato lg:text-sub text-transparent px-6 py-2 flex items-center"
      :class="bgColor"
    >
      {{ text }}
      <img
        :src="arrow"
        class="w-4 h-4 lg:w-12 lg:h-12 ml-4 hidden group-hover:block transition ease-in-out delay-150 duration-100"
      />
    </div>
    <button
      @click="($event: MouseEvent) => onClick($event)"
      :class="[buttonColor, textColor, borderColor]"
      class="absolute text-xs-sub font-lato lg:text-sub border left-2 top-2 px-6 py-2 shadow-md flex items-center transition ease-in-out delay-150 duration-500 focus:shadow-none focus:left-0 focus:top-0"
    >
      {{ text }}
      <img
        :src="arrow"
        class="w-4 h-4 lg:w-12 lg:h-12 ml-4 hidden group-hover:block transition ease-in-out delay-150 duration-300 fill-notBlack"
      />
    </button>
  </div>
</template>
