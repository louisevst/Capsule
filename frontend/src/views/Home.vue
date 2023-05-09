<template>
  <section
    class="h-screen w-full bg-cover bg-center bg-[url(https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938791/Images/pexels-monstera-7691041_z7d156.jpg)] lg:bg-[url(https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938791/Images/pexels-monstera-7691089_fidxol.jpg)]"
  >
    <div
      class="p-4 lg:p-32 bg-white/10 space-y-8 xl:space-y-28 flex flex-col justify-center items-center h-full w-full"
    >
      <h1
        class="text-notBlack font-title text-xs-xlheadline lg:text-xlheadline lg:self-end"
      >
        Timeless, simple and stylish
      </h1>
      <CTA
        text="Discover our collection"
        :onClick="handleClick"
        class="flex justify-center items-center lg:self-end"
        textColor="text-notWhite"
        bgColor="bg-notWhite"
        buttonColor="bg-notBlack"
        invertIcon="invert"
      />
    </div>
  </section>
  <section
    class="text-notBlack font-text text-body lg:text-bodyh relative pb-80 lg:pb-96 flex flex-col items-center lg:flex-row-reverse"
  >
    <div
      class="bg-terracota text-notWhite space-y-4 h-3/4 pb-40 lg:pb-4 lg:flex lg:flex-col lg:space-y-0 lg:bg-notWhite lg:text-notBlack"
    >
      <h2
        class="font-title text-xs-headline lg:text-headline p-4 lg:p-8 bg-notWhite text-notBlack lg:bg-terracota lg:text-notWhite lg:pl-[700px] lg:py-10"
      >
        Spare your precious time with our capsule concept.
      </h2>
      <diV class="lg:flex lg:pl-[700px]">
        <p class="p-4 lg:p-8 lg:w-1/2">
          All of our clothes are meant to be worn with each other. Allowing you
          to mix & match your pieces together. We think that the key to
          sustainable fashion is to buy quality clothing that is meant to last.
        </p>
        <p class="p-4 lg:p-8 lg:w-1/2">
          A capsule closet is a closet composed with basic, timeless and stpled
          pieces where you can easily build nice and differents outfits with.
          Buy quality, not quantity.
        </p>
      </diV>
    </div>
    <img
      src="https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938798/Collection/Spring/Chlo%C3%A9-blouse.jpg"
      alt="An elegant woman near the beach."
      class="absolute bottom-0 max-h-[425px] lg:top-10 lg:left-10 lg:max-h-[865px] lg:h-[80vh] pb-8 lg:pb-0"
    />
  </section>
  <section class="lg:relative">
    <img
      src="https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938790/Images/pexels-cottonbro-studio-5119398_ug10ij.jpg"
      class="lg:ml-auto lg:h-screen"
    />
    <div
      class="bg-khaki text-notWhite p-4 py-8 space-y-4 lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:space-y-8 lg:p-20 lg:px-32 lg:left-10 lg:max-w-[800px]"
    >
      <h2 class="font-title text-xs-headline lg:text-headline">
        We love sustainable fashion.
      </h2>
      <p class="font-text text-body lg:text-bodyh">
        All of our clothes are made-by-order, allowing you to choose the perfect
        lenght and color for your piece.
      </p>
      <CTA
        text="About us"
        :onClick="handleClick"
        class="flex justify-center items-center lg:self-end"
        bgColor="bg-notWhite"
        buttonColor="bg-blue"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CTA from "../components/CTA.vue";
import Navbar from "../components/Navbar.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Home",
  components: {
    CTA,
    Navbar,
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
