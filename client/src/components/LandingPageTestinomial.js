import React, { useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "./misc/Headings.js";
import { PrimaryButton } from "./misc/Buttons.js";
import { ReactComponent as QuotesLeftIcon } from "../images/quotes-l.svg";
import { ReactComponent as QuotesRightIcon } from "../images/quotes-r.svg";
import { ReactComponent as ChevronLeftIcon } from "feather-icons/dist/icons/chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "feather-icons/dist/icons/chevron-right.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "../images/svg-decorator-blob-4.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "../images/svg-decorator-blob-5.svg";

import "slick-carousel/slick/slick.css";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;
const TestimonialsContainer = tw.div`mt-16 lg:mt-0`;
const Testimonials = styled.div``;
const Testimonial = tw.div`max-w-md lg:max-w-none mx-auto lg:mx-0 flex flex-col items-center lg:items-stretch lg:flex-row`;

const TestimonialImageSlider = tw(Slider)`w-full lg:w-5/12 flex-shrink-0 `;
const TestimonialTextSlider = tw(Slider)``;
const TestimonialText = tw.div`outline-none`;

const ImageAndControlContainer = tw.div`relative outline-none`;
const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded bg-cover bg-center h-80 sm:h-96 lg:h-144`
]);

const ControlContainer = tw.div`absolute bottom-0 right-0 bg-gray-100 px-6 py-4 rounded-tl-3xl border`;
const ControlButton = styled(PrimaryButton)`
  ${tw`mx-3 rounded-full text-gray-100 p-2`}
  svg {
    ${tw`w-5 h-5`}
  }
`;

const TextContainer = styled.div(props => [
  tw`flex flex-col w-full lg:w-7/12`,
  props.textOnLeft ? tw`lg:pr-12 lg:order-first` : tw`lg:pl-12 lg:order-last`
]);

const Subheading = tw(SubheadingBase)`mb-4`;
const HeadingTitle = tw(SectionHeading)`lg:text-left leading-tight`;
const Description = tw.p`max-w-md text-center mx-auto lg:mx-0 lg:text-left lg:max-w-none leading-relaxed text-sm sm:text-base lg:text-lg font-medium mt-4 text-secondary-100`;

const QuoteContainer = tw.div`relative mt-10 lg:mt-20`;
const Quote = tw.blockquote`text-center lg:text-left text-sm sm:text-lg lg:text-xl xl:text-2xl`;
const CustomerInfo = tw.div`mt-6 flex flex-col sm:flex-row items-center justify-center lg:justify-start`;
const CustomerProfilePicture = tw.img`rounded-full w-20 h-20`;
const CustomerTextInfo = tw.div`text-center lg:text-left sm:ml-6 mt-2 sm:mt-0`;
const CustomerName = tw.h5`font-semibold text-xl lg:text-2xl xl:text-3xl text-primary-500`;
const CustomerTitle = tw.p`font-medium text-secondary-100`;

const QuotesLeft = tw(QuotesLeftIcon)`w-6 h-6 opacity-75 text-primary-500 inline-block mr-1 -mt-3`;
const QuotesRight = tw(QuotesRightIcon)`w-6 h-6 opacity-75 text-primary-500 inline-block ml-1 -mt-3`;

const DecoratorBlob1 = tw(
  SvgDecoratorBlob1
)`absolute w-32 top-0 left-0 -z-10 text-primary-500 opacity-25 transform -translate-x-full`;
const DecoratorBlob2 = tw(
  SvgDecoratorBlob2
)`absolute w-32 bottom-0 right-0 -z-10 text-pink-500 opacity-15 transform translate-x-2/3 translate-y-8`;

// Testinomial Card
export default ({
  subheading = "",
  heading = "Testimonials",
  description = "Our goal is to help founders and entrepreneurs sell their startups. Trusted by thousands of entrepreneurs and buyers all across the globe.",
  testimonials = null,
  textOnLeft = false
}) => {
  const defaultTestimonials = [
    {
      imageSrc:
        "https://images.unsplash.com/photo-1535954906091-59dea18fac73?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzB8fGNvbXBhbnklMjBsb2dvc3xlbnwwfDJ8MHx8&auto=format&fit=crop&w=1024&q=80",
      profileImageSrc:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3.25&w=512&h=512&q=80",
      quote:
        "It's a great platform for selling your startup. After listing True over 50 buyers reach out to us. We could not expected such a strong response from so many buyers so quickly but it helped us to find a new home for our startup. ",
      customerName: "Charlotte Hale",
      customerTitle: "CEO, True Inc."
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1594230381579-ac3600dbd55c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODh8fGNvbXBhbnklMjBsb2dvc3xlbnwwfDJ8MHx8&auto=format&fit=crop&w=1024&q=80",
      profileImageSrc:
        "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=512&h=512&q=80",
      quote:
        "I had 15+ folks reach out to me. I was completely blown away by how easy it's been to reach these prospective buyers. We weren't necessarily looking to sell but MicroAcquire has been A+. From start to finish, we were acquired within 30 days at full asking price.",
      customerName: "Adam Cuppy",
      customerTitle: "Founder, Barbican centre"
    }
  ];

  if (!testimonials || testimonials.length === 0) testimonials = defaultTestimonials;

  const [imageSliderRef, setImageSliderRef] = useState(null);
  const [textSliderRef, setTextSliderRef] = useState(null);

  return (
    <Container>
      <Content>
        <HeadingInfo tw="text-center lg:hidden" subheading={subheading} heading={heading} description={description} />
        <TestimonialsContainer>
          <Testimonials>
            <Testimonial>
              <TestimonialImageSlider arrows={false} ref={setImageSliderRef} asNavFor={textSliderRef} fade={true}>
                {testimonials.map((testimonial, index) => (
                  <ImageAndControlContainer key={index}>
                    <Image imageSrc={testimonial.imageSrc} />
                    <ControlContainer>
                      <ControlButton onClick={imageSliderRef?.slickPrev}>
                        <ChevronLeftIcon />
                      </ControlButton>
                      <ControlButton onClick={imageSliderRef?.slickNext}>
                        <ChevronRightIcon />
                      </ControlButton>
                    </ControlContainer>
                  </ImageAndControlContainer>
                ))}
              </TestimonialImageSlider>
              <TextContainer textOnLeft={textOnLeft}>
                <HeadingInfo tw="hidden lg:block" subheading={subheading} heading={heading} description={description} />
                <TestimonialTextSlider arrows={false} ref={setTextSliderRef} asNavFor={imageSliderRef} fade={true}>
                  {testimonials.map((testimonial, index) => (
                    <TestimonialText key={index}>
                      <QuoteContainer>
                        <Quote>
                          <QuotesLeft />
                          {testimonial.quote}
                          <QuotesRight />
                        </Quote>
                      </QuoteContainer>
                      <CustomerInfo>
                        <CustomerProfilePicture src={testimonial.profileImageSrc} alt={testimonial.customerName} />
                        <CustomerTextInfo>
                          <CustomerName>{testimonial.customerName}</CustomerName>
                          <CustomerTitle>{testimonial.customerTitle}</CustomerTitle>
                        </CustomerTextInfo>
                      </CustomerInfo>
                    </TestimonialText>
                  ))}
                </TestimonialTextSlider>
              </TextContainer>
            </Testimonial>
          </Testimonials>
        </TestimonialsContainer>
      </Content>
      <DecoratorBlob1 />
      <DecoratorBlob2 />
    </Container>
  );
};

const HeadingInfo = ({ subheading, heading, description, ...props }) => (
  <div {...props}>
    {subheading ? <Subheading>{subheading}</Subheading> : null}
    <HeadingTitle>{heading}</HeadingTitle>
    <Description>{description}</Description>
  </div>
);
