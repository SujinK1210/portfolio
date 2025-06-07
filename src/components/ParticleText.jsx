import { useEffect, useRef } from "react";
import styled from "styled-components";

export default function ParticleText() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationFrameRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const mouse = useRef({ x: null, y: null, radius: 80 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const text = "Perspective";
    const font = "italic 400 120px 'PP Editorial New'";
    const triggerRadius = 220;

    const drawStaticText = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#111";
      ctx.font = font;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    };

    class Particle {
      constructor(x, y) {
        this.baseX = x;
        this.baseY = y;
        this.x = x;
        this.y = y;
        this.size = Math.random() * 1.5 + 0.5;
        this.alpha = 0;
        this.density = Math.random() * 70 + 1;
      }

      draw() {
        ctx.fillStyle = `rgba(0, 0, 0, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }

      update() {
        const dx = mouse.current.x - this.x;
        const dy = mouse.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.current.radius) {
          const forceX = (dx / distance) * this.density;
          const forceY = (dy / distance) * this.density;
          this.x -= forceX * 0.1;
          this.y -= forceY * 0.1;
          this.alpha = Math.max(0.1, this.alpha - 0.02);
        } else {
          const dx = this.baseX - this.x;
          const dy = this.baseY - this.y;
          this.x += dx / 10;
          this.y += dy / 10;
          this.alpha = Math.min(1, this.alpha + 0.02);
        }
      }
    }

    const initParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#111";
      ctx.font = font;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);

      const textData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      particlesRef.current = [];

      for (let y = 0; y < textData.height; y += 2) {
        for (let x = 0; x < textData.width; x += 2) {
          const index = (y * textData.width + x) * 4;
          if (textData.data[index + 3] > 128) {
            particlesRef.current.push(new Particle(x, y));
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const activateParticles = () => {
      isAnimatingRef.current = true;
      initParticles();
      animate();
    };

    const resetParticles = () => {
      isAnimatingRef.current = false;
      cancelAnimationFrame(animationFrameRef.current);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawStaticText();
    };

    const handleMouseMove = (e) => {
      mouse.current.x = e.x;
      mouse.current.y = e.y;

      const dx = e.x - canvas.width / 2;
      const dy = e.y - canvas.height / 2;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < triggerRadius) {
        if (!isAnimatingRef.current) {
          activateParticles();
        }
      } else {
        if (isAnimatingRef.current) {
          resetParticles();
        }
      }
    };

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      if (!isAnimatingRef.current) {
        drawStaticText();
      } else {
        initParticles();
      }
    };

    drawStaticText();
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return <ParticleCanvas ref={canvasRef} />;
}

const ParticleCanvas = styled.canvas`
  width: auto;
  height: auto;
  position: absolute;
  display: block;
  pointer-events: none;
  margin-top: -19rem;
  margin-left: -23%;
`;
