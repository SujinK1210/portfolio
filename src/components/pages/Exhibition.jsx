import { useMemo, useState } from "react";
import styled from "styled-components";

// Import all category images
import all01Image from "../../assets/portfolio_category/all_01.png";
import all02Image from "../../assets/portfolio_category/all_02.png";
import branding01Image from "../../assets/portfolio_category/branding_01.png";
import branding02Image from "../../assets/portfolio_category/branding_02.png";
import graphic01Image from "../../assets/portfolio_category/graphic_01.png";
import graphic02Image from "../../assets/portfolio_category/graphic_02.png";
import illust01Image from "../../assets/portfolio_category/illust_01.png";
import illust02Image from "../../assets/portfolio_category/illust_02.png";
import uiux01Image from "../../assets/portfolio_category/uiux_01.png";
import uiux02Image from "../../assets/portfolio_category/uiux_02.png";

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

  // Create a mapping of filter names to their corresponding images
  const categoryImages = {
    ALL: {
      topImage: { src: all01Image, alt: "All projects preview top" },
      bottomImage: { src: all02Image, alt: "All projects preview bottom" },
    },
    BRANDING: {
      topImage: { src: branding01Image, alt: "Branding projects preview top" },
      bottomImage: {
        src: branding02Image,
        alt: "Branding projects preview bottom",
      },
    },
    "UI UX": {
      topImage: { src: uiux01Image, alt: "UI UX projects preview top" },
      bottomImage: { src: uiux02Image, alt: "UI UX projects preview bottom" },
    },
    GRAPHIC: {
      topImage: { src: graphic01Image, alt: "Graphic projects preview top" },
      bottomImage: {
        src: graphic02Image,
        alt: "Graphic projects preview bottom",
      },
    },
    ILLUST: {
      topImage: {
        src: illust01Image,
        alt: "Illustration projects preview top",
      },
      bottomImage: {
        src: illust02Image,
        alt: "Illustration projects preview bottom",
      },
    },
  };

  // Get the current images based on active filter
  const currentImages = useMemo(() => {
    return categoryImages[activeFilter] || categoryImages["ALL"];
  }, [activeFilter]);

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
    <ExhibitionContainer $active={active} $isTransitioning={isTransitioning}>
      {" "}
      {/* FIXED: Added $ prefix */}
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
          topImage={currentImages.topImage}
          bottomImage={currentImages.bottomImage}
          hoverContent={hoverContent}
          activeFilter={activeFilter}
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
  opacity: ${(props) =>
    props.$active ? 1 : 0}; /* FIXED: Changed to $active */
  visibility: ${(props) =>
    props.$active ? "visible" : "hidden"}; /* FIXED: Changed to $active */
  transition: opacity 0.8s ease, visibility 0.8s ease;
  pointer-events: ${(props) =>
    props.$active ? "auto" : "none"}; /* FIXED: Changed to $active */
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  z-index: ${(props) =>
    props.$active ? 10 : 5}; /* FIXED: Changed to $active */
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
  @media (max-width: 525px) {
    min-height: 70px;
    padding: 5.2rem 0.2rem 0.2rem 0.2rem;
  }
`;
