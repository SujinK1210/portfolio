import styled from "styled-components";
import ChevronDown from "../../assets/svg/ChevronDown";
import ChevronUp from "../../assets/svg/ChevronUp";
import Navbar from "../navigation/Navbar";

export default function TimelinePage({
  active,
  isTransitioning,
  onArrowNavigation,
  onNavbarNavigation,
  pageData,
}) {
  return (
    <TimelineContainer $active={active} $isTransitioning={isTransitioning}>
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
            <DivRow>
              <YearLine />
              <YearLabel>{pageData.previousYear}</YearLabel>
            </DivRow>
            <MainYear>{pageData.year}</MainYear>
          </YearsColumn>

          <ContentColumn>
            {/* Check if pageData has entries array (multiple experiences) or single experience */}
            {pageData.entries ? (
              // Render multiple entries for the same year
              pageData.entries.map((entry, index) => (
                <ExperienceBlock key={index}>
                  <JobSection>
                    <CompanyInfo>
                      <CompanyName>{entry.company}</CompanyName>
                      <DivRow>
                        <Location>{entry.location}</Location>
                        <Duration>{entry.duration}</Duration>
                      </DivRow>
                    </CompanyInfo>
                  </JobSection>

                  <RoleSection>
                    <RoleTitle>{entry.role}</RoleTitle>
                    <RoleDescription>{entry.description}</RoleDescription>

                    <SkillsList>
                      {entry.skills &&
                        entry.skills.length > 0 &&
                        entry.skills.map((skill, skillIndex) => (
                          <SkillItem key={skillIndex}>• {skill}</SkillItem>
                        ))}
                    </SkillsList>
                  </RoleSection>
                </ExperienceBlock>
              ))
            ) : (
              // Render single experience (original structure)
              <ExperienceBlock>
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
                    {pageData.skills &&
                      pageData.skills.length > 0 &&
                      pageData.skills.map((skill, index) => (
                        <SkillItem key={index}>• {skill}</SkillItem>
                      ))}
                  </SkillsList>
                </RoleSection>
              </ExperienceBlock>
            )}
          </ContentColumn>
        </TimelineSection>
      </Content>
    </TimelineContainer>
  );
}

// Responsive styled components
const TimelineContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !["active", "isTransitioning"].includes(prop),
})`
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #111;
  color: #f9f8f6;
  opacity: ${(props) => (props.$active ? 1 : 0)};
  transition: opacity 0.8s linear;
  pointer-events: ${(props) => (props.$active ? "auto" : "none")};
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
  padding-left: 1rem;
  padding-right: 1rem;
  margin-top: 8rem;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  width: 100%;

  /* Large mobile phones */
  @media (min-width: 480px) {
    padding-left: 6rem;

    /* margin-top: 10rem; */
  }

  /* Tablets portrait */
  @media (min-width: 768px) {
    padding-left: 3rem;
    /* padding-right: 2rem; */
    margin-top: 8rem;
    max-width: 100%;
  }

  /* Tablets landscape, small laptops */
  @media (min-width: 1024px) {
    max-width: 1000px;
  }

  /* 13"-14" laptops */
  @media (min-width: 1200px) {
    max-width: 1200px;
  }

  /* Your original design - 15"+ laptops */
  @media (min-width: 1440px) {
    padding-left: 2rem;
  }
`;

const DivRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  /* Mobile adjustments */
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const ChronoHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  @media (max-width: 780px) {
    margin-left: -3rem;
  }
  @media (max-width: 480px) {
    display: none;
  }
`;

const Title = styled.h2`
  font-family: "museo-sans", sans-serif;
  font-size: 18px;
  font-weight: 300;
  line-height: 20px;
  letter-spacing: -2%;
  color: #f9f8f6;

  @media (min-width: 480px) {
    font-size: 20px;
    line-height: 22px;
  }

  @media (min-width: 768px) {
    font-size: 22px;
    line-height: 24px;
  }

  @media (min-width: 1024px) {
    font-size: 24px;
    line-height: 24px;
  }
