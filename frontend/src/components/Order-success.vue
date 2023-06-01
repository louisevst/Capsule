<template>
  <main class="pt-24 pb-8 h-screen flex flex-col justify-around items-center">
    <section
      id="animation-container"
      class="md:w-full md:px-8 lg:px-20 2xl:px-40"
    ></section>
    <section class="p-4 space-y-8">
      <h1 class="text-center text-xs-xlheadline font-title lg:text-xlheadline">
        Your order is on it's way.
      </h1>
      <p class="pl-4">
        Check your inbox ! We just sent you an email with your order
        confirmation.
      </p>
    </section>
    <CTA
      text="Continue shopping"
      :onClick="() => navigate('category', 'All')"
      class="flex justify-center items-center"
      textColor="text-notWhite"
      bgColor="bg-notWhite"
      buttonColor="bg-terracota"
    />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import lottie from "lottie-web";
import animation from "../assets/order-success.json";
import CTA from "./CTA.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "orderSuccess",
  components: { CTA },
  mounted() {
    const animationContainer = document.getElementById("animation-container");

    lottie.loadAnimation({
      container: animationContainer!,
      renderer: "svg", // Choose the appropriate renderer (svg, canvas, html)
      loop: true, // Set to true if you want the animation to loop
      autoplay: true, // Set to true if you want the animation to play automatically
      animationData: animation,
    });
  },
  setup() {
    const router = useRouter();
    function navigate(to: string, cat?: string) {
      const routeParams = cat ? { slug: cat } : {};
      router.push({ name: to, params: routeParams });
    }
    return {
      navigate,
    };
  },
});
</script>
