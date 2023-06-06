<template>
  <div class="font-text text-body text-notBlack w-full">
    <label
      :for="name"
      class="block font-semibold lg:font-light lg:text-bodyh"
      >{{ label }}</label
    >
    <input
      :id="`current-${name}`"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      class="border-t-transparent bg-notWhite border-x-transparent border-b text-body border-notBlack w-full focus-visible:border-transparent focus-visible:border-b-terracota focus-visible:ring-0 focus-visible:outline-none focus-visible:border-b-2"
      @input="updateValue(($event.target as HTMLInputElement).value)"
      autocomplete="on"
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
    inputValue: {
      type: [String, Number],
      default: "",
    },
  },
  methods: {
    updateValue(value: string) {
      this.$emit("update:inputValue", value);
    },
  },
};
</script>
