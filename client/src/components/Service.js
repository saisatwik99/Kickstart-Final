import React, { useEffect } from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Features from "./AllServices.js";
import ServiceHeading from "./ServiceHeading.js";
import ServiceValue from "./ServiceValues.js";
import HeaderTop from "components/light.js";
import Footer from "./Footer.js";
import prototypeIllustrationImageSrc from "../images/prototype-illustration.svg";
import { ReactComponent as BriefcaseIcon } from "feather-icons/dist/icons/briefcase.svg";
import { ReactComponent as MoneyIcon } from "feather-icons/dist/icons/dollar-sign.svg";
import { useHistory } from "react-router-dom";
import jwt from 'jsonwebtoken';

export default () => {
  const Subheading = tw.span`uppercase tracking-widest font-bold text-primary-500`;
  const HighlightedText = tw.span`text-primary-500`;

  const history = useHistory()

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = jwt.decode(token);
      if(!user) {
        localStorage.removeItem('token')
        history.replace('/login');
      }
    } else {
      history.replace('/login');
    }
    
  }, [history]);
  return (
    <AnimationRevealPage>
      <HeaderTop/>
      <ServiceHeading/>
      <Features
        subheading={<Subheading>Features</Subheading>}
        heading={
          <>
            We have Amazing <HighlightedText>Service.</HighlightedText>
          </>
        }
      />
      
      <ServiceValue
        subheading={<Subheading>VALUES</Subheading>}
        heading={
          <>
            We Always Abide by Our <HighlightedText>Principles.</HighlightedText>
          </>
        }
        imageSrc={prototypeIllustrationImageSrc}
        showDecoratorBlob={false}
        features={[
          {
            Icon: MoneyIcon,
            title: "Affordable",
            description: "We promise to offer you the best rate we can - at par with the industry standard.",
            iconContainerCss: tw`bg-green-300 text-green-800`
          },
          {
            Icon: BriefcaseIcon,
            title: "Professionalism",
            description: "We assure you that our templates are designed and created by professional designers.",
            iconContainerCss: tw`bg-red-300 text-red-800`
          }
        ]}
      />
      <Footer />
    </AnimationRevealPage>
  );
}
