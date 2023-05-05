<template>
  <div class="font-text text-body text-notBlack">
    <label
      :for="name"
      class="block font-semibold lg:font-light lg:text-bodyh"
      >{{ label }}</label
    >
    <input
      :id="name"
      :name="name"
      :type="type"
      :value="value"
      :placeholder="placeholder"
      :required="required"
      class="border-b border-notBlack pr-14 lg:pr-48 w-full focus-visible:border-terracota focus-visible:ring-0 focus-visible:outline-none focus-visible:border-b-2"
      @input="(event: Event) => $emit('input', (event.target as HTMLInputElement).value)"
      @blur="(event: Event) => $emit('blur', event)"
    />
    <span v-if="error" class="text-sm text-red-500">{{ error }}</span>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    value: {
      type: [String, Number],
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: "",
    },
  },
};
</script>
