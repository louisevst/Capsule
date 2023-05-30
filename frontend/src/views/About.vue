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
        class="bg-notBlack/30 lg:bg-notWhite lg:px-20 2xl:pr-40 lg:text-notBlack h-full lg:h-screen flex justify-center flex-col px-4 space-y-8 lg:space-y-16"
      >
        <h1 class="text-xs-xlheadline lg:text-xlheadline font-title">
          Who are we ?
        </h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur in
          nisi vitae nulla imperdiet dapibus in at justo. Vestibulum ante ipsum
          primis in faucibus orci
        </p>
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
      <div class="px-8 pt-4 lg:w-1/4">
        <img
          src="https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938790/Images/pexels-alessio-cesario-1906815_cldc0w.jpg"
          class="rounded-t-full w-full lg:mb-8"
        />
      </div>
      <div
        class="absolute inset-x-0 top-2/4 bg-green -z-50 h-2/4 lg:top-1/4 lg:h-3/4"
      ></div>
      <div
        class="bg-green p-8 space-y-8 relative lg:w-3/4 lg:self-end lg:m-auto lg:bg-transparent"
      >
        <h2 class="text-xs-headline lg:text-headline font-title lg:text-start">
          Our engagements.
        </h2>
        <p class="lg:max-w-4xl lg:self-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur in
          nisi vitae nulla imperdiet dapibus in at justo. Vestibulum ante ipsum
          primis in faucibus orci luctus et ultrices posuere cubilia curae;
          Nullam finibus, nunc eu pellentesque sollicitudin, purus dolor aliquam
          nisl, pharetra porta enim mi a mauris. Maecenas ex dolor,.
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
