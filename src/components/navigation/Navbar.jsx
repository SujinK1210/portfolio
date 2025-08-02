import { useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";

const AnimatedNavItem = ({ text, active, onClick, isLandingPage }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayText, setDisplayText] = useState(text);
  const timeoutRef = useRef(null);

  const getRandomChar = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return chars.charAt(Math.floor(Math.random() * chars.length));
  };

  const handleMouseEnter = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    const originalText = text;
    const textLength = originalText.length;
    let animationPhases = 0;
    const maxPhases = 5; // More flip cycles for chaotic effect

    const animateRandomLetters = () => {
      if (animationPhases >= maxPhases) {
        setIsAnimating(false);
        setDisplayText(originalText);
        return;
      }

      // Create random text - flip 60-80% of letters each phase
      const flipCount = Math.floor(textLength * (0.6 + Math.random() * 0.2));
      const positionsToFlip = [];

      // Select random positions to flip
      while (positionsToFlip.length < flipCount) {
        const randomPos = Math.floor(Math.random() * textLength);
        if (!positionsToFlip.includes(randomPos)) {
          positionsToFlip.push(randomPos);
        }
      }

      const newText = originalText
        .split("")
        .map((char, index) => {
          if (positionsToFlip.includes(index)) {
            return getRandomChar();
          }
          return char;
        })
        .join("");

      setDisplayText(newText);
      animationPhases++;

      // Random timing between phases (40-120ms)
      const nextDelay = 40 + Math.random() * 80;
      setTimeout(animateRandomLetters, nextDelay);
    };

    animateRandomLetters();
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsAnimating(false);
    setDisplayText(text);
  };

  return (
    <StyledNavItem
      $active={active} // Changed to $active
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      $isLandingPage={isLandingPage} // Changed to $isLandingPage
      $isAnimating={isAnimating} // Changed to $isAnimating
    >
      {displayText.split("").map((char, index) => (
        <Letter key={`${text}-${index}`} $isAnimating={isAnimating}>
          {char}
        </Letter>
      ))}
    </StyledNavItem>
  );
};

export default function Navbar({
  activeItem,
  onItemClick,
  isLandingPage = false,
}) {
  return (
    <NavbarContainer $isLandingPage={isLandingPage}>
      {" "}
      {/* Changed to $isLandingPage */}
      <AnimatedNavItem
        text="Entrance"
        active={activeItem === "entrance"}
        onClick={() => onItemClick("entrance")}
        isLandingPage={isLandingPage}
      />
      <AnimatedNavItem
        text="Exhibition"
        active={activeItem === "exhibition"}
        onClick={() => onItemClick("exhibition")}
        isLandingPage={isLandingPage}
      />
      <AnimatedNavItem
        text="Invitation"
        active={activeItem === "invitation"}
        onClick={() => onItemClick("invitation")}
        isLandingPage={isLandingPage}
      />
    </NavbarContainer>
  );
}

// Simple flip animation
const flipLetter = keyframes`
  0% { transform: rotateX(0deg); }
  50% { transform: rotateX(-90deg); }
  100% { transform: rotateX(0deg); }
`;

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem 0;
  background-color: ${(props) =>
    props.$isLandingPage ? "#f9f8f6" : "#111"}; // Changed to $isLandingPage
  z-index: 20;
  transition: background-color 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  @media (max-width: 525px) {
    padding: 0.5rem 0rem;
    height: 70px;
  }
`;

const StyledNavItem = styled.div`
  margin: 0 24px;
  font-family: "museo-sans", sans-serif;
  font-size: 20px;
  letter-spacing: -1%;
  line-height: 22px;
  margin-top: 22px;
  width: 92px;
  text-align: center;
  cursor: pointer;
  color: ${(props) => (props.$isLandingPage ? "#111" : "#f9f8f6")};
  border-bottom: ${(props) =>
    props.$active
      ? `2px solid ${props.$isLandingPage ? "#111111" : "#f9f8f6"}`
      : "2px solid transparent"};
  transition: border-bottom 0.3s ease, font-weight 0.3s ease;
  font-weight: ${(props) => (props.$active ? "600" : "400")};

  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 200px;
  @media (max-width: 525px) {
    margin: 32px 18px;
    font-size: 18px;
  }
`;

const Letter = styled.span`
  display: inline-block;
  min-width: 0.5em;
  text-align: center;
  transform-origin: center center;
  transition: transform 0.2s ease;

  ${(props) =>
    props.$isAnimating &&
    css`
      animation: ${flipLetter} 0.3s ease-in-out;
    `}
`;
