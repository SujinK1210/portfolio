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
          active={activeFilter === filter}
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
`;
