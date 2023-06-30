<template>
  <div
    v-if="!isScreenSmaller"
    class="w-full z-50 absolute lg:fixed top-0 transition-colors ease-linear duration-600"
    :class="{
      'lg:bg-notWhite lg:border-b lg:border-notBlack ': isScrolled,
      'bg-gradient-to-b from-blue': !isScrolled,
    }"
  >
    <nav
      class="md:py-2 lg:py-0 lg:px-20 xl:px-28 2xl:px-40 flex items-center justify-center w-full"
    >
      <div class="grow xl:pr-[99.728px] lg:pr-[109.97]" ref="collection">
        <button
          @click="toggleCollection"
          class="collection flex relative font-normal hover:underline hover:underline-offset-4 items-center text-notBlack text-bodyh font-text"
        >
          <!--          class="collection flex relative pl-10 pr-24 font-normal hover:bg-notBlack/10 bg-notBlack/10 items-center group text-notBlack text-bodyh font-text border border-notBlack py-1 bg-notWhite"
 <img :src="menu" class="w-8 h-8 mr-2" /> -->
          Menu
          <img :src="expand_more" class="w-4 h-4 lg:w-8 lg:h-8 fill-notBlack" />
        </button>
        <ul
          :class="showCollection ? 'absolute' : 'hidden'"
          class="menu text-notBlack h-screen w-1/3 top-0 left-0 pt-10 bg-notWhite/60 backdrop-blur-md border-r border-notBlack shadow flex justify-center flex-col pl-24"
        >
          <button
            class="text-xs-sub lg:text-sub font-text relative mb-4 text-left"
            @click="toggleProd"
          >
            Products
            <div
              class="bottom-0 left-0 w-3/4 bg-notBlack absolute border-b border-solid border-notBlack"
            ></div>
          </button>
          <ul :class="prod ? 'block' : 'hidden'">
            <li class="text-body font-bold lg:font-light lg:text-bodyh">
              <router-link
                :to="`/products/category/All`"
                @click="toggleCollection"
                >All</router-link
              >
            </li>
            <li class="text-body font-bold lg:font-light lg:text-bodyh">
              <router-link
                :to="`/products/category/DressJumpsuit`"
                @click="toggleCollection"
                >Dresses & Jumsuits</router-link
              >
            </li>
            <li class="text-body font-bold lg:font-light lg:text-bodyh">
              <router-link
                :to="`/products/category/TopBlouse`"
                @click="toggleCollection"
                >Tops & Blouses</router-link
              >
            </li>
            <li class="text-body font-bold lg:font-light lg:text-bodyh">
              <router-link
                :to="`/products/category/PantSkirt`"
                @click="toggleCollection"
                >Pants & Skirts</router-link
              >
            </li>
            <li class="text-body font-bold lg:font-light lg:text-bodyh">
              <router-link
                :to="`/products/category/Jewellery`"
                @click="toggleCollection"
              >
                Jewellery
              </router-link>
            </li>
          </ul>
          <button
            class="text-xs-sub lg:text-sub font-text relative mb-4 text-left"
            @click="toggleCol"
          >
            Collections
            <div
              class="bottom-0 left-0 w-3/4 bg-notBlack absolute border-b border-solid border-notBlack"
            ></div>
          </button>
          <ul :class="col ? 'block' : 'hidden'">
            <li class="text-body font-bold lg:font-light lg:text-bodyh">
              <router-link
                :to="`/products/collection/Swimwear`"
                @click="toggleCollection"
              >
                Beach Wear</router-link
              >
            </li>
            <li class="text-body font-bold lg:font-light lg:text-bodyh">
              <router-link
                :to="`/products/collection/Spring%2FSummer`"
                @click="toggleCollection"
              >
                Spring/Summer</router-link
              >
            </li>
            <li class="text-body font-bold lg:font-light lg:text-bodyh">
              <router-link
                :to="`/products/collection/Party`"
                @click="toggleCollection"
                >Party</router-link
              >
            </li>
            <li class="text-body font-bold lg:font-light lg:text-bodyh">
              <router-link
                :to="`/products/collection/Fall%2FWinter`"
                @click="toggleCollection"
              >
                Fall/Winter</router-link
              >
            </li>
          </ul>
          <li class="text-xs-sub lg:text-sub font-text relative mb-4">
            <router-link :to="`/about`" @click="toggleCollection"
              >About</router-link
            >
            <div
              class="bottom-0 left-0 w-3/4 bg-notBlack absolute border-b border-solid border-notBlack"
            ></div>
          </li>
          <li class="text-xs-sub lg:text-sub font-text relative mb-4">
            <router-link :to="`/`" @click="toggleCollection">Home</router-link>
            <div
              class="bottom-0 left-0 w-3/4 bg-notBlack absolute border-b border-solid border-notBlack"
            ></div>
          </li>
          <li class="text-xs-sub lg:text-sub font-text relative mb-4">
            <router-link :to="`/contact`" @click="toggleCollection"
              >Contact</router-link
            >
            <div
              class="bottom-0 left-0 w-3/4 bg-notBlack absolute border-b border-solid border-notBlack"
            ></div>
          </li>
          <li class="text-body font-bold lg:font-light lg:text-bodyh">
            <router-link :to="`/sign-up`" @click="toggleCollection"
              >Sign up</router-link
            >
          </li>
          <li class="text-body font-bold lg:font-light lg:text-bodyh">
            <router-link :to="`/login`" @click="toggleCollection"
              >Login</router-link
            >
          </li>
          <li
            class="text-body font-bold lg:font-light lg:text-bodyh cursor-pointer"
            @click="logout"
          >
            Log Out
          </li>
        </ul>
      </div>

      <router-link to="/" class="grow text-center w-full"
        ><span class="font-logo text-notBlack lg:text-headline text-xs-headline"
          >CAPSULE</span
        >
      </router-link>
      <div class="flex grow justify-end lg:space-x-4">
        <div>
          <router-link to="/bag">
            <img
              :src="bag"
              class="lg:h-14 lg:w-14 h-8 w-8 2xl:h-16 2xl:w-16 hidden lg:block"
            />
          </router-link>
        </div>
        <div>
          <router-link to="/wishlist">
            <img
              :src="hearth"
              class="lg:h-14 lg:w-14 h-8 w-8 2xl:h-16 2xl:w-16 hidden lg:block"
            />
          </router-link>
        </div>
        <div ref="dropdown" class="relative flex justify-center items-start">
          <img
            @click="toggleDropdown"
            :src="user"
            class="lg:h-14 lg:w-14 h-8 w-8 2xl:h-16 2xl:w-16 hidden lg:block"
          />
          <div
            :class="showDropdown ? 'absolute ' : 'hidden'"
            class="z-10 bg-notWhite/50 backdrop-blur-md divide-y divide-gray-400 border border-notBlack shadow w-36 mt-12 2xl:mt-16"
          >
            <ul class="py-2 text-body text-notBlack font-text">
              <li>
                <router-link
                  to="/login"
                  class="block px-4 py-2 hover:bg-terracota hover:text-white"
                  >Login</router-link
                >
              </li>
              <li>
                <router-link
                  to="/sign-up"
                  class="block px-4 py-2 hover:bg-terracota hover:text-white"
                  >Join</router-link
                >
              </li>
              <li>
                <router-link
                  to="/profile"
                  class="block px-4 py-2 hover:bg-terracota hover:text-white"
                  >Profile</router-link
                >
              </li>
              <li
                class="block px-4 py-2 hover:bg-terracota hover:text-white cursor-pointer"
                @click="logout"
              >
                Log Out
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
  <header
    v-else
    class="w-full z-50 absolute top-0 transition-colors ease-linear duration-600 bg-gradient-to-b from-blue flex justify-center items-center py-8"
  >
    <router-link
      to="/"
      class="font-logo text-notBlack lg:text-headline text-xs-headline"
      >CAPSULE
    </router-link>
    <!-- Menu mobile -->
    <ul
      :class="showMenu ? 'absolute' : 'hidden'"
      class="menu h-screen text-notBlack w-full top-0 bg-notWhite/50 backdrop-blur-md border border-notBlack shadow flex justify-center flex-col items-center"
    >
      <li
        class="text-xs-sub lg:text-sub font-text relative"
        @click="toggleCollection"
      >
        <router-link :to="`/products/category/All`">All</router-link>
      </li>

      <ul :class="showCollection ? 'block' : 'hidden'">
        <li class="text-body font-bold lg:font-light lg:text-bodyh">
          <router-link :to="`/products/category/DressJumpsuit`"
            >Dresses & Jumsuits</router-link
          >
        </li>
        <li class="text-body font-bold lg:font-light lg:text-bodyh">
          <router-link :to="`/products/category/TopBlouse`"
            >Tops & Blouses</router-link
          >
        </li>
        <li class="text-body font-bold lg:font-light lg:text-bodyh">
          <router-link :to="`/products/category/PantSkirt`"
            >Pants & Skirts</router-link
          >
        </li>
        <li class="text-body font-bold lg:font-light lg:text-bodyh">
          <router-link :to="`/products/category/Jewellery`">
            Jewellery
          </router-link>
        </li>
      </ul>

      <li
        class="text-xs-sub lg:text-sub font-text relative"
        @click="toggleDropdown"
      >
        <router-link :to="`/products/collection/All`"> Collections</router-link>
      </li>
      <ul :class="showDropdown ? 'block' : 'hidden'">
        <li class="text-body font-bold lg:font-light lg:text-bodyh">
          <router-link :to="`/products/collection/Swimwear`">
            Beach Wear</router-link
          >
        </li>
        <li class="text-body font-bold lg:font-light lg:text-bodyh">
          <router-link :to="`/products/collection/Spring%2FSummer`">
            Spring/Summer</router-link
          >
        </li>
        <li class="text-body font-bold lg:font-light lg:text-bodyh">
          <router-link :to="`/products/collection/Party`">Party</router-link>
        </li>
        <li class="text-body font-bold lg:font-light lg:text-bodyh">
          <router-link :to="`/products/collection/Fall%2FWinter`">
            Fall/Winter</router-link
          >
        </li>
      </ul>
      <li>
        <router-link
          to="/login"
          class="text-xs-sub lg:text-sub font-text relative mb-2"
          >Login</router-link
        >
      </li>
      <li>
        <router-link
          to="/sign-up"
          class="text-xs-sub lg:text-sub font-text relative mb-2"
          >Join</router-link
        >
      </li>
      <li>
        <router-link
          to="/profile"
          class="text-xs-sub lg:text-sub font-text relative mb-2"
          >Profile</router-link
        >
      </li>
      <li
        class="text-xs-sub lg:text-sub font-text relative mb-2 cursor-pointer"
        @click="logout"
      >
        Log Out
      </li>
    </ul>
    <nav
      class="lg:hidden fixed bottom-0 bg-notWhite w-full p-2 border-t-notBlack border-t py-4"
    >
      <ul class="grid grid-cols-4 w-full">
        <li
          class="flex justify-center items-center"
          type="button"
          @click="toggleNav"
        >
          <img :src="menu" class="w-8 h-8" />
        </li>
        <li class="flex justify-center items-center">
          <router-link to="/bag">
            <img :src="bag" class="lg:h-12 lg:w-12 h-8 w-8 2xl:h-16 2xl:w-16" />
          </router-link>
        </li>
        <li class="flex justify-center items-center">
          <router-link to="/wishlist">
            <img
              :src="hearth"
              class="lg:h-12 lg:w-12 h-8 w-8 2xl:h-16 2xl:w-16"
            />
          </router-link>
        </li>
        <li class="flex justify-center items-center">
          <router-link to="/profile">
            <img
              @click="toggleDropdown"
              :src="user"
              class="lg:h-12 lg:w-12 h-8 w-8 2xl:h-16 2xl:w-16"
            />
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import bag from "../assets/bag-outline.svg";
import hearth from "../assets/hearth.svg";
import user from "../assets/account.svg";
import menu from "../assets/menu.svg";
import expand_more from "../assets/expand_more.svg";
import expand_less from "../assets/expand_less.svg";

