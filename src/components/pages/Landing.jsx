import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Navbar from "../navigation/Navbar";

export default function Landing({
  active,
  isTransitioning,
  onNavigateToTimeline,
  triggerTransition,
}) {
  const [activeNavItem, setActiveNavItem] = useState("entrance");
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

    // Set larger canvas size to accommodate full text
    canvas.width = 1200; // Larger width for "Perspective" at 250px
    canvas.height = 400; // Larger height for the font size

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
      }

      draw() {
        ctx.fillStyle = `rgba(1, 1, 1, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }

      update() {
        // Only apply mouse interaction if mouse is present
        if (mouse.x !== null && mouse.y !== null) {
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
        activeItem={activeNavItem}
        onItemClick={setActiveNavItem}
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
  width: 100%;
  height: 380px;
  margin-left: 11rem;
  margin-top: -5.8rem;
  font-size: 250px;
  font-style: italic;
  letter-spacing: 0%;
`;

const ParticleCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: -20px;
  width: 1200px;
  height: 100%;
  background: beige;
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
