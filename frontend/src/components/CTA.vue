<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    class: { type: String, required: false },
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
    invertIcon: {
      type: String,
      default: "",
    },
    type: {
      type: String as PropType<"button" | "submit" | "reset">,
      default: "button",
      validator: (value: string) => {
        return ["button", "submit", "reset"].includes(value);
      },
    },
    onClick: {
      type: (Function as PropType<(event: MouseEvent) => void>) || Function,
      required: true,
    },
  },
});
</script>

<template>
  <div class="m-2 group" :class="class">
    <div
      class="absolute text-xs-sub font-lato lg:text-sub text-transparent px-6 py-2 flex items-center border focus:left-0 focus:top-0 lg:px-10"
      :class="[bgColor, borderColor]"
    >
      {{ text }}
    </div>
    <button
      @click="onClick"
      :type="type"
      :class="[buttonColor, textColor, borderColor]"
      class="relative text-xs-sub font-lato lg:text-sub border left-2 top-2 px-6 py-2 lg:px-10 shadow-md flex items-center transition ease-in-out delay-150 duration-500 hover:bg-notWhite hover:text-notBlack focus:shadow-none"
    >
      {{ text }}
    </button>
  </div>
</template>
