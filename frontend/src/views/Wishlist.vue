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
  <Empty
    v-if="isEmpty"
    :title="'My wishlist'"
    :text="'Your wishlist is empty.'"
  />

  <main v-if="!loading && !isEmpty">
    <h1
      class="font-title text-xs-xlheadline lg:text-xlheadline text-center pt-20 lg:pb-10"
    >
      My Wishlist
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

      <section class="grid grid-cols-2 lg:max-w-2xl">
        <WishlistProduct
          v-for="product in products"
          :_id="product._id"
          :key="product._id"
          :name="product.name"
          :description="product.description"
          :price="product.price"
          :colors="product.colors"
          :image="product.image"
          :sizes="product.sizes"
          :fits="product.fits"
          :alt="product.alt"
          :user_id="user_id"
          @delete="deleteProduct(product._id)"
        />
      </section>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WishlistProduct from "../components/WishlistProduct.vue";
import hearth from "../assets/hearth.svg";
import filledHearth from "../assets/hearth-full.svg";
import PopUp from "../components/PopUp.vue";
import { useRouter } from "vue-router";
import Loader from "../components/Loader.vue";
import Empty from "../components/Empty.vue";
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
  colors: Array<string>;
  sizes: Array<string>;
  fits: Array<string>;
}
interface Details {
  _id: string;
  product_id: string;
  images: Array<string>;
  fit: string;
  size: string;
  color: string;
}
interface Wishlist {
  _id: string;
  product_id: Array<string>;
}

export default defineComponent({
  name: "Wishlist",
  components: { WishlistProduct, PopUp, Empty, Loader },
  data() {
    const userId: string = this.$cookies.get("id") || "";
    return {
      wishlist: [] as Array<Wishlist>,
      products: [] as Array<Product>,
      isModalVisible: false,
      loading: true,
      user_id: userId,
      hearth,
      filledHearth,
      isHearthFilled: false,
      isEmpty: false,
      back,
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    async deleteProduct(productId: string) {
      try {
        const id = this.wishlist[0]._id;
        const response = await fetch(
          `http://localhost:8000/api/wishlist/${id}/${productId}  `,
          {
            method: "Delete",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          // Remove the deleted product from the wishlist in the front end
          const updatedWishlist = this.products.filter(
            (product) => product._id !== productId
          );
          this.products = updatedWishlist;
          console.log(this.products);
          if (this.products.length < 1) {
            this.isEmpty = true;
          }
        }
      } catch (error) {
        console.error(error);
      }

      // Output a success message
    },
    goBack() {
      this.$router.go(-1);
    },
    async getUser() {
      if (this.user_id === "") {
        this.isModalVisible = true;
      } else {
        console.log(this.user_id);
        await this.fetchWishlist();
        this.fetchWishlistItems();
      }
    },
    async fetchWishlist() {
      try {
        const response = await fetch(
          `http://localhost:8000/api/wishlist/${this.user_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          console.log(data);

          if (data.length === 0) {
            this.isEmpty = true;
          } else this.isEmpty = false;

          if (data[0]._id) {
            // wishlist exists, retrieve the wishlist ID
            this.wishlist = data[0];
            console.log(data[0].product_id);
            this.products = data[0].product_id;
            // const wishlistID = data[0]._id;
          } else {
            this.isEmpty = true;
          }
        } else {
          console.error("Failed to check wishlist:", response.statusText);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async fetchWishlistItems() {
      try {
        for (const item of this.products) {
          const productVariantIds = item._id;
          console.log(productVariantIds);

          const detailsResponse = await fetch(
            `http://localhost:8000/api/details/${productVariantIds}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const productDetails = await detailsResponse.json();
          console.log(productDetails);

          // Find the corresponding product in this.products and assign the productDetails
          const productToUpdate = this.products.find(
            (product) => product._id === productVariantIds
          );
          if (productToUpdate) {
            productToUpdate.details = productDetails;
            const sizes = [
              ...new Set(productDetails.map((item: Details) => item.size)),
            ];
            item.sizes = sizes;
            const fits = [
              ...new Set(productDetails.map((item: Details) => item.fit)),
            ];
            item.fits = fits;
            const colors = [
              ...new Set(productDetails.map((item: Details) => item.color)),
            ];
            item.colors = colors;
          }
        }

        console.log(this.products);
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
    async updateWishlist(id: string, product: string) {
      try {
        const response = await fetch(
          `http://localhost:8000/api/wishlist/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ product }),
          }
        );
        if (response.ok) {
          console.log("wishlist updated successfully");
          console.log(await response.json());
        } else {
          console.log("wishlist not updated");
        }
        this.isHearthFilled = !this.isHearthFilled;
        this.hearth = this.isHearthFilled ? this.filledHearth : hearth;
      } catch (error) {
        console.log(error);
      }
    },
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
});
</script>
