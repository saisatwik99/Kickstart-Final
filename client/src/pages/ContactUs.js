import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import Header from "components/light.js";
import Footer from "components/Footer.js";
import ContactUsForm from "components/ContactUsForm.js";
import ContactDetails from "components/ContactDetailsCard.js";

const Address = tw.span`leading-relaxed`;
const AddressLine = tw.span`block`;
const Email = tw.span`text-sm mt-6 block text-gray-500`;
const Phone = tw.span`text-sm mt-0 block text-gray-500`;

// Contact Us Component
export default () => {
  return (
    <AnimationRevealPage>
      <Header />
      <ContactUsForm />
      <ContactDetails
        cards={[
          {
            title: "Hyderabad",
            description: (
              <>
                <Address>
                  <AddressLine>40 Hills</AddressLine>
                  <AddressLine>Hitech City, HYD 67584</AddressLine>
                </Address>
                <Email>contact@kickstart.com</Email>
                <Phone>+91 (821) 123-3122</Phone>
              </>
            )
          },
          {
            title: "Banglore",
            description: (
              <>
                <Address>
                  <AddressLine>602 Drive Park</AddressLine>
                  <AddressLine>Koramngala, BA 62115</AddressLine>
                </Address>
                <Email>contact@kickstart.com</Email>
                <Phone>+91 (921) 991-6988</Phone>
              </>
            )
          },
          {
            title: "California",
            description: (
              <>
                <Address>
                  <AddressLine>96 NE. Delaware Lane</AddressLine>
                  <AddressLine>Pala Alto, CA 95820</AddressLine>
                </Address>
                <Email>contact@kickstart.com</Email>
                <Phone>+1 (203) 991-6988</Phone>
              </>
            )
          }
        ]}
      />
      <Footer />
    </AnimationRevealPage>
  );
};
