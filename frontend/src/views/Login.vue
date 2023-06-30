<template>
  <div class="flex flex-col lg:flex-row">
    <section class="relative bg-black lg:w-1/2 lg:max-h-screen">
      <img
      src=https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938789/Images/arun-sharma-gGbyz5fX03c-unsplash_xsu9fr.jpg
      alt="A woman sitting on a couch." class="opacity-80 w-full h-full
      object-cover block"/>
      <h1
        class="text-xs-xlheadline font-title absolute bottom-0 text-center w-full text-notWhite lg:text-headline xl:hidden"
      >
        Welcome back
      </h1>
    </section>
    <section
      class="lg:w-1/2 lg:h-screen lg:flex lg:justify-center lg:flex-col px-4 lg:pt-10 xl:pt-4 lg:px-10"
    >
      <h1
        class="hidden xl:block font-title lg:text-xlheadline leading-none lg:pt-24"
      >
        Welcome back
      </h1>
      <form
        @submit="handleSubmit"
        class="flex justify-around items-center flex-col py-4 max-h-full space-y-4 lg:space-y-0 2xl:space-y-4"
      >
        <Input
          label="What's your email?"
          name="email"
          type="email"
          :value="email"
          @input="email = $event.target.value"
          placeholder="Type your email here."
          required
        />
        <Input
          label="Choose a password."
          name="password"
          type="password"
          :value="password"
          @input="password = $event.target.value"
          placeholder="Type your password here."
          required
        />
        <p class="self-start">
          Did you mean to
          <router-link to="/sign-up" class="border-b border-notBlack"
            >sign up</router-link
          >?
        </p>
        <div class="flex justify-center lg:pt-4">
          <CTA
            text="Login"
            button-color="bg-terracota"
            text-color="text-notWhite"
            bgColor="bg-notWhite"
            invertIcon="invert"
            type="submit"
            :onClick="handleSubmit"
          />
        </div>
      </form>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Input from "../components/Input.vue";
import CTA from "../components/CTA.vue";
import VueCookies from "vue-cookies";
import { notify } from "notiwind";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Login",
  components: { Input, CTA },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async handleSubmit(event: Event) {
      event.preventDefault(); // prevent the default form submission behavior
      try {
        const response = await fetch(
          "https://capsule-wardrobe.onrender.com/api/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: this.email,
              password: this.password,
            }),
          }
        );
        const data = await response.json();
        this.$cookies.set("token", data.token);
        this.$cookies.set("id", data.user._id);

        this.navigate("category", "All");
      } catch (error) {
        console.log(error);
        notify(
          {
            group: "bottom",
            title: "Error",
            text: "Your account wasn't registered, please try again.",
          },
          4000
        );
      }
    },
  },
  created() {
    (this as any).$cookies = VueCookies;
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
