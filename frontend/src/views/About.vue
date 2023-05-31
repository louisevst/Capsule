<template>
  <main class="font-text text-notWhite text-body">
    <section
      class="relative h-screen bg-cover lg:overflow-hidden bg-[url(https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938790/Images/pexels-anna-shvets-4672246_agsc78.jpg)] lg:bg-none lg:grid lg:grid-cols-2"
    >
      <img
        src="https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938790/Images/pexels-anna-shvets-4672246_agsc78.jpg"
        class="hidden lg:block"
      />
      <div
        class="bg-notBlack/40 lg:bg-notWhite md:px-10 lg:px-20 2xl:pr-40 lg:text-notBlack h-full lg:h-screen flex justify-center flex-col px-4 space-y-8 lg:space-y-16"
      >
        <h1
          class="text-xs-xlheadline lg:text-xlheadline font-title text-center mt-2"
        >
          Who are we ?
        </h1>
        <div class="space-y-4">
          <p>
            At Capsule, we are driven by a strong desire to reduce
            <strong>clothing waste</strong> and empower women to feel confident
            and beautiful without spending hours getting dressed.
          </p>
          <p>
            Join our community that celebrates individuality, style, and
            sustainability. Choose Capsule for a more conscious and
            <strong>empowering</strong>
            way of dressing. Together, let's redefine fashion and make a
            difference.
          </p>
          <p>
            We are here to help you build a <strong>quality</strong>,
            <strong>long-lasting</strong> capsule wardrobe that simplifies your
            daily dressing routine. Embrace style and purpose. Welcome to
            Capsule.
          </p>
        </div>
        <CTA
          text="Discover our collection"
          :onClick="() => navigate('category', 'All')"
          class="flex justify-center items-center lg:self-end"
          textColor="text-notWhite"
          bgColor="bg-notWhite"
          buttonColor="bg-terracota"
          invertIcon="invert"
        />
      </div>
    </section>
    <section
      class="relative lg:flex lg:flex-row-reverse h-full w-full lg:px-20 2xl:px-40 lg:py-8 my-8"
    >
      <div
        class="px-8 pt-4 lg:w-1/4 lg:px-0 lg:mr-20 xl:mr-28 2xl:mr-40 md:flex md:justify-center md:w-full"
      >
        <img
          src="https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938790/Images/pexels-alessio-cesario-1906815_cldc0w.jpg"
          class="rounded-t-full w-full lg:mb-8 lg:-translate-y-14 md:w-1/2"
        />
      </div>
      <div
        class="absolute inset-x-0 top-2/4 bg-green -z-50 h-2/4 lg:top-14 lg:h-[90%]"
      ></div>
      <div
        class="bg-green p-8 space-y-8 lg:space-y-4 relative lg:w-3/4 lg:self-end lg:m-auto lg:bg-transparent md:px-10 lg:px-0"
      >
        <h2 class="text-xs-headline lg:text-headline font-title lg:text-start">
          Our engagements.
        </h2>
        <h4 class="font-semibold lg:font-light lg:text-bodyh">
          Sustainablity & Quality
        </h4>
        <p class="lg:max-w-4xl lg:self-center">
          We are committed to sustainable fashion through our production
          methods. By making clothes on order, we avoid overproduction and
          reduce waste. Additionally, we prioritize the use of deadstock and
          recycled fabrics, minimizing our environmental footprint.
        </p>
        <p class="lg:max-w-4xl lg:self-center">
          Our manufacturing process takes place in our own facility, allowing us
          to closely monitor the quality of every garment we produce. We take
          pride in delivering clothing that is built to last, ensuring that your
          purchase from Capsule is a worthwhile investment.
        </p>
        <h4 class="font-semibold lg:font-light lg:text-bodyh">
          Inclusivity Baby
        </h4>
        <p class="lg:max-w-4xl lg:self-center">
          When you choose Capsule, you can be confident that your purchase won't
          go wrong. Our carefully curated collection of timeless pieces ensures
          that every item is versatile and can be effortlessly mixed and matched
          to create stylish outfits for any occasion.
        </p>
        <p class="lg:max-w-4xl lg:self-center">
          We believe that fashion should be inclusive and cater to all body
          types. That's why we offer a wide range of sizes and fits, from petite
          to tall and XXS to XXL. Our made-to-order approach allows us to
          accommodate diverse body shapes and sizes, ensuring that everyone can
          find their perfect fit.
        </p>
      </div>
    </section>
    <YouMightLike title="The essentials" />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import YouMightLike from "../components/YouMightLike.vue";
import CTA from "../components/CTA.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "About",
  components: { YouMightLike, CTA },
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
