import { useState } from "react";
import styled from "styled-components";
import Navbar from "../navigation/Navbar";

export default function Landing({
  active,
  isTransitioning,
  onNavigateToTimeline,
}) {
  const [activeNavItem, setActiveNavItem] = useState("entrance");

  const handleClickToBegin = () => {
    if (onNavigateToTimeline) {
      onNavigateToTimeline();
    }
  };

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
          <DivCol onClick={handleClickToBegin} style={{ cursor: "pointer" }}>
            <ClickHint>Click here or</ClickHint>
            <ScrollHint>Scroll to begin</ScrollHint>
          </DivCol>
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
  transform: translateY(
    ${(props) => {
      if (props.active) return "0vh";
      // Landing slides up when transitioning to timeline pages
      return "-100vh";
    }}
  );
  transition: transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  pointer-events: ${(props) => (props.active ? "auto" : "none")};
  overflow: hidden;
  box-sizing: border-box;
  top: 0;
  left: 0;
  max-width: 100vw;
  max-height: 100vh;
  z-index: ${(props) => (props.active ? 10 : 5)};
`;

const Content = styled.div`
  width: calc(100vw - 160px);
  max-width: 1440px;
  min-height: fit-content;
  padding: 0 58px;
  margin-top: 30vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;
  box-sizing: border-box;
`;

const DivCol = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
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
  padding-bottom: 46px;
`;

const Header = styled.h1`
  font-family: "PP Editorial New", serif;
  font-style: italic;
  font-weight: 200;
  font-size: 54px;
  line-height: 88px;
  min-width: fit-content;
  letter-spacing: 0%;
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
  font-size: 24px;
  font-style: italic;
  line-height: 58px;
  font-weight: 200;
  color: #787878;
  letter-spacing: 2%;
`;

const Line = styled.div`
  border-bottom: 2px solid #787878;
  width: 80%;
  margin-bottom: 3rem;
`;

const ClickHint = styled.p`
  font-family: "PP Editorial New", serif;
  font-style: italic;
  font-weight: 200;
  font-size: 18px;
  color: #787878;
  margin: 0;
  letter-spacing: 2px;
  min-width: fit-content;
`;
const ScrollHint = styled.p`
  font-family: "PP Editorial New", serif;
  font-style: italic;
  font-weight: 200;
  font-size: 48px;
  color: #787878;
  margin: 0;
  letter-spacing: -2%;
  width: 242px;
`;

const DesignText = styled.div`
  font-family: "PP Editorial New", serif;
  font-weight: 400;
  font-size: 200px;
  letter-spacing: 0%;
  margin-bottom: -2.5rem;
  line-height: 200px;
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
  font-size: 250px;
  font-style: italic;
  letter-spacing: 0%;
  margin-left: 10.8rem;
  line-height: 166px;
`;
