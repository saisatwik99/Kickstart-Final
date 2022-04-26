import React from "react";
import tw from "twin.macro";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/LandingPageHero.js";
import Testimonial from "components/LandingPageTestinomial.js";
import SimpleWithSideImageFAQS from "components/Main-Faq.js";
import TrendingCard from "components/TrendingCard.js";
import Footer from "components/Footer.js";
import MainFeature1 from "components/LandingPageVision.js";

// Landing Page Component -> Route("/")
export default () => {
  const Subheading = tw.span`tracking-wider text-sm font-medium`;
  const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
  const imageCss = tw`rounded-4xl`;
  return (
    <AnimationRevealPage>
      <Hero
        heading={<>Everything You Need to Buy <HighlightedText>StartUps</HighlightedText></>}
        description="Join 100,000+ entrepreneurs buying and selling startups on the world’s #1 acquisition marketplace. Get instant access to 100,000+ trusted buyers. Big or small, get your startup acquired at the maximum price in as little as 30 days."
        imageSrc={"https://images.unsplash.com/photo-1589561253898-768105ca91a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3RhcnR1cHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"}
        imageCss={imageCss}
        imageDecoratorBlob={true}
        primaryButtonText="Let's Go"
        watchVideoButtonText="Meet Amazing.."
      />
      <MainFeature1
        subheading={<Subheading>Our Vision</Subheading>}
        heading="Discover your dream startup"
        buttonRounded={false}
        primaryButtonText="See More"
        imageSrc={"https://images.unsplash.com/photo-1598301257982-0cf014dabbcd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHN0YXJ0dXB8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=100"}
        textOnLeft={false}
      />
      
      <TrendingCard/>
      
      
      <Testimonial textOnLeft={true}/>
      <SimpleWithSideImageFAQS/>
      <Footer />
    </AnimationRevealPage>
  );
}
