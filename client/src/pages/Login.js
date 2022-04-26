import React, { useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import {css} from "styled-components/macro"; //eslint-disable-line
import illustration from "images/login-illustration.svg";
import logo from "images/logo1.png";
import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";

const Container = tw(ContainerBase)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

const SocialButtonsContainer = tw.div`flex flex-col items-center`;
const SocialButton = styled.a`
  ${tw`w-full max-w-xs font-semibold rounded-lg py-3 border text-gray-900 bg-gray-100 hocus:bg-gray-200 hocus:border-gray-400 flex items-center justify-center transition-all duration-300 focus:outline-none focus:shadow-outline text-sm mt-5 first:mt-0`}
  .iconContainer {
    ${tw`bg-white p-2 rounded-full`}
  }
  .icon {
    ${tw`w-4`}
  }
  .text {
    ${tw`ml-4`}
  }
`;

const DividerTextContainer = tw.div`my-12 border-b border-transparent text-center relative`;

const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${props => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-sm bg-contain bg-center bg-no-repeat`}
`;

const AlertContainer = tw.div`flex bg-blue-100 rounded-lg p-4 mb-4`;
const AlertPara = tw.p`ml-3 text-sm text-blue-700`;
const AlertSvg = tw.svg`w-5 h-5 text-blue-700`;

const AlertContainerRed = tw.div`flex bg-red-100 rounded-lg p-4 mb-4`;
const AlertParaRed = tw.p`ml-3 text-sm text-red-700`;
const AlertSvgRed = tw.svg`w-5 h-5 text-red-700`;

// Login Component
export default function Login ({
  logoLinkUrl = "/",
  illustrationImageSrc = illustration,
  headingText = "Sign In To Kickstart",
  submitButtonText = "Sign In",
  SubmitButtonIcon = LoginIcon
}) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [alert, setAlert] = useState("Be excited to explore Startups!");
  const [red, setRed] = useState(0);

  // Login Submit Function
  const handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch("/user/login", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await response.json();
    // setAlert(data.message);
    console.log(data);
    localStorage.setItem('token', data.token);
    if(data.token){
      window.location.href = '/explore'
    }
    
      setAlert(data.message);
      setRed(1);
    
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
                
                <Form onSubmit={handleSubmit}>

                  { !red ? 
                  <AlertContainer>
                    <AlertSvg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></AlertSvg>
                    <AlertPara>
                      <span class="font-medium">{alert}</span> 
                    </AlertPara>
                  </AlertContainer> : 
                  <AlertContainerRed>
                    <AlertSvgRed fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></AlertSvgRed>
                    <AlertParaRed>
                      <span class="font-medium">{alert}</span> 
                    </AlertParaRed>
                  </AlertContainerRed>
                  } 
                  <Input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
                  <Input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                  <SubmitButton type="submit">
                    <SubmitButtonIcon className="icon" />
                    <span className="text">{submitButtonText}</span>
                  </SubmitButton>
                </Form>
                <DividerTextContainer>
                <SocialButtonsContainer>
                    <SocialButton key="Signup" href="/signup">
                      <span className="text">Dont have an account? Sign Up</span>
                    </SocialButton>
                </SocialButtonsContainer>
                </DividerTextContainer>
              </FormContainer>
            </MainContent>
          </MainContainer>
          <IllustrationContainer>
            <IllustrationImage imageSrc={illustrationImageSrc} />
          </IllustrationContainer>
        </Content>
      </Container>
    </AnimationRevealPage>
  )
};
