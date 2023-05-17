<template>
  <PopUp
    :showModal="isModalVisible"
    title="Modal Title"
    @update:show-modal="isModalVisible = $event"
    :onClick1="() => console.log('click')"
    :onClick2="() => console.log('click')"
  >
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus qui
      nihil laborum quaerat blanditiis nemo explicabo voluptatum ea architecto
      corporis quo vitae, velit temporibus eaque quisquam in quis provident
      necessitatibus.
    </p>
  </PopUp>
  <button @click="isModalVisible = !isModalVisible" type="button" class="pt-40">
    Toggle Modal
  </button>
</template>

<script lang="ts">
import PopUp from "../components/PopUp.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Profile",
  components: {
    PopUp, // Register the PopUp component
  },
  data() {
    return {
      isModalVisible: false,
    };
  },
});
</script>
