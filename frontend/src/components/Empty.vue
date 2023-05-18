<template>
  <main
    class="h-screen bg-cover bg-center bg-[url('https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938789/Images/h-f-e-studio-mZ7ZsqrG4is-unsplash_q2z6lm.jpg')] lg:bg-[url('https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938790/Images/pexels-cottonbro-studio-7871151_wfmgwi.jpg')] lg:filter lg:grayscale"
  >
    <section
      class="flex flex-col h-full justify-between items-center text-notWhite py-40 lg:bg-black/10"
    >
      <h1 class="text-xs-headline font-title lg:text-headline">{{ title }}</h1>
      <p class="font-text text-xs-sub lg:text-sub">{{ text }}</p>
      <CTA
        text="Explore our collection"
        :onClick="() => navigate('products', 'all')"
        class="flex justify-center items-center"
        textColor="text-notWhite"
        bgColor="bg-notWhite"
        buttonColor="bg-notBlack"
      />
    </section>
  </main>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import CTA from "../components/CTA.vue";
import Navbar from "../components/Navbar.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Empty",
  props: {
    title: {
      type: String,
      default: "Modal Title",
    },
    text: {
      type: String,
      default: "ebjbdjbjjdjdjjsjskolfohkidhdigbjdj",
    },
  },
  components: {
    CTA,
    Navbar,
  },
  setup() {
    const router = useRouter();

    function navigate(to: string, cat?: string) {
      const routeParams = cat ? { cat } : {};
      router.push({ name: to, params: routeParams });
    }

    return {
      navigate,
    };
  },
});
</script>
