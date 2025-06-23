import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Navbar from "../navigation/Navbar";

export default function Landing({
  active,
  isTransitioning,
  onNavigateToTimeline,
  triggerTransition,
  onNavbarNavigation,
}) {
  const [isLineAnimating, setIsLineAnimating] = useState(false);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: null, y: null, radius: 100 });
  const animationRef = useRef(null);

  // Reset animation state when returning to landing page
  useEffect(() => {
    if (active && !isTransitioning) {
      setIsLineAnimating(false);
    }
  }, [active, isTransitioning]);

  // Handle external trigger (from scroll)
  useEffect(() => {
    if (triggerTransition && !isLineAnimating) {
      handleAnimationSequence();
    }
  }, [triggerTransition, isLineAnimating]);

  const handleAnimationSequence = () => {
    if (isLineAnimating || isTransitioning) return;

    console.log("Starting line animation");
    setIsLineAnimating(true);

    setTimeout(() => {
      if (onNavigateToTimeline) {
        onNavigateToTimeline();
      }
    }, 700);
  };

  const handleClickToBegin = () => {
    handleAnimationSequence();
  };

  // Initialize canvas and particles with CodePen approach
  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // Set larger canvas size with extra padding for particle movement
    canvas.width = 2000; // Increased to ensure no right-side cropping
    canvas.height = 600; // Increased height for particle animation space

    const mouse = mouseRef.current;

    // Mouse move handler
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) * (canvas.width / rect.width);
      mouse.y = (e.clientY - rect.top) * (canvas.height / rect.height);
    };

    // Mouse leave handler to reset mouse position
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;

      // Optional: Transition back to text when mouse leaves
      // Uncomment the line below if you want text to reappear when mouse leaves
      isTransitioning = false;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const fontSize = 250;
    ctx.fillStyle = "#111";
    ctx.font = `italic ${fontSize}px "PP Editorial New"`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Draw the text to create particle data
    ctx.fillText("Perspective", canvas.width / 2, canvas.height / 2);
    const textData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Track interaction state
    let textOpacity = 1;
    let particleOpacity = 0;
    let isTransitioning = false;

    // Particle class based on CodePen
    class Particle {
      constructor(x, y) {
        this.baseX = x;
        this.baseY = y;
        this.x = x;
        this.y = y;
        this.size = Math.random() * 0.6 + 1.4;
        this.alpha = 1;
        this.density = Math.random() * 30 + 1;
        this.isAtBase = true;
      }

      draw() {
        ctx.fillStyle = `rgba(1, 1, 1, ${this.alpha * particleOpacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }

      update() {
        // Only apply mouse interaction if mouse is present
        if (mouse.x !== null && mouse.y !== null) {
          if (!isTransitioning) {
            isTransitioning = true;
          }

          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const forceX = (dx / distance) * this.density;
            const forceY = (dy / distance) * this.density;
            this.x -= forceX * 1.6;
            this.y -= forceY * 1.6;
            this.alpha -= 0.2;
            if (this.alpha < 1) this.alpha += 0.1;
          } else {
            const dx = this.baseX - this.x;
            const dy = this.baseY - this.y;
            this.x += dx / 10;
            this.y += dy / 10;
            if (this.alpha < 1) this.alpha += 0.02;
          }
        } else {
          // Return to base position when mouse is not present
          const dx = this.baseX - this.x;
          const dy = this.baseY - this.y;
          this.x += dx / 2;
          this.y += dy / 2;
          if (this.alpha < 1) this.alpha += 0.02;

          // Check if all particles are back to base to transition back to text
          const isAtBase =
            Math.abs(this.x - this.baseX) < 0.5 &&
            Math.abs(this.y - this.baseY) < 0.5;
          if (isAtBase && particleOpacity > 0) {
            // This will be checked in the animation loop
            this.isAtBase = true;
          } else {
            this.isAtBase = false;
          }
        }
      }
    }

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let y = 0; y < textData.height; y += 1) {
        for (let x = 0; x < textData.width; x += 1) {
          const index = (y * textData.width + x) * 4;
          if (textData.data[index + 3] > 50) {
            // Lower threshold for more coverage
            particlesRef.current.push(new Particle(x, y));
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Check if all particles are back at base when mouse is away
      const allAtBase =
        mouse.x === null &&
        mouse.y === null &&
        particlesRef.current.every((p) => p.isAtBase);

      // Handle transition
      // ADJUST THESE VALUES TO CONTROL FADE SPEED:
      const fadeOutSpeed = 0.5; // Speed when text disappears (mouse enters)
      const fadeInSpeed = 0.03; // Speed when text reappears (mouse leaves)

      if (isTransitioning && mouse.x !== null && mouse.y !== null) {
        // Fade out text, fade in particles when mouse is present
        if (textOpacity > 0) textOpacity -= fadeOutSpeed;
        if (particleOpacity < 1) particleOpacity += fadeOutSpeed;
      } else if (allAtBase && particleOpacity > 0) {
        // Fade back to text when particles return to base
        if (textOpacity < 1) textOpacity += fadeInSpeed;
        if (particleOpacity > 0) particleOpacity -= fadeInSpeed;
        if (textOpacity >= 1 && particleOpacity <= 0) {
          isTransitioning = false;
        }
      }

      // Draw normal text with fading opacity
      if (textOpacity > 0) {
        ctx.globalAlpha = textOpacity;
        ctx.fillStyle = "#111";
        ctx.font = `italic ${fontSize}px "PP Editorial New"`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Perspective", canvas.width / 2, canvas.height / 2);
        ctx.globalAlpha = 1;
      }

      // Always update and draw particles (opacity controlled in particle draw)
      particlesRef.current.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    // Cleanup
    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [active]);

  return (
    <LandingContainer active={active} isTransitioning={isTransitioning}>
      <Navbar
        activeItem="entrance"
        onItemClick={(item) => {
          if (onNavbarNavigation) {
            onNavbarNavigation(item);
          }
        }}
        isLandingPage={true}
      />
      <Content>
        <HeaderRow>
          <Header>A curated archive of</Header>
          <AuthorSection>
            <Author>Curated by Sujin Kim</Author>
            <Line isAnimating={isLineAnimating} />
          </AuthorSection>
          <DivCol onClick={handleClickToBegin} style={{ cursor: "pointer" }}>
            <ClickHint>Click here or</ClickHint>
            <ScrollHint>Scroll to begin</ScrollHint>
          </DivCol>
        </HeaderRow>

        <TitleRow>
          <DesignText>
            Design <Span>and</Span>
          </DesignText>
        </TitleRow>
        <TitleRow>
          <PerspectiveTextContainer>
            <ParticleCanvas ref={canvasRef} />
          </PerspectiveTextContainer>
        </TitleRow>
      </Content>
    </LandingContainer>
  );
}

// Updated styled components
const PerspectiveTextContainer = styled.div`
  font-family: "PP Editorial New", serif;
  position: relative;
  width: 1200px; /* Set fixed width to contain the canvas properly */
  height: 600px; /* Increased to match canvas height */
  margin-left: 11rem;
  margin-top: -5.8rem;
  font-size: 250px;
  font-style: italic;
  letter-spacing: 0%;
  overflow: visible; /* Ensure canvas isn't clipped */
`;

const ParticleCanvas = styled.canvas`
  position: absolute;
  top: -100px; /* Adjusted to center the expanded canvas */
  left: -530px; /* Moved left to center the 2000px canvas */
  width: 2000px; /* Extra wide to prevent any cropping */
  height: 600px; /* Match canvas.height */
  background: transparent;
  pointer-events: auto;
`;

const LandingContainer = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f9f8f6;
  color: #111;
  transform: translateY(
    ${(props) => {
      if (props.active) return "0vh";
      return "-100vh";
    }}
  );
  transition: transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  pointer-events: ${(props) => (props.active ? "auto" : "none")};
  overflow: hidden;
  box-sizing: border-box;
  top: 0;
  left: 0;
  max-width: 100vw;
  max-height: 100vh;
  z-index: ${(props) => (props.active ? 10 : 5)};
`;

const Content = styled.div`
  width: calc(100vw - 160px);
  max-width: 1440px;
  min-height: fit-content;
  padding: 0 58px;
  margin-top: 30vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;
  box-sizing: border-box;
`;

const DivCol = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-bottom: 46px;
`;

const Header = styled.h1`
  font-family: "PP Editorial New", serif;
  font-style: italic;
  font-weight: 200;
  font-size: 54px;
  line-height: 88px;
  min-width: fit-content;
  letter-spacing: 0%;
  margin-left: 8px;
  margin-bottom: 8px;
`;

const AuthorSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Author = styled.p`
  font-family: "PP Editorial New", serif;
  font-size: 24px;
  font-style: italic;
  line-height: 58px;
  font-weight: 200;
  color: #787878;
  letter-spacing: 2%;
`;

const Line = styled.div`
  border-bottom: 2px solid #787878;
  width: ${(props) => (props.isAnimating ? "0%" : "68%")};
  margin-bottom: 3rem;
  transition: width 0.8s ease-in-out;
`;

const ClickHint = styled.p`
  font-family: "PP Editorial New", serif;
  font-style: italic;
  font-weight: 200;
  font-size: 18px;
  color: #787878;
  margin: 0;
  letter-spacing: 2px;
  min-width: fit-content;
`;

const ScrollHint = styled.p`
  font-family: "PP Editorial New", serif;
  font-style: italic;
  font-weight: 200;
  font-size: 48px;
  color: #787878;
  margin: 0;
  letter-spacing: -2%;
  width: 242px;
`;

const DesignText = styled.div`
  font-family: "PP Editorial New", serif;
  font-weight: 400;
  font-size: 200px;
  letter-spacing: 0%;
  margin-bottom: -2.5rem;
  line-height: 200px;
`;

const Span = styled.span`
  font-family: "PP Editorial New", serif;
  font-weight: 400;
  font-style: italic;
  font-size: 5rem;
`;
