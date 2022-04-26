import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { SectionHeading } from "components/misc/Headings.js";
import { ReactComponent as StarIcon } from "images/star-icon.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-5.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-7.svg";
import HeaderTop from "components/light.js";
import Footer from "components/Footer.js";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { useHistory } from "react-router-dom";
import jwt from 'jsonwebtoken';
import { getProducts } from '../API_Calls/Product/getProducts';

const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row`;
const Header = tw(SectionHeading)``;
const TabsControl = tw.div`flex flex-wrap bg-gray-200 px-2 py-2 rounded leading-none mt-12 xl:mt-0`;

const TabControl = styled.div`
  ${tw`cursor-pointer px-6 py-3 mt-2 sm:mt-0 sm:mr-2 last:mr-0 text-gray-600 font-medium rounded-sm transition duration-300 text-sm sm:text-base w-1/2 sm:w-auto text-center`}
  &:hover {
    ${tw`bg-gray-300 text-gray-700`}
  }
  ${props => props.active && tw`bg-primary-500! text-gray-100!`}
  }
`;

const TabContent = tw(motion.div)`mt-6 flex flex-wrap sm:-mr-10 md:-mr-6 lg:-mr-12`;
const CardContainer = tw.div`mt-10 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 sm:pr-10 md:pr-6 lg:pr-12`;
const Card = tw(motion.a)`bg-gray-200 rounded-b block max-w-xs mx-auto sm:max-w-none sm:mx-0`;
const CardImageContainer = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`h-56 xl:h-64 bg-center bg-cover relative rounded-t`}
`;
const CardRatingContainer = tw.div`leading-none absolute inline-flex bg-gray-100 bottom-0 left-0 ml-4 mb-4 rounded-full px-5 py-2 items-end`;
const CardRating = styled.div`
  ${tw`mr-1 text-sm font-bold flex items-end`}
  svg {
    ${tw`w-4 h-4 fill-current text-orange-400 mr-1`}
  }
`;

const CardHoverOverlay = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.5);
  ${tw`absolute inset-0 flex justify-center items-center`}
`;
const CardButton = tw.a`px-8 py-3 font-bold rounded bg-primary-500 text-gray-100 hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline focus:outline-none transition duration-300 text-sm cursor-pointer`;

const CardReview = tw.div`font-medium text-xs text-gray-600`;

const CardText = tw.div`p-4 text-gray-900`;
const CardTitle = tw.a`text-lg font-semibold group-hover:text-primary-500 cursor-pointer`;
const CardContent = tw.p`mt-1 text-sm font-medium text-gray-600`;
const CardPrice = tw.p`mt-4 text-xl font-bold`;

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-64 w-64 opacity-15 transform translate-x-2/3 -translate-y-12 text-pink-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-80 w-80 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;

const AlertContainer = tw.div`flex bg-blue-100 rounded-lg p-4 mb-4`;
const AlertPara = tw.p`ml-3 text-sm text-blue-700`;
const AlertSvg = tw.svg`w-5 h-5 text-blue-700`;


// Explore Page Component
export default () => {
  const history = useHistory()
  const [data, setData] = useState([]);
  const [alert, setAlert] = useState("Choose the best Startup! You Love.");
  const heading = "Our Startups";
  const tabs = data;
  const tabsKeys = Object.keys(tabs);
  const [activeTab, setActiveTab] = useState("Fintech");
  useEffect(() => {
    // Check if token exist else redirect to ("/login")
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
    // Get Products from Backend
    getProducts().then(data => setData(data));
    
  }, [activeTab, history]);
  
  // Add to Wishlist Function
  const addToWishlist = async (companyId,e) => {
    e.preventDefault();
    const response = await fetch("/admin/wishlist", {
      method: "POST",
      body: JSON.stringify({
        token: localStorage.getItem('token'),
        companyId
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await response.json();
    setAlert(data.message);
  }
  
  return (
    <AnimationRevealPage>
      <HeaderTop/>      
      <Container>
        <ContentWithPaddingXl>
          <AlertContainer>
            <AlertSvg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></AlertSvg>
            <AlertPara>
              <span class="font-medium">{alert}</span> 
            </AlertPara>
          </AlertContainer>
          <HeaderRow>
            <Header>{heading}</Header>
            <TabsControl>
              {Object.keys(tabs).map((tabName, index) => (
                <TabControl key={index} active={activeTab === tabName} onClick={() => setActiveTab(tabName)}>
                  {tabName}
                </TabControl>
              ))}
            </TabsControl>
          </HeaderRow>

          {tabsKeys.map((tabKey, index) => (
            <TabContent
              key={index}
              variants={{
                current: {
                  opacity: 1,
                  scale:1,
                  display: "flex",
                },
                hidden: {
                  opacity: 0,
                  scale:0.8,
                  display: "none",
                }
              }}
              transition={{ duration: 0.4 }}
              initial={activeTab === tabKey ? "current" : "hidden"}
              animate={activeTab === tabKey ? "current" : "hidden"}
            >
              {tabs[tabKey].map((card, index) => (
                <CardContainer key={index}>
                  <Card className="group" initial="rest" whileHover="hover" animate="rest">
                    <CardImageContainer imageSrc={card.imageSrc}>
                      <CardRatingContainer>
                        <CardRating>
                          <StarIcon />
                          {card.rating}
                        </CardRating>
                        <CardReview>({card.reviews})</CardReview>
                      </CardRatingContainer>
                      <CardHoverOverlay
                        variants={{
                          hover: {
                            opacity: 1,
                            height: "auto"
                          },
                          rest: {
                            opacity: 0,
                            height: 0
                          }
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <CardButton onClick={(e) => addToWishlist(card._id,e)}>Add to Wishlist</CardButton>
                      </CardHoverOverlay>
                    </CardImageContainer>
                    <CardText>
                      <CardTitle href={`/explore/${card._id}`}>{card.title}</CardTitle>
                      <CardPrice>{card.price}</CardPrice>
                      <CardContent>{card.content1}</CardContent>
                      <CardContent>{card.content2}</CardContent>
                    </CardText>
                  </Card>
                </CardContainer>
              ))}
            </TabContent>
          ))}
        </ContentWithPaddingXl>
        <DecoratorBlob1 />
        <DecoratorBlob2 />
      </Container>
      <Footer />
    </AnimationRevealPage>
  );
};
