<template>
  <section
    class="flex font-title text-xs-headline lg:text-headline lg:flex-row flex-col text-notBlack lg:text-notWhite lg:justify-between lg:h-[700px] 2xl:h-[800px] w-full lg:items-center"
  >
    <div
      v-for="(card, index) in cards"
      :key="index"
      :class="{
        'lg:w-[500px] lg:h-[500px]  relative':
          index !== middleCardIndex || isOtherCardHovered,
        'lg:w-[600px] lg:h-[600px] relative':
          index === middleCardIndex && !isOtherCardHovered,

        ' cursor-pointer': true,
        'lg:hover:h-[600px] lg:hover:w-[600px]': true,
      }"
      @click="navigate('collection', card.title)"
      @mouseover="isOtherCardHovered = true"
      @mouseleave="isOtherCardHovered = false"
    >
      <h4 class="text-center lg:absolute lg:bottom-0 w-full py-4">
        {{ card.title }}
      </h4>
      <img :src="card.imageUrl" class="w-full" />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "CollectionCard",
  data() {
    return {
      cards: [
        {
          title: "Spring/Summer",
          imageUrl:
            "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938792/Images/pexels-cottonbro-studio-10679210_2_upozdr.jpg",
        },
        {
          title: "Swimwear",
          imageUrl:
            "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938793/Images/pexels-italo-melo-2120079_2_pepqoh.jpg",
        },
        {
          title: "Party",
          imageUrl:
            "https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938792/Images/pedro-miranda-nAJWJNh2UFI-unsplash_2_ljo1x4.jpg",
        },
      ],
      isOtherCardHovered: false,
    };
  },
  computed: {
    middleCardIndex() {
      return Math.floor(this.cards.length / 2);
    },
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
