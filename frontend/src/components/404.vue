<template>
  <section
    class="text-notWhite text-xs-sub lg:text-sub bg-cover bg-center bg-[url(https://res.cloudinary.com/da3ulvbxj/image/upload/v1683628412/Images/martino-pietropoli-pirWeToS2mA-unsplash_2_yxwkok.jpg)] lg:w-full h-screen lg:bg-[url(https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938789/Images/martino-pietropoli-pirWeToS2mA-unsplash_ywskxh.jpg)]"
  >
    <div
      class="px-4 space-y-8 lg:space-y-20 bg-black/20 w-full h-full flex flex-col justify-center items-center"
    >
      <h1 class="text-xs-xlheadline font-title lg:text-xlheadline">404</h1>
      <p class="text-center">You have reached the door to the great nothing.</p>
      <CTA text="Go back to home" :onClick="handleClick" />
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import CTA from "./CTA.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "notFound",
  components: {
    CTA,
  },
  setup() {
    const router = useRouter();

    function handleClick() {
      router.push({ name: "home" }); // navigate to the home page
    }

    return {
      handleClick,
    };
  },
});
</script>
