<template>
  <picture>
    <source
      media="(min-width: 1000px)"
      srcset="
        https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938791/Images/pexels-monstera-7691089_fidxol.jpg
      "
    />
    <img
      src="https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938791/Images/pexels-monstera-7691041_z7d156.jpg"
      alt="imagealttext"
      class="h-screen w-full object-cover"
    />
    <CTA text="Discover our collection" :onClick="handleClick" />
  </picture>
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
