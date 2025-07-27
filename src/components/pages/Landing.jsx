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
  const [isMobile, setIsMobile] = useState(false);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: null, y: null, radius: 100 });
  const animationRef = useRef(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  // Font loading function
  const waitForFont = async () => {
    if ("fonts" in document) {
      try {
        await document.fonts.load('italic 250px "PP Editorial New"');
        await document.fonts.ready;
        console.log("Font loaded successfully");
      } catch (error) {
        console.warn("Font loading failed:", error);
      }
    }
    return new Promise((resolve) => setTimeout(resolve, 100));
  };

  // Initialize canvas and particles with font loading (only for desktop)
  useEffect(() => {
    if (!active || isMobile) return;

    const initializeCanvas = async () => {
      await waitForFont();
      await new Promise((resolve) => requestAnimationFrame(resolve));

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      canvas.width = 2000;
      canvas.height = 600;

      const mouse = mouseRef.current;

      const handleMouseMove = (e) => {
        const rect = canvas.getBoundingClientRect();
        const prevX = mouse.x;
        const prevY = mouse.y;

        mouse.x = (e.clientX - rect.left) * (canvas.width / rect.width);
        mouse.y = (e.clientY - rect.top) * (canvas.height / rect.height);

        // Dynamic radius based on mouse speed
        if (prevX !== null && prevY !== null) {
          const speed = Math.sqrt(
            Math.pow(mouse.x - prevX, 2) + Math.pow(mouse.y - prevY, 2)
          );
          mouse.radius = Math.min(150, Math.max(80, 80 + speed * 2));
        }
      };

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

      const testText = ctx.measureText("Perspective");
      const fontLoaded = document.fonts.check(
        'italic 250px "PP Editorial New"'
      );
      console.log(
        "Font metrics width:",
        testText.width,
        "Font loaded:",
        fontLoaded
      );

      ctx.fillText("Perspective", canvas.width / 2, canvas.height / 2);
      const textData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let textOpacity = 1;
      let particleOpacity = 0;
      let isTransitioning = false;

      class Particle {
        constructor(x, y) {
          this.baseX = x;
          this.baseY = y;
          this.x = x;
          this.y = y;
          this.vx = 0; // Add velocity
          this.vy = 0;
          this.size = Math.random() * 0.8 + 1.6; // Slightly larger particles
          this.alpha = 1;
          this.density = Math.random() * 40 + 10;
          this.isAtBase = true;
          this.friction = 0.95; // Add friction for smoother deceleration
          this.springBack = 0.02; // Spring constant for return animation
          this.floatPhase = Math.random() * Math.PI * 2;
          this.floatSpeed = 0.01 + Math.random() * 0.02;
          this.floatAmount = 0.3;
        }

        draw() {
          // Subtle glow for moving particles
          if (!this.isAtBase) {
            ctx.shadowBlur = 8;
            ctx.shadowColor = `rgba(1, 1, 1, ${
              this.alpha * particleOpacity * 0.3
            })`;
          }

          ctx.fillStyle = `rgba(1, 1, 1, ${this.alpha * particleOpacity})`;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();

          ctx.shadowBlur = 0;
        }

        update() {
          if (mouse.x !== null && mouse.y !== null) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {
              // Improved repulsion with inverse square law
              const force = (mouse.radius - distance) / mouse.radius;
              const forceX = (dx / distance) * force * this.density * 0.5;
              const forceY = (dy / distance) * force * this.density * 0.5;

              this.vx -= forceX;
              this.vy -= forceY;

              // Fade based on distance from mouse
              this.alpha = Math.max(0.3, 1 - force * 0.5);
            }
          }

          // Spring back to base position
          const dx = this.baseX - this.x;
          const dy = this.baseY - this.y;

          this.vx += dx * this.springBack;
          this.vy += dy * this.springBack;

          // Apply friction
          this.vx *= this.friction;
          this.vy *= this.friction;

          // Update position
          this.x += this.vx;
          this.y += this.vy;

          // Check if at base
          this.isAtBase =
            Math.abs(dx) < 0.5 &&
            Math.abs(dy) < 0.5 &&
            Math.abs(this.vx) < 0.1 &&
            Math.abs(this.vy) < 0.1;

          // Subtle idle animation when at base
          if (this.isAtBase && mouse.x === null) {
            this.x =
              this.baseX +
              Math.sin(Date.now() * this.floatSpeed + this.floatPhase) *
                this.floatAmount;
            this.y =
              this.baseY +
              Math.cos(Date.now() * this.floatSpeed * 0.7 + this.floatPhase) *
                this.floatAmount;
          }

          // Restore alpha when returning
          if (this.alpha < 1) {
            this.alpha = Math.min(1, this.alpha + 0.05);
          }
        }
      }

      const initParticles = () => {
        particlesRef.current = [];
        for (let y = 0; y < textData.height; y += 2) {
          for (let x = 0; x < textData.width; x += 2) {
            const index = (y * textData.width + x) * 4;
            if (textData.data[index + 3] > 50) {
              particlesRef.current.push(new Particle(x, y));
            }
          }
        }
        console.log("Particles created:", particlesRef.current.length);
      };

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const allAtBase =
          mouse.x === null &&
          mouse.y === null &&
          particlesRef.current.every((p) => p.isAtBase);

        const fadeOutSpeed = 0.15; // Slower for smoother transition
        const fadeInSpeed = 0.12;

        if (isTransitioning && mouse.x !== null && mouse.y !== null) {
          if (textOpacity > 0) {
            textOpacity = Math.max(0, textOpacity - fadeOutSpeed);
          }
          if (particleOpacity < 1) {
            particleOpacity = Math.min(1, particleOpacity + fadeOutSpeed);
          }
        } else if (allAtBase && particleOpacity > 0) {
          if (textOpacity < 1) {
            textOpacity = Math.min(1, textOpacity + fadeInSpeed);
          }
          if (particleOpacity > 0) {
            particleOpacity = Math.max(0, particleOpacity - fadeInSpeed);
          }
          if (textOpacity >= 0.99 && particleOpacity <= 0.01) {
            textOpacity = 1;
            particleOpacity = 0;
            isTransitioning = false;
          }
        }

        if (textOpacity > 0) {
          ctx.globalAlpha = textOpacity;
          ctx.fillStyle = "#111";
          ctx.font = `italic ${fontSize}px "PP Editorial New"`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("Perspective", canvas.width / 2, canvas.height / 2);
          ctx.globalAlpha = 1;
        }

        particlesRef.current.forEach((particle) => {
          particle.update();
          particle.draw();
        });

        animationRef.current = requestAnimationFrame(animate);
      };

      initParticles();
      animate();

      return () => {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    };

    initializeCanvas();
  }, [active, isMobile]);

  return (
    <LandingContainer $active={active} $isTransitioning={isTransitioning}>
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
            <Line $isAnimating={isLineAnimating} />
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
          <PerspectiveTextContainer $isMobile={isMobile}>
            {!isMobile && <ParticleCanvas ref={canvasRef} />}
            {isMobile && (
              <MobilePerspectiveText>Perspective</MobilePerspectiveText>
            )}
          </PerspectiveTextContainer>
        </TitleRow>
      </Content>
    </LandingContainer>
  );
}

