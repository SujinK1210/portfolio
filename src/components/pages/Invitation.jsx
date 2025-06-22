import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import dog01 from "../../assets/dogs/dog_01.png";
import dog02 from "../../assets/dogs/dog_02.png";
import dog03 from "../../assets/dogs/dog_03.png";
import dog04 from "../../assets/dogs/dog_04.png";
import dog05 from "../../assets/dogs/dog_05.png";
import dog06 from "../../assets/dogs/dog_06.png";
import dog07 from "../../assets/dogs/dog_07.png";
import Navbar from "../navigation/Navbar";

export default function Invitation({
  active,
  isTransitioning,
  onNavbarNavigation,
}) {
  const [animationStarted, setAnimationStarted] = useState(false);
  const [currentDogCursor, setCurrentDogCursor] = useState(null);

  // Start animation when component becomes active
  useEffect(() => {
    if (active && !animationStarted) {
      setAnimationStarted(true);
    }
  }, [active, animationStarted]);

  // Dog cursor images
  const dogCursors = [dog01, dog02, dog03, dog04, dog05, dog06, dog07];

  const handleDogLinkHover = () => {
    // Only change cursor on desktop
    if (window.innerWidth > 768) {
      const randomIndex = Math.floor(Math.random() * dogCursors.length);
      // Add size constraint and hotspot coordinates for cursor
      setCurrentDogCursor(`url(${dogCursors[randomIndex]}) 16 16, pointer`);
    }
  };

  const handleDogLinkLeave = () => {
    setCurrentDogCursor(null);
  };

  const handleDogLinkClick = () => {
    window.open("https://www.instagram.com/sultangthehappydog/", "_blank");
  };

  return (
    <InvitationContainer active={active} isTransitioning={isTransitioning}>
      <Navbar
        activeItem="invitation"
        onItemClick={onNavbarNavigation}
        isLandingPage={false}
      />

      <Content>
        <CardsContainer>
          {/* Contact Form Card */}
          <FormCard className={animationStarted ? "animate" : ""} delay="0s">
            <FormCardContent>
              <FormContainer>
                <InputGroup>
                  <FormStyledInputName type="text" placeholder="Name" />
                </InputGroup>
                <InputGroup>
                  <FormStyledInput type="text" placeholder="Phone number" />
                </InputGroup>
                <InputGroup>
                  <FormStyledInput type="email" placeholder="E-mail" />
                </InputGroup>
                <InputGroup>
                  <FormStyledTextarea placeholder="Note" rows="4" />
                </InputGroup>
              </FormContainer>
            </FormCardContent>
          </FormCard>

          <BusinessCard
            className={animationStarted ? "animate" : ""}
            delay="0.3s"
          >
            <BusinessCardContent>
              <LogoDesign>
                <RotatedEllipse />
                <LogoText>
                  <LogoLine>Leave</LogoLine>
                  <LogoLine>a Note</LogoLine>
                </LogoText>
              </LogoDesign>
            </BusinessCardContent>
          </BusinessCard>
        </CardsContainer>

        <DogLink
          onClick={handleDogLinkClick}
          onMouseEnter={handleDogLinkHover}
          onMouseLeave={handleDogLinkLeave}
          style={{ cursor: currentDogCursor || "pointer" }}
        >
          Do you wanna see a REALLY cute dog?
        </DogLink>
      </Content>
    </InvitationContainer>
  );
}

// Card entrance animations
const cardEntrance1 = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.85) rotateX(15deg) translateY(-20px) rotateZ(-2deg);
    filter: blur(4px);
  }
  40% {
    opacity: 0.6;
    transform: scale(1.08) rotateX(-8deg) translateY(-12px) rotateZ(-15deg);
    filter: blur(3px);
  }
  70% {
    opacity: 0.9;
    transform: scale(0.95) rotateX(3deg) translateY(5px) rotateZ(12deg);
    filter: blur(1px);
  }
  85% {
    opacity: 1;
    transform: scale(1.02) rotateX(-1deg) translateY(-2px) rotateZ(-2deg);
    filter: blur(0.5px);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotateX(0deg) translateY(0px) rotateZ(-6deg);
    filter: blur(0px);
  }
`;

const cardEntrance2 = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.8) rotateX(20deg) translateY(-30px) rotateZ(3deg);
    filter: blur(5px);
  }
  35% {
    opacity: 0.5;
    transform: scale(1.12) rotateX(-10deg) translateY(-15px) rotateZ(18deg);
    filter: blur(4px);
  }
  65% {
    opacity: 0.8;
    transform: scale(0.92) rotateX(5deg) translateY(8px) rotateZ(-8deg);
    filter: blur(2px);
  }
  80% {
    opacity: 0.95;
    transform: scale(1.03) rotateX(-2deg) translateY(-3px) rotateZ(10deg);
    filter: blur(1px);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotateX(0deg) translateY(0px) rotateZ(7deg);
    filter: blur(0px);
  }
`;

const InvitationContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #111;
  color: #f9f8f6;
  opacity: ${(props) => (props.active ? 1 : 0)};
  visibility: ${(props) => (props.active ? "visible" : "hidden")};
  transition: opacity 0.8s ease, visibility 0.8s ease;
  pointer-events: ${(props) => (props.active ? "auto" : "none")};
  overflow: hidden;
  z-index: ${(props) => (props.active ? 10 : 5)};
`;

const Content = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 2rem 4rem 2rem;
  position: relative;
`;

const CardsContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1400px;
  height: 600px;
  perspective: 1000px;
`;

const BaseCard = styled.div`
  position: absolute;
  width: 450px;
  height: fit-content;
  min-height: 340px;
  opacity: 0;
  transform: scale(0.85) rotateX(15deg) translateY(-20px);
  filter: blur(4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);

  &.animate {
    animation-fill-mode: forwards;
    animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
`;

const FormCard = styled(BaseCard)`
  top: 35%;
  left: 20%;
  background-color: #111;
  border: 1px solid #fff;
  transform-origin: center bottom;
  animation-delay: ${(props) => props.delay};
  z-index: 2;

  &.animate {
    animation: ${cardEntrance1} 1.2s forwards;
  }
`;

const BusinessCard = styled(BaseCard)`
  top: 30%;
  right: 25%;
  background-color: #f9f8f6;
  transform-origin: center bottom;
  animation-delay: ${(props) => props.delay};
  z-index: 1;

  &.animate {
    animation: ${cardEntrance2} 1.4s forwards;
  }
`;

const CardContent = styled.div`
  padding: 1rem 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const FormCardContent = styled(CardContent)`
  color: #f9f8f6;
`;

const BusinessCardContent = styled(CardContent)`
  color: #111;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex: 1;
`;

const InputGroup = styled.div`
  position: relative;
`;

const FormStyledInputName = styled.input`
  font-family: "museo-sans", sans-serif;
  font-size: 36px;
  font-weight: 900;
  width: 400px;
  border: none;
  font-style: italic;
  color: #fff;
  letter-spacing: -0.02em;
  outline: none;
  transition: all 0.3s ease;
  background: transparent;

  &::placeholder {
    color: #fff;
    transition: color 0.3s ease;
  }

  &:hover,
  &:focus {
    box-shadow: 0 2px 4px rgba(255, 255, 255, 0.2);

    &::placeholder {
      color: #fff;
    }
  }
`;
const FormStyledInput = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1px solid #f9f8f6;
  padding: 12px 6px;
  font-family: "museo-sans", sans-serif;
  font-size: 16px;
  color: #f9f8f6;
  outline: none;
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(249, 248, 246, 0.6);
    transition: color 0.3s ease;
  }

  &:hover,
  &:focus {
    border-bottom: 2px solid #fff;
    box-shadow: 0 2px 4px rgba(255, 255, 255, 0.2);

    &::placeholder {
      color: rgba(249, 248, 246, 0.8);
    }
  }
`;

const FormStyledTextarea = styled.textarea`
  width: 100%;
  background: transparent;
  border: none;
  border: 1px solid #f9f8f6;
  padding: 12px 6px;
  font-family: "museo-sans", sans-serif;
  font-size: 16px;
  color: #f9f8f6;
  outline: none;
  resize: none;
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(249, 248, 246, 0.6);
    transition: color 0.3s ease;
  }

  &:hover,
  &:focus {
    border-bottom: 2px solid #fff;
    box-shadow: 0 2px 4px rgba(255, 255, 255, 0.2);

    &::placeholder {
      color: rgba(249, 248, 246, 0.8);
    }
  }
`;

const DogLink = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  font-family: "museo-sans", sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #f9f8f6;
  cursor: pointer;
  transition: color 0.3s ease;
  user-select: none;

  &:hover {
    color: #ccc;
  }

  @media (max-width: 768px) {
    cursor: pointer !important;
  }
`;

const LogoDesign = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RotatedEllipse = styled.div`
  position: absolute;
  width: 280px;
  height: 120px;
  top: 6rem;
  left: 6rem;
  background-color: #111;
  border-radius: 50%;
  transform: rotate(1deg);
  z-index: 1;
`;

const LogoText = styled.div`
  position: relative;
  z-index: 2;
  color: white;
  font-family: "PP Editorial New", serif;
  font-weight: 800;
  font-style: italic;
  text-transform: uppercase;
  font-size: 24px;
  letter-spacing: 2px;
  top: 7.6rem;
  left: 0;
  transform: rotate(-1deg);
  text-align: center;
  line-height: 1.2;
`;

const LogoLine = styled.div`
  display: block;
`;
