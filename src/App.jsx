import Lenis from "@studio-freight/lenis";
import { useEffect, useState } from "react";
import BottomTimeline from "./components/navigation/BottomTimeline";
import Navbar from "./components/navigation/Navbar";
import Exhibition from "./components/pages/Exhibition";
import Invitation from "./components/pages/Invitation";
import Landing from "./components/pages/Landing";
import TimelinePage from "./components/pages/TimelinePage";
import { TIMELINE_DATA } from "./components/pages/work-history";
import "./styles/App.css";
import "./styles/fonts.css";

const PAGES_CONFIG = [
  { id: "landing", component: Landing, year: null },
  ...Object.keys(TIMELINE_DATA)
    .sort((a, b) => {
      const yearA = parseInt(a.toString().split("-")[0]);
      const yearB = parseInt(b.toString().split("-")[0]);

      if (yearA !== yearB) {
        return yearB - yearA;
      }
      return a.localeCompare(b);
    })
    .map((yearKey) => ({
      id: `year-${yearKey}`,
      component: TimelinePage,
      year: TIMELINE_DATA[yearKey].year,
      yearKey: yearKey,
      data: TIMELINE_DATA[yearKey],
    })),
];

function App() {
  const [activeSection, setActiveSection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [triggerLineAnimation, setTriggerLineAnimation] = useState(false);
  const [currentPage, setCurrentPage] = useState("entrance");
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (activeSection === 0 && !isTransitioning && currentPage === "entrance") {
      setTriggerLineAnimation(false);
    }
  }, [activeSection, isTransitioning, currentPage]);

  const handleYearNavigation = (year) => {
    if (currentPage !== "entrance") return;

    const pageIndex = PAGES_CONFIG.findIndex((page) => page.year === year);
    if (pageIndex !== -1 && pageIndex !== activeSection) {
      setIsTransitioning(true);
      setActiveSection(pageIndex);
      if (pageIndex === 0 || activeSection === 0) {
        setTriggerLineAnimation(false);
      }
      setTimeout(() => setIsTransitioning(false), 1000);
    }
  };

  const getCurrentYear = () => {
    if (currentPage !== "entrance") return "2024";
    const currentPageConfig = PAGES_CONFIG[activeSection];
    return currentPageConfig?.year || "2024";
  };

  const handleArrowNavigation = (direction) => {
    if (isTransitioning || currentPage !== "entrance") return;

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
      if (newSection === 0 || activeSection === 0) {
        setTriggerLineAnimation(false);
      }
      setTimeout(() => setIsTransitioning(false), 1000);
    }
  };

  const handleNavbarNavigation = (navItem) => {
    console.log(
      "Navigation clicked:",
      navItem,
      "Current page:",
      currentPage,
      "Active section:",
      activeSection
    );

    if (isTransitioning || isFadingOut) {
      console.log("Navigation blocked - transitioning or fading");
      return;
    }

    if (navItem === "entrance") {
      if (currentPage !== "entrance" || activeSection !== 0) {
        console.log("Navigating to entrance landing page"); // Debug log
        setIsFadingOut(true);
        setTimeout(() => {
          setIsTransitioning(true);
          setCurrentPage("entrance");
          setActiveSection(0);
          setTriggerLineAnimation(false);
          setIsFadingOut(false);
          setTimeout(() => setIsTransitioning(false), 1000);
        }, 300);
      }
    } else if (navItem === "exhibition" && currentPage !== "exhibition") {
      console.log("Navigating to exhibition");
      setIsFadingOut(true);
      setTimeout(() => {
        setIsTransitioning(true);
        setCurrentPage("exhibition");
        setTriggerLineAnimation(false);
        setIsFadingOut(false);
        setTimeout(() => setIsTransitioning(false), 1000);
      }, 300);
    } else if (navItem === "invitation" && currentPage !== "invitation") {
      console.log("Navigating to invitation"); // Debug log
      setIsFadingOut(true);
      setTimeout(() => {
        setIsTransitioning(true);
        setCurrentPage("invitation");
        setTriggerLineAnimation(false);
        setIsFadingOut(false);
        setTimeout(() => setIsTransitioning(false), 1000);
      }, 300);
    }
  };

  const handleScrollFromLanding = () => {
    if (activeSection === 0 && !isTransitioning && currentPage === "entrance") {
      setTriggerLineAnimation(true);
      setTimeout(() => setTriggerLineAnimation(false), 1500);
    }
  };

  useEffect(() => {
    if (currentPage !== "entrance") return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    let lastScrollTime = 0;

    function handleScroll({ direction, velocity }) {
      const now = Date.now();

      console.log("Scroll detected:", { direction, velocity, activeSection });

      if (isTransitioning || now - lastScrollTime < 1000) return;

      if (Math.abs(velocity) < 0.3) return;

      lastScrollTime = now;

      if (activeSection === 0 && direction === 1) {
        handleScrollFromLanding();
        return;
      }

      setIsTransitioning(true);

      if (direction === 1 && activeSection < PAGES_CONFIG.length - 1) {
        setActiveSection((prev) => prev + 1);
      } else if (direction === -1 && activeSection > 0) {
        const newSection = activeSection - 1;
        setActiveSection(newSection);
        if (newSection === 0) {
          setTriggerLineAnimation(false);
        }
      }

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
  }, [activeSection, isTransitioning, currentPage]);

  useEffect(() => {
    if (currentPage !== "entrance") return;

    let lastWheelTime = 0;

    const handleWheel = (e) => {
      const now = Date.now();

      if (isTransitioning || now - lastWheelTime < 1000) return;

      const direction = e.deltaY > 0 ? 1 : -1;

      if (Math.abs(e.deltaY) > 10) {
        lastWheelTime = now;

        if (activeSection === 0 && direction === 1) {
          handleScrollFromLanding();
          return;
        }

        setIsTransitioning(true);

        if (direction === 1 && activeSection < PAGES_CONFIG.length - 1) {
          setActiveSection((prev) => prev + 1);
        } else if (direction === -1 && activeSection > 0) {
          const newSection = activeSection - 1;
          setActiveSection(newSection);
          // Reset line animation trigger when returning to landing
          if (newSection === 0) {
            setTriggerLineAnimation(false);
          }
        }

        setTimeout(() => setIsTransitioning(false), 1000);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [activeSection, isTransitioning, currentPage]);

  // Keyboard navigation for entrance pages only
  useEffect(() => {
    if (currentPage !== "entrance") return;

    const handleKeyDown = (e) => {
      if (isTransitioning) return;

      if (e.key === "ArrowDown" && activeSection < PAGES_CONFIG.length - 1) {
        // Special handling for leaving landing page
        if (activeSection === 0) {
          handleScrollFromLanding();
          return;
        }

        setIsTransitioning(true);
        setActiveSection((prev) => prev + 1);
        setTimeout(() => setIsTransitioning(false), 1000);
      } else if (e.key === "ArrowUp" && activeSection > 0) {
        setIsTransitioning(true);
        const newSection = activeSection - 1;
        setActiveSection(newSection);
        // Reset line animation trigger when returning to landing
        if (newSection === 0) {
          setTriggerLineAnimation(false);
        }
        setTimeout(() => setIsTransitioning(false), 1000);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSection, isTransitioning, currentPage]);

  return (
    <div className="app-container">
      {/* Sliding Content Area for Entrance Pages */}
      {currentPage === "entrance" && (
        <>
          <div
            className="content-area"
            style={{
              opacity: isFadingOut ? 0 : 1,
              transition: "opacity 0.3s ease-out",
            }}
          >
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
                    triggerTransition={triggerLineAnimation}
                    onNavigateToTimeline={() => {
                      if (!isTransitioning) {
                        setIsTransitioning(true);
                        setActiveSection(1);
                        setTimeout(() => setIsTransitioning(false), 1000);
                      }
                    }}
                    onNavbarNavigation={handleNavbarNavigation}
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
                  onNavbarNavigation={handleNavbarNavigation}
                  currentYear={getCurrentYear()}
                  pageData={page.data} // Pass the data
                />
              );
            })}
          </div>

          {/* Fixed Bottom Timeline for Timeline Pages Only */}
          {activeSection > 0 && (
            <BottomTimeline
              activeYear={getCurrentYear()}
              onYearClick={handleYearNavigation}
            />
          )}
        </>
      )}

      {/* Exhibition Page */}
      {currentPage === "exhibition" && (
        <div
          style={{
            opacity: isFadingOut ? 0 : 1,
            transition: "opacity 0.3s ease-out",
          }}
        >
          <Exhibition
            active={true}
            isTransitioning={isTransitioning}
            onNavbarNavigation={handleNavbarNavigation}
          />
        </div>
      )}

      {/* Invitation Page */}
      {currentPage === "invitation" && (
        <div
          style={{
            opacity: isFadingOut ? 0 : 1,
            transition: "opacity 0.3s ease-out",
          }}
        >
          <Invitation
            active={true}
            isTransitioning={isTransitioning}
            onNavbarNavigation={handleNavbarNavigation}
          />
        </div>
      )}
    </div>
  );
}

export default App;
