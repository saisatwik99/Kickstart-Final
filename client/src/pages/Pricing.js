import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Header from "components/light.js";
import Pricing from "components/PricingCard.js";
import Testimonial from "components/PricingPageTestinomial.js";
import Footer from "components/Footer.js";
import FAQ from "components/Pricing-Faq.js";

// Price Page Component
export default () => {
  return (
    <AnimationRevealPage>
      <Header />
      <Pricing />
      <Testimonial
        heading="Our Paying Customers"
      />
      <FAQ />
      <Footer/>
    </AnimationRevealPage>
  );
};
