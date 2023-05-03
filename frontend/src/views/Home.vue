<template>
  <div>
    <Navbar />
    <h1>Welcome to the Home Page!</h1>
    <CTA text="Discover our collection" :onClick="handleClick"></CTA>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CTA from "../components/CTA.vue";
import Navbar from "../components/Navbar.vue";

export default defineComponent({
  name: "Home",
  components: {
    CTA,
    Navbar,
  },
  methods: {
    handleClick() {
      console.log("Button clicked!");
    },
  },
});
</script>
