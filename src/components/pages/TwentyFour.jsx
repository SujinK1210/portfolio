import { useState } from "react";
import styled from "styled-components";
import ChevronDown from "../../assets/svg/ChevronDown";
import ChevronUp from "../../assets/svg/ChevronUp";
import BottomTimeline from "../navigation/BottomTimeline";
import Navbar from "../navigation/Navbar";

export default function TwentyFour({
  active,
  isTransitioning,
  onYearNavigation,
  onArrowNavigation,
  currentYear,
}) {
  const [activeNavItem, setActiveNavItem] = useState("entrance");

  const handleYearClick = (year) => {
    console.log("Selected year:", year);
    if (onYearNavigation) {
      onYearNavigation(year);
    }
  };

  return (
    <TwentyFourContainer active={active} isTransitioning={isTransitioning}>
      <Navbar
        activeItem={activeNavItem}
        onItemClick={setActiveNavItem}
        isLandingPage={false}
      />

      <Content>
        {/* Header */}
        <ChronoHeader>
          <Title>[Chrono Archive]</Title>
          <Subtitle>Roles, places, and chapters filed in time.</Subtitle>
        </ChronoHeader>

        {/* Navigation Arrows */}
        <NavigationArrows>
          <ArrowUp onClick={() => onArrowNavigation && onArrowNavigation("up")}>
            <ChevronUp />
          </ArrowUp>
          <ArrowDown
            onClick={() => onArrowNavigation && onArrowNavigation("down")}
          >
            <ChevronDown />
          </ArrowDown>
        </NavigationArrows>

        {/* Main Timeline Content */}
        <TimelineSection>
          <YearsColumn>
            <DivRow style={{ marginRight: "4rem" }}>
              <YearLine />
              <YearLabel>2023</YearLabel>
            </DivRow>
            <MainYear>2024</MainYear>
          </YearsColumn>

          {/* Right Side - Content */}
          <ContentColumn>
            <JobSection>
              <CompanyInfo>
                <CompanyName>ADsologist</CompanyName>
                <DivRow>
                  <Location>Marketing Agency Toronto, Canada</Location>
                  <Duration>2023.03 - 2024.09</Duration>
                </DivRow>
              </CompanyInfo>
            </JobSection>

            {/* UIUX Graphic Designer Section */}
            <RoleSection>
              <RoleTitle>UIUX · Graphic Designer</RoleTitle>
              <RoleDescription>
                Initially hired as a Web & Graphic Designer, I quickly took on
                greater responsibilities and was promoted to Art Director,
                leading the creative direction of key projects across branding,
                app development, and experiential design. I collaborated with a
                multidisciplinary team of 7–8 professionals, including 3D, VFX,
                and CGI designers, as well as game developers, to deliver
                innovative, cross-platform solutions.
              </RoleDescription>

              <SkillsList>
                <SkillItem>• Branding Design</SkillItem>
                <SkillItem>• App & Game Development</SkillItem>
                <SkillItem>• UI/UX Design</SkillItem>
                <SkillItem>• Graphic Design</SkillItem>
                <SkillItem>• Product Managing</SkillItem>
              </SkillsList>
            </RoleSection>
          </ContentColumn>
        </TimelineSection>

        {/* Bottom Timeline */}
        <BottomTimeline
          activeYear={currentYear || "2024"}
          onYearClick={handleYearClick}
        />
      </Content>
    </TwentyFourContainer>
  );
}

const TwentyFourContainer = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #111;
  color: #f9f8f6;
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
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 4rem;
  margin-top: 6rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
`;

const DivRow = styled.div`
  display: flex;
  align-items: center;
`;

const ChronoHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h2`
  font-family: "Museo Sans", serif;
  font-size: 16px;
  font-weight: 250;
  margin: 0 0 0.2rem 0;
  letter-spacing: -2%;
  color: #f9f8f6;
`;

const Subtitle = styled.h4`
  font-family: "Museo Sans", serif;
  font-size: 16px;
  font-weight: 250;
  color: #f9f8f6;
  letter-spacing: -2%;
`;

const NavigationArrows = styled.div`
  position: absolute;
  left: 2rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 28rem;
`;

const ArrowUp = styled.div`
  font-size: 1.5rem;
  color: #666;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #f9f8f6;
  }
`;

const ArrowDown = styled.div`
  font-size: 1.5rem;
  color: #666;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #f9f8f6;
  }
`;

const TimelineSection = styled.div`
  display: flex;
  gap: 4rem;
  flex: 1;
  align-items: flex-start;
  margin-top: 2rem;
`;

const YearsColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-width: 200px;
`;

const YearLabel = styled.div`
  font-family: "PP Editorial New", serif;
  font-size: 60px;
  font-weight: 300;
  margin-bottom: 0.5rem;
  font-style: italic;
  letter-spacing: -2%;
`;

const YearLine = styled.div`
  width: 92px;
  height: 1px;
  background-color: #d9d9d9;
  margin-bottom: 1rem;
  margin-right: 1rem;
`;

const MainYear = styled.div`
  font-family: "PP Editorial New", serif;
  font-size: 132px;
  font-weight: 800;
  font-style: italic;
  line-height: 0.8;
  color: #f9f8f6;
`;

const ContentColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 0.4rem;
`;

const JobSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
`;

const CompanyInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const CompanyName = styled.h3`
  font-family: "Museo Sans", serif;
  font-size: 32px;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: -2%;
  color: #f9f8f6;
`;

const Location = styled.div`
  font-family: "Playfair Display";
  font-size: 24px;
  font-weight: 300;
  letter-spacing: -2%;
  color: #f9f8f6;
`;

const Duration = styled.div`
  font-family: "Playfair Display";
  width: fit-content;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -2%;
  color: #f9f8f6;
  margin-left: 4rem;
`;

const RoleSection = styled.div`
  margin-top: 0.5rem;
`;

const RoleTitle = styled.h4`
  font-family: "PP Editorial New", serif;
  font-size: 60px;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: -2%;
  color: #f9f8f6;
  font-style: italic;
  margin: 0rem 0 2rem 0;
  color: #f9f8f6;
`;

const RoleDescription = styled.p`
  font-family: "Museo Sans", serif;
  font-size: 16px;
  font-weight: 250;
  line-height: 24px;
  letter-spacing: -2%;
  color: #f9f8f6;
  margin-bottom: 1.5rem;
  max-width: 650px;
`;

const SkillsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const SkillItem = styled.div`
  font-family: "Museo Sans", serif;
  font-size: 16px;
  font-weight: 300;
  line-height: 24px;
  letter-spacing: -2%;
  color: #f9f8f6;
`;
