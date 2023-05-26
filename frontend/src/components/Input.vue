<template>
  <div class="font-text text-body text-notBlack w-full">
    <label
      :for="name"
      class="block font-semibold lg:font-light lg:text-bodyh"
      >{{ label }}</label
    >
    <input
      :id="name"
      :name="name"
      :type="type"
      :value="inputValue"
      :placeholder="placeholder"
      :required="required"
      class="border-t-transparent border-x-transparent border-b text-body border-notBlack w-full focus-visible:border-transparent focus-visible:border-b-terracota focus-visible:ring-0 focus-visible:outline-none focus-visible:border-b-2"
      @input="updateValue($event as InputEvent)"
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
      default: null,
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
  computed: {
    inputValue: {
      get() {
        return this.value;
      },
      set(newValue: string | number) {
        this.$emit("input", newValue);
      },
    },
  },
  methods: {
    updateValue(event: InputEvent) {
      const value = (event.target as HTMLInputElement).value;
      this.$emit("input", value);
    },
  },
};
</script>
