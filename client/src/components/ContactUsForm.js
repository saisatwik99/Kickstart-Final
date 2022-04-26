import React, { useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import EmailIllustrationSrc from "images/email-illustration.svg";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto pb-20 md:pb-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-5/12 flex-shrink-0 h-80 md:h-auto`;
const TextColumn = styled(Column)(props => [
  tw`md:w-7/12 mt-16 md:mt-0`,
  props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);

const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded bg-contain bg-no-repeat bg-center h-full`,
]);
const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Heading = tw(SectionHeading)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`

const Form = tw.form`mt-8 md:mt-10 text-sm flex flex-col max-w-sm mx-auto md:mx-0`
const Input = tw.input`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`
const Textarea = styled(Input).attrs({as: "textarea"})`
  ${tw`h-24`}
`

const SubmitButton = tw(PrimaryButtonBase)`inline-block mt-8`

const ContentWithPaddingXl= tw.div`max-w-screen-xl mx-auto py-8 lg:py-8`;

const AlertContainer = tw.div`flex bg-yellow-100 rounded-lg p-4 mb-4`;
const AlertPara = tw.p`ml-3 text-sm text-yellow-700`;
const AlertSvg = tw.svg`w-5 h-5 text-yellow-700`;

const AlertContainerRed = tw.div`flex bg-red-100 rounded-lg p-4 mb-4`;
const AlertParaRed = tw.p`ml-3 text-sm text-red-700`;
const AlertSvgRed = tw.svg`w-5 h-5 text-red-700`;

export default ({
  subheading = "Contact Us",
  heading = <>Feel free to <span tw="text-primary-500">get in touch</span><wbr/> with us.</>,
  description = "",
  submitButtonText = "Send",
  textOnLeft = true,
}) => {
  const [email, setEmail] = useState();
  const [fullName, setFullName] = useState();
  const [subject, setSubject] = useState();
  const [message, setMessage] = useState();
  const [alert, setAlert] = useState("We are here to help you. Please contact us!");
  const [red, setRed] = useState(0);
  const handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch("/admin/contact", {
      method: "POST",
      body: JSON.stringify({
        email, fullName, subject, message
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await response.json();
    setAlert(data.message);
    setRed(data.red);
    console.log(data);
  }
  return (
    <Container>
      <ContentWithPaddingXl>
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
      </ContentWithPaddingXl>
      <TwoColumn>
        <ImageColumn>
          <Image imageSrc={EmailIllustrationSrc} />
        </ImageColumn>
        <TextColumn textOnLeft={textOnLeft}>
          <TextContent>
            {subheading && <Subheading>{subheading}</Subheading>}
            <Heading>{heading}</Heading>
            {description && <Description>{description}</Description>}
            <Form onSubmit={handleSubmit} >
              <Input type="email" name="email" placeholder="Your Email Address" onChange={e => {setEmail(e.target.value)}} />
              <Input type="text" name="fullName" placeholder="Full Name"  onChange={e => {setFullName(e.target.value)}}/>
              <Input type="text" name="subject" placeholder="Subject" onChange={e => {setSubject(e.target.value)}}/>
              <Textarea name="message" placeholder="Your Message Here" onChange={e => {setMessage(e.target.value)}}/>
              <SubmitButton type="submit">{submitButtonText}</SubmitButton>
            </Form>
          </TextContent>
        </TextColumn>
      </TwoColumn>
    </Container>
  );
};
