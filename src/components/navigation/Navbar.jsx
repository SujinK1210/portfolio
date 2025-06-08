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
  margin: 0 24px;
  font-family: "Museo Sans", serif;
  font-size: 20px;
  letter-spacing: -1%;
  line-height: 22px;
  margin-top: 22px;
  width: 92px;
  text-align: center;
  cursor: pointer;
  color: ${(props) => (props.isLandingPage ? "#111" : "#f9f8f6")};
  border-bottom: ${(props) =>
    props.active
      ? `2px solid ${props.isLandingPage ? "#111111" : "#f9f8f6"}`
      : "2px solid transparent"};
  transition: border-bottom 0.3s ease, font-weight 0.3s ease;
  font-weight: ${(props) =>
    props.active ? "600" : "400"}; // Change from 500 to 600

  &:hover {
    border-bottom: 2px solid #111111;
  }
`;
