<template>
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
  <main>
    <h1
      class="font-title text-xs-xlheadline lg:text-xlheadline text-center pt-20 lg:pb-10"
    >
      My Bag
    </h1>
    <div class="grid lg:grid-cols-2 lg:px-10 2xl:px-20 lg:pb-10">
      <div
        class="bg-notWhite/50 lg:bg-transparent lg:top-32 2xl:top-40 lg:w-12 lg:h-12 w-8 h-8 rounded-full absolute top-24 left-2 cursor-pointer flex justify-end items-center"
      >
        <img
          :src="back"
          @click="goBack"
          class="lg:w-12 lg:h-12 w-6 h-6 lg:static lg:-translate-x-8"
        />
      </div>

      <section>
        <div
          v-if="!loading"
          v-for="product in products"
          :key="product._id"
          class="lg:max-w-2xl"
        >
          <bagProduct
            :name="product.name"
            :description="product.description"
            :price="product.price"
            :color="product.details.color"
            :image="product.details.images[0]"
            :size="product.details.size"
            :fit="product.details.fit"
            @delete="deleteProduct(product._id)"
          />
        </div>
      </section>
      <section
        class="border border-notBlack rounded m-1 text-notBlack font-text my-6 lg:mb-auto lg:mt-1"
      >
        <div class="p-4 grid grid-cols-2 space-y-2">
          <h3 class="text-xs-sub lg:text-sub">Total</h3>
          <p class="font-semibold lg:text-bodyh flex items-center">
            {{ getTotalPrice }} €
          </p>
          <h4>Sub total</h4>
          <p>{{ getPrice }} €</p>
          <h4>Delivery</h4>
          <p>{{ deliveryFeeDisplay }}</p>
          <h4 class="flex items-center">Delivery type</h4>

          <select
            id="underline_select"
            class="block py-2.5 px-0 text-sm text-notBlack bg-transparent border-0 border-b border-notBlack appearance-none focus:outline-none focus:ring-0 focus:border-terracota peer"
            v-model="selectedDeliveryType"
          >
            <option value="basic">Basic (Free)</option>
            <option value="premium">Premium (50 €)</option>
          </select>
          <CTA
            text="Checkout"
            :onClick="() => createOrder()"
            class="flex justify-center items-center lg:self-end col-span-2 p-4"
            textColor="text-notWhite"
            bgColor="bg-notWhite"
            buttonColor="bg-terracota"
          />
        </div>
      </section>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import bagProduct from "../components/bagProduct.vue";
import PopUp from "../components/PopUp.vue";
import { useRouter } from "vue-router";
import CTA from "../components/CTA.vue";
import back from "../assets/arrow_back.svg";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  type: string;
  alt: string;
  details: Details;
}
interface Details {
  _id: string;
  product_id: string;
  images: Array<string>;
  fit: string;
  size: string;
  color: string;
}
interface Bag {
  product_variant_id: string;
  quantity: number;
}

export default defineComponent({
  name: "Bag",
  components: {
    bagProduct,
    PopUp,
    CTA,
  },
  setup() {
    const router = useRouter();

    function navigate(to: string, cat?: string) {
      const routeParams = cat ? { cat } : {};
      router.push({ name: to, params: routeParams });
    }

    return {
      navigate,
    };
  },
  data() {
    const userId: string = this.$cookies.get("id") || "";
    const router = useRouter();
    return {
      isModalVisible: false,
      user_id: userId,
      bag: [] as Array<Bag>,
      products: [] as Array<Product>,
      loading: true,
      selectedDeliveryType: "basic",
      back,
      router,
    };
  },
  computed: {
    getPrice(): number {
      return this.products.reduce((total, product) => total + product.price, 0);
    },
    getTotalPrice(): number {
      return (
        this.products.reduce((total, product) => total + product.price, 0) +
        this.deliveryFee
      );
    },
    deliveryFee(): number {
      // Calculate delivery fee based on selected delivery type
      if (this.selectedDeliveryType === "basic") {
        return 0;
      } else if (this.selectedDeliveryType === "premium") {
        return 50;
      } else {
        return 0; // Default to 0 if the selected type is not recognized
      }
    },
    deliveryFeeDisplay(): string {
      if (this.deliveryFee === 0) {
        return "Free";
      } else {
        return this.deliveryFee + " €";
      }
    },
  },
  mounted() {
    this.getUser();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    deleteProduct(productId: string) {
      // Find the index of the product in the array
      const index = this.products.findIndex(
        (product) => product._id === productId
      );
      if (index !== -1) {
        // Remove the product from the array
        this.products.splice(index, 1);
      }
    },
    async getUser() {
      if (this.user_id === "") {
        this.isModalVisible = true;
      } else {
        console.log(this.user_id);
        await this.fetchBag();
        this.fetchBagItems();
      }
    },
    async fetchBag() {
      try {
        const response = await fetch(
          `http://localhost:8000/api/bag/${this.user_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        this.bag = data;
        console.log(this.bag);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchBagItems() {
      try {
        const productVariantIds = this.bag.map(
          (item) => item.product_variant_id
        );
        const productRequests = productVariantIds.map((productVariantId) =>
          fetch(`http://localhost:8000/api/details/id/${productVariantId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }).then((response) => response.json())
        );

        const products = await Promise.all(productRequests);

        // Make API call for each product ID
        const productDetailsRequests = products.map((product) =>
          fetch(`http://localhost:8000/api/product/${product.product_id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }).then((response) => response.json())
        );

        const productDetails = await Promise.all(productDetailsRequests);
        console.log(productDetails);
        this.products = productDetails.map((productDetail) => ({
          ...productDetail,
        }));
        this.products.forEach((product, index) => {
          product.details = products[index];
        });
        console.log(this.products);
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
    async createOrder() {
      try {
        const response = await fetch("http://localhost:8000/api/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: this.user_id,
            items: this.products.map((product) => ({
              product_variant_id: product.details._id,
              quantity: 1, // Update this as per your requirements
              price: product.price,
            })),
            email: "example@example.com", // Provide the email associated with the order
          }),
        });

        if (response.ok) {
          // Order created successfully
          const order = await response.json();

          // Navigate to the checkout page passing the order ID as a parameter
          this.router.push({ name: "checkout", params: { orderId: order.id } });
        } else {
          // Handle the error case
          console.error("Failed to create order:", response.statusText);
        }
      } catch (error) {
        console.error("Error creating order:", error);
      }
    },
  },
});
</script>
