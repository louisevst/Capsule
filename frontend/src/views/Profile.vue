<template>
  <main class="pt-20 2xl:pt-28 text-notBlack font-text text-body p-2">
    <div class="flex items-center">
      <img
        :src="back"
        @click="goBack"
        class="lg:w-12 lg:h-12 w-6 h-6 mr-auto lg:ml-10 2xl:ml-40"
      />
      <h1
        class="font-title text-xs-xlheadline lg:text-xlheadline text-center lg:pb-10 mr-auto lg:m-0 self-end lg:w-full"
      >
        My profile
      </h1>
    </div>
    <PopUp
      :showModal="isModalVisible"
      title="Hi there !"
      @update:show-modal="isModalVisible = $event"
      :onClick1="() => navigate('login')"
      :onClick2="() => navigate('sign-up')"
      button1text="Login"
      button2text="Sign up"
      :class="'hidden'"
    >
      <p>To add an item to your cart please login or sign up if you're new.</p>
    </PopUp>
    <Loader :is-fetching="loading" />

    <div
      v-if="!loading"
      class="space-y-4 lg:grid lg:grid-cols-2 lg:gap-4 2xl:gap-20 lg:px-10 2xl:px-40"
    >
      <!-- <editUser /> -->
      <div
        v-if="orders.length === 0"
        class="flex flex-col justify-between space-y-2 lg:space-y-4 pb-2 lg:pb-4 2xl:pb-10 items-start lg:order-first"
      >
        <h2 class="text-xs-headline lg:text-headline font-title">Orders</h2>
        <p class="text-xs-sub lg:text-sub">You have placed no orders yet.</p>
        <CTA
          text="Discover our collection"
          :onClick="() => navigate('about')"
          textColor="text-notWhite"
          bgColor="bg-notWhite"
          buttonColor="bg-terracota"
        />
      </div>
      <div v-else class="lg:order-first">
        <h2 class="text-xs-headline lg:text-headline font-title">My Orders</h2>
        <div v-for="order in orders.reverse()" :key="order._id">
          <h3 class="text-xs-sub lg:text-sub">
            {{ order.date_ordered ? formatDate(order.date_ordered) : "" }}
          </h3>
          <div v-for="item in order.order_items" :key="item._id" class="my-2">
            <orderProduct
              :price="item.price"
              :image="item.product_variant_id.images[0]"
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
import { defineComponent } from "vue";
import Loader from "../components/Loader.vue";
import { useRouter } from "vue-router";
import orderProduct from "../components/orderProduct.vue";
import { ProductDetails } from "../types/Product";
import editUser from "../components/editUser.vue";
import back from "../assets/arrow_back.svg";
import CTA from "../components/CTA.vue";

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
    editUser,
    CTA,
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
  data() {
    const userId: string = this.$cookies.get("id") || "";
    return {
      userId: userId,
      loading: true,
      orders: [] as Array<Order>,
      isModalVisible: false,
      back,
    };
  },
  mounted() {
    this.fetchOrders();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    formatDate(date: string): string {
      let orderDay = new Date(date);
      return orderDay
        .toLocaleDateString("en-UK", {
          year: "2-digit",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\//g, ".");
    },
    navigate(to: string, cat?: string) {
      const router = useRouter();
      const routeParams = cat ? { cat } : {};
      router.push({ name: to, params: routeParams });
    },
    async fetchOrders() {
      try {
        if (this.userId === "") {
          return (this.isModalVisible = true);
        }
        console.log(this.userId);
        const response = await fetch(
          `http://localhost:8000/api/order/${this.userId}`,
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

        this.loading = false;
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    },
  },
});
</script>
