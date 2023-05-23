<template>
  <div class="mt-20">
    <h1>My Profile</h1>
    <div v-if="loading">...</div>
    <div v-else>
      <h2>My Orders</h2>
      <ul>
        <li v-for="order in orders" :key="order._id">
          <div>Order ID: {{ order._id }}</div>
          <div>Order Date: {{ order.date_ordered }}</div>
          <div>Order Total: {{ order.total_price }}</div>
          <div>
            Ordered Items:
            <ul>
              <li v-for="item in order.order_items" :key="item._id">
                <div>
                  Product: {{ item.product_variant_id.color }}
                  {{ item.product_variant_id.fit }}
                  {{ item.product_variant_id.size }}
                </div>
                <div>Price: {{ item.price }}</div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import PopUp from "../components/PopUp.vue";
import { defineComponent } from "vue";

interface Product {
  color: string;
  fit: string;
  size: string;
  image: Array<string>;
}
interface User {
  _id: string;
  email: string;
}
interface Order_items {
  order_id: string;
  price: number;
  product_variant_id: Product;
}
interface Order {
  date_ordered: Date;
  order_items: Array<Order_items>;
  total_price: number;
  user_id: User;
  _id: string;
}
export default defineComponent({
  name: "Profile",
  components: {
    PopUp, // Register the PopUp component
  },
  data() {
    const userId: string = this.$cookies.get("id") || "";
    return {
      loading: true,
      orders: [] as Array<Order>,
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
      this.orders = data.orders;
      console.log(this.orders);
      this.loading = false;
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  },
});
</script>
