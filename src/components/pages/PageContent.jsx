import styled from "styled-components";
import ChevronDown from "../../assets/svg/ChevronDown";
import ChevronUp from "../../assets/svg/ChevronUp";

export default function PageContent({
  active,
  isTransitioning,
  transitionDirection,
  onArrowNavigation,
  content,
}) {
  return (
    <ContentContainer
      active={active}
      isTransitioning={isTransitioning}
      transitionDirection={transitionDirection}
    >
      {/* Navigation Arrows */}
      <NavigationArrows>
        <ArrowUp onClick={() => onArrowNavigation && onArrowNavigation("up")}>
          <ChevronUp />
        </ArrowUp>
        <ArrowDown
          onClick={() => onArrowNavigation && onArrowNavigation("down")}
        >
          <ChevronDown />
        </ArrowDown>
      </NavigationArrows>

      {/* Content */}
      <Content>
        {/* Header */}
        <ChronoHeader>
          <Title>[Chrono Archive]</Title>
          <Subtitle>Roles, places, and chapters filed in time.</Subtitle>
        </ChronoHeader>

        {content}
      </Content>
    </ContentContainer>
  );
}

const ContentContainer = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #111;
  color: #f9f8f6;
  transform: translateY(
    ${(props) => {
      if (props.active) return "0";
      if (props.isTransitioning) return "0";
      return props.transitionDirection === "up" ? "-100vh" : "100vh";
    }}
  );
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: ${(props) => (props.active ? "auto" : "none")};
  overflow: hidden;
  box-sizing: border-box;
  top: 0;
  left: 0;
  max-width: 100vw;
  max-height: 100vh;
  z-index: ${(props) => (props.active ? 10 : 1)};
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 4rem;
  margin-top: 6rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
`;

const ChronoHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h2`
  font-family: "Museo Sans", serif;
  font-size: 16px;
  font-weight: 250;
  margin: 0 0 0.2rem 0;
  letter-spacing: -2%;
  color: #f9f8f6;
`;

const Subtitle = styled.h4`
  font-family: "Museo Sans", serif;
  font-size: 16px;
  font-weight: 250;
  color: #f9f8f6;
  letter-spacing: -2%;
`;

const NavigationArrows = styled.div`
  position: absolute;
  left: 2rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 28rem;
`;

const ArrowUp = styled.div`
  font-size: 1.5rem;
  color: #666;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #f9f8f6;
  }
`;

const ArrowDown = styled.div`
  font-size: 1.5rem;
  color: #666;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #f9f8f6;
  }
`;
