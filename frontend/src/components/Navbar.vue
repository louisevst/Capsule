<script setup lang="ts">
import bag from "../assets/bag.svg";
import hearth from "../assets/hearth-full.svg";
import user from "../assets/user.svg";
</script>
<template>
  <nav
    class="flex w-full items-center text-notBlack bg-gradient-to-b from-blue pt-8"
  >
    <button>collection</button>
    <div><span class="font-logo text-sub lg:text-headline">CAPSULE</span></div>
    <img :src="bag" class="h-6 w-6" />
    <img :src="hearth" class="h-6 w-6" />
    <img :src="user" class="h-6 w-6" />
  </nav>
</template>
