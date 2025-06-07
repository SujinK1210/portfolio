import styled from "styled-components";

export default function Navbar({
  activeItem,
  onItemClick,
  isLandingPage = false,
}) {
  return (
    <NavbarContainer isLandingPage={isLandingPage}>
      <NavItem
        active={activeItem === "entrance"}
        onClick={() => onItemClick("entrance")}
        isLandingPage={isLandingPage}
      >
        Entrance
      </NavItem>
      <NavItem
        active={activeItem === "exhibition"}
        onClick={() => onItemClick("exhibition")}
        isLandingPage={isLandingPage}
      >
        Exhibition
      </NavItem>
      <NavItem
        active={activeItem === "invitation"}
        onClick={() => onItemClick("invitation")}
        isLandingPage={isLandingPage}
      >
        Invitation
      </NavItem>
    </NavbarContainer>
  );
}

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem 0;
  background-color: ${(props) => (props.isLandingPage ? "#f9f8f6" : "#111")};
  z-index: 20;
  transition: background-color 0.8s cubic-bezier(0.4, 0, 0.2, 1);
`;

const NavItem = styled.div`
  margin: 0 1.5rem;
  font-family: "Inter", sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  padding-bottom: 0.5rem;
  color: ${(props) => (props.isLandingPage ? "#111" : "#f9f8f6")};
  border-bottom: ${(props) => {
    if (props.active) {
      return props.isLandingPage ? "1px solid #111" : "1px solid #f9f8f6";
    }
    return "1px solid transparent";
  }};
  transition: all 0.3s ease;
  font-weight: ${(props) => (props.active ? "500" : "400")};

  &:hover {
    border-bottom: ${(props) =>
      props.isLandingPage ? "1px solid #111" : "1px solid #f9f8f6"};
  }
`;
