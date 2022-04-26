import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "./misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "./misc/Buttons.js";
import {ReactComponent as SvgDotPattern } from "../images/dot-pattern.svg"

const ContentWithPaddingXl= tw.div`max-w-screen-xl mx-auto py-8 lg:py-8`;
const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:pb-24 md:pt-2 items-center`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-6/12 flex-shrink-0 relative`;
const TextColumn = styled(Column)(props => [
  tw`md:w-6/12 mt-16 md:mt-0`,
  props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);

const Image = styled.img(props => [
  props.imageRounded && tw`rounded`,
  props.imageBorder && tw`border`,
  props.imageShadow && tw`shadow`,
]);

const DecoratorBlob = styled(SvgDotPattern)(props => [
  tw`w-20 h-20 absolute right-0 bottom-0 transform translate-x-1/2 translate-y-1/2 fill-current text-primary-500 -z-10`,
])

const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Heading = tw(
  SectionHeading
)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`;

const PrimaryButton = styled(PrimaryButtonBase)(props => [
  tw`mt-8 md:mt-8 text-sm inline-block mx-auto md:mx-0 cursor-pointer`,
  props.buttonRounded && tw`rounded-full`
]);



const AlertContainer = tw.div`flex bg-green-100 rounded-lg p-4 mb-4`;
const AlertPara = tw.p`ml-3 text-sm text-green-700`;
const AlertSvg = tw.svg`w-5 h-5 text-green-700`;

// About Our Services Component
export default ({
  subheading = "ABOUT OUR SERVICES",
  heading = (
    <>
      Helping Founders to reach <span tw="text-primary-500">Entrepreneurs.</span>
    </>
  ),
  description = "Kickstart helps startup founders get more fundings for their ideas, sell their built startups, collaboratively get investments from entrepreneurs easily. We also provide services for startups to reach entrepreneurs and pitch their ideas and promote to get investments.",
  primaryButtonText = "Book a Slot",
  primaryButtonUrl = "#",
  imageSrc = "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80",
  buttonRounded = false,
  imageRounded = true,
  imageBorder = false,
  imageShadow = false,
  imageCss = null,
  imageDecoratorBlob = false,
  imageDecoratorBlobCss = null,
  textOnLeft = true
}) => {
  const alert = "Welcome to Kickstart Service";
  // Book a Slot Function on Click
  return (
    <Container>
      <ContentWithPaddingXl>
      <AlertContainer>
            <AlertSvg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></AlertSvg>
            <AlertPara>
              <span class="font-medium">{alert}</span> 
            </AlertPara>
          </AlertContainer>
      </ContentWithPaddingXl>
      <TwoColumn>
        <ImageColumn>
          <Image css={imageCss} src={imageSrc} imageBorder={imageBorder} imageShadow={imageShadow} imageRounded={imageRounded}/>
          {imageDecoratorBlob && <DecoratorBlob css={imageDecoratorBlobCss} />}
        </ImageColumn>
        <TextColumn textOnLeft={textOnLeft}>
          <TextContent>
            <Subheading>{subheading}</Subheading>
            <Heading>{heading}</Heading>
            <Description>{description}</Description>
            <PrimaryButton buttonRounded={buttonRounded} as="a" href = "/book">
              {primaryButtonText}
            </PrimaryButton>
          </TextContent>
        </TextColumn>
      </TwoColumn>
    </Container>
  );
};
