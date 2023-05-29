import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Bag from "../views/Bag.vue";
import Checkout from "../views/Checkout.vue";
import Contact from "../views/Contact.vue";
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
import Profile from "../views/Profile.vue";
import Wishlist from "../views/Wishlist.vue";
// import AllProducts from "../views/AllProducts.vue";
import ProductDetails from "../views/ProductDetails.vue";
import Products from "../views/Products.vue";
import Category from "../views/Category.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/products",
      name: "products",
      component: Products,
    },
    {
      path: "/category/:slug",
      name: "category",
      component: Category,
    },
    // {
    //   path: "/products/:cat+",
    //   name: "products",
    //   component: AllProducts,
    //   props: true,
    // },
    {
      path: "/product/:id",
      name: "product",
      component: ProductDetails,
    },
    {
      path: "/about",
      name: "about",
      component: About,
    },
    {
      path: "/bag",
      name: "bag",
      component: Bag,
    },
    {
      path: "/checkout",
      name: "checkout",
      component: Checkout,
    },
    {
      path: "/contact",
      name: "contact",
      component: Contact,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/sign-up",
      name: "sign-up",
      component: SignUp,
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
    },
    {
      path: "/wishlist",
      name: "wishlist",
      component: Wishlist,
    },
  ],
});

export default router;
