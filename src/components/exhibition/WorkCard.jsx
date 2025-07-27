import styled from "styled-components";

export default function WorkCard({ project, onClick }) {
  return (
    <Card onClick={onClick}>
      <ImageContainer>
        <img
          src={`src/assets/exhibition/${project.image}`}
          alt={project.title}
          onError={(e) => {
            e.target.src =
              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMzMzIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiPlBsYWNlaG9sZGVyIEltYWdlPC90ZXh0Pgo8L3N2Zz4K";
          }}
        />
        <SeeMoreText className="see-more-text">See more</SeeMoreText>
      </ImageContainer>
      <ContentContainer>
        <Title>
          {project.title}
          <Date>{project.date}</Date>
        </Title>

        <ToolsContainer>
          {project.tools.map((tool, index) => (
            <Tool key={index}>{tool}</Tool>
          ))}
        </ToolsContainer>
        <Description>{project.description}</Description>
      </ContentContainer>
    </Card>
  );
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: transparent;
  overflow: hidden;
  transition: transform 0.3s ease;
  cursor: pointer;
  width: 100%;
  max-width: 652px;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 69.79%; /* Aspect ratio 652:455 = 69.79% */
  overflow: hidden;
  margin-bottom: 13px;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.1);
    filter: blur(2px);
  }

  &:hover::after {
    opacity: 1;
  }

  &:hover .see-more-text {
    opacity: 1;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
`;

const SeeMoreText = styled.div`
  position: absolute;
  top: 42%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #f9f8f6;
  font-family: "museo-sans", sans-serif;
  font-size: 1.25vw; /* ~18px at 1440px width */
  font-weight: 600;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 2;
  text-align: center;

  @media (max-width: 980px) {
    font-size: 16px; /* Fixed size for smaller screens */
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const ContentContainer = styled.div`
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-family: "museo-sans", sans-serif;
  font-size: 26px;
  font-weight: 600;
  width: 100%;
  font-style: italic;
  color: #f9f8f6;
  margin: 0;
  line-height: 1.2;
  letter-spacing: -2.5%;

  @media (max-width: 980px) {
    font-size: 20px; /* Fixed size for smaller screens */
  }

  @media (max-width: 768px) {
    font-size: 18px;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }

  @media (max-width: 525px) {
    font-size: 16px;
  }
`;

const Date = styled.p`
  font-family: "museo-sans", sans-serif;
  font-size: 26px;
  font-weight: 100;
  color: #f9f8f6;
  margin-left: 1rem;
  letter-spacing: -2.5%;

  @media (max-width: 980px) {
    font-size: 18px; /* Fixed size for smaller screens */
  }

  @media (max-width: 768px) {
    font-size: 16px;
    margin-left: 0;
  }

  @media (max-width: 525px) {
    font-size: 14px;
  }
`;

const ToolsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0.5rem 0;
`;

const Tool = styled.span`
  font-family: "museo-sans", sans-serif;
  font-size: 20px;
  font-weight: 200;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: -0%;

  @media (max-width: 980px) {
    font-size: 16px; /* Fixed size for smaller screens */
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 525px) {
    font-size: 12px;
  }
`;

const Description = styled.p`
  font-family: "museo-sans", sans-serif;
  font-size: 20px;
  font-weight: 300;
  color: #ccc;
  margin: 0;
  line-height: 1.5;
  letter-spacing: -2.5%;

  @media (max-width: 980px) {
    font-size: 14px;
  }

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 525px) {
    font-size: 12px;
  }
`;
