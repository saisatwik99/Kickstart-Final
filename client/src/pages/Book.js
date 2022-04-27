import React, { useState, useEffect } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import illustration from "images/signup-illustration.svg";
import logo from "images/logo1.png";
import { ReactComponent as SignUpIcon } from "feather-icons/dist/icons/corner-up-right.svg";
import jwt from 'jsonwebtoken';

const Container = tw(ContainerBase)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;


const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const TimeInput = tw.select`w-1/3 px-8 py-4  rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const TimeSelect = tw.option`rounded-lg font-medium text-base text-blue-700`
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
// const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
// const IllustrationImage = styled.div`
//   ${props => `background-image: url("${props.imageSrc}");`}
//   ${tw`m-12 xl:m-16 w-full max-w-lg bg-contain bg-center bg-no-repeat`}
// `;

const AlertContainer = tw.div`flex bg-green-100 rounded-lg p-4 mb-4`;
const AlertPara = tw.p`ml-3 text-sm text-green-700`;
const AlertSvg = tw.svg`w-5 h-5 text-green-700`;

const AlertContainerRed = tw.div`flex bg-red-100 rounded-lg p-4 mb-4`;
const AlertParaRed = tw.p`ml-3 text-sm text-red-700`;
const AlertSvgRed = tw.svg`w-5 h-5 text-red-700`;

export default function Book({
  logoLinkUrl = "#",
  illustrationImageSrc = illustration,
  headingText = "Book a Slot",
  submitButtonText = "Book Now",
  SubmitButtonIcon = SignUpIcon
}) { 
  
  const [name, setName] = useState();
  const [date, setDate] = useState();
  const [hourValue, setHour] = useState();
  const [minValue, setMin] = useState();
  const [ampmValue, setAmpm] = useState();
  const [alert, setAlert] = useState("Welcome to Kickstart Bookings!");
  const [red, setRed] = useState(0);
  const hour = [1,2,3,4,5,6,7,8,9,10,11,12];
  const min = [{value: 0, var: '00'}, {value: 15, var: '15'}, { value: 30, var: '30'}, { value: 45, var: '45'}];
  const ampm = [{value: 0, var: 'AM'},{value: 1, var: 'PM'}]
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = jwt.decode(token);
      if(!user) {
        localStorage.removeItem('token')
        window.location.href = '/explore'
      }
    } else {
      window.location.href = '/explore'
    }
    
  }, []);

  const bookSlot = async (e) => {
    e.preventDefault();
    const response = await fetch("/admin/book", {
      method: "POST",
      body: JSON.stringify({
        token: localStorage.getItem('token'), name, date, hour: hourValue, min: minValue, ampm: ampmValue
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await response.json();
    console.log(data);
    setRed(data.red);
    setAlert(data.message);
  }
  
  return (
  <AnimationRevealPage>
    <Container>
      <Content>
        <MainContainer>
          <LogoLink href={logoLinkUrl}>
            <LogoImage src={logo} />
          </LogoLink>
          <MainContent>
            <Heading>{headingText}</Heading>
            <FormContainer>
              <Form onSubmit={bookSlot}>
                { !red ? 
                <AlertContainer>
                  <AlertSvg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></AlertSvg>
                    <AlertPara>
                      <span class="font-medium">{alert}</span> 
                    </AlertPara>
                </AlertContainer>
                :
                <AlertContainerRed>
                  <AlertSvgRed fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></AlertSvgRed>
                  <AlertParaRed>
                      <span class="font-medium">{alert}</span> 
                  </AlertParaRed>
                </AlertContainerRed>
                }
                <Input type="text" placeholder="Full Name" onChange={e => setName(e.target.value)}/>
                <Input type="date" min="2022-04-28" placeholder="Select date" onChange={e => setDate(e.target.value)}/>
                <TimeInput type="select" placeholder="HH" onChange={e => setHour(e.target.value)}>
                  {
                    hour.map((a) => (
                      <TimeSelect value={a}>{a}</TimeSelect>
                    ))
                  }
                </TimeInput>
                <TimeInput type="select" placeholder="MM" onChange={e => setMin(e.target.value)}>
                  {
                    min.map((a) => (
                      <TimeSelect value={a.value}>{a.var}</TimeSelect>
                    ))
                  }
                </TimeInput>
                <TimeInput type="select" placeholder="HH" onChange={e => setAmpm(e.target.value)}>
                  {
                    ampm.map((a) => (
                      <TimeSelect value={a.value}>{a.var}</TimeSelect>
                    ))
                  }
                </TimeInput>
                <SubmitButton type="submit">
                  <SubmitButtonIcon className="icon" />
                  <span className="text">{submitButtonText}</span>
                </SubmitButton>

                <p tw="mt-8 text-sm text-gray-600 text-center">
                  
                  <a href="/service" tw="border-b border-gray-500 border-dotted">
                    Go Back
                  </a>
                </p>
              </Form>
            </FormContainer>
          </MainContent>
        </MainContainer>
      </Content>
    </Container>
  </AnimationRevealPage>
)};
