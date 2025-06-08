import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

export default function PerspectiveText() {
  const textRef = useRef(null);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationFrameRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const mouse = useRef({ x: null, y: null, radius: 120 });
  const [showOriginalText, setShowOriginalText] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const textElement = textRef.current;
    if (!canvas || !textElement) return;

    const ctx = canvas.getContext("2d");
    let textBounds = null;

    const updateCanvasSize = () => {
      textBounds = textElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      // Set canvas size with device pixel ratio for crisp rendering
      canvas.width = textBounds.width * dpr;
      canvas.height = textBounds.height * dpr;
      canvas.style.width = textBounds.width + "px";
      canvas.style.height = textBounds.height + "px";

      // Scale the context to match device pixel ratio
      ctx.scale(dpr, dpr);

      // Position canvas exactly over the text
      canvas.style.left = textBounds.left + "px";
      canvas.style.top = textBounds.top + "px";
    };

    class Particle {
      constructor(x, y) {
        this.baseX = x;
        this.baseY = y;
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1; // Slightly larger particles
        this.alpha = 0;
        this.density = Math.random() * 40 + 20; // Reduced density for smoother effect
      }

      draw() {
        ctx.fillStyle = `rgba(17, 17, 17, ${this.alpha})`; // Match text color #111
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }

      update() {
        if (!textBounds) return;

        // Convert global mouse position to local canvas coordinates
        const localMouseX = mouse.current.x - textBounds.left;
        const localMouseY = mouse.current.y - textBounds.top;

        const dx = localMouseX - this.x;
        const dy = localMouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.current.radius) {
          const forceX = (dx / distance) * this.density;
          const forceY = (dy / distance) * this.density;
          this.x -= forceX * 0.08;
          this.y -= forceY * 0.08;
          this.alpha = Math.max(0.1, this.alpha - 0.015);
        } else {
          const dx = this.baseX - this.x;
          const dy = this.baseY - this.y;
          this.x += dx / 12;
          this.y += dy / 12;
          this.alpha = Math.min(0.9, this.alpha + 0.025);
        }
      }
    }

    const initParticles = () => {
      if (!textBounds) return;

      updateCanvasSize();

      // Clear and setup context
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#111";
      ctx.font = "italic 400 250px 'PP Editorial New'"; // Match exact styling
      ctx.textAlign = "left";
      ctx.textBaseline = "top";

      // Draw text to get pixel data
      ctx.fillText("Perspective", 0, 0);

      const textData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      particlesRef.current = [];

      // Reduced sampling for better performance and less pixelation
      for (let y = 0; y < textData.height; y += 4) {
        for (let x = 0; x < textData.width; x += 4) {
          const index = (y * textData.width + x) * 4;
          if (textData.data[index + 3] > 128) {
            particlesRef.current.push(new Particle(x, y));
          }
        }
      }
    };

    const animate = () => {
      if (!isAnimatingRef.current) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const activateParticles = () => {
      if (isAnimatingRef.current) return;

      isAnimatingRef.current = true;
      setShowOriginalText(false); // Hide original text
      initParticles();
      animate();
    };

    const deactivateParticles = () => {
      if (!isAnimatingRef.current) return;

      isAnimatingRef.current = false;
      setShowOriginalText(true); // Show original text
      cancelAnimationFrame(animationFrameRef.current);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      if (!textBounds) {
        textBounds = textElement.getBoundingClientRect();
      }

      // Check if mouse is near the text
      const centerX = textBounds.left + textBounds.width / 2;
      const centerY = textBounds.top + textBounds.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 200) {
        // Trigger distance
        activateParticles();
      } else {
        deactivateParticles();
      }
    };

    const handleResize = () => {
      if (isAnimatingRef.current) {
        initParticles();
      }
    };

    // Initial setup
    updateCanvasSize();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <Container>
      <PerspectiveTextStyled ref={textRef} show={showOriginalText}>
        Perspective
      </PerspectiveTextStyled>
      <ParticleCanvas ref={canvasRef} />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: inline-block;
`;

const PerspectiveTextStyled = styled.div`
  font-family: "PP Editorial New", serif;
  font-weight: 400;
  font-size: 250px;
  font-style: italic;
  letter-spacing: 0%;
  margin-left: 10.8rem;
  line-height: 166px;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: opacity 0.2s ease;
`;

const ParticleCanvas = styled.canvas`
  position: fixed;
  pointer-events: none;
  z-index: 10;
`;
