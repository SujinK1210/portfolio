import styled from "styled-components";

export default function SplitImageContainer({
  topImage,
  bottomImage,
  hoverContent,
}) {
  return (
    <Container>
      <SplitImageWrapper>
        <ImageHalf className="top-half">
          <img src={topImage.src} alt={topImage.alt} />
        </ImageHalf>
        <ImageHalf className="bottom-half">
          <img src={bottomImage.src} alt={bottomImage.alt} />
        </ImageHalf>
        <HoverText className="hover-text">
          <Definition>
            <Pronunciation>{hoverContent.title}</Pronunciation>
            <PhoneticGuide>{hoverContent.phonetic}</PhoneticGuide>
            <Description>{hoverContent.description}</Description>
            <Example>{hoverContent.example}</Example>
          </Definition>
        </HoverText>
      </SplitImageWrapper>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 240px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 480px;
  max-width: 1140px;
  cursor: pointer;
`;

const SplitImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 8px;

  &:hover .top-half {
    transform: translateY(-110px);
  }

  &:hover .bottom-half {
    transform: translateY(110px);
  }

  &:hover .hover-text {
    opacity: 1;
    visibility: visible;
  }
`;

const ImageHalf = styled.div`
  position: absolute;
  width: 100%;
  height: 50%;
  overflow: hidden;
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  z-index: 120;

  &.top-half {
    bottom: 142px;
    left: 0;
  }

  &.bottom-half {
    top: 140.1px;
    left: 0;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const HoverText = styled.div`
  position: absolute;
  top: 114px;
  left: 50%;
  transform: translateX(-50%);
  color: #f9f8f6;
  text-align: left;
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  z-index: 10;
  background-color: rgba(17, 17, 17, 0.95);
  padding: 2.5rem;
  border-radius: 8px;
  backdrop-filter: blur(10px);
  max-width: 1400px;
  width: 1080px;
`;

const Definition = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Pronunciation = styled.h2`
  font-family: "museo-sans", sans-serif;
  font-size: 42px;
  font-weight: 900;
  color: #f9f8f6;
  margin: 0;
  line-height: 1;
  letter-spacing: -0.2%;
`;

const PhoneticGuide = styled.p`
  font-family: "museo-sans", sans-serif;
  font-size: 24px;
  font-weight: 300;
  color: #f9f8f6;
  margin: 0 0 1rem 0;
  opacity: 0.8;
  line-height: 1;
  letter-spacing: -0.2%;
`;

const Description = styled.p`
  font-family: "museo-sans", sans-serif;
  font-size: 20px;
  font-weight: 400;
  color: #f9f8f6;
  margin: 0 0 1rem 0;
  line-height: 1;
  letter-spacing: -0.2%;
`;

const Example = styled.p`
  font-family: "museo-sans", sans-serif;
  font-size: 18px;
  font-weight: 300;
  font-style: italic;
  color: #f9f8f6;
  margin: 0;
  opacity: 0.9;
  line-height: 1;
`;
