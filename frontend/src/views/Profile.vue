<template>
  <main
    class="pt-20 2xl:pt-28 text-notBlack font-text text-body p-2 md:mx-8 lg:mx-0 md:min-h-[80vh]"
  >
    <div class="flex items-center">
      <img
        :src="back"
        @click="goBack"
        class="lg:w-12 lg:h-12 w-6 h-6 mr-auto lg:ml-10 2xl:ml-40"
      />
      <h1
        class="font-title text-xs-xlheadline lg:text-xlheadline text-center lg:pb-10 mr-auto lg:m-0 self-end lg:w-full"
      >
        My Profile
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
        <div v-for="order in orders" :key="order._id">
          <h3 class="text-xs-sub lg:text-sub">
            {{ order.date_ordered ? formatDate(order.date_ordered) : "" }}
          </h3>
          <div
            v-for="(item, index) in order.order_items"
            :key="`${item._id}_${index}_${Date.now()}`"
            class="my-2 md:mr-20 lg:mx-0"
          >
            <orderProduct
              :price="item.price"
              :image="item.product_variant_id.images[0]"
              :color="capitalizeColor(item.product_variant_id.color)"
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
import { onMounted, computed, ref } from "vue";
import back from "../assets/arrow_back.svg";
import PopUp from "../components/PopUp.vue";
import { useRouter } from "vue-router";
import orderProduct from "../components/orderProduct.vue";
import Loader from "../components/Loader.vue";
import CTA from "../components/CTA.vue";

export default {
  // Component options
  components: { PopUp, orderProduct, Loader, CTA },
  data() {
    return { back };
  },
  setup() {
    // Move the logic inside the setup function

    const loading = ref(true);
    const orders = ref([]);
    const isModalVisible = ref(false);
    const router = useRouter();

    const capitalizeColor = (color: string): string => {
      const words = color.split("-");
      const capitalizedWords = words.map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      });

      return capitalizedWords.join("-");
    };
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
    const navigate = (to: string, cat?: string) => {
      const routeParams = cat ? { slug: cat } : {};
      router.push({ name: to, params: routeParams });
    };

    const getUserId = () => {
      const cookies = document.cookie.split("; ");
      console.log(cookies);
      for (const cookie of cookies) {
        const [name, value] = cookie.split("=");
        if (name === "id") {
          console.log(value);
          return value;
        }
      }
      return null; // Return null if the 'id' cookie is not found
    };

    const userId = computed(() => {
      // Compute the user ID using the getUserId function
      return getUserId();
    });

    const fetchOrders = async () => {
      try {
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
        if (data.orders) {
          orders.value = data.orders.reverse();
          console.log(orders.value);
          loading.value = false;
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    onMounted(fetchOrders); // Call getUser when the component is mounted

    const goBack = () => {
      router.go(-1);
    };
    return {
      loading,
      orders,
      isModalVisible,
      navigate,
      goBack,
      capitalizeColor,
      formatDate,
    };
  },
};
</script>
