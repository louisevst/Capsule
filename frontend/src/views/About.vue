<template>
  <orderSuccess />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import orderSuccess from "../components/Order-success.vue";

export default defineComponent({
  name: "About",
  components: { orderSuccess },
});
</script>
