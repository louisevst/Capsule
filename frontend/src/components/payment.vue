<template>
  <section class="border border-notBlack rounded-lg">
    <div v-if="isEditing">
      <input v-model="newCardType" type="text" placeholder="Enter card type" />
      <input
        v-model="newCardNumber"
        type="text"
        placeholder="Enter card number"
      />
      <button @click="savePayment">Save</button>
    </div>
    <div v-else class="p-4 flex justify-between">
      <img :src="card" alt="Credit card." />
      <div>
        <h2 class="lg:hidden font-semibold">Payment method</h2>
        <p>{{ cardType ? cardType : "Select here your card type." }}</p>
        <p>
          {{ cardNumber ? cardNumber : "Enter your card number." }}
        </p>
      </div>
      <img :src="arrow" alt="Change the address." @click="editPayment" />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import pen from "../assets/edit-2.svg";
import card from "../assets/credit-card.svg";
import arrow from "../assets/arrow_forward.svg";

export default defineComponent({
  name: "payment",
  props: {
    cardType: {
      type: String,
      required: false,
    },
    cardNumber: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      pen,
      card,
      arrow,
      isEditing: false,
      newCardType: "",
      newCardNumber: "",
      updatedCardType: "", // New data property to hold the updated card type
      updatedCardNumber: "", // New data property to hold the updated card number
    };
  },
  computed: {
    formattedCardType(): string {
      return (
        this.updatedCardType || this.cardType || "Card type not saved yet."
      );
    },
    formattedCardNumber(): string {
      return (
        this.updatedCardNumber ||
        this.cardNumber ||
        "Card number not saved yet."
      );
    },
  },
  methods: {
    editPayment() {
      this.isEditing = true;
      this.newCardType = this.cardType || "";
      this.newCardNumber = this.cardNumber || "";
    },
    savePayment() {
      const newCardType = this.newCardType.trim();
      const newCardNumber = this.newCardNumber.trim();
      if (newCardType !== "" && newCardNumber !== "") {
        this.isEditing = false;
        this.updatedCardType = newCardType; // Assign the updated card type to the new data property
        this.updatedCardNumber = newCardNumber; // Assign the updated card number to the new data property
        this.$emit("payment-updated", {
          cardType: newCardType,
          cardNumber: newCardNumber,
        });
      }
    },
  },
});
</script>
