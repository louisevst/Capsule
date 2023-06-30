<template>
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
  <empty
    v-if="products.length === 0 && !loading"
    :title="'My bag'"
    :text="'Your bag is empty.'"
  />
  <main
    v-if="!loading && !isEmpty && products.length > 0"
    class="flex flex-col justify-around 2xl:pt-28 pt-20 md:pt-24"
  >
    <div class="flex items-center justify-between w-full">
      <img
        :src="back"
        @click="goBack"
        class="lg:w-12 lg:h-12 w-8 h-8 lg:ml-10 2xl:ml-40"
      />
      <h1
        class="font-title text-xs-xlheadline lg:text-xlheadline text-center lg:pb-10 lg:m-0 lg:w-full"
      >
        My Bag
      </h1>
      <div class="lg:w-12 lg:h-12 w-6 h-6 lg:ml-10 2xl:ml-40"></div>
    </div>
    <div
      class="grid lg:grid-cols-2 md:px-4 lg:px-10 2xl:px-60 lg:pb-10"
      v-if="products.length > 0"
    >
      <section class="pb-4 md:min-h-[400px]">
        <div v-for="product in products" :key="product._id">
          <bagProduct
            :name="product.name"
            :description="product.description"
            :price="product.price"
            :color="product.details.color"
            :image="product.details.images[0]"
            :size="product.details.size"
            :fit="product.details.fit"
            @delete="deleteProduct(product.details._id)"
          />
        </div>
      </section>
      <section
        class="lg:m-1 space-y-2 sticky bottom-0 bg-notWhite w-full border-t border-notBlack grid grid-cols-2 p-4 lg:static lg:border lg:rounded-lg lg:self-start"
      >
        <h3 class="text-xs-sub lg:text-sub pb-4">Total</h3>
        <p class="font-semibold lg:text-bodyh flex items-between pb-4">
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
          :onClick="() => navigate('checkout')"
          class="flex justify-center items-center lg:self-end col-span-2 p-4"
          textColor="text-notWhite"
          bgColor="bg-notWhite"
          buttonColor="bg-terracota"
        />
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
import empty from "../components/Empty.vue";
import Loader from "../components/Loader.vue";

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
  _id: string;
  product_variant_id: Array<string>;
  quantity: number;
}

export default defineComponent({
  name: "Bag",
  components: {
    bagProduct,
    PopUp,
    CTA,
    empty,
    Loader,
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
    const router = useRouter();
    return {
      isModalVisible: false,
      user_id: userId,
      bag: [] as Array<Bag>,
      bagId: "",
      products: [] as Array<Product>,
      loading: true,
      selectedDeliveryType: "basic",
      back,
      router,
      isEmpty: false,
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
    async deleteProduct(productId: string) {
      // Find the index of the product in the array

      const index = this.products.findIndex(
        (product) => product.details._id === productId
      );
      if (index !== -1) {
        this.products.splice(index, 1);
      }
      if (!this.bag) {
        this.isEmpty = true;
      }
      // Update the bag in the backend
      try {
        const response = await fetch(
          `https://capsule-wardrobe.onrender.com/api/bag/${this.bagId}/variants/${productId}  `,
          {
            method: "Delete",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        this.bag = data;
        if (!this.bag) {
          this.isEmpty = true;
        }
      } catch (error) {
        console.error(error);
      }
    },
    async getUser() {
      if (this.user_id === "") {
        this.isModalVisible = true;
      } else {
        this.fetchBag();
      }
    },
    async fetchBag() {
      try {
        const response = await fetch(
          `https://capsule-wardrobe.onrender.com:8000/api/bag/${this.user_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (data === undefined || data === null) {
          this.isEmpty = true;
        } else {
          this.bag = data[0].product_variant_id;
          this.bagId = data[0]._id;
          this.fetchBagItems();
        }
      } catch (error) {
        console.log(error);
        this.isEmpty = true;
      }
    },
    async fetchBagItems() {
      try {
        const productVariantIds = Object.values(this.bag);
        for (const productVariantId of productVariantIds) {
          const detailsResponse = await fetch(
            `https://capsule-wardrobe.onrender.com:8000/api/details/id/${productVariantId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const productDetails = await detailsResponse.json();

          const productResponse = await fetch(
            `https://capsule-wardrobe.onrender.com:8000/api/product/${productDetails.product_id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const product = await productResponse.json();

          product.details = productDetails;
          this.products.push(product);
        }

        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
    async updateBag() {
      try {
        const bagPayload = this.bag.map((bagProduct) => ({
          product_variant_id: bagProduct.product_variant_id,
          quantity: bagProduct.quantity,
        }));

        await fetch(
          `https://capsule-wardrobe.onrender.com:8000/api/bag/${this.user_id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bagPayload),
          }
        );
      } catch (error) {
        console.error("Error updating bag:", error);
      }
    },
  },
});
</script>
