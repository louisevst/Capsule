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
    <p>
      To add an item to your wishlist please login or sign up if you're new.
    </p>
  </PopUp>
  <article
    class="bg-notWhite/20 rounded-xl text-notBlack text-body p-4 m-1 flex flex-col justify-between h-full cursor-pointer"
    :class="class"
  >
    <div class="h-[200px] md:h-[400px] lg:h-[500px]">
      <img
        :src="image"
        :alt="description"
        class="object-cover w-full h-[200px] md:h-[400px] lg:h-[500px]"
        @click="($event: MouseEvent) => onClick($event)"
      />
    </div>
    <section class="h-full justify-between flex flex-col">
      <div class="flex items-center lg:flex-row pt-2">
        <p class="lg:self-center">
          <b>{{ name }}</b>
        </p>
        <img
          :src="hearth"
          class="w-8 h-8 lg:w-12 lg:h-12 ml-auto p-1"
          @click="toggleHearth(productId)"
        />
      </div>
      <p>{{ description }}</p>
      <p class="my-2">{{ price }} €</p>

      <div class="flex flex-wrap justify-stretch">
        <div
          v-for="color in colors"
          :key="color"
          class="w-6 h-6 lg:w-8 lg:h-8 rounded-full mr-1 mb-1 border-black border"
          :class="`bg-${color}`"
        ></div>
      </div>
    </section>
  </article>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import hearth from "../assets/hearth.svg";
import filledHearth from "../assets/hearth-full.svg";
import PopUp from "../components/PopUp.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: { PopUp },
  props: {
    name: {
      type: String,
      required: true,
    },
    description: { type: String, required: true },
    price: {
      type: Number,
      required: true,
    },
    colors: {
      type: Array as () => string[],
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    onClick: {
      type: Function as PropType<(event: MouseEvent) => void>,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    class: { type: String, required: false },
    isLiked: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const userId: string = this.$cookies.get("id") || "";
    return {
      isModalVisible: false,
      user_id: userId,
      hearth,
      filledHearth,
      isHearthFilled: this.isLiked,
    };
  },
  mounted() {
    this.hearth = this.isHearthFilled ? this.filledHearth : hearth;
  },
  methods: {
    async toggleHearth(productId: string) {
      if (!this.isLiked && !this.isHearthFilled) {
        try {
          if (this.user_id === "") {
            this.isModalVisible = true;
            return;
          }

          const response = await fetch(
            `https://capsule-wardrobe.onrender.com/api/wishlist/${this.user_id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json();
          if (response.ok) {
            if (data.length > 0) {
              // Bag exists, retrieve the bag ID

              const wishlistID = data[0]._id;
              this.updateWishlist(wishlistID, productId);
            } else {
              // Bag doesn't exist, create a new bag

              this.createWishlist();
            }
          } else {
            console.error("Failed to check wishlist:", response.statusText);
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    async updateWishlist(id: string, product: string) {
      try {
        const response = await fetch(
          `https://capsule-wardrobe.onrender.com/api/wishlist/${id}`,
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
        } else {
          console.log("wishlist not updated");
        }
        this.isHearthFilled = true;
        this.hearth = this.isHearthFilled ? this.filledHearth : hearth;
      } catch (error) {
        console.log(error);
      }
    },
    async createWishlist() {
      try {
        const response = await fetch(
          "https://capsule-wardrobe.onrender.com/api/wishlist",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: this.user_id,
              product_id: this.productId,
            }),
          }
        );
        if (response.ok) {
          this.isHearthFilled = true;
          this.hearth = this.isHearthFilled ? this.filledHearth : hearth;
        } else {
          console.error("Failed to create wishlist:", response.statusText);
        }
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
