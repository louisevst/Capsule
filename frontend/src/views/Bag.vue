<template>
  <div class="grid grid-cols-2 lg:grid-cols-4">
    <WishlistProduct
      name="Chloé"
      description="jolie robe"
      :price="10"
      :colors="['#FF0000', '#00FF00', '#0000FF']"
      image="https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938791/Images/pexels-monstera-7691207_ay4uxa"
      :sizes="['S', 'M', 'L']"
      :fits="['petite', 'tall', 'regular']"
    />
    <Product
      name="Chloé"
      description="jolie robe"
      :price="10"
      :colors="['#FF0000', '#00FF00', '#0000FF']"
      image="https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938791/Images/pexels-monstera-7691207_ay4uxa"
    />
    <Product
      name="Chloé"
      description="jolie robe"
      :price="10"
      :colors="['#FF0000', '#00FF00', '#0000FF']"
      image="https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938791/Images/pexels-monstera-7691207_ay4uxa"
    />
    <Product
      name="Chloé"
      description="jolie robe"
      :price="10"
      :colors="['#FF0000', '#00FF00', '#0000FF']"
      image="https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938791/Images/pexels-monstera-7691207_ay4uxa"
    />
    <Product
      name="Chloé"
      description="jolie robe"
      :price="10"
      :colors="['#FF0000', '#00FF00', '#0000FF']"
      image="https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938791/Images/pexels-monstera-7691207_ay4uxa"
    />
    <Product
      name="Chloé"
      description="jolie robe"
      :price="10"
      :colors="['#FF0000', '#00FF00', '#0000FF']"
      image="https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938791/Images/pexels-monstera-7691207_ay4uxa"
    />
    <Product
      name="Chloé"
      description="jolie robe"
      :price="10"
      :colors="['#FF0000', '#00FF00', '#0000FF']"
      image="https://res.cloudinary.com/da3ulvbxj/image/upload/v1682938791/Images/pexels-monstera-7691207_ay4uxa"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Product from "../components/Product.vue";
import WishlistProduct from "../components/WishlistProduct.vue";

export default defineComponent({
  name: "Bag",
  components: {
    Product,
    WishlistProduct,
  },
});
</script>
