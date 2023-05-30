<template>
  <Loader :is-fetching="loading" />
  <main
    class="text-notBlack font-text text-body mb-4 pt-20"
    v-if="!loading && !success"
  >
    <div class="flex items-center justify-center">
      <img
        :src="back"
        @click="goBack"
        class="lg:w-12 lg:h-12 w-8 h-8 ml-4 mr-auto lg:ml-10 2xl:ml-40"
      />
      <h1
        class="font-title text-xs-xlheadline lg:text-xlheadline lg:pb-10 m-0 w-full"
      >
        My order
      </h1>
    </div>
    <div class="lg:px-10 2xl:px-60 lg:pb-10 space-y-2">
      <div
        class="hidden w-full lg:flex justify-between items-center border border-notBlack rounded-lg p-4"
      >
        <p class="text-sub">Check your order</p>
        <CTA text="Payment" :onClick="() => createOrder()" />
      </div>
      <div class="lg:flex lg:flex-wrap lg:items-start lg:justify-normal">
        <section
          class="border border-notBlack rounded-lg p-4 lg:hidden space-y-2 flex justify-between m-2"
        >
          <img :src="calendar" alt="calendar" />
          <div>
            <h3 class="font-semibold">Delivery time planned</h3>
            <p>{{ formattedDeliveryDate(delivery) }}</p>
          </div>
          <img :src="arrow" alt="Change delivery type." @click="" />
        </section>
        <section class="lg:w-1/2 lg:pr-2">
          <h3 class="hidden lg:block mx-2 text-bodyh">Delivery</h3>
          <div class="border border-notBlack rounded-lg p-4 hidden lg:block">
            <label for="delivery">Choose Delivery:</label>
            <div class="flex items-center">
              <input
                type="radio"
                name="delivery"
                value="basic"
                class="w-4 h-4 text-notBlack bg-notWhite border-notBlack focus:ring-terracota"
                v-model="delivery"
                checked
              />
              <div class="flex flex-col ml-2">
                <label for="basic">Basic</label>
                <p>{{ formattedDeliveryDate("basic") }}</p>
                <p>Free</p>
              </div>
            </div>
            <div class="flex items-center">
              <input
                type="radio"
                name="delivery"
                value="premium"
                class="w-4 h-4 text-notBlack bg-notWhite border-notBlack focus:ring-terracota"
                v-model="delivery"
              />
              <div class="flex flex-col ml-2">
                <label for="premium">Premium</label>
                <p>{{ formattedDeliveryDate("premium") }}</p>
                <p>50€</p>
              </div>
            </div>
          </div>
        </section>
        <section class="lg:w-1/2 m-0">
          <adress
            :address="user.address"
            :first_name="user.first_name"
            :last_name="user.last_name"
            @address-updated="updateUserAddress"
          />
          <payment
            :cardType="user.payment_type"
            :cardNumber="user.payment_card"
            @payment-updated="updateUserPayment"
          />
        </section>
        <!-- <div class="hidden lg:block w-1/2">
          <h2 class="text-bodyh">Products</h2>
          <div v-for="product in products" :key="product._id">
            <h3>{{ product.name }}</h3>
            <p>{{ product.description }}</p>
            <p>Price: {{ product.price }}€</p>
            <img :src="product.image" :alt="product.alt" class="max-h-screen" />
          </div>
        </div> -->
        <div class="hidden lg:block w-1/2 pr-2">
          <h2 class="text-bodyh">Products</h2>
          <section v-for="product in products" :key="product._id">
            <article
              class="bg-notWhite/20 rounded-xl text-notBlack text-body p-4 border border-notBlack mb-2"
            >
              <div class="grid grid-cols-4">
                <img :src="product.image" />
                <div class="flex justify-center flex-col mx-4 col-span-2">
                  <p class="lg:text-bodyh font-semibold lg:font-light">
                    {{ product.name }}
                  </p>
                  <p>Price: {{ product.price }} €</p>
                </div>
              </div>
            </article>
          </section>
        </div>
        <section
          class="sticky bottom-0 bg-notWhite w-full border-t border-notBlack grid grid-cols-2 p-4 lg:static lg:border lg:rounded-lg lg:w-1/2 lg:self-start"
        >
          <div class="space-y-2">
            <p class="lg:text-bodyh font-semibold lg:font-light">Sub-total</p>
            <p class="lg:text-bodyh font-semibold lg:font-light">Delivery</p>
            <h4 class="text-xs-sub font-semibold">Total</h4>
          </div>
          <div class="ml-auto space-y-2">
            <p class="lg:text-bodyh font-semibold lg:font-light">
              {{ calculateTotalPrice() }}€
            </p>
            <p class="lg:text-bodyh font-semibold lg:font-light">
              {{ delivery === "basic" ? "free" : "50 €" }}
            </p>
            <p class="text-xs-sub font-semibold">
              {{ calculateTotalPrice() }}€
            </p>
          </div>
          <CTA
            text="Payment"
            :onClick="() => createOrder()"
            textColor="text-notWhite"
            bgColor="bg-notWhite"
            buttonColor="bg-terracota"
            class="col-span-2 flex justify-center"
          />
        </section>
      </div>
    </div>
  </main>
  <OrderSuccess v-if="success" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Loader from "../components/Loader.vue";
