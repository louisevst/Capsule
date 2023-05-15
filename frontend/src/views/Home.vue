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
    class="text-notBlack font-text text-body lg:text-bodyh grid lg:grid-cols-3 p-8"
  >
    <img
      src="https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938798/Collection/Spring/Chlo%C3%A9-blouse.jpg"
      alt="An elegant woman near the beach."
      class="lg:max-h-[900px] lg:ml-auto order-2"
    />

    <div class="lg:col-span-2 order-2">
      <h2
        class="lg:mt-10 relative font-title text-xs-headline lg:text-headline p-4 lg:pr-60 bg-notWhite text-notBlack lg:bg-terracota lg:text-notWhite"
      >
        Spare your precious time<br />
        with our capsule concept.
      </h2>

      <div class="lg:flex bg-terracota lg:bg-notWhite lg:justify-start">
        <p
          class="p-4 lg:p-8 lg:w-1/2 text-notWhite lg:text-notBlack lg:max-w-2xl"
        >
          All of our clothes are meant to be worn with each other. Allowing you
          to mix & match your pieces together. We think that the key to
          sustainable fashion is to buy quality clothing that is meant to last.
        </p>
        <p
          class="p-4 lg:p-8 lg:w-1/2 text-notWhite lg:text-notBlack lg:max-w-2xl"
        >
          A capsule closet is a closet composed with basic, timeless and stpled
          pieces where you can easily build nice and differents outfits with.
          Buy quality, not quantity.
        </p>
      </div>
    </div>
  </section>
  <section class="lg:grid lg:grid-cols-2 lg:relative lg:my-20 my-4">
    <img
      src="https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938790/Images/pexels-cottonbro-studio-5119398_ug10ij.jpg"
      class="lg:max-h-screen lg:ml-auto col-span-2"
    />
    <div
      class="bg-green text-notWhite p-4 py-8 space-y-4 row-span-1 lg:space-y-8 xl:space-y-12 lg:absolute lg:left-0 lg:m-10 xl:m-52 lg:p-14 lg:max-w-4xl"
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
  <section
    class="p-4 text-notBlack font-text text-body space-y-4 lg:flex lg:px-20 lg:justify-center lg:items-center xl:p-60"
  >
    <img
      src="https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938791/Images/pexels-monstera-7691207_ay4uxa.jpg"
      alt="Trhee women from different ethnicities in pastel blazer."
      class="rounded-t-full lg:max-w-md"
    />
    <div class="lg:pl-10 lg:space-y-8 space-y-4">
      <h2 class="font-title text-xs-headline lg:text-headline">
        Build your own capsule wardrobe.
      </h2>
      <h3 class="text-body font-semibold lg:text-bodyh">
        All of our clothes are meant to last and be as versatile as possible.
      </h3>
      <div class="lg:flex">
        <p class="lg:p-4 lg:max-w-sm">
          Tired of being stuck with the same repeating outfit and not knowing
          what you can wear? We’re here for you ! The concept of a capsule
          wardrobe is to have quality pieces that are easy to wear together.
        </p>
        <p class="lg:p-4 lg:max-w-sm">
          Our collections are build to mix & match with every other piece. Our
          large colour selection allows you to get the color that suit your
          features the best.
        </p>
      </div>
      <CTA
        text="About us"
        :onClick="handleClick"
        class="flex justify-center items-center lg:self-end"
        textColor="text-notWhite"
        bgColor="bg-notWhite"
        buttonColor="bg-terracota"
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
