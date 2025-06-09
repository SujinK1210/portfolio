import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

export default function PerspectiveWithParticles() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isMouseNear, setIsMouseNear] = useState(false);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: null, y: null, radius: 100 });
  const animationIdRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    let textCoordinates = null;

    // Mouse move handler
    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      mouseRef.current.x = x;
      mouseRef.current.y = y;

      // Check distance from center
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const distance = Math.sqrt(
        Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
      );

      // Trigger particle effect when mouse is within 200px
      const shouldShowParticles = distance < 200;

      if (shouldShowParticles !== isMouseNear) {
        setIsMouseNear(shouldShowParticles);

        if (shouldShowParticles && !textCoordinates) {
          initializeParticles();
        }
      }
    };

    // Particle class
    class Particle {
      constructor(x, y) {
        this.baseX = x;
        this.baseY = y;
        this.x = x;
        this.y = y;
        this.size = Math.random() * 1.2 + 0.3;
        this.alpha = 0; // Start invisible
        this.density = Math.random() * 30 + 1;
        this.targetAlpha = 1;
      }

      draw() {
        if (this.alpha > 0) {
          ctx.fillStyle = `rgba(17, 17, 17, ${this.alpha})`;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      update() {
        // Smooth alpha transitions
        if (isMouseNear) {
          this.alpha += (this.targetAlpha - this.alpha) * 0.05;
        } else {
          this.alpha += (0 - this.alpha) * 0.05;
        }

        if (!mouseRef.current.x || !mouseRef.current.y) return;

        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseRef.current.radius) {
          const forceX = (dx / distance) * this.density;
          const forceY = (dy / distance) * this.density;
          this.x -= forceX * 0.1;
          this.y -= forceY * 0.1;
          this.targetAlpha = Math.max(
            0.1,
            1 - (distance / mouseRef.current.radius) * 0.8
          );
        } else {
          const returnX = (this.baseX - this.x) / 10;
          const returnY = (this.baseY - this.y) / 10;
          this.x += returnX;
          this.y += returnY;
          this.targetAlpha = 1;
        }
      }
    }

    // Initialize particles from text
    const initializeParticles = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      // Draw text to get pixel data
      ctx.fillStyle = "#111";
      ctx.font = `italic 400 ${
        rect.width * 0.2
      }px 'PP Editorial New', 'Playfair Display', serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Perspective", rect.width / 2, rect.height / 2);

      // Get text pixel data
      textCoordinates = ctx.getImageData(0, 0, canvas.width, canvas.height);

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create particles
      particlesRef.current = [];
      const sampling = 2; // Sample every 2 pixels

      for (let y = 0; y < textCoordinates.height; y += sampling) {
        for (let x = 0; x < textCoordinates.width; x += sampling) {
          const index = (y * textCoordinates.width + x) * 4;
          const alpha = textCoordinates.data[index + 3];

          if (alpha > 128) {
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

      animationIdRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Event listeners
    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [isMouseNear]);

  return (
    <Container ref={containerRef}>
      <PerspectiveText show={!isMouseNear}>Perspective</PerspectiveText>
      <StyledCanvas ref={canvasRef} />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: fit-content;
  height: 300px;
  margin-left: 11rem;
  margin-top: -2rem;
`;

const PerspectiveText = styled.h1`
  font-family: "PP Editorial New", "Playfair Display", serif;
  font-weight: 400;
  font-size: 250px;
  font-style: italic;
  line-height: 200px;
  letter-spacing: 0%;
  color: #111;
  margin: 0;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: opacity 0.4s ease;
  user-select: none;
`;

const StyledCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;
