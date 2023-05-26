<template>
  <div
    class="w-full z-10 absolute lg:fixed top-0 transition-colors ease-linear duration-600"
    :class="{
      'lg:bg-notWhite lg:border-b lg:border-notBlack ': showMenu || isScrolled,
      'bg-gradient-to-b from-blue': !showMenu && !isScrolled,
    }"
  >
    <nav
      class="px-9 py-8 lg:py-4 lg:px-24 flex items-center justify-center w-full"
    >
      <!--mobile menu-->
      <div
        :class="
          showMenu
            ? 'w-full absolute top-24 left-0 border-b border-t border-notBlack  bg-notWhite/50 backdrop-blur-md '
            : 'hidden'
        "
      >
        <ul class="flex justify-center pl-4 py-4 flex-col">
          <li class="text-xs-sub lg:text-sub font-text relative mb-4">
            <router-link :to="{ name: 'products', params: { cat: ['all'] } }"
              >All</router-link
            >
            <div
              class="bottom-0 left-0 w-3/4 bg-notBlack absolute border-b border-solid border-notBlack"
            ></div>
          </li>
          <li class="text-body font-bold lg:font-light lg:text-bodyh py-1">
            <router-link :to="{ name: 'products', params: { cat: ['Dress'] } }"
              >Dresses</router-link
            >
          </li>
          <li class="text-body font-bold lg:font-light lg:text-bodyh py-1">
            Tops & Blouses
          </li>
          <li class="text-body font-bold lg:font-light lg:text-bodyh py-1">
            Pants & Skirts
          </li>
          <li class="text-body font-bold lg:font-light lg:text-bodyh py-1">
            Jewellery
          </li>
          <li class="text-xs-sub lg:text-sub font-text relative mb-4">
            Collections
            <div
              class="bottom-0 left-0 w-3/4 bg-notBlack absolute border-b border-solid border-notBlack"
            ></div>
          </li>
          <li class="text-body font-bold lg:font-light lg:text-bodyh py-1">
            Beach Wear
          </li>
          <li class="text-body font-bold lg:font-light lg:text-bodyh py-1">
            Spring/Summer
          </li>
          <li class="text-body font-bold lg:font-light lg:text-bodyh py-1">
            Party
          </li>
          <li class="text-body font-bold lg:font-light lg:text-bodyh py-1">
            Fall/Winter
          </li>
          <li class="text-xs-sub lg:text-sub font-text relative mb-4">
            My Account
            <div
              class="bottom-0 left-0 w-3/4 bg-notBlack absolute border-b border-solid border-notBlack"
            ></div>
          </li>
          <li class="text-body font-bold lg:font-light lg:text-bodyh py-1">
            Login
          </li>
          <li class="text-body font-bold lg:font-light lg:text-bodyh py-1">
            Join
          </li>
          <li class="text-body font-bold lg:font-light lg:text-bodyh py-1">
            <router-link :to="{ path: '/profile' }"> Profile </router-link>
          </li>
        </ul>
      </div>
      <div class="grow hidden lg:block">
        <button
          @click="
            toggleCollection();
            toggleExpanded();
          "
          class="flex relative z-50 bg-notBlack/10 items-center group text-notBlack text-bodyh font-text border border-notBlack py-1 px-10 bg-notWhite"
        >
          Collection
          <img
            :src="expand_more"
            :class="!showCollection ? 'block' : 'hidden'"
            class="w-4 h-4 lg:w-8 lg:h-8 transition ease-in-out delay-150 duration-300 fill-notBlack"
          />
          <img
            :src="expand_less"
            :class="showCollection ? 'block' : 'hidden'"
            class="w-4 h-4 lg:w-8 lg:h-8 transition ease-in-out delay-150 duration-300 fill-notBlack"
          />
        </button>
        <ul
          :class="showCollection ? 'absolute' : 'hidden'"
          class="text-notBlack h-screen w-1/3 top-0 left-0 pt-10 bg-notWhite/50 backdrop-blur-md border-r border-notBlack shadow flex justify-center flex-col pl-24"
        >
          <li class="text-xs-sub lg:text-sub font-text relative mb-4">
            <router-link :to="{ name: 'products', params: { cat: ['all'] } }"
              >All</router-link
            >
            <div
              class="bottom-0 left-0 w-3/4 bg-notBlack absolute border-b border-solid border-notBlack"
            ></div>
          </li>
          <li class="text-body font-bold lg:font-light lg:text-bodyh">
            <router-link
              :to="{ name: 'products', params: { cat: ['Dress', 'Jumpsuit'] } }"
              >Dresses & Jumsuits</router-link
            >
          </li>
          <li class="text-body font-bold lg:font-light lg:text-bodyh">
            <router-link
              :to="{ name: 'products', params: { cat: ['Top', 'Blouse'] } }"
              >Tops & Blouses</router-link
            >
          </li>
          <li class="text-body font-bold lg:font-light lg:text-bodyh">
            <router-link
              :to="{ name: 'products', params: { cat: ['Pant', 'Skirt'] } }"
              >Pants & Skirts</router-link
            >
          </li>
          <li class="text-body font-bold lg:font-light lg:text-bodyh">
            <router-link :to="{ path: '/products/Jewellery' }">
              Jewellery
            </router-link>
          </li>
          <li class="text-xs-sub lg:text-sub font-text relative mb-4">
            Collections
            <div
              class="bottom-0 left-0 w-3/4 bg-notBlack absolute border-b border-solid border-notBlack"
            ></div>
          </li>
          <li class="text-body font-bold lg:font-light lg:text-bodyh">
            Beach Wear
          </li>
          <li class="text-body font-bold lg:font-light lg:text-bodyh">
            Spring/Summer
          </li>
          <li class="text-body font-bold lg:font-light lg:text-bodyh">Party</li>
          <li class="text-body font-bold lg:font-light lg:text-bodyh">
            Fall/Winter
          </li>
        </ul>
      </div>
      <!-- Mobile menu button -->
      <button
        type="button"
        @click="toggleNav"
        class="flex lg:hidden grow justify-start"
      >
        <img :src="menu" class="w-8 h-8" />
      </button>

      <router-link to="/" class="grow text-center"
        ><span class="font-logo text-notBlack lg:text-headline text-xs-headline"
          >CAPSULE</span
        >
      </router-link>
      <div class="flex grow justify-end lg:space-x-4">
        <div>
          <router-link to="/bag">
            <img :src="bag" class="lg:h-12 lg:w-12 h-8 w-8 2xl:h-16 2xl:w-16" />
          </router-link>
        </div>
        <div>
          <router-link to="/wishlist">
            <img
              :src="hearth"
              class="lg:h-12 lg:w-12 h-8 w-8 2xl:h-16 2xl:w-16"
            />
          </router-link>
        </div>
        <div>
          <img
            @click="toggleDropdown"
            :src="user"
            class="lg:h-12 lg:w-12 h-8 w-8 2xl:h-16 2xl:w-16 hidden relative lg:block"
          />
          <div
            :class="showDropdown ? 'absolute mx-auto' : 'hidden'"
            class="z-10 bg-notWhite/50 backdrop-blur-md divide-y divide-gray-400 border border-notBlack shadow w-36"
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
      <div v-if="isScrolled" class="lg:hidden sticky w-full bg-notWhite">
        <div>
          <router-link to="/bag">
            <img :src="bag" class="lg:h-12 lg:w-12 h-8 w-8 2xl:h-16 2xl:w-16" />
          </router-link>
        </div>
        <div>
          <router-link to="/wishlist">
            <img
              :src="hearth"
              class="lg:h-12 lg:w-12 h-8 w-8 2xl:h-16 2xl:w-16"
            />
          </router-link>
        </div>
      </div>
    </nav>
  </div>
  <nav
    v-if="isScreenSmaller"
    class="lg:hidden fixed bottom-0 bg-notWhite w-full p-2 border-t-notBlack border-t"
  >
    <ul class="grid grid-cols-3 w-full">
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
</template>
<script lang="ts">
import { defineComponent } from "vue";
import bag from "../assets/bag-outline.svg";
import hearth from "../assets/hearth.svg";
import user from "../assets/account.svg";
import menu from "../assets/menu.svg";
import expand_more from "../assets/expand_more.svg";
import expand_less from "../assets/expand_less.svg";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "navbar",
  data() {
    return {
      isScrolled: false,

      showDropdown: false,

      showMenu: false,

      showCollection: false,

      isExpanded: false,

      menu,
      hearth,
      user,
      bag,
      expand_more,
      expand_less,
      screenWidth: window.innerWidth,
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
  },
  mounted() {
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
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    toggleNav() {
      this.showMenu = !this.showMenu;
    },
    toggleCollection() {
      this.showCollection = !this.showCollection;
    },
    handleClick() {
      console.log("click");
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
      const clickedElement = event.target as HTMLElement;

      // Check if the sidebar is open and the clicked element is outside
      if (
        !this.$el.contains(clickedElement) &&
        !clickedElement.classList.contains("close-button")
      ) {
        this.closeSidebar();
      }
    },
    closeSidebar() {
      this.showCollection = false;
      this.showDropdown = false;
    },
    async logout() {
      try {
        const response = await fetch("http://localhost:8000/api/auth/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          // Logout successful
          // Perform any additional cleanup or redirection if needed
          this.$cookies.remove("token");
          this.$cookies.remove("id");
          console.log("Logged out successfully");
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
