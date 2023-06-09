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
    <p>
      To add an item to your wishlist please login or sign up if you're new.
    </p>
  </PopUp>
  <Loader :is-fetching="loading" />
  <Empty
    v-if="isEmpty || products.length === 0"
    :title="'My wishlist'"
    :text="'Your wishlist is empty.'"
  />

  <main
    v-if="!loading && !isEmpty && products.length > 0"
    class="pb-4 lg:pb-8 2xl:pt-28 pt-20 xl:pt-24 md:min-h-[90vh] lg:h-auto"
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
        My Wishlist
      </h1>
      <div class="lg:w-12 lg:h-12 w-6 h-6 lg:ml-10 2xl:ml-40"></div>
    </div>

    <div class="lg:grid lg:grid-cols-2 md:px-4 lg:px-10 md:pb-10">
      <section class="grid sm:grid-cols-2 lg:col-span-4">
        <WishlistProduct
          v-for="product in products"
          :_id="product._id"
          :key="product._id + product.colors"
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
          :onClick="() => navigateToProductDetails(product._id)"
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
import { IProduct, ProductDetails, Size, Fit } from "../types/Product";

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
      wishlist: [] as unknown as Wishlist,
      products: [] as Array<IProduct>,
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
        console.log(this.wishlist);
        const id = this.wishlist._id;
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
          if (data.length === 0) {
            this.isEmpty = true;
          } else this.isEmpty = false;

          if (data[0]._id) {
            // wishlist exists, retrieve the wishlist ID
            this.wishlist = data[0];

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

          // Find the corresponding product in this.products and assign the productDetails

          const productToUpdate = this.products.find(
            (product) => product._id === productVariantIds
          );
          if (productToUpdate) {
            productToUpdate.details = productDetails;
            const sizes = Array.from(
              new Set<ProductDetails["size"]>(
                productDetails.map((item: ProductDetails) => item.size)
              )
            ).map((size) => size as Size);
            productToUpdate.sizes = sizes;
            const fits = Array.from(
              new Set<ProductDetails["fit"]>(
                productDetails.map((item: ProductDetails) => item.fit)
              )
            ).map((fit) => fit as Fit);
            productToUpdate.fits = fits;
            const colors = Array.from(
              new Set<ProductDetails["color"]>(
                productDetails.map((item: ProductDetails) => item.color)
              )
            );
            productToUpdate.colors = colors;
          }
        }

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
        if (!response.ok) {
          console.log("wishlist not updated");
        }
        this.isHearthFilled = !this.isHearthFilled;
        this.hearth = this.isHearthFilled ? this.filledHearth : hearth;
      } catch (error) {
        console.log(error);
      }
    },
    navigateToProductDetails(productId: string) {
      this.$router.push({ name: "product", params: { id: productId } });
    },
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
});
</script>
