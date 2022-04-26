import React, {useState, useEffect} from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import { SectionHeading } from "components/misc/Headings";
import { ReactComponent as SvgDotPatternIcon } from "images/dot-pattern.svg";
import Header from "components/light.js";
import Footer from "components/Footer.js";
import { getBlogs } from "../API_Calls/Blog/getBlogs";

const HeadingContainer = tw.div`text-center`;
const Heading = tw(SectionHeading)``;

const Posts = tw.div`mt-12 flex flex-wrap -mr-3 relative`;
const Post = tw.a`flex flex-col h-full bg-gray-200 rounded`;
const PostImage = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`h-64 sm:h-80 bg-center bg-cover rounded-t`}
`;
const PostText = tw.div`flex-1 px-6 py-8` 
const PostTitle = tw.h6`font-bold group-hocus:text-primary-500 transition duration-300 `;
const PostDescription = tw.p``;
const AuthorInfo = tw.div`flex`;
const AuthorImage = tw.img`w-12 h-12 rounded-full mr-3`;
const AuthorTextInfo = tw.div`text-xs text-gray-600`;
const AuthorName = tw.div`font-semibold mt-2`;
const AuthorProfile = tw.div`pt-1 font-medium`;

const PostContainer = styled.div`
  ${tw`relative z-20 mt-10 sm:pt-3 pr-3 w-full sm:w-1/2 lg:w-1/3 max-w-sm mx-auto sm:max-w-none sm:mx-0`}

  ${props => props.featured && css`
    ${tw`w-full sm:w-full lg:w-2/3`}
    ${Post} {
      ${tw`sm:flex-row items-center sm:pr-3`}
    }
    ${PostImage} {
      ${tw`sm:h-80 sm:min-h-full w-full sm:w-1/2 rounded-t sm:rounded-t-none sm:rounded-l`}
    }
    ${PostText} {
      ${tw`pl-8 pr-5`}
    }
    ${PostTitle} {
      ${tw`text-2xl`}
    }
    ${PostDescription} {
      ${tw`mt-4 text-sm font-semibold text-gray-600 leading-relaxed`}
    }
    ${AuthorInfo} {
      ${tw`mt-8 flex items-center`}
    }
    ${AuthorName} {
      ${tw`mt-0 font-bold text-gray-700 text-sm`}
    }
  `}
`;

const DecoratorBlob1 = tw(SvgDotPatternIcon)`absolute bottom-0 left-0 w-32 h-32 mb-3 ml-3 transform -translate-x-1/2 translate-y-1/2 fill-current text-gray-500 opacity-50`
const DecoratorBlob2 = tw(SvgDotPatternIcon)`absolute top-0 right-0 w-32 h-32 mt-16 mr-6 transform translate-x-1/2 -translate-y-1/2 fill-current text-gray-500 opacity-50`

const PaginationContainer = tw.div` py-16 lg:py-24 `;
const PaginationUl = tw.ul`flex justify-center`;
const PaginationNum = tw.button`h-10 px-5 text-primary-600 transition-colors duration-150 bg-white border border-r-0 border-primary-800 focus:shadow-outline`;
const PaginationNumActive = tw.button`h-10 px-5 text-white transition-colors duration-150 bg-primary-600 border border-r-0 border-primary-800 focus:shadow-outline`;
const PaginationPrev = styled.button(props => [
  tw`h-10 px-5 text-primary-600 transition-colors duration-150 bg-white border border-r-0 border-primary-800 rounded-l-lg`,
  !props.disabled && tw`focus:shadow-outline hover:bg-blue-100`,
  props.disabled && tw`cursor-not-allowed`
])
const PaginationNext = styled.button(props => [
  tw`h-10 px-5 text-primary-600 transition-colors duration-150 bg-white border border-primary-800 rounded-r-lg`,
  !props.disabled && tw`focus:shadow-outline hover:bg-blue-100`,
  props.disabled && tw`cursor-not-allowed`
])

// Blog Page Component
export default () => {
  const heading = "We love writing.";
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Page reloads when the current page is changed
  useEffect(() => {
    getBlogs(currentPage, 6).then(res => { 
      setData(res.data);
      setTotalPages(res.Pagination.totalPages);
    });
  },[currentPage])

  // Prev Button
  const prevClick = (e) => {
    e.preventDefault();
    setCurrentPage(currentPage-1);
  }
  // Next Button
  const nextClick = (e) => {
    e.preventDefault();
    setCurrentPage(currentPage+1);
  }
  // Page Button
  const pageClick = (num, e) => {
    e.preventDefault();
    setCurrentPage(num);
  }

  // Generates the list of page numbers visible on the pagination bar
  const visiblePages = (currentPage, totalPages, step) => {
    let showingNum = 2 * step + 1;
    let currLeft = currentPage - step;
    let currRight = currentPage + step;

    if(currentPage - 1 <= step) { currLeft = 1; currRight = currLeft + showingNum - 1; }
    else if (totalPages - currentPage <= step) { currRight = totalPages; currLeft = currRight - showingNum + 1; }

    return [currLeft, currRight];
  }
  
  // Main Pagination Function
  const createPagination = () => {
    let elements = []; // Generates list of elements to be rendered
    elements.push(<li><PaginationPrev key={-1} disabled={currentPage === 1} onClick={(e) => prevClick(e)}>Prev</PaginationPrev></li>)

    let [currLeft, currRight] = visiblePages(currentPage, totalPages, 2);

    for(let i=currLeft; i<=currRight; i++){
      if(i === currentPage)
        elements.push(<li><PaginationNumActive key={i}>{i}</PaginationNumActive></li>);
      else{
        elements.push(<li><PaginationNum key={i} onClick={(e) => { pageClick(i, e);} }>{i}</PaginationNum></li>);
      }
        
    }

    elements.push(<li><PaginationNext key={-2} disabled={currentPage === totalPages} onClick={(e) => nextClick(e)}>Next</PaginationNext></li>)
    return elements;
  }

  return (
    <AnimationRevealPage>
      <Header />
    <Container>
      <ContentWithPaddingXl>
        <HeadingContainer>
          {heading && <Heading>{heading}</Heading>}
        </HeadingContainer>
        <Posts>
          {data.map((post, index) => (
            <PostContainer featured={post.featured} key={index}>
              <Post className="group" href={post.url}>
                <PostImage imageSrc={post.postImageSrc} />
                <PostText>
                  <PostTitle>{post.title}</PostTitle>
                  {post.featured && <PostDescription>{post.description}</PostDescription>}
                  <AuthorInfo>
                    {post.featured && <AuthorImage src={post.authorImageSrc} />}
                    <AuthorTextInfo>
                      <AuthorName>{post.authorName}</AuthorName>
                      {post.featured && <AuthorProfile>{post.authorProfile}</AuthorProfile>}
                    </AuthorTextInfo>
                  </AuthorInfo>
                </PostText>
              </Post>
            </PostContainer>
          ))}
          <DecoratorBlob1 />
          <DecoratorBlob2 />
        </Posts>
      </ContentWithPaddingXl>
      <PaginationContainer>
        <PaginationUl>
          {createPagination()}
        </PaginationUl>
      </PaginationContainer>
    </Container>
    <Footer />
    </AnimationRevealPage>
  );
};