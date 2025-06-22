import styled from "styled-components";
import Navbar from "../navigation/Navbar";

export default function ProjectDetail({ project, onBack, onNavbarNavigation }) {
  if (!project) return null;

  return (
    <ProjectContainer>
      {/* Main Navigation */}
      <Navbar
        activeItem="exhibition"
        onItemClick={onNavbarNavigation}
        isLandingPage={false}
      />

      {/* Back Button */}
      <BackButtonContainer>
        <BackButton onClick={onBack}>← Back to Exhibition</BackButton>
      </BackButtonContainer>

      {/* Project Content */}
      <Content>
        <ProjectHeader>
          <ProjectTitle>{project.title}</ProjectTitle>
          <ProjectMeta>
            <ProjectDate>{project.date}</ProjectDate>
            <ProjectCategory>{project.category}</ProjectCategory>
          </ProjectMeta>
        </ProjectHeader>

        <ProjectImage>
          <img
            src={`src/assets/exhibition/${project.image}`}
            alt={project.title}
            onError={(e) => {
              e.target.src =
                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjMzMzIi8+Cjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiPlByb2plY3QgSW1hZ2U8L3RleHQ+Cjwvc3ZnPgo=";
            }}
          />
        </ProjectImage>

        <ProjectDetails>
          <Section>
            <SectionTitle>Description</SectionTitle>
            <Description>{project.description}</Description>
          </Section>

          <Section>
            <SectionTitle>Tools Used</SectionTitle>
            <ToolsGrid>
              {project.tools.map((tool, index) => (
                <ToolBadge key={index}>{tool}</ToolBadge>
              ))}
            </ToolsGrid>
          </Section>

          <Section>
            <SectionTitle>Project Tags</SectionTitle>
            <TagsContainer>
              {project.tags.map((tag, index) => (
                <TagBadge key={index}>{tag}</TagBadge>
              ))}
            </TagsContainer>
          </Section>

          {/* Additional content sections - you can expand these */}
          <Section>
            <SectionTitle>Project Highlights</SectionTitle>
            <HighlightsList>
              <HighlightItem>
                Creative concept development and execution
              </HighlightItem>
              <HighlightItem>
                Brand strategy and visual identity design
              </HighlightItem>
              <HighlightItem>Multi-platform design consistency</HighlightItem>
              <HighlightItem>
                Client collaboration and project management
              </HighlightItem>
            </HighlightsList>
          </Section>
        </ProjectDetails>
      </Content>
    </ProjectContainer>
  );
}

const ProjectContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #111;
  color: #f9f8f6;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 15;
`;

const BackButtonContainer = styled.div`
  position: fixed;
  top: 40px;
  left: 2rem;
  z-index: 900;
`;

const BackButton = styled.button`
  background: none;
  border: 1px solid #f9f8f6;
  color: #f9f8f6;
  padding: 8px 14px;
  border-radius: 25px;
  font-family: "museo-sans", sans-serif;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f9f8f6;
    color: #111;
  }
`;

const Content = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 140px 2rem 4rem 2rem;
`;

const ProjectHeader = styled.div`
  margin-bottom: 3rem;
  text-align: center;
`;

const ProjectTitle = styled.h1`
  font-family: "museo-sans", sans-serif;
  font-size: 48px;
  font-weight: 900;
  color: #f9f8f6;
  margin: 0 0 1rem 0;
  line-height: 1.2;
  letter-spacing: -0.02em;
`;

const ProjectMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

const ProjectDate = styled.span`
  font-family: "museo-sans", sans-serif;
  font-size: 24px;
  font-weight: 300;
  color: #f9f8f6;
  opacity: 0.8;
`;

const ProjectCategory = styled.span`
  font-family: "museo-sans", sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #f9f8f6;
  padding: 8px 16px;
  border: 1px solid #f9f8f6;
  border-radius: 20px;
  letter-spacing: 1px;
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 600px;
  margin-bottom: 4rem;
  overflow: hidden;
  border-radius: 12px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const ProjectDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SectionTitle = styled.h3`
  font-family: "museo-sans", sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: #f9f8f6;
  margin: 0;
  letter-spacing: -0.01em;
`;

const Description = styled.p`
  font-family: "museo-sans", sans-serif;
  font-size: 20px;
  font-weight: 400;
  color: #ccc;
  line-height: 1.6;
  margin: 0;
  max-width: 800px;
`;

const ToolsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const ToolBadge = styled.span`
  background-color: rgba(249, 248, 246, 0.1);
  color: #f9f8f6;
  padding: 12px 20px;
  border-radius: 25px;
  font-family: "museo-sans", sans-serif;
  font-size: 16px;
  font-weight: 500;
  border: 1px solid rgba(249, 248, 246, 0.2);
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const TagBadge = styled.span`
  background-color: #f9f8f6;
  color: #111;
  padding: 10px 18px;
  border-radius: 20px;
  font-family: "museo-sans", sans-serif;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.5px;
`;

const HighlightsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const HighlightItem = styled.li`
  font-family: "museo-sans", sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: #ccc;
  padding-left: 2rem;
  position: relative;
  line-height: 1.5;

  &:before {
    content: "+";
    position: absolute;
    left: 0;
    color: #f9f8f6;
    font-weight: 600;
  }
`;
