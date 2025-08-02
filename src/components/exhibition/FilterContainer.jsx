import styled from "styled-components";

export default function FilterContainer({
  filters,
  activeFilter,
  onFilterChange,
}) {
  return (
    <Container>
      {filters.map((filter) => (
        <FilterButton
          key={filter}
          $active={activeFilter === filter}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </FilterButton>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 2.5rem;
  margin-top: 3rem;
  margin-bottom: 4rem;
  justify-content: center;
  align-items: center;

  @media (max-width: 1200px) {
    margin-top: 0.4rem;
  }

  @media (max-width: 800px) {
    gap: 1.2rem;
    flex-wrap: wrap;
    margin-top: 0.4rem;
  }

  @media (max-width: 524px) {
    gap: 0.8rem;
  }
`;

const FilterButton = styled.button`
  padding: 6px 20px;
  border-radius: 25px;
  border: 1px solid ${(props) => (props.active ? "#f9f8f6" : "#fff")};
  background-color: ${(props) => (props.active ? "#f9f8f6" : "transparent")};
  color: ${(props) => (props.active ? "#111" : "#f9f8f6")};
  font-family: "museo-sans", sans-serif;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 80px;
  text-align: center;

  &:hover {
    background-color: ${(props) =>
      props.active ? "#f9f8f6" : "rgba(249, 248, 246, 0.1)"};
    border-color: #f9f8f6;
  }

  @media (max-width: 800px) {
    padding: 3px 10px;
    font-size: 16px;
    letter-spacing: -1px;
    min-width: 60px;
  }

  @media (max-width: 525px) {
    padding: 3px 6px;
    font-size: 13px;
    letter-spacing: -1px;
    min-width: 40px;
  }
`;
