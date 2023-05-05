<template>
  <form class="mt-48 flex justify-center items-center flex-col">
    <Input
      label="Username"
      name="username"
      v-model="username"
      placeholder="Enter your username"
      required
    />
    <Input
      label="Email"
      name="email"
      v-model="email"
      type="email"
      placeholder="Enter your email"
      required
    />
    <Input
      label="Password"
      name="password"
      v-model="password"
      type="password"
      placeholder="Enter your password"
      required
    />
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Input from "../components/Input.vue";

export default defineComponent({
  name: "Login",
  components: { Input },
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
});
</script>
