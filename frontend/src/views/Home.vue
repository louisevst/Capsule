<template>
  <main class="pb-8">
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
          :onClick="() => navigate('category', 'All')"
          class="flex justify-center items-center lg:self-end"
          textColor="text-notWhite"
          bgColor="bg-notWhite"
          buttonColor="bg-notBlack"
          invertIcon="invert"
        />
      </div>
    </section>
    <section
      class="text-notBlack font-text text-body lg:text-bodyh grid lg:grid-cols-3 p-8 lg:p-0 lg:py-8"
    >
      <img
        src="https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938798/Collection/Spring/Chlo%C3%A9-blouse.jpg"
        alt="An elegant woman near the beach."
        class="lg:max-h-[700px] lg:ml-auto order-2"
      />

      <div class="lg:col-span-2 order-2">
        <h2
          class="lg:mt-10 relative font-title text-xs-headline lg:text-headline p-4 lg:pr-60 2xl:py-10 bg-notWhite text-notBlack lg:bg-terracota lg:text-notWhite"
        >
          Unleash Your Creativity, Elevate Your Wardrobe
        </h2>

        <div
          class="lg:flex bg-terracota lg:bg-notWhite lg:justify-start text-body lg:pr-24 xl:pr-28 2xl:pr-40"
        >
          <div
            class="p-4 lg:p-8 lg:w-1/2 text-notWhite lg:text-notBlack grow flex flex-col justify-start space-y-4"
          >
            <h3 class="font-semibold lg:text-bodyh">
              Simplify Your Style, Save Precious Time
            </h3>
            <p>
              At Capsule, we believe in the power of simplicity and
              sustainability. Our brand is built on the concept of a capsule
              closet, designed to simplify your daily dressing routine while
              minimizing your impact on the environment.
            </p>
            <h3 class="font-semibold lg:hidden">
              Simplify Your Style, Save Precious Time
            </h3>
            <p>
              Gone are the days of rummaging through your wardrobe, trying to
              put together an outfit that works. With our carefully curated
              collection, every piece is thoughtfully created to be effortlessly
              paired with one another. Mixing and matching becomes a breeze,
              allowing you to create a multitude of stylish and unique looks.
            </p>
            <button
              v-if="!showSection"
              class="lg:hidden self-start font-normal py-4 text-blue italic underline mb-4"
              @click="showSection = true"
            >
              Read More
            </button>
          </div>

          <div
            :class="showSection ? 'block' : 'lg:block hidden'"
            class="p-4 lg:p-8 lg:w-1/2 text-notWhite lg:text-notBlack grow flex flex-col justify-start space-y-4"
          >
            <h3 class="font-semibold lg:text-bodyh">
              Sustainability Meets Timeless Chic
            </h3>
            <p>
              We understand the importance of investing in quality clothing that
              stands the test of time. That's why all our garments are produced
              on order, using only the finest recycled and deadstock fabrics. By
              embracing our capsule concept, you'll not only reduce waste but
              also build a closet of versatile, staple pieces that never go out
              of style.
            </p>
            <h3 class="font-semibold lg:hidden">
              Unleash Your Creativity, Elevate Your Wardrobe
            </h3>
            <p>
              A capsule closet is a wardrobe composed of timeless and essential
              pieces, carefully selected to offer endless outfit possibilities.
              From boardroom meetings to casual weekend brunches, our collection
              effortlessly adapts to any occasion, ensuring you always look
              polished and put together.
            </p>
          </div>
        </div>
      </div>
    </section>
    <CollectionCard />
    <section class="lg:grid lg:grid-cols-2 lg:relative lg:my-20 my-4">
      <img
        src="https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938790/Images/pexels-cottonbro-studio-5119398_ug10ij.jpg"
        class="lg:max-h-screen lg:ml-auto col-span-2"
      />
      <div
        class="bg-notWhite text-notBlack p-4 py-8 space-y-4 row-span-1 lg:space-y-8 xl:space-y-12 lg:absolute lg:left-0 lg:m-10 xl:m-52 lg:p-14 lg:max-w-4xl"
      >
        <h2 class="font-title text-xs-headline lg:text-headline">
          We love sustainable fashion.
        </h2>
        <p class="font-text text-body lg:text-bodyh">
          All of our clothes are made-by-order, allowing you to choose the
          perfect lenght and color for your piece.
        </p>
        <CTA
          text="About us"
          :onClick="() => navigate('about')"
          class="flex justify-center items-center lg:self-end"
          bgColor="bg-notWhite"
          buttonColor="bg-green"
          textColor="text-notWhite"
        />
      </div>
    </section>
    <section
      class="p-4 text-notBlack font-text text-body space-y-4 lg:flex lg:px-20 lg:justify-center lg:items-center xl:pb-20"
    >
      <img
        src="https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938791/Images/pexels-monstera-7691207_ay4uxa.jpg"
        alt="Three women from different ethnicities in pastel blazer."
        class="rounded-t-full lg:max-w-md"
      />
      <div class="lg:pl-10">
        <h2 class="font-title text-xs-headline lg:text-headline p-4">
          Build your own capsule wardrobe.
        </h2>
        <h3 class="text-body font-semibold lg:text-bodyh p-4">
          Elevate Your Everyday Style with Effortless Versatility
        </h3>
        <div class="lg:flex lg:mr-20 2xl:mr-40 lg:py-10">
          <p class="p-4">
            Are you tired of feeling stuck in the same outfit cycle, unsure of
            what to wear? It's time to transform your wardrobe with Capsule. Our
            carefully crafted collection of high-quality, versatile pieces is
            designed to offer endless outfit possibilities. Each garment is
            thoughtfully selected to effortlessly complement one another,
            ensuring a seamless mix-and-match experience. From boardroom
            meetings to casual weekend brunches, our curated selection adapts to
            any occasion, helping you effortlessly create polished and
            put-together looks. Catering to diverse body types, we offer a range
            of fits, including options for tall, regular, and petite sizes, from
            XXS to XXL. Take control of your style and build a capsule wardrobe
            that reflects your unique personality and values.
          </p>
          <button
            v-if="!showMore"
            class="lg:hidden text-terracota font-normal p-4 pt-0 italic underline mb-4"
            @click="showMore = true"
          >
            Read More
          </button>

          <p class="p-4" :class="showMore ? 'block' : 'lg:block hidden'">
            At Capsule, we believe in the power of sustainable fashion to make a
            positive impact on both you and the planet. Our clothes are crafted
            to last, using the finest quality materials and meticulous attention
            to detail. By investing in timeless pieces that transcend fleeting
            trends, you can build a wardrobe that stands the test of time. Our
            carefully selected color palette ensures versatility and the ability
            to effortlessly coordinate outfits. We take pride in offering a
            diverse and inclusive range of sizes, empowering every woman to
            embrace her style and feel confident in her clothing choices. Join
            us in embracing sustainability and elevate your wardrobe with
            consciously crafted pieces that make a lasting impression.
          </p>
        </div>
        <CTA
          text="About us"
          :onClick="() => navigate('about')"
          class="flex justify-center items-center lg:self-end"
          textColor="text-notWhite"
          bgColor="bg-notWhite"
          buttonColor="bg-terracota"
        />
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CTA from "../components/CTA.vue";
import Navbar from "../components/Navbar.vue";
import { useRouter } from "vue-router";
import CollectionCard from "../components/CollectionCard.vue";

export default defineComponent({
  name: "Home",
  components: {
    CTA,
    Navbar,
    CollectionCard,
  },
  data() {
    return { showSection: false, showMore: false };
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
