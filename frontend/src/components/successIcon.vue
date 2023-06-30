<template>
  <loadingIcon :is-fetching="loading" />
  <div
    :id="animationId"
    class="w-4 h-4 2xl:w-6 2xl:h-6"
    :class="loading ? 'hidden' : 'block'"
  ></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import lottie, { AnimationItem } from "lottie-web";
import animation from "../assets/ok.json";
import loadingIcon from "../components/loadingIcon.vue";

export default defineComponent({
  name: "SuccessIcon",
  components: { loadingIcon },
  props: {
    fetchSuccessful: {
      type: Boolean,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },

  mounted() {
    this.initializeAnimation();
  },
  watch: {
    loading(newVal) {
      console.log("loading:" + newVal, this.fetchSuccessful);
      if (!newVal && this.fetchSuccessful) {
        this.playAnimationOnce();
      }
    },
  },
  data() {
    return {
      animationInstance: null as AnimationItem | null,
      animationId: this.getAnimationId(),
    };
  },

  methods: {
    initializeAnimation() {
      const animationContainer = document.getElementById(this.animationId);
      console.log(animationContainer);
      if (!animationContainer) return;

      try {
        this.animationInstance = lottie.loadAnimation({
          container: animationContainer,
          renderer: "svg",
          loop: false,
          autoplay: false,
          animationData: animation,
        });
        console.log(this.animationInstance);
      } catch (error) {
        console.error("Error initializing animation:", error);
      }
    },

    getAnimationId() {
      return `animation-container-${Math.random().toString(36).substring(7)}`;
    },

    playAnimationOnce() {
      if (this.animationInstance) {
        this.animationInstance.play();
      }
    },
  },
});
</script>
