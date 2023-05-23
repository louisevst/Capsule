<template>
  <h2 class="hidden lg:block">Address</h2>
  <section class="border border-notBlack rounded-lg p-4" v-if="!isEditing">
    <div class="flex justify-between">
      <img :src="truck" alt="Delivery truck" />
      <div>
        <h3 class="lg:hidden font-semibold">Delivery address</h3>
        <p>{{ first_name }} {{ last_name }}</p>
        <p>{{ formattedAddress }}</p>
      </div>
      <img :src="arrow" alt="Change the address." @click="editAddress" />
    </div>
  </section>
  <section v-else class="border border-notBlack rounded-lg p-4">
    <input v-model="newAddress" type="text" placeholder="Enter new address" />
    <button @click="saveAddress">Save</button>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import truck from "../assets/truck.svg";
import pen from "../assets/edit-2.svg";
import arrow from "../assets/arrow_forward.svg";

export default defineComponent({
  props: {
    address: {
      type: String,
      required: false,
    },
    last_name: { String, required: true },
    first_name: { String, required: true },
  },
  data() {
    return {
      truck,
      pen,
      arrow,
      isEditing: false,
      newAddress: "",
      updatedAddress: "", // New data property to hold the updated address
    };
  },
  computed: {
    formattedAddress(): string {
      return this.updatedAddress || this.address || "Address not saved yet.";
    },
  },
  methods: {
    editAddress() {
      this.isEditing = true;
      this.newAddress = this.address || "";
    },
    saveAddress() {
      const newAddress = this.newAddress.trim();
      if (newAddress !== "") {
        this.isEditing = false;
        this.updatedAddress = newAddress; // Assign the updated address to the new data property
        this.$emit("address-updated", newAddress);
      }
    },
  },
});
</script>