import OrderSuccess from "../components/Order-success.vue";
import adress from "../components/adress.vue";
import payment from "../components/payment.vue";
import back from "../assets/arrow_back.svg";
import CTA from "../components/CTA.vue";
import calendar from "../assets/calendar.svg";
import truck from "../assets/truck.svg";
import pen from "../assets/edit-2.svg";
import card from "../assets/credit-card.svg";
import arrow from "../assets/arrow_forward.svg";

interface User {
  email: string;
  first_name: string;
  last_name: string;
  payment_card?: string;
  payment_type?: string;
  address?: string;
}
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
  name: string;
}
interface Bag {
  _id: string;
  product_variant_id: Array<string>;
  quantity: number;
}
export default defineComponent({
  name: "Checkout",
  components: { Loader, adress, payment, CTA, OrderSuccess },
  data() {
    const userId: string = this.$cookies.get("id") || "";
    const token: string = this.$cookies.get("token");
    return {
      arrow,
      back,
      calendar,
      truck,
      pen,
      card,
      user_id: userId,
      token: token,
      user: {} as User,
      loading: true,
      bag: [] as Array<Bag>,
      bagId: "",
      products: [] as Array<Product>,
      delivery: "basic",
      editDelivery: false,
      success: false,
    };
  },
  mounted() {
    this.getUser();
  },
  computed: {
    formattedDeliveryDate() {
      return (type: string) => {
        const currentDate = new Date();
        const deliveryDates = {
          basic: null as Date | null,
          premium: null as Date | null,
        };

        if (type === "basic") {
          deliveryDates.basic = new Date(
            currentDate.getTime() + 14 * 24 * 60 * 60 * 1000
          );
        } else if (type === "premium") {
          deliveryDates.premium = new Date(
            currentDate.getTime() + 5 * 24 * 60 * 60 * 1000
          );
          // Check if the delivery date falls on a Sunday
          if (deliveryDates.premium?.getDay?.() === 0) {
            deliveryDates.premium.setDate(deliveryDates.premium.getDate() + 1);
          }
        }

        return (
          deliveryDates.basic?.toLocaleDateString() ||
          deliveryDates.premium?.toLocaleDateString() ||
          ""
        );
      };
    },
  },
  methods: {
    changeDelivery() {
      this.editDelivery = !this.editDelivery;
    },
    calculatePrice() {
      let totalPrice = 0;
      for (const product of this.products) {
        totalPrice += product.price;
      }
      return totalPrice;
    },
    calculateTotalPrice() {
      let totalPrice = 0;
      for (const product of this.products) {
        totalPrice += product.price;
      }

      // Add delivery cost based on the selected option
      if (this.delivery === "premium") {
        totalPrice += 50; // Assuming the premium delivery cost is 50€
      }

      return totalPrice;
    },
    goBack() {
      this.$router.go(-1);
    },
    updateUserAddress(newAddress: string) {
      this.user.address = newAddress; // Update the userAddress data in the parent component with the new address
      this.updateUser();
    },
    updateUserPayment(newPayment: { cardType: string; cardNumber: string }) {
      this.user.payment_type = newPayment.cardType;
      this.user.payment_card = newPayment.cardNumber;
      this.updateUser();
    },
    async getUser() {
      try {
        const response = await fetch(
          `http://localhost:8000/api/auth/${this.user_id}  `,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        const data = await response.json();
        this.user = {
          ...data,
          payment_card: data.payment_card || "", // Initialize with an empty string if undefined
          payment_type: data.payment_type || "", // Initialize with an empty string if undefined
          address: data.address || "", // Initialize with an empty string if undefined
        };
        this.fetchBag();
      } catch (error) {
        console.log(error);
      }
    },
    async updateUser() {
      try {
        const response = await fetch(
          `http://localhost:8000/api/auth/${this.user_id}  `,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.token}`,
            },
            body: JSON.stringify(this.user),
          }
        );
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
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
        this.bagId = data[0]._id;
        if (data[0].product_variant_id.length === 0) {
        }
        this.fetchBagItems();
      } catch (error) {
        console.log(error);
      }
    },
    async fetchBagItems() {
      try {
        console.log(this.bag);
        for (const item of this.bag) {
          const productVariantIds = item.product_variant_id;
          for (const productVariantId of productVariantIds) {
            const detailsResponse = await fetch(
              `http://localhost:8000/api/details/id/${productVariantId}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            const productDetails = await detailsResponse.json();

            const productResponse = await fetch(
              `http://localhost:8000/api/product/${productDetails.product_id}`,
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
        }
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
              name: product.name,
            })),
            email: this.user.email, // Provide the email associated with the order
          }),
        });

        if (response.ok) {
          // Order created successfully
          const order = await response.json();
          this.emptyBag();
          this.success = true;
          console.log(order);
        } else {
          // Handle the error case
          console.error("Failed to create order:", response.statusText);
        }
      } catch (error) {
        console.error("Error creating order:", error);
      }
    },
    async emptyBag() {
      try {
        await fetch(`http://localhost:8000/api/bag/${this.bag[0]._id}`, {
          method: "Delete",
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error: unknown) {
        console.log(error);
      }
    },
  },
});
</script>
