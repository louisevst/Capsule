<template>
  <notFound />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import notFound from "../components/404.vue";

export default defineComponent({
  name: "About",
  components: { notFound },
});
</script>
