import React from 'react';
import { useParams } from 'react-router-dom';


import LoginPage from "pages/Login.js";
import SignupPage from "pages/Signup.js";
import PricingPage from "pages/Pricing.js";
import ExplorePage from "./components/ExploreCard.js";
import WishlistPage from "./components/Wishlist.js";
import ContactUsPage from "pages/ContactUs.js";
import blog from "./components/Blog.js"
import completePage from './components/CompleteExplore.js';
import ServicePage from './components/Service.js';
import BookingPage from './pages/Book.js';

// Routing happens here
export const components = {

  page: {
    service: {
      component:ServicePage
    },
    wishlist: {
      component: WishlistPage
    },
    explore: {
      component: ExplorePage
    },
    blog: {
      component: blog
    },
    price: {
      component: PricingPage
    },
    contact: {
      component: ContactUsPage
    },
    login: {
      component: LoginPage
    },
    signup: {
      component: SignupPage
    },
    info: {
      component: completePage
    },
    book: {
      component: BookingPage
    }
  }
}

// Maps with router with the component
export default () => {
  const { page, item } = useParams()

  try {
    let Component = null;
    if(page === "explore" && item != null){
      Component= components["page"]["info"].component
      return <Component productId = {item} />
        
    }
    else if(page != null) {
      Component= components["page"][page].component
      return <Component/>
    }
    

    if(Component)
      return <Component/>

    throw new Error("Component Not Found")
  }
  catch (e) {
    console.log(e)
    return <div>Error: Component Not Found</div>
  }
}
