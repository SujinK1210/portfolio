import Lenis from "@studio-freight/lenis";
import { useEffect, useState } from "react";
import Landing from "./components/pages/Landing";
import TwentyFour from "./components/pages/TwentyFour";
import TwentyThree from "./components/pages/TwentyThree";
import "./styles/App.css";

// Configuration for all pages - easy to extend
const PAGES_CONFIG = [
  { id: "landing", component: Landing },
  { id: "twentyfour", component: TwentyFour },
  { id: "twentythree", component: TwentyThree },
  // Future pages: { id: "twentythree", component: TwentyThree },
];

function App() {
  const [activeSection, setActiveSection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

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
      if (isTransitioning || now - lastScrollTime < 800) return;

      // Only trigger on significant scroll velocity
      if (Math.abs(velocity) < 0.3) return; // Lowered threshold

      lastScrollTime = now;
      setIsTransitioning(true);

      if (direction === 1 && activeSection < PAGES_CONFIG.length - 1) {
        // Scroll down - next section
        console.log("Going to next section:", activeSection + 1);
        setActiveSection((prev) => prev + 1);
      } else if (direction === -1 && activeSection > 0) {
        // Scroll up - previous section
        console.log("Going to previous section:", activeSection - 1);
        setActiveSection((prev) => prev - 1);
      }

      // Reset transition state
      setTimeout(() => setIsTransitioning(false), 800);
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

      if (isTransitioning || now - lastWheelTime < 800) return;

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

        setTimeout(() => setIsTransitioning(false), 800);
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
        setTimeout(() => setIsTransitioning(false), 800);
      } else if (e.key === "ArrowUp" && activeSection > 0) {
        setIsTransitioning(true);
        setActiveSection((prev) => prev - 1);
        setTimeout(() => setIsTransitioning(false), 800);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSection, isTransitioning]);

  return (
    <div className="app-container">
      {/* Create actual scrollable content for Lenis */}
      <div className="scroll-content">
        {PAGES_CONFIG.map((page) => (
          <div key={page.id} className="scroll-section" />
        ))}
      </div>

      {/* Render actual page components */}
      {PAGES_CONFIG.map((page, index) => {
        const PageComponent = page.component;
        return (
          <PageComponent
            key={page.id}
            active={activeSection === index}
            isTransitioning={isTransitioning}
          />
        );
      })}

      {/* Page indicator dots */}
      <div className="page-indicators">
        {PAGES_CONFIG.map((_, index) => (
          <button
            key={index}
            className={`page-dot ${activeSection === index ? "active" : ""} ${
              activeSection === 0 ? "landing-theme" : "dark-theme"
            }`}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true);
                setActiveSection(index);
                setTimeout(() => setIsTransitioning(false), 800);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
