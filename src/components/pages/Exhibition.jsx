import { useState } from "react";
import styled from "styled-components";
import all01Image from "../../assets/all_01.png";
import all02Image from "../../assets/all_02.png";
import FilterContainer from "../exhibition/FilterContainer";
import ProjectDetail from "../exhibition/ProjectDetail";
import SplitImageContainer from "../exhibition/SplitImageContainer";
import WorkGrid from "../exhibition/WorkGrid";
import { exhibitionData } from "../exhibition/exhibition";
import Navbar from "../navigation/Navbar";

export default function Exhibition({
  active,
  isTransitioning,
  onNavbarNavigation,
}) {
  const filters = ["ALL", "BRANDING", "UI UX", "GRAPHIC", "ILLUST"];
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [selectedProject, setSelectedProject] = useState(null);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleBackToExhibition = () => {
    setSelectedProject(null);
  };

  const imageData = {
    topImage: {
      src: all01Image,
      alt: "Project preview bottom",
    },
    bottomImage: {
      src: all02Image,
      alt: "Project preview top",
    },
  };

  const hoverContent = {
    title: "palbangmiin",
    phonetic: "/pa:lbaŋ'mi:ɪn/ (noun) [Korean cultural term]",
    description:
      "A Korean idiom referring to a person who is talented, charming, or competent in many different areas.",
    example: "She's such a palbangmiin—whatever she does, she excels at.",
  };

  // If a project is selected, show the project detail page
  if (selectedProject) {
    return (
      <ProjectDetail
        project={selectedProject}
        onBack={handleBackToExhibition}
        onNavbarNavigation={onNavbarNavigation}
      />
    );
  }

  // Otherwise, show the main exhibition page
  return (
    <ExhibitionContainer active={active} isTransitioning={isTransitioning}>
      <Navbar
        activeItem="exhibition"
        onItemClick={(item) => {
          if (onNavbarNavigation) {
            onNavbarNavigation(item);
          }
        }}
        isLandingPage={false}
      />

      <Content>
        <FilterContainer
          filters={filters}
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />

        <SplitImageContainer
          topImage={imageData.topImage}
          bottomImage={imageData.bottomImage}
          hoverContent={hoverContent}
        />

        <WorkGrid
          projects={exhibitionData}
          activeFilter={activeFilter}
          onProjectClick={handleProjectClick}
        />
      </Content>
    </ExhibitionContainer>
  );
}

const ExhibitionContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #111;
  color: #f9f8f6;
  opacity: ${(props) => (props.active ? 1 : 0)};
  visibility: ${(props) => (props.active ? "visible" : "hidden")};
  transition: opacity 0.8s ease, visibility 0.8s ease;
  pointer-events: ${(props) => (props.active ? "auto" : "none")};
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  z-index: ${(props) => (props.active ? 10 : 5)};
`;

const Content = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 8.75rem 2rem 2rem 2rem;
  min-height: calc(100vh - 140px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;
