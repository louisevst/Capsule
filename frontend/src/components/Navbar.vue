<template>
  <div
    class="absolute top-0 w-full z-10 transition-opacity ease-linear"
    :class="showMenu ? 'bg-notWhite' : 'bg-gradient-to-b from-blue'"
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
            All
            <div
              class="bottom-0 left-0 w-3/4 bg-notBlack absolute border-b border-solid border-notBlack"
            ></div>
          </li>
          <li class="text-body font-bold lg:font-light lg:text-bodyh py-1">
            Dresses & Jumsuits
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
            Profile
          </li>
        </ul>
      </div>
      <div class="grow hidden lg:block">
        <button
          @click="
            toggleCollection();
            toggleExpanded();
          "
          class="flex relative z-50 items-center group text-notBlack text-bodyh font-text border border-notBlack py-1 px-10 bg-notWhite"
        >
          Collection
          <img
            :src="Expand_more"
            :class="!isExpanded ? 'group-hover:block' : 'hidden'"
            class="w-4 h-4 lg:w-8 lg:h-8 hidden absolute right-2 gro transition ease-in-out delay-150 duration-300 fill-notBlack"
          />
          <img
            :src="Expand_less"
            :class="isExpanded ? 'absolute' : 'hidden'"
            class="w-4 h-4 lg:w-8 lg:h-8 right-2 gro transition ease-in-out delay-150 duration-300 fill-notBlack"
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
        <img :src="Menu" class="w-8 h-8" />
      </button>

      <router-link to="/" class="grow text-center"
        ><span class="font-logo text-notBlack lg:text-headline text-xs-headline"
          >CAPSULE</span
        >
      </router-link>
      <div class="flex grow justify-end lg:space-x-4">
        <div>
          <router-link to="/bag">
            <img :src="Bag" class="lg:h-12 lg:w-12 h-8 w-8" />
          </router-link>
        </div>
        <div>
          <router-link to="/wishlist">
            <img :src="Hearth" class="lg:h-12 lg:w-12 h-8 w-8" />
          </router-link>
        </div>
        <div>
          <img
            @click="toggleDropdown"
            :src="User"
            class="lg:h-12 lg:w-12 h-8 w-8 hidden lg:flex"
          />
          <div
            :class="showDropdown ? 'absolute' : 'hidden'"
            class="z-10 bg-notWhite divide-y divide-gray-400 border border-notBlack shadow w-36"
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
              <li>
                <router-link
                  to="/"
                  class="block px-4 py-2 hover:bg-terracota hover:text-white"
                  >Sign Out</router-link
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
<script lang="ts">
import bag from "../assets/bag.svg";
import hearth from "../assets/hearth-full.svg";
import user from "../assets/user.svg";
import menu from "../assets/menu.svg";
import expand_more from "../assets/expand_more.svg";
import expand_less from "../assets/expand_less.svg";
import { ref } from "vue";
export default {
  setup() {
    let isExpanded = ref(false);
    let showMenu = ref(false);
    let showDropdown = ref(false);
    let showCollection = ref(false);
    const toggleDropdown = () => (showDropdown.value = !showDropdown.value);
    const toggleNav = () => (showMenu.value = !showMenu.value);
    const toggleCollection = () =>
      (showCollection.value = !showCollection.value);
    const handleClick = () => {
      console.log("click");
    };
    const toggleExpanded = () => (isExpanded.value = !isExpanded.value);
    const Menu = menu;
    const Bag = bag;
    const Hearth = hearth;
    const User = user;
    const Expand_less = expand_less;
    const Expand_more = expand_more;
    return {
      showDropdown,
      toggleDropdown,
      showMenu,
      toggleNav,
      showCollection,
      toggleCollection,
      handleClick,
      isExpanded,
      toggleExpanded,
      Menu,
      Hearth,
      User,
      Bag,
      Expand_more,
      Expand_less,
    };
  },
};
</script>
