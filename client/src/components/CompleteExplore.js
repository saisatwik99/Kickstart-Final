import React, { useState, useEffect } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "./misc/Headings.js";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import HeaderTop from "components/light.js";
import Footer from "./Footer.js";
import { ReactComponent as CheckboxIcon } from "feather-icons/dist/icons/check-circle.svg";
import { getProductInfo } from '../API_Calls/Product/getProducts';

const Container = tw.div`relative`;
const ContentWithPaddingXl= tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24 items-center`;
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


const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Heading = tw(
  SectionHeading
)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`;


const SectionHeadingStats = tw.h2`text-4xl sm:text-5xl font-black text-blue-800 tracking-wide text-center`
const HeadingStats = tw(SectionHeadingStats)`sm:text-3xl md:text-4xl lg:text-5xl `;
const StatsContainer = tw.div`mt-8 flex flex-col sm:flex-row items-center justify-center flex-wrap max-w-screen-md justify-between mx-auto`
const Stat = tw.div`flex flex-col text-center p-4 tracking-wide`
const StatKey = tw.div`text-xl font-medium text-blue-800`
const StatValue = tw.div`text-4xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-blue-800`

const SectionDescriptionStats = tw.p`mt-4 text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100 max-w-xl`;
const DescriptionStats = tw(SectionDescriptionStats)`text-gray-400 text-center mx-auto max-w-screen-md text-blue-800`;
const ContainerStats = tw(Container)`my-8 lg:my-10 bg-purple-100 text-gray-100 -mx-8 px-8`;
const HeadingContainer = tw.div``;
const FeatureList = tw.ul`mt-12 leading-loose`;
const Feature = tw.li`flex items-center`;
const FeatureIcon = tw(CheckboxIcon)`w-5 h-5 text-primary-500`;
const FeatureText = tw.p`ml-2 font-medium text-gray-700`;

const SubheadingStats = tw(SubheadingBase)`text-blue-800 text-center`;

export default ({
  productId
}) => {
  const [data, setData] = useState({});
  const stats = [
    {
      key: "Clients",
      value: (parseInt(data.reviews)*2).toString()+"+",
    },
    {
      key: "Revenue",
      value: data.content2,
    },
    {
      key: "Employees",
      value: (parseInt(data.reviews)*5).toString()+"+",
    },
  ]

  useEffect(() => {
    getProductInfo(productId).then(data => { 
      setData(data);
      return data; 
    });
  })

  return (
    <AnimationRevealPage>
      <HeaderTop/>
    <Container>
      <TwoColumn>
        <ImageColumn>
          <Image css={null} src={data.imageSrc} imageBorder={false} imageShadow={false} imageRounded={true}/>
        </ImageColumn>
        <TextColumn textOnLeft={false}>
          <TextContent>
          <Heading>{data.title}</Heading>
              <Description>This company was established by a few members which eventually grew up as a tremendous startup that got great funding and has been doing great with its goals and expectations. This startup would definitely be the one you can definitely rely upon and trust for making great profits.</Description>
              <FeatureList>
                <Feature key={1}>
                  <FeatureIcon /> 
                  <FeatureText>{data.content1}</FeatureText>
                </Feature>
                <Feature key={2}>
                  <FeatureIcon />
                  <FeatureText>{`Price: ${data.price}`}</FeatureText>
                </Feature>
                <Feature key={3}>
                  <FeatureIcon />
                  <FeatureText>{`Rating: ${data.rating}`}</FeatureText>
                </Feature>
              </FeatureList>
          </TextContent>
        </TextColumn>
      </TwoColumn>
      <ContainerStats>
      <ContentWithPaddingXl>
        <HeadingContainer>
          <SubheadingStats>OUR STATS</SubheadingStats>
          <HeadingStats>{data.title}</HeadingStats>
          <DescriptionStats>After thorough research and audits, we find the number of clients the startup has been dealing with and provide all the necessary information about the startup so that entrepreneurs can decide to buy or invest in a particular startup or not.</DescriptionStats>
        </HeadingContainer>
        <StatsContainer>
          {stats.map((stat, index) => (
            <Stat key={index}>
              <StatValue>{stat.value}</StatValue>
              <StatKey>{stat.key}</StatKey>
            </Stat>
          ))}
        </StatsContainer>
      </ContentWithPaddingXl>
      </ContainerStats>
    </Container>
    <Footer />
    </AnimationRevealPage>
  );
};