export default defineComponent({
  name: "navbar",
  data() {
    return {
      isScrolled: false,
      showDropdown: false,
      showMenu: false,
      isExpanded: false,
      menu,
      hearth,
      user,
      bag,
      expand_more,
      expand_less,
      screenWidth: window.innerWidth,
      showCollection: false,
      prod: false,
      col: false,
    };
  },
  computed: {
    isScreenSmaller() {
      return this.screenWidth < 1024;
    },
  },
  created() {
    // Attach a click event listener to the document body
    document.body.addEventListener("click", this.handleOutsideClick);
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.handleResize);
  },

  destroyed() {
    // Clean up the event listener when the component is destroyed
    document.body.removeEventListener("click", this.handleOutsideClick);
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    toggleCol() {
      this.col = !this.col;
      this.prod = false;
    },
    toggleProd() {
      this.prod = !this.prod;
      this.col = false;
    },
    toggleCollection() {
      this.showCollection = !this.showCollection;
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    toggleNav() {
      this.showMenu = !this.showMenu;
    },

    toggleExpanded() {
      this.isExpanded = !this.isExpanded;
    },
    handleResize() {
      this.screenWidth = window.innerWidth;
    },
    handleScroll() {
      // Determine if the user has scrolled by checking the scroll position
      this.isScrolled = window.pageYOffset > 100;
    },
    handleOutsideClick(event: MouseEvent) {
      // Check if the clicked element is outside the dropdown and collection
      const dropdownRef = this.$refs.dropdown as HTMLElement;
      const collectionRef = this.$refs.collection as HTMLElement;

      const isClickedOutsideDropdown = !dropdownRef.contains(
        event.target as Node
      );
      const isClickedOutsideCollection = !collectionRef.contains(
        event.target as Node
      );

      // If clicked outside, close the dropdown and collection
      if (isClickedOutsideDropdown) {
        this.showDropdown = false;
      }
      if (isClickedOutsideCollection) {
        this.showCollection = false;
      }
    },
    closeSidebar() {
      this.showCollection = false;
      this.showDropdown = false;
    },
    async logout() {
      try {
        const response = await fetch(
          "https://capsule-wardrobe.onrender.com/api/auth/logout",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          // Logout successful
          // Perform any additional cleanup or redirection if needed
          this.$cookies.remove("token");
          this.$cookies.remove("id");
          console.log("Logged out successfully");
          window.location.href = "/login";
        } else {
          // Logout failed
          console.error("Failed to log out:", response.statusText);
        }
      } catch (error) {
        console.error("Error during logout:", error);
      }
    },
  },
});
</script>
