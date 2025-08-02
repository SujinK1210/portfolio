import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Navbar from "../navigation/Navbar";
import { getImage } from "../../utils/imageMapping"; // ADDED: Import the image helper

export default function ProjectDetail({ project, onBack, onNavbarNavigation }) {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const observerRef = useRef(null);

  const placeholderImage =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjMzMzIi8+Cjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiPlByb2plY3QgSW1hZ2U8L3RleHQ+Cjwvc3ZnPgo=";

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(
              (prev) => new Set([...prev, entry.target.dataset.section])
            );
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const sections = document.querySelectorAll("[data-section]");
    sections.forEach((section) => {
      if (observerRef.current) {
        observerRef.current.observe(section);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

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
        {/* Section 1: First Hero Image - Bounce up from bottom */}
        <ImageBlock
          data-section="hero1"
          className={visibleSections.has("hero1") ? "animate-bounce-up" : ""}
        >
          <img
            src={getImage(project.detailImages?.hero1 || project.image)} // CHANGED: Use getImage helper
            alt={`${project.title} - Hero 1`}
            onError={(e) => {
              console.log(
                "Failed to load hero1 image:",
                project.detailImages?.hero1 || project.image
              ); // ADDED: Debug logging
              e.target.src = placeholderImage;
            }}
          />
        </ImageBlock>

        {/* Section 2: Second Hero Image - Drop down from top */}
        <ImageBlock
          data-section="hero2"
          className={visibleSections.has("hero2") ? "animate-drop-down" : ""}
        >
          <img
            src={getImage(project.detailImages?.hero2 || project.image)} // CHANGED: Use getImage helper
            alt={`${project.title} - Hero 2`}
            onError={(e) => {
              console.log(
                "Failed to load hero2 image:",
                project.detailImages?.hero2 || project.image
              ); // ADDED: Debug logging
              e.target.src = placeholderImage;
            }}
          />
        </ImageBlock>

        {/* Section 3: Text Content Block - Fade in */}
        <TextBlock
          data-section="text"
          className={visibleSections.has("text") ? "animate-fade-in" : ""}
        >
          <ProjectHeader>
            <ProjectTitle>{project.title}</ProjectTitle>
            <ProjectMeta>
              <ProjectDate>{project.date}</ProjectDate>
              <ProjectCategory>{project.category}</ProjectCategory>
            </ProjectMeta>
          </ProjectHeader>

          <Section>
            <SectionTitle>Description</SectionTitle>
            <Description>{project.description}</Description>
          </Section>

          <Section>
            <SectionTitle>Project Highlights</SectionTitle>
            <HighlightsList>
              {project.highlights?.map((highlight, index) => (
                <HighlightItem key={index}>{highlight}</HighlightItem>
              )) || [
                <HighlightItem key={0}>
                  Creative concept development and execution
                </HighlightItem>,
                <HighlightItem key={1}>
                  Brand strategy and visual identity design
                </HighlightItem>,
                <HighlightItem key={2}>
                  Multi-platform design consistency
                </HighlightItem>,
                <HighlightItem key={3}>
                  Client collaboration and project management
                </HighlightItem>,
              ]}
            </HighlightsList>
          </Section>
        </TextBlock>

        {/* Section 4: Two Images Side by Side - Slide from sides */}
        <DualImageBlock
          data-section="dual"
          className={visibleSections.has("dual") ? "animate-slide-sides" : ""}
        >
          <SideImage className="slide-left">
            <img
              src={getImage(project.detailImages?.sideImage1 || project.image)} // CHANGED: Use getImage helper
              alt={`${project.title} - Side 1`}
              onError={(e) => {
                console.log(
                  "Failed to load sideImage1:",
                  project.detailImages?.sideImage1 || project.image
                ); // ADDED: Debug logging
                e.target.src = placeholderImage;
              }}
            />
          </SideImage>
          <SideImage className="slide-right">
            <img
              src={getImage(project.detailImages?.sideImage2 || project.image)} // CHANGED: Use getImage helper
              alt={`${project.title} - Side 2`}
              onError={(e) => {
                console.log(
                  "Failed to load sideImage2:",
                  project.detailImages?.sideImage2 || project.image
                ); // ADDED: Debug logging
                e.target.src = placeholderImage;
              }}
            />
          </SideImage>
        </DualImageBlock>

        {/* Section 5: Final Single Image - Scale + Rotate */}
        <ImageBlock
          data-section="final"
          className={visibleSections.has("final") ? "animate-scale-rotate" : ""}
        >
          <img
            src={getImage(project.detailImages?.final || project.image)} // CHANGED: Use getImage helper
            alt={`${project.title} - Final`}
            onError={(e) => {
              console.log(
                "Failed to load final image:",
                project.detailImages?.final || project.image
              ); // ADDED: Debug logging
              e.target.src = placeholderImage;
            }}
          />
        </ImageBlock>
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
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

/* Image Blocks with Animations */
const ImageBlock = styled.div`
  width: 100%;
  height: 600px;
  overflow: hidden;
  border-radius: 12px;
  opacity: 0;
  transform: translateY(60px);
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  /* First image - Bounce up animation */
  &.animate-bounce-up {
    opacity: 1;
    transform: translateY(0);
    animation: bounceUp 1.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  /* Second image - Drop down animation */
  &.animate-drop-down {
    opacity: 1;
    transform: translateY(0);
    animation: dropDown 1.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  /* Final image - Scale + Rotate animation */
  &.animate-scale-rotate {
    opacity: 1;
    transform: translateY(0);
    animation: scaleRotate 2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  @keyframes bounceUp {
    0% {
      opacity: 0;
      transform: translateY(120px);
    }
    60% {
      opacity: 1;
      transform: translateY(-25px);
    }
    80% {
      transform: translateY(12px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes dropDown {
    0% {
      opacity: 0;
      transform: translateY(-100px);
    }
    70% {
      opacity: 1;
      transform: translateY(18px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes scaleRotate {
    0% {
      opacity: 0;
      transform: translateY(60px) scale(0.6) rotate(-12deg);
    }
    70% {
      opacity: 1;
      transform: translateY(-20px) scale(1.15) rotate(8deg);
    }
    85% {
      transform: translateY(5px) scale(0.98) rotate(-2deg);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1) rotate(0deg);
    }
  }
`;

/* Text Content Block with Fade Animation */
const TextBlock = styled.div`
  background-color: #111;
  padding: 3rem;
  border-radius: 12px;
  border: 1px solid rgba(249, 248, 246, 0.1);
  display: flex;
  flex-direction: column;
  gap: 3rem;
  opacity: 0;
  transform: translateY(40px);
  transition: all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &.animate-fade-in {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ProjectHeader = styled.div`
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

/* Dual Image Block with Side Animations */
const DualImageBlock = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;

  &.animate-slide-sides {
    .slide-left {
      opacity: 1;
      transform: translateX(0);
      animation: slideFromLeft 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .slide-right {
      opacity: 1;
      transform: translateX(0);
      animation: slideFromRight 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
  }

  @keyframes slideFromLeft {
    0% {
      opacity: 0;
      transform: translateX(-150px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideFromRight {
    0% {
      opacity: 0;
      transform: translateX(150px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SideImage = styled.div`
  flex: 1;
  height: 370px;
  overflow: hidden;
  border-radius: 12px;
  opacity: 0;
  transform: translateX(0);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

/* Text Content Styles */
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