`;

const Subtitle = styled.h4`
  font-family: "museo-sans", sans-serif;
  font-size: 14px;
  font-weight: 300;
  line-height: 20px;
  color: #f9f8f6;
  letter-spacing: -2%;

  @media (min-width: 480px) {
    font-size: 15px;
    line-height: 22px;
  }

  @media (min-width: 768px) {
    font-size: 16px;
    line-height: 24px;
  }
`;

const NavigationArrows = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 20rem;

  /* Hide on very small mobile */

  @media (min-width: 480px) {
    left: 1.5rem;
    gap: 22rem;
  }

  @media (min-width: 768px) {
    left: 2rem;
    gap: 25rem;
  }

  @media (min-width: 1024px) {
    left: 3rem;
    gap: 28rem;
  }

  @media (min-width: 1440px) {
    left: 4rem;
  }
`;

const ArrowUp = styled.div`
  font-size: 1.2rem;
  color: #666;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #f9f8f6;
  }

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ArrowDown = styled.div`
  font-size: 1.2rem;
  color: #666;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #f9f8f6;
  }

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const TimelineSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
  align-items: flex-start;
  margin-top: 0.6rem;

  /* Tablets and larger - horizontal layout */
  @media (min-width: 768px) {
    flex-direction: row;
    gap: 2rem;
  }
`;

const YearsColumn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 1rem;
  margin-bottom: 1rem;

  /* Tablets and larger - vertical layout */
  @media (min-width: 768px) {
    flex-direction: column-reverse;
    align-items: flex-end;
    min-width: 150px;
    width: auto;
    margin-bottom: 0;
  }
  @media (max-width: 780px) {
    margin-left: -3rem;
    margin-top: -1rem;
  }

  @media (max-width: 480px) {
    margin-left: 0rem;
    margin-top: -2rem;
  }

  @media (min-width: 1024px) {
    min-width: 200px;
  }
`;

const YearLabel = styled.div`
  font-family: "PP Editorial New", serif;
  font-size: 24px;
  font-weight: 400;
  font-style: italic;
  letter-spacing: -2%;
  line-height: 24px;
  text-align: center;

  @media (min-width: 480px) {
    font-size: 30px;
    line-height: 30px;
  }

  @media (min-width: 768px) {
    font-size: 40px;
    line-height: 40px;
    width: 80px;
    margin-top: 24px;
    text-align: right;
  }

  @media (min-width: 1024px) {
    font-size: 50px;
    line-height: 50px;
    width: 100px;
  }

  @media (min-width: 1200px) {
    font-size: 60px;
    line-height: 60px;
    width: 120px;
  }
`;

const YearLine = styled.div`
  width: 40px;
  height: 1px;
  background-color: #d9d9d9;

  @media (min-width: 768px) {
    width: 60px;
    margin-bottom: 1rem;
    margin-right: 1rem;
  }

  @media (min-width: 1024px) {
    width: 80px;
  }

  @media (min-width: 1200px) {
    width: 92px;
  }
`;

const MainYear = styled.div`
  font-family: "PP Editorial New", serif;
  font-size: 48px;
  font-weight: 800;
  font-style: italic;
  line-height: 48px;
  color: #f9f8f6;
  letter-spacing: -2%;
  text-align: center;

  @media (min-width: 480px) {
    font-size: 60px;
    line-height: 60px;
  }

  @media (min-width: 768px) {
    font-size: 80px;
    line-height: 80px;
    width: 200px;
    text-align: right;
  }

  @media (min-width: 1024px) {
    font-size: 100px;
    line-height: 100px;
    width: 250px;
  }

  @media (min-width: 1200px) {
    font-size: 120px;
    line-height: 120px;
    width: 302px;
  }
`;

const ContentColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: 768px) {
    gap: 2rem;
  }

  @media (max-width: 480px) {
    margin-left: 3rem;
  }