// Updated styled components with media queries
const PerspectiveTextContainer = styled.div`
  font-family: "PP Editorial New", serif;
  position: relative;
  width: 1200px;
  height: 600px;
  margin-left: 11rem;
  margin-top: -5.8rem;
  font-size: 250px;
  font-style: italic;
  letter-spacing: 0%;
  overflow: visible;

  @media (max-width: 480px) {
    width: 100%;
    height: auto;
    margin: 0;
    font-size: 80px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    width: 800px;
    height: 400px;
    margin-left: 0;
    margin-top: -3rem;
    font-size: 160px;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    width: 1000px;
    height: 500px;
    margin-left: 6rem;
    margin-top: -4rem;
    font-size: 200px;
  }

  @media (min-width: 1025px) and (max-width: 1440px) {
    width: 1100px;
    height: 550px;
    margin-left: 9rem;
    margin-top: -5rem;
    font-size: 220px;
  }
`;

const MobilePerspectiveText = styled.div`
  font-family: "PP Editorial New", serif;
  font-style: italic;
  font-size: 74px;
  color: #111;
  line-height: 40px;
  text-align: center;
`;

const ParticleCanvas = styled.canvas`
  position: absolute;
  top: -100px;
  left: -530px;
  width: 2000px;
  height: 600px;
  background: transparent;
  pointer-events: auto;

  @media (max-width: 480px) {
    display: none;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    left: -200px;
    width: 1000px;
    height: 400px;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    left: -400px;
    width: 1500px;
    height: 500px;
  }
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
      if (props.$active) return "0vh";
      return "-100vh";
    }}
  );
  transition: transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  pointer-events: ${(props) => (props.$active ? "auto" : "none")};
  overflow: hidden;
  box-sizing: border-box;
  top: 0;
  left: 0;
  max-width: 100vw;
  max-height: 100vh;
  z-index: ${(props) => (props.$active ? 10 : 5)};

  @media (max-width: 480px) {
    padding: 0 16px;
    overflow-y: auto;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    padding: 0 32px;
  }
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

  @media (max-width: 480px) {
    width: 100%;
    padding: 0;
    margin-top: 15vh;
    align-items: center;
    text-align: center;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    width: 100%;
    padding: 0 24px;
    margin-top: 20vh;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    width: calc(100vw - 80px);
    padding: 0 40px;
    margin-top: 25vh;
  }

  @media (min-width: 1025px) and (max-width: 1440px) {
    width: calc(100vw - 120px);
    padding: 0 48px;
  }
`;

