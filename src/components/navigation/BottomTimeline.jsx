import styled from "styled-components";

export default function BottomTimeline({ activeYear = "2024", onYearClick }) {
  const years = [
    "1991",
    "2005",
    "2011",
    "2014",
    "2017",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
    "2024",
    "2025",
  ];

  return (
    <TimelineContainer>
      <LeftDottedLine />
      <ContinuousLine />
      <RightDottedLine />

      {years.map((year) => (
        <YearContainer key={year}>
          <TimelineDot
            active={year === activeYear}
            onClick={() => onYearClick && onYearClick(year)}
          />
          <TimelineYear
            active={year === activeYear}
            onClick={() => onYearClick && onYearClick(year)}
          >
            {year}
          </TimelineYear>
        </YearContainer>
      ))}
    </TimelineContainer>
  );
}

const TimelineContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 2.5rem;
  padding: 2rem 0;
  margin-top: auto;
  width: 80;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
`;

const LeftDottedLine = styled.div`
  position: absolute;
  top: 2.4rem;
  left: -80px;
  width: 100px;
  height: 1px;
  background-image: repeating-linear-gradient(
    to right,
    #666 0px,
    #666 4px,
    transparent 3px,
    transparent 9px
  );
  z-index: 1;
`;

const ContinuousLine = styled.div`
  position: absolute;
  top: 2.4rem;
  left: 0;
  right: 0;
  height: 1px;
  background-color: #f9f8f6;
  z-index: 1;
`;

const RightDottedLine = styled.div`
  position: absolute;
  top: 2.4rem;
  right: -80px;
  width: 100px;
  height: 2px;
  background-image: repeating-linear-gradient(
    to right,
    #666 0px,
    #666 4px,
    transparent 3px,
    transparent 9px
  );
  z-index: 1;
`;

const YearContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  z-index: 2;
`;

const TimelineDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? "#FFF4B7" : "#f9f8f6")};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  /* Lamppost effect - illuminates both dot and year below */
  ${(props) =>
    props.active &&
    `
    box-shadow: 
      /* Tight glow around dot */
      0 0 8px #FFF4B7,
      0 0 16px #FFF4B7,
      /* Lamppost cone effect downward */
      0 10px 30px rgba(255, 224, 138, 0.4),
      0 20px 40px rgba(255, 224, 138, 0.2),
      0 30px 50px rgba(255, 224, 138, 0.1);
  `}

  &:hover {
    background-color: #fff4b7;
    box-shadow: 0 0 6px #fff4b7, 0 0 12px #fff4b7,
      0 8px 20px rgba(255, 224, 138, 0.3), 0 15px 30px rgba(255, 224, 138, 0.15);
  }
`;

const TimelineYear = styled.div`
  font-family: "PP Editorial New", serif;
  font-size: 0.9rem;
  font-weight: 300;
  color: ${(props) => (props.active ? "#FFF4B7" : "#f9f8f6")};
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  font-style: italic;

  /* Illuminated text effect when active */
  ${(props) =>
    props.active &&
    `
    text-shadow: 
      0 0 5px rgba(255, 224, 138, 0.8),
      0 0 10px rgba(255, 224, 138, 0.4);
  `}

  &:hover {
    color: #fff4b7;
    text-shadow: 0 0 4px rgba(255, 224, 138, 0.6),
      0 0 8px rgba(255, 224, 138, 0.3);
  }
`;
