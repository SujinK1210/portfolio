import Lenis from "@studio-freight/lenis";
import { useEffect, useState } from "react";
import BottomTimeline from "./components/navigation/BottomTimeline";
import Navbar from "./components/navigation/Navbar";
import Landing from "./components/pages/Landing";
import TimelinePage from "./components/pages/TimelinePage";
import { TIMELINE_DATA } from "./components/pages/work-history";
import "./styles/App.css";

const PAGES_CONFIG = [
  { id: "landing", component: Landing, year: null },
  ...Object.keys(TIMELINE_DATA)
    .sort((a, b) => b - a) // Sort descending: 2025, 2024, 2023...
    .map((year) => ({
      id: `year-${year}`,
      component: TimelinePage,
      year: year,
      data: TIMELINE_DATA[year],
    })),
];

function App() {
  const [activeSection, setActiveSection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Function to handle year navigation from timeline
  const handleYearNavigation = (year) => {
    const pageIndex = PAGES_CONFIG.findIndex((page) => page.year === year);
    if (pageIndex !== -1 && pageIndex !== activeSection) {
      setIsTransitioning(true);
      setActiveSection(pageIndex);
      setTimeout(() => setIsTransitioning(false), 1000);
    }
  };

  // Get current page's year for timeline
  const getCurrentYear = () => {
    const currentPage = PAGES_CONFIG[activeSection];
    return currentPage?.year || "2024";
  };

  // Handle arrow navigation between pages
  const handleArrowNavigation = (direction) => {
    if (isTransitioning) return;

    let newSection = activeSection;
    if (direction === "up" && activeSection > 0) {
      newSection = activeSection - 1;
    } else if (
      direction === "down" &&
      activeSection < PAGES_CONFIG.length - 1
    ) {
      newSection = activeSection + 1;
    }

    if (newSection !== activeSection) {
      setIsTransitioning(true);
      setActiveSection(newSection);
      setTimeout(() => setIsTransitioning(false), 1000);
    }
  };

  // Handle navbar navigation to landing
  const handleNavbarNavigation = (navItem) => {
    if (navItem === "entrance" && activeSection !== 0) {
      setIsTransitioning(true);
      setActiveSection(0);
      setTimeout(() => setIsTransitioning(false), 1000);
    }
  };

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    let lastScrollTime = 0;

    function handleScroll({ direction, velocity }) {
      const now = Date.now();

      console.log("Scroll detected:", { direction, velocity, activeSection }); // Debug log

      // Prevent rapid scrolling during transitions
      if (isTransitioning || now - lastScrollTime < 1000) return;

      // Only trigger on significant scroll velocity
      if (Math.abs(velocity) < 0.3) return; // Lowered threshold

      lastScrollTime = now;
      setIsTransitioning(true);

      if (direction === 1 && activeSection < PAGES_CONFIG.length - 1) {
        setActiveSection((prev) => prev + 1);
      } else if (direction === -1 && activeSection > 0) {
        setActiveSection((prev) => prev - 1);
      }

      // Reset transition state
      setTimeout(() => setIsTransitioning(false), 1000);
    }

    lenis.on("scroll", handleScroll);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [activeSection, isTransitioning]);

  // Alternative: Use wheel event as backup
  useEffect(() => {
    let lastWheelTime = 0;

    const handleWheel = (e) => {
      const now = Date.now();

      if (isTransitioning || now - lastWheelTime < 1000) return;

      const direction = e.deltaY > 0 ? 1 : -1;

      if (Math.abs(e.deltaY) > 10) {
        // Minimum scroll threshold
        lastWheelTime = now;
        setIsTransitioning(true);

        if (direction === 1 && activeSection < PAGES_CONFIG.length - 1) {
          setActiveSection((prev) => prev + 1);
        } else if (direction === -1 && activeSection > 0) {
          setActiveSection((prev) => prev - 1);
        }

        setTimeout(() => setIsTransitioning(false), 1000);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [activeSection, isTransitioning]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isTransitioning) return;

      if (e.key === "ArrowDown" && activeSection < PAGES_CONFIG.length - 1) {
        setIsTransitioning(true);
        setActiveSection((prev) => prev + 1);
        setTimeout(() => setIsTransitioning(false), 1000);
      } else if (e.key === "ArrowUp" && activeSection > 0) {
        setIsTransitioning(true);
        setActiveSection((prev) => prev - 1);
        setTimeout(() => setIsTransitioning(false), 1000);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSection, isTransitioning]);

  return (
    <div className="app-container">
      <Navbar
        activeItem="entrance"
        onItemClick={(item) => {
          if (item === "entrance") {
            handleNavbarNavigation(item);
          }
        }}
        isLandingPage={activeSection === 0} // This will be true when on Landing page
      />

      {/* Sliding Content Area */}
      <div className="content-area">
        {/* Create actual scrollable content for Lenis */}
        <div className="scroll-content">
          {PAGES_CONFIG.map((page) => (
            <div key={page.id} className="scroll-section" />
          ))}
        </div>

        {/* Render page components - Landing stays as is */}
        {PAGES_CONFIG.map((page, index) => {
          const PageComponent = page.component;

          // Landing page renders normally
          if (page.id === "landing") {
            return (
              <PageComponent
                key={page.id}
                active={activeSection === index}
                isTransitioning={isTransitioning}
                onNavigateToTimeline={() => {
                  if (!isTransitioning) {
                    setIsTransitioning(true);
                    setActiveSection(1);
                    setTimeout(() => setIsTransitioning(false), 1000);
                  }
                }}
              />
            );
          }

          // Timeline pages use sliding content
          return (
            <PageComponent
              key={page.id}
              active={activeSection === index}
              isTransitioning={isTransitioning}
              onYearNavigation={handleYearNavigation}
              onArrowNavigation={handleArrowNavigation}
              currentYear={getCurrentYear()}
              pageData={page.data} // Pass the data
            />
          );
        })}
      </div>

      {/* Fixed Bottom Timeline */}
      <BottomTimeline
        activeYear={getCurrentYear()}
        onYearClick={handleYearNavigation}
      />
    </div>
  );
}

export default App;
