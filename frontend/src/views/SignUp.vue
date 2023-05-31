<template>
  <div class="flex flex-col lg:flex-row">
    <section
      class="relative bg-black lg:w-1/2 lg:max-h-screen after:overflow-hidden"
    >
      <img
      src=https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938790/Images/pexels-cottonbro-studio-5119214_am3me2.jpg
      alt="A woman with bold eye makeup" class="opacity-80 w-full h-full
      object-cover block"/>
      <h1
        class="text-xs-xlheadline font-title absolute bottom-0 text-center w-full text-notWhite lg:text-headline xl:hidden"
      >
        Create your account
      </h1>
    </section>
    <section
      class="lg:w-1/2 lg:h-screen lg:flex lg:justify-center lg:flex-col px-4 lg:pt-10 xl:pt-4 lg:px-10"
    >
      <h1
        class="hidden xl:block font-title lg:text-xlheadline leading-none lg:pt-24"
      >
        Create your account
      </h1>
      <form
        @submit="handleSubmit"
        class="flex justify-around items-center flex-col py-4 max-h-full space-y-4 lg:space-y-0 2xl:space-y-4"
      >
        <Input
          label="What's your name?"
          name="first_name"
          placeholder="Type your first name here."
          @input="(event: Event) => { first_name = (event.target as HTMLInputElement).value }"
          required
        />
        <Input
          label="What's your last name?"
          name="last_name"
          placeholder="Type your last name here."
          @input="(event: Event) => { last_name = (event.target as HTMLInputElement).value }"
          required
        />
        <Input
          label="What's your email?"
          name="email"
          type="email"
          placeholder="Type your email here."
          @input="(event: Event) => { email = (event.target as HTMLInputElement).value }"
          required
        />
        <Input
          label="Choose a password."
          name="password"
          type="password"
          placeholder="Type your password here."
          @input="(event: Event) => { password = (event.target as HTMLInputElement).value }"
          required
        />
        <div class="w-full space-x-2 text-body 2xl:text-bodyh font-text">
          <input
            type="checkbox"
            id="checkbox"
            class="bg-notWhite border-notBlack text-terracota focus:ring-terracota 2xl:w-8 2xl:h-8"
            required="true"
          />
          <label for="checkbox">I agree to the terms and conditions</label>
        </div>
        <p class="self-start">
          Did you mean to
          <router-link to="/login" class="border-b border-notBlack"
            >login</router-link
          >?
        </p>
        <div class="flex justify-center lg:pt-4">
          <CTA
            text="Sign up"
            button-color="bg-terracota"
            text-color="text-notWhite"
            bgColor="bg-notWhite"
            invertIcon="invert"
            type="submit"
            :onClick="handleClick"
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

export default defineComponent({
  name: "signUp",
  components: { Input, CTA },
  data() {
    return {
      first_name: "" as string,
      last_name: "" as string,
      email: "" as string,
      password: "" as string,
      checked: false as boolean,
    };
  },
  methods: {
    handleClick() {
      console.log(this.first_name);
    },
    async handleSubmit(event: Event) {
      event.preventDefault(); // prevent the default form submission behavior
      try {
        const response = await fetch("http://localhost:8000/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            password: this.password,
          }),
        });
        const data = await response.json();
        console.log(data);
        this.$cookies.set("token", data.token);
        this.$cookies.set("id", data.user._id);
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
});
</script>
