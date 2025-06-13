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

  // Initialize canvas and particles
  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Text styling - now with proper italic
    const fontSize = 250;
    ctx.fillStyle = "#111";
    ctx.font = `italic ${fontSize}px "PP Editorial New"`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Calculate vertical position
    const textMetrics = ctx.measureText("Perspective");
    const yPos = canvas.height / 2 + textMetrics.actualBoundingBoxAscent / 2;

    // Draw the base text (semi-transparent for better particle visibility)
    ctx.globalAlpha = 0.2;
    ctx.fillText("Perspective", canvas.width / 2, yPos);
    ctx.globalAlpha = 1;

    // Create a much denser particle field
    const textData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesRef.current = [];
    // Reduced spacing between particles (from 2px to 1px)
    for (let y = 0; y < textData.height; y += 1) {
      for (let x = 0; x < textData.width; x += 1) {
        const index = (y * textData.width + x) * 4;
        if (textData.data[index + 3] > 128) {
          particlesRef.current.push(new Particle(x, y));
        }
      }
    }

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw base text (subtle background)
      ctx.globalAlpha = 0.1;
      ctx.fillText("Perspective", canvas.width / 2, yPos);
      ctx.globalAlpha = 1;

      particlesRef.current.forEach((p) => {
        p.update(mouseRef.current);
        p.draw(ctx);
      });
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    // ... (keep your existing event listeners and cleanup)
  }, [active]);

  // Modified Particle class for subtler effect
  class Particle {
    constructor(x, y) {
      this.baseX = x;
      this.baseY = y;
      this.x = x;
      this.y = y;
      this.size = 0.8; // Smaller, more consistent size
      this.alpha = 1;
      this.density = Math.random() * 10 + 5; // Reduced movement range
    }

    draw(ctx) {
      ctx.fillStyle = `rgba(0, 0, 0, ${this.alpha})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }

    update(mouse) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 50; // Reduced interaction radius

      if (distance < maxDistance) {
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const force = (maxDistance - distance) / maxDistance;
        const directionX = forceDirectionX * force * this.density * 0.2; // Reduced movement
        const directionY = forceDirectionY * force * this.density * 0.2;

        this.x -= directionX;
        this.y -= directionY;
      } else {
        // Slower return to position
        this.x += (this.baseX - this.x) * 0.05;
        this.y += (this.baseY - this.y) * 0.05;
      }
    }
  }

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
          <PerspectiveTextContainer>Perspective</PerspectiveTextContainer>
        </TitleRow>
      </Content>
    </LandingContainer>
  );
}

const PerspectiveTextContainer = styled.div`
  font-family: "PP Editorial New", serif;
  position: relative;
  width: 100%;
  height: 350px;
  margin-left: 11rem;
  margin-top: -4.8rem;
  font-size: 250px;
  font-style: italic;
  letter-spacing: 0%;
`;

// Keep all your existing styled components the same...
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
