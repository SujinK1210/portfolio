import styled from "styled-components";
import ChevronDown from "../../assets/svg/ChevronDown";
import ChevronUp from "../../assets/svg/ChevronUp";
import BottomTimeline from "../navigation/BottomTimeline";
import Navbar from "../navigation/Navbar";

export default function TimelinePage({
  active,
  isTransitioning,
  onYearNavigation,
  onArrowNavigation,
  onNavbarNavigation,
  currentYear,
  pageData,
}) {
  return (
    <TimelineContainer active={active} isTransitioning={isTransitioning}>
      <Navbar
        activeItem="entrance"
        onItemClick={(item) => {
          if (onNavbarNavigation) {
            onNavbarNavigation(item);
          }
        }}
        isLandingPage={false}
      />

      <Content>
        <ChronoHeader>
          <Title>[Chrono Archive]</Title>
          <Subtitle>Roles, places, and chapters filed in time.</Subtitle>
        </ChronoHeader>

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

        <TimelineSection>
          <YearsColumn>
            <DivRow style={{ marginRight: "4rem" }}>
              <YearLine />
              <YearLabel>{pageData.previousYear}</YearLabel>
            </DivRow>
            <MainYear>{pageData.year}</MainYear>
          </YearsColumn>

          <ContentColumn>
            <JobSection>
              <CompanyInfo>
                <CompanyName>{pageData.company}</CompanyName>
                <DivRow>
                  <Location>{pageData.location}</Location>
                  <Duration>{pageData.duration}</Duration>
                </DivRow>
              </CompanyInfo>
            </JobSection>

            <RoleSection>
              <RoleTitle>{pageData.role}</RoleTitle>
              <RoleDescription>{pageData.description}</RoleDescription>

              <SkillsList>
                {pageData.skills.map((skill, index) => (
                  <SkillItem key={index}>• {skill}</SkillItem>
                ))}
              </SkillsList>
            </RoleSection>
          </ContentColumn>
        </TimelineSection>

        <BottomTimeline
          activeYear={currentYear}
          onYearClick={onYearNavigation}
        />
      </Content>
    </TimelineContainer>
  );
}

const TimelineContainer = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #111;
  color: #f9f8f6;
  opacity: ${(props) => (props.active ? 1 : 0)};
  transition: opacity 0.8s linear;
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
  padding-left: 2rem;
  margin-top: 12rem;
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
  font-family: "museo-sans", sans-serif;
  font-size: 24px;
  font-weight: 300;
  line-height: 24px;
  letter-spacing: -2%;
  color: #f9f8f6;
`;

const Subtitle = styled.h4`
  font-family: "museo-sans", sans-serif;
  font-size: 16px;
  font-weight: 300;
  line-height: 24px;
  color: #f9f8f6;
  letter-spacing: -2%;
`;

const NavigationArrows = styled.div`
  position: absolute;
  left: 4rem;
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
  gap: 2rem;
  flex: 1;
  align-items: flex-start;
  margin-top: 0.6rem;
`;

const YearsColumn = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;
  min-width: 200px;
`;

const YearLabel = styled.div`
  font-family: "PP Editorial New", serif;
  font-size: 60px;
  font-weight: 400;
  font-style: italic;
  letter-spacing: -2%;
  width: 120px;
  line-height: 60px;
  margin-top: 24px;
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
  font-size: 120px;
  font-weight: 800;
  font-style: italic;
  line-height: 120px;
  color: #f9f8f6;
  width: 286px;
  letter-spacing: -2%;
`;

const ContentColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const JobSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  /* margin-bottom: 0.5rem; */
`;

const CompanyInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const CompanyName = styled.h3`
  font-family: "museo-sans", sans-serif;
  font-size: 32px;
  font-weight: 600;
  line-height: 14px;
  letter-spacing: -2%;
  color: #f9f8f6;
  margin-bottom: 16px;
`;

const Location = styled.div`
  font-family: "Playfair Display";
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: -2%;
  color: #f9f8f6;
  margin-bottom: 32px;
`;

const Duration = styled.div`
  font-family: "Playfair Display";
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: -2%;
  color: #f9f8f6;
  margin-bottom: 32px;
  margin-left: 4rem;
`;

const RoleSection = styled.div``;

const RoleTitle = styled.h4`
  font-family: "PP Editorial New", serif;
  font-size: 60px;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: -2%;
  color: #f9f8f6;
  font-style: italic;
  color: #f9f8f6;
  margin-bottom: 32px;
`;

const RoleDescription = styled.p`
  font-family: "museo-sans", sans-serif;
  font-size: 16px;
  font-weight: 300;
  opacity: 0.7;
  line-height: 24px;
  letter-spacing: -2%;
  color: #f9f8f6;
  margin-bottom: 1.5rem;
  white-space: pre-line;
`;

const SkillsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  max-height: 140px;
  flex-wrap: wrap;
  font-family: "museo-sans", sans-serif;
  font-size: 16px;
  font-weight: 300;
  opacity: 0.7;
  line-height: 24px;
  letter-spacing: -2%;
`;

const SkillItem = styled.div`
  font-family: "museo-sans", sans-serif;
  font-size: 16px;
  font-weight: 300;
  line-height: 24px;
  letter-spacing: -2%;
  color: #f9f8f6;
`;
