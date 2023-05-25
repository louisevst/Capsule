<template>
  <footer
    class="w-full bg-blue text-notBlack font-text flex justify-center items-center flex-col py-4 space-y-8 lg:space-y-14 lg:py-8"
  >
    <router-link to="/"
      ><span class="font-logo lg:text-headline text-xs-headline">CAPSULE</span>
    </router-link>
    <div class="space-x-6 lg:space-x-20">
      <router-link
        to="/about"
        class="text-body font-semibold lg:text-bodyh lg:font-light"
        >About</router-link
      >

      <router-link
        to="/contact"
        class="text-body font-semibold lg:text-bodyh lg:font-light"
        >Contact</router-link
      >

      <router-link
        to="/sign-up"
        class="text-body font-semibold lg:text-bodyh lg:font-light"
        >Shop</router-link
      >
    </div>
    <div class="flex space-x-3 lg:space-x-6">
      <img :src="facebook" class="w-6 h-6" />
      <img :src="instagram" class="w-6 h-6" />
    </div>
    <div
      class="text-sm flex justify-center flex-col items-center lg:flex-row lg:space-x-1"
    >
      <p>We value your privacy.</p>
      <p>View our cookie policy <u>here</u></p>
    </div>
  </footer>
</template>
<script lang="ts">
import instagram from "../assets/instagram.svg";
import facebook from "../assets/facebook.svg";

export default {
  data() {
    return {
      facebook,
      instagram,
    };
  },
};
</script>
