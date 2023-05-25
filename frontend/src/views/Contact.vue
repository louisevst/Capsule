<template>
  <div class="flex flex-col lg:flex-row">
    <section
      class="relative bg-black lg:w-1/2 lg:max-h-screen after:overflow-hidden"
    >
      <img
      src=https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938788/Images/aiony-haust-j5L0X1ioajw-unsplash_oyhanx.jpg
      alt="A woman sitting on a couch." class="opacity-80 w-full h-full
      object-cover block"/>
      <h1
        class="text-xs-xlheadline font-title absolute bottom-0 text-center w-full text-notWhite lg:text-headline xl:hidden"
      >
        Contact us
      </h1>
    </section>
    <section
      class="lg:w-1/2 lg:h-screen lg:flex lg:justify-center lg:flex-col px-4 lg:pt-10 xl:pt-4 lg:px-10"
    >
      <h1
        class="hidden xl:block font-title lg:text-xlheadline leading-none lg:pt-24"
      >
        Contact us
      </h1>
      <form
        @submit="handleSubmit"
        class="flex justify-around items-center flex-col py-4 max-h-full space-y-4 lg:space-y-0 2xl:space-y-4"
      >
        <Input
          label="What's your email?"
          name="email"
          type="email"
          @input="(event: Event) => { email = (event.target as HTMLInputElement).value }"
          placeholder="Type your email here."
          required
        />
        <Input
          label="What's your name?"
          name="name"
          type="name"
          @input="(event: Event) => { name = (event.target as HTMLInputElement).value }"
          placeholder="Type your name here."
          required
        />
        <div class="w-full">
          <label
            for="underline_select"
            class="font-semibold lg:font-light lg:text-bodyh text-notBlack mr-auto"
            >Why are you contacting us?</label
          >
          <select
            id="underline_select"
            class="block py-2.5 px-0 w-full text-sm text-notBlack bg-transparent border-0 border-b border-notBlack appearance-none focus:outline-none focus:ring-0 focus:border-terracota peer"
            v-model="subject"
          >
            <option selected>Select a subject here</option>
            <option value="order">Order</option>
            <option value="request">Request</option>
            <option value="claim">Claim</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="w-full flex flex-col">
          <label
            for="story"
            class="font-semibold lg:font-light lg:text-bodyh text-notBlack"
            >What's your message?</label
          >
          <textarea
            id="story"
            name="story"
            class="border-b border-b-notBlack border-transparent focus:ring-transparent focus:border-transparent focus:border-b-terracota"
            placeholder="Type your message here..."
            v-model="message"
          ></textarea>
        </div>
        <div class="flex justify-center lg:pt-4">
          <CTA
            text="Send your message"
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
import { notify } from "notiwind";

export default defineComponent({
  name: "Contact",
  components: { Input, CTA },
  data() {
    return {
      email: "",
      name: "",
      subject: "",
      message: "",
    };
  },
  methods: {
    handleClick() {
      console.log(
        JSON.stringify({
          email: this.email,
          name: this.name,
          subject: this.subject,
          message: this.message,
        })
      );
    },
    async handleSubmit(event: Event) {
      event.preventDefault();
      try {
        const response = await fetch("http://localhost:8000/api/message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.email,
            name: this.name,
            subject: this.subject,
            message: this.message,
          }),
        });
        const data = await response.json();
        console.log(data);
      } catch (error: unknown) {
        console.log(error);
        notify(
          {
            group: "bottom",
            title: "Error",
            text: "Your message wasn't send. Please try again.",
          },
          4000
        );
      }
    },
  },
});
</script>
