<template>
  <section>
    <h2 class="text-xs-headline lg:text-headline font-title">
      My informations
    </h2>
    <form
      @submit="handleSubmit"
      class="space-y-2 border rounded-lg p-4 border-notBlack"
    >
      <Input
        label="Current Password"
        name="currentPassword"
        type="password"
        v-model="currentPassword"
        placeholder="Enter your current password"
        required
      />
      <Input
        label="New Password"
        name="newPassword"
        type="password"
        v-model="newPassword"
        placeholder="Enter your new password"
        required
      />
      <Input
        label="Confirm New Password"
        name="confirmNewPassword"
        type="password"
        v-model="confirmNewPassword"
        placeholder="Confirm your new password"
        required
      />
      <Input
        label="Email"
        name="email"
        type="email"
        v-model="email"
        placeholder="Enter your new email"
        required
      />
      <CTA
        text="Update"
        :onClick="(event:Event) => handleSubmit(event)"
        class="flex justify-center items-center lg:self-end"
        textColor="text-notWhite"
        bgColor="bg-notWhite"
        buttonColor="bg-terracota"
        type="submit"
      />
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Input from "../components/Input.vue";
import CTA from "./CTA.vue";
import { IUser } from "../types/User";

export default defineComponent({
  name: "editUser",
  components: { Input, CTA },
  data() {
    const userId: string = this.$cookies.get("id") || "";
    const userToken: string = this.$cookies.get("token") || "";
    return {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      email: "",
      user_id: userId,
      token: userToken,
      user: {} as IUser,
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    async getUser() {
      try {
        const response = await fetch(
          `https://capsule-wardrobe.onrender.com:8000/api/auth/${this.user_id}  `,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        const data = await response.json();
        this.user = {
          ...data,
          payment_card: data.payment_card || "", // Initialize with an empty string if undefined
          payment_type: data.payment_type || "", // Initialize with an empty string if undefined
          address: data.address || "", // Initialize with an empty string if undefined
        };
      } catch (error) {
        console.log(error);
      }
    },
    async handleSubmit(event: Event) {
      event.preventDefault(); // prevent the default form submission behavior

      // Perform validation

      // Make API request to change password and email

      try {
        this.user.password = this.newPassword;
        const response = await fetch(
          `https://capsule-wardrobe.onrender.com:8000/api/auth/${this.user_id}`,
          {
            method: "PUT",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",

              Authorization: `Bearer ${this.token}`,
            },
            body: JSON.stringify(this.user),
          }
        );

        if (response.ok) {
          console.log("user updated successfully");
        } else {
          console.error("Failed to update user:", response.statusText);
        }
      } catch (error) {
        console.error("Error updating user:", error);
      }
    },
  },
});
</script>
