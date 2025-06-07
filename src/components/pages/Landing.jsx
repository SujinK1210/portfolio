import { useState } from "react";
import styled from "styled-components";
import Navbar from "../navigation/Navbar";

export default function Landing({ active, isTransitioning }) {
  const [activeNavItem, setActiveNavItem] = useState("entrance");

  return (
    <LandingContainer active={active} isTransitioning={isTransitioning}>
      <Navbar
        activeItem={activeNavItem}
        onItemClick={setActiveNavItem}
        isLandingPage={true}
      />
      <Content>
        <HeaderRow>
          <Header>A curated archive of</Header>
          <AuthorSection>
            <Author>Curated by Sujin Kim</Author>
            <Line />
          </AuthorSection>
          <ScrollHint>Scroll to begin</ScrollHint>
        </HeaderRow>

        <TitleRow>
          <DesignText>
            Design <Span>and</Span>
          </DesignText>
        </TitleRow>

        <TitleRow>
          <PerspectiveText>Perspective</PerspectiveText>
        </TitleRow>
      </Content>
    </LandingContainer>
  );
}

const LandingContainer = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f9f8f6;
  color: #111;
  opacity: ${(props) => (props.active ? 1 : 0)};
  transform: translateY(${(props) => (props.active ? "0" : "20px")});
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: ${(props) => (props.active ? "auto" : "none")};
  overflow: hidden;
  box-sizing: border-box;
  top: 0;
  left: 0;
  max-width: 100vw;
  max-height: 100vh;
`;

const Content = styled.div`
  width: calc(100vw - 160px);
  max-width: 1440px;
  min-height: fit-content;
  padding: 0 5rem;
  margin-top: 18vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;
  box-sizing: border-box;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-bottom: 20px;
`;

const Header = styled.h1`
  font-family: "PP Editorial New", serif;
  font-style: italic;
  font-weight: 200;
  font-size: 43px;
  min-width: fit-content;
  letter-spacing: -0.1px;
  margin-left: 8px;
  margin-bottom: 8px;
`;

const AuthorSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Author = styled.p`
  font-family: "PP Editorial New", serif;
  font-size: 19px;
  font-style: italic;
  font-weight: 200;
  color: #787878;
  letter-spacing: 0.2px;
`;

const Line = styled.div`
  border-bottom: 1px solid #787878;
  width: 75%;
  margin-bottom: 3rem;
`;

const ScrollHint = styled.p`
  font-family: "PP Editorial New", serif;
  font-style: italic;
  font-weight: 200;
  font-size: 38px;
  color: #787878;
  margin: 0;
  letter-spacing: 2px;
  min-width: fit-content;
`;

const DesignText = styled.div`
  font-family: "PP Editorial New", serif;
  font-weight: 400;
  font-size: 160px;
  letter-spacing: -0.02em;
  margin-bottom: 0.4rem;
  line-height: 0.8;
`;

const Span = styled.span`
  font-family: "PP Editorial New", serif;
  font-weight: 400;
  font-style: italic;
  font-size: 5rem;
`;

const PerspectiveText = styled.div`
  font-family: "PP Editorial New", serif;
  font-weight: 400;
  font-size: 200px;
  font-style: italic;
  letter-spacing: -0.05em;
  margin-left: 8.6rem;
  line-height: 0.8;
`;
