<template>
  <PopUp
    :showModal="loading"
    title="Modal Title"
    @update:show-modal="loading = $event"
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
  <div>
    <h1>My Profile</h1>
    <div v-if="loading">...</div>
    <div v-else>
      <h2>My Orders</h2>
      <ul>
        <li v-for="order in orders" :key="order.id">
          <div>Order ID: {{ order.id }}</div>
          <div>Order Date: {{ order.date }}</div>
          <div>Order Total: {{ order.total }}</div>
        </li>
      </ul>
    </div>
  </div>
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
    const userId: string = this.$cookies.get("id") || "";
    return {
      loading: true,
      orders: [],
      user_id: userId,
    };
  },
  async created() {
    try {
      const response = await fetch(
        `http://localhost:8000/api/order/${this.user_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      this.orders = data;
      this.loading = false;
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  },
});
</script>