const DivCol = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;

  @media (max-width: 480px) {
    order: 3;
    margin-top: -12px;
    width: 88vw;
    text-align: right;
  }
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    gap: 24px;
    margin-bottom: 40px;
  }
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-bottom: 46px;

  @media (max-width: 480px) {
    justify-content: center;
    text-align: center;
    padding-bottom: 20px;

    &:last-child {
      padding-bottom: 40px;
    }
  }
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

  @media (max-width: 480px) {
    font-size: 28px;
    line-height: 36px;
    margin: 0;
    text-align: left;
    order: 1;
    width: 88vw;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    font-size: 36px;
    line-height: 48px;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    font-size: 42px;
    line-height: 64px;
  }

  @media (min-width: 1025px) and (max-width: 1440px) {
    font-size: 48px;
    line-height: 72px;
  }
`;

const AuthorSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media (max-width: 480px) {
    order: 2;
    margin-bottom: 0;
  }
`;

const Author = styled.p`
  font-family: "PP Editorial New", serif;
  font-size: 24px;
  font-style: italic;
  line-height: 58px;
  font-weight: 200;
  color: #787878;
  letter-spacing: 2%;

  @media (max-width: 480px) {
    font-size: 14px;
    line-height: 24px;
    margin-bottom: 4px;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    font-size: 18px;
    line-height: 28px;
  }
`;

const Line = styled.div`
  border-bottom: 2px solid #787878;
  width: ${(props) => (props.$isAnimating ? "0%" : "68%")};
  margin-bottom: 3rem;
  transition: width 0.8s ease-in-out;

  @media (max-width: 480px) {
    width: ${(props) => (props.$isAnimating ? "0%" : "100%")};
    margin-bottom: 0;
  }
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

  @media (max-width: 480px) {
    display: none;
  }
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

  @media (max-width: 480px) {
    font-size: 24px;
    width: auto;
    margin: 0;
  }
`;

const DesignText = styled.div`
  font-family: "PP Editorial New", serif;
  font-weight: 400;
  font-size: 200px;
  letter-spacing: 0%;
  margin-bottom: -2.5rem;
  line-height: 200px;

  @media (max-width: 480px) {
    font-size: 74px;
    line-height: 80px;
    margin-bottom: -1rem;
    text-align: left;
    width: 100%;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    font-size: 120px;
    line-height: 120px;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    font-size: 150px;
    line-height: 150px;
  }

  @media (min-width: 1025px) and (max-width: 1440px) {
    font-size: 180px;
    line-height: 180px;
  }
`;

const Span = styled.span`
  font-family: "PP Editorial New", serif;
  font-weight: 400;
  font-style: italic;
  font-size: 5rem;

  @media (max-width: 480px) {
    font-size: 32px;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    font-size: 40px;
  }
`;
