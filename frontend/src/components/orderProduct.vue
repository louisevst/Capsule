<template>
  <article
    class="bg-notWhite/20 rounded-xl text-notBlack text-body p-4 border border-notBlack flex flex-col justify-between md:max-w-[700px]"
  >
    <div class="grid grid-cols-4">
      <img :src="image" />
      <div
        class="flex flex-col justify-between mx-4 md:justify-center md:space-y-2 col-span-1"
      >
        <p>Price:</p>
        <p>Color:</p>
        <p>Fit:</p>
        <p>Size:</p>
      </div>
      <div
        class="flex flex-col justify-between items-start mx-4 col-span-1 md:justify-center md:space-y-2"
      >
        <p>{{ price }} €</p>
        <div
          :class="`bg-${color}`"
          class="w-4 h-4 border border-notBlack rounded-full lg:w-8 lg:h-8"
        ></div>

        <p>{{ fit }}</p>
        <p>{{ size }}</p>
      </div>
    </div>
  </article>
</template>

<script lang="ts">
export default {
  name: "orderProduct",
  props: {
    price: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    fit: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
};
</script>