`;

const ExperienceBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    gap: 1.5rem;
  }
`;

const JobSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const CompanyInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CompanyName = styled.h3`
  font-family: "museo-sans", sans-serif;
  font-size: 20px;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: -2%;
  color: #f9f8f6;
  margin-bottom: 12px;

  @media (min-width: 480px) {
    font-size: 24px;
    line-height: 26px;
    margin-bottom: 14px;
  }

  @media (min-width: 768px) {
    font-size: 28px;
    line-height: 30px;
    margin-bottom: 16px;
  }

  @media (min-width: 1200px) {
    font-size: 32px;
    line-height: 14px;
  }
`;

const Location = styled.div`
  font-family: "Playfair Display";
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: -2%;
  color: #f9f8f6;
  margin-bottom: 16px;

  @media (min-width: 480px) {
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 20px;
  }

  @media (min-width: 768px) {
    font-size: 20px;
    line-height: 28px;
    margin-bottom: 24px;
  }

  @media (min-width: 1200px) {
    font-size: 24px;
    line-height: 32px;
    margin-bottom: 32px;
  }
`;

const Duration = styled.div`
  font-family: "Playfair Display";
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: -2%;
  color: #f9f8f6;
  margin-bottom: 16px;
  margin-left: 0;

  @media (min-width: 480px) {
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 20px;
    margin-left: 1rem;
  }

  @media (min-width: 768px) {
    font-size: 20px;
    line-height: 28px;
    margin-bottom: 24px;
    margin-left: 2rem;
  }

  @media (min-width: 1200px) {
    font-size: 24px;
    line-height: 32px;
    margin-bottom: 32px;
    margin-left: 4rem;
  }
`;

const RoleSection = styled.div``;

const RoleTitle = styled.h4`
  font-family: "PP Editorial New", serif;
  font-size: 28px;
  font-weight: 400;
  line-height: 30px;
  letter-spacing: -2%;
  color: #f9f8f6;
  font-style: italic;
  margin-bottom: 16px;

  @media (min-width: 480px) {
    font-size: 32px;
    line-height: 34px;
    margin-bottom: 20px;
  }

  @media (min-width: 768px) {
    font-size: 40px;
    line-height: 42px;
    margin-bottom: 24px;
  }

  @media (min-width: 1024px) {
    font-size: 50px;
    line-height: 52px;
    margin-bottom: 28px;
  }

  @media (min-width: 1200px) {
    font-size: 60px;
    line-height: 14px;
    margin-bottom: 32px;
  }
`;

const RoleDescription = styled.p`
  font-family: "museo-sans", sans-serif;
  font-size: 14px;
  font-weight: 300;
  opacity: 0.7;
  line-height: 20px;
  letter-spacing: -2%;
  color: #f9f8f6;
  margin-bottom: 1rem;
  white-space: pre-line;

  @media (min-width: 480px) {
    font-size: 15px;
    line-height: 22px;
    margin-bottom: 1.2rem;
  }

  @media (min-width: 768px) {
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 1.5rem;
  }
`;

const SkillsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  max-height: none;
  font-family: "museo-sans", sans-serif;
  font-size: 14px;
  font-weight: 300;
  opacity: 0.7;
  line-height: 20px;
  letter-spacing: -2%;

  @media (min-width: 480px) {
    font-size: 15px;
    line-height: 22px;
    flex-wrap: wrap;
    height: 140px;
  }

  @media (min-width: 768px) {
    font-size: 16px;
    line-height: 24px;
    max-height: 140px;
    flex-wrap: wrap;
  }
`;

const SkillItem = styled.div`
  font-family: "museo-sans", sans-serif;
  font-size: 14px;
  font-weight: 300;
  line-height: 20px;
  letter-spacing: -2%;
  color: #f9f8f6;

  @media (min-width: 480px) {
    font-size: 15px;
    line-height: 22px;
  }

  @media (min-width: 768px) {
    font-size: 16px;
    line-height: 24px;
  }
`;
