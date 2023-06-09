<template>
  <div>
    <div
      v-show="showModal"
      class="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 text-notBlack font-text z-50"
    >
      <div
        class="max-w-2xl p-6 bg-white rounded-md shadow-xl space-y-4 lg:space-y-8"
      >
        <div class="flex items-center justify-between">
          <h3 class="text-xs-sub lg:text-sub">{{ title }}</h3>
          <svg
            @click="closeModal"
            xmlns="http://www.w3.org/2000/svg"
            class="w-8 h-8 text-red-900 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="black"
            :class="class"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <button
            @click="onClick1"
            class="px-6 py-2 border border-terracota text-terracota rounded lg:text-bodyh"
          >
            {{ button1text }}
          </button>
          <button
            @click="onClick2"
            class="px-6 py-2 ml-2 text-notWhite text-xs-bodyh font-normal lg:font-thin lg:text-bodyh bg-terracota rounded"
          >
            {{ button2text }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";
export default defineComponent({
  props: {
    showModal: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: "Modal Title",
    },
    button1text: {
      type: String,
      default: "Cancel",
    },
    button2text: {
      type: String,
      default: "OK",
    },
    onClick1: {
      type: Function as PropType<(event: MouseEvent) => void>,
      required: true,
    },
    onClick2: {
      type: Function as PropType<(event: MouseEvent) => void>,
      required: true,
    },
    class: {
      type: String,
      required: false,
    },
  },
  methods: {
    closeModal() {
      this.$emit("update:showModal", false);
    },
  },
});
</script>
