<template>
  <main class="pt-20 2xl:pt-28 text-notBlack font-text text-body p-4">
    <h1 class="text-xs-xlheadline lg:text-xlheadline font-title m-auto">
      My Orders
    </h1>

    <Loader :is-fetching="loading" />

    <div v-if="!loading">
      <div v-if="orders.length === 0">
        <p>You have placed no orders yet.</p>
      </div>
      <div>
        <div v-for="order in orders.reverse()" :key="order._id">
          <h3 class="text-xs-sub lg:text-sub">
            {{ order.date_ordered ? formatDate(order.date_ordered) : "" }}
          </h3>
          <div v-for="item in order.order_items" :key="item._id" class="my-2">
            <orderProduct
              :price="item.price"
              :image="item.images[0]"
              :color="item.product_variant_id.color"
              :size="item.product_variant_id.size"
              :fit="item.product_variant_id.fit"
            />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script lang="ts">
import PopUp from "../components/PopUp.vue";
import { defineComponent, ref } from "vue";
import Loader from "../components/Loader.vue";
import { useRouter } from "vue-router";
import orderProduct from "../components/orderProduct.vue";
import { ProductDetails } from "../types/Product";

interface User {
  _id: string;
  email: string;
}

interface Order_items {
  _id: string;
  order_id: string;
  price: number;
  product_variant_id: ProductDetails;
  name: string;
  images: Array<string>;
}

interface Order {
  date_ordered: string;
  order_items: Array<Order_items>;
  total_price: number;
  user_id: User;
  _id: string;
}

export default defineComponent({
  name: "Profile",
  components: {
    PopUp,
    orderProduct,
    Loader,
  },
  setup() {
    const router = useRouter();
    const loading = ref(true);
    const orders = ref([] as Array<Order>);
    const isModalVisible = ref(false);
    const userId = ref("");

    function navigate(to: string, cat?: string) {
      const routeParams = cat ? { cat } : {};
      router.push({ name: to, params: routeParams });
    }

    const formatDate = (date: string): string => {
      let orderDay = new Date(date);
      return orderDay
        .toLocaleDateString("en-UK", {
          year: "2-digit",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\//g, ".");
    };

    const fetchOrders = async () => {
      try {
        if (userId.value === "") {
          return (isModalVisible.value = true);
        }
        console.log(userId.value);
        const response = await fetch(
          `http://localhost:8000/api/order/${userId.value}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        console.log(data);
        orders.value = data.orders;
        console.log(orders.value);
        loading.value = false;
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();

    return {
      navigate,
      loading,
      orders,
      isModalVisible,
      formatDate,
      userId,
    };
  },
});
</script>
