// // import styled from "styled-components";

// // export default function Navbar({
// //   activeItem,
// //   onItemClick,
// //   isLandingPage = false,
// // }) {
// //   return (
// //     <NavbarContainer isLandingPage={isLandingPage}>
// //       <NavItem
// //         active={activeItem === "entrance"}
// //         onClick={() => onItemClick("entrance")}
// //         isLandingPage={isLandingPage}
// //       >
// //         Entrance
// //       </NavItem>
// //       <NavItem
// //         active={activeItem === "exhibition"}
// //         onClick={() => onItemClick("exhibition")}
// //         isLandingPage={isLandingPage}
// //       >
// //         Exhibition
// //       </NavItem>
// //       <NavItem
// //         active={activeItem === "invitation"}
// //         onClick={() => onItemClick("invitation")}
// //         isLandingPage={isLandingPage}
// //       >
// //         Invitation
// //       </NavItem>
// //     </NavbarContainer>
// //   );
// // }

// // const NavbarContainer = styled.nav`
// //   position: fixed;
// //   top: 0;
// //   left: 0;
// //   width: 100%;
// //   display: flex;
// //   justify-content: center;
// //   align-items: center;
// //   padding: 1.5rem 0;
// //   background-color: ${(props) => (props.isLandingPage ? "#f9f8f6" : "#111")};
// //   z-index: 20;
// //   transition: background-color 0.8s cubic-bezier(0.4, 0, 0.2, 1);
// // `;

// // const NavItem = styled.div`
// //   margin: 0 24px;
// //   font-family: "Museo Sans", serif;
// //   font-size: 20px;
// //   letter-spacing: -1%;
// //   line-height: 22px;
// //   margin-top: 22px;
// //   width: 92px;
// //   text-align: center;
// //   cursor: pointer;
// //   color: ${(props) => (props.isLandingPage ? "#111" : "#f9f8f6")};
// //   border-bottom: ${(props) =>
// //     props.active
// //       ? `2px solid ${props.isLandingPage ? "#111111" : "#f9f8f6"}`
// //       : "2px solid transparent"};
// //   transition: border-bottom 0.3s ease, font-weight 0.3s ease;
// //   font-weight: ${(props) =>
// //     props.active ? "600" : "400"}; // Change from 500 to 600

// //   &:hover {
// //     border-bottom: 2px solid #111111;
// //   }
// // `;

// //

// // OLD STYLE
// // import { useRef, useState } from "react";
// // import styled, { css } from "styled-components";

// // const AnimatedNavItem = ({ text, active, onClick, isLandingPage }) => {
// //   const [letterStates, setLetterStates] = useState(
// //     text.split("").map((char) => ({
// //       char: char,
// //       originalChar: char,
// //       animationClass: "",
// //     }))
// //   );
// //   const timeoutsRef = useRef([]);

// //   const getRandomChar = () => {
// //     const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
// //     return chars.charAt(Math.floor(Math.random() * chars.length));
// //   };

// //   const clearTimeouts = () => {
// //     timeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
// //     timeoutsRef.current = [];
// //   };

// //   const handleMouseEnter = () => {
// //     clearTimeouts();
// //     const word = text;

// //     letterStates.forEach((_, index) => {
// //       const timeout1 = setTimeout(() => {
// //         // Animate out
// //         setLetterStates((prev) =>
// //           prev.map((state, i) =>
// //             i === index ? { ...state, animationClass: "animate-out" } : state
// //           )
// //         );

// //         const timeout2 = setTimeout(() => {
// //           // Remove animate-out, add animate-in, show random char
// //           setLetterStates((prev) =>
// //             prev.map((state, i) =>
// //               i === index
// //                 ? {
// //                     ...state,
// //                     animationClass: "animate-in",
// //                     char: getRandomChar(),
// //                   }
// //                 : state
// //             )
// //           );

// //           const timeout3 = setTimeout(() => {
// //             // Show correct char, remove animate-in, add final
// //             setLetterStates((prev) =>
// //               prev.map((state, i) =>
// //                 i === index
// //                   ? {
// //                       ...state,
// //                       animationClass: "final",
// //                       char: word[index],
// //                     }
// //                   : state
// //               )
// //             );

// //             const timeout4 = setTimeout(() => {
// //               // Clean final class
// //               setLetterStates((prev) =>
// //                 prev.map((state, i) =>
// //                   i === index
// //                     ? {
// //                         ...state,
// //                         animationClass: "",
// //                       }
// //                     : state
// //                 )
// //               );
// //             }, 200);

// //             timeoutsRef.current.push(timeout4);
// //           }, 100);

// //           timeoutsRef.current.push(timeout3);
// //         }, 100);

// //         timeoutsRef.current.push(timeout2);
// //       }, index * 80); // Sequential delay exactly like original

// //       timeoutsRef.current.push(timeout1);
// //     });
// //   };

// //   const handleMouseLeave = () => {
// //     clearTimeouts();
// //     // Reset to original state
// //     setLetterStates(
// //       text.split("").map((char) => ({
// //         char: char,
// //         originalChar: char,
// //         animationClass: "",
// //       }))
// //     );
// //   };

// //   return (
// //     <StyledNavItem
// //       $active={active}
// //       onClick={onClick}
// //       onMouseEnter={handleMouseEnter}
// //       onMouseLeave={handleMouseLeave}
// //       $isLandingPage={isLandingPage}
// //     >
// //       {letterStates.map((letterState, index) => (
// //         <MenuLetter
// //           key={`${text}-${index}`}
// //           $animationClass={letterState.animationClass}
// //         >
// //           {letterState.char}
// //         </MenuLetter>
// //       ))}
// //     </StyledNavItem>
// //   );
// // };

// // export default function Navbar({
// //   activeItem,
// //   onItemClick,
// //   isLandingPage = false,
// // }) {
// //   return (
// //     <NavbarContainer $isLandingPage={isLandingPage}>
// //       <AnimatedNavItem
// //         text="Entrance"
// //         active={activeItem === "entrance"}
// //         onClick={() => onItemClick("entrance")}
// //         isLandingPage={isLandingPage}
// //       />
// //       <AnimatedNavItem
// //         text="Exhibition"
// //         active={activeItem === "exhibition"}
// //         onClick={() => onItemClick("exhibition")}
// //         isLandingPage={isLandingPage}
// //       />
// //       <AnimatedNavItem
// //         text="Invitation"
// //         active={activeItem === "invitation"}
// //         onClick={() => onItemClick("invitation")}
// //         isLandingPage={isLandingPage}
// //       />
// //     </NavbarContainer>
// //   );
// // }

// // const NavbarContainer = styled.nav`
// //   position: fixed;
// //   top: 0;
// //   left: 0;
// //   width: 100%;
// //   display: flex;
// //   justify-content: center;
// //   align-items: center;
// //   padding: 1.5rem 0;
// //   background-color: ${(props) => (props.$isLandingPage ? "#f9f8f6" : "#111")};
// //   z-index: 20;
// //   transition: background-color 0.8s cubic-bezier(0.4, 0, 0.2, 1);
// // `;

// // const StyledNavItem = styled.div`
// //   margin: 0 24px;
// //   font-family: "Museo Sans", serif;
// //   font-size: 20px;
// //   letter-spacing: -1%;
// //   line-height: 22px;
// //   margin-top: 22px;
// //   width: 92px;
// //   text-align: center;
// //   cursor: pointer;
// //   color: ${(props) => (props.$isLandingPage ? "#111" : "#f9f8f6")};
// //   border-bottom: ${(props) =>
// //     props.$active
// //       ? `2px solid ${props.$isLandingPage ? "#111111" : "#f9f8f6"}`
// //       : "2px solid transparent"};
// //   transition: border-bottom 0.3s ease, font-weight 0.3s ease;
// //   font-weight: ${(props) => (props.$active ? "600" : "400")};

// //   display: flex;
// //   justify-content: center;
// //   align-items: center;
// //   gap: 2px; /* Exact gap from original CSS */
// // `;

// // const MenuLetter = styled.span`
// //   display: inline-block;
// //   transition: transform 0.4s cubic-bezier(0.5, 0, 0.2, 1), opacity 0.3s ease;
// //   transform: translateY(0);
// //   opacity: 1;

// //   /* Animate-out class - slide up and fade out */
// //   ${(props) =>
// //     props.$animationClass === "animate-out" &&
// //     css`
// //       transform: translateY(-100%);
// //       opacity: 0;
// //     `}

// //   /* Animate-in class - slide up from bottom and fade out */
// //   ${(props) =>
// //     props.$animationClass === "animate-in" &&
// //     css`
// //       transform: translateY(100%);
// //       opacity: 0;
// //     `}

// //   /* Final class - slide to center and fade in */
// //   ${(props) =>
// //     props.$animationClass === "final" &&
// //     css`
// //       transform: translateY(0);
// //       opacity: 1;
// //     `}
// // `;

// import { useRef, useState } from "react";
// import styled, { keyframes } from "styled-components";

// const AnimatedNavItem = ({ text, active, onClick, isLandingPage }) => {
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [displayText, setDisplayText] = useState(text);
//   const timeoutRef = useRef(null);

//   const getRandomChar = () => {
//     const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//     return chars.charAt(Math.floor(Math.random() * chars.length));
//   };

//   const handleMouseEnter = () => {
//     if (isAnimating) return;

//     setIsAnimating(true);
//     const originalText = text;
//     const textLength = originalText.length;
//     let animationPhases = 0;
//     const maxPhases = 5; // More flip cycles for chaotic effect

//     const animateRandomLetters = () => {
//       if (animationPhases >= maxPhases) {
//         setIsAnimating(false);
//         setDisplayText(originalText);
//         return;
//       }

//       // Create random text - flip 60-80% of letters each phase
//       const flipCount = Math.floor(textLength * (0.6 + Math.random() * 0.2));
//       const positionsToFlip = [];

//       // Select random positions to flip
//       while (positionsToFlip.length < flipCount) {
//         const randomPos = Math.floor(Math.random() * textLength);
//         if (!positionsToFlip.includes(randomPos)) {
//           positionsToFlip.push(randomPos);
//         }
//       }

//       const newText = originalText
//         .split("")
//         .map((char, index) => {
//           if (positionsToFlip.includes(index)) {
//             return getRandomChar();
//           }
//           return char;
//         })
//         .join("");

//       setDisplayText(newText);
//       animationPhases++;

//       // Random timing between phases (40-120ms)
//       const nextDelay = 40 + Math.random() * 80;
//       setTimeout(animateRandomLetters, nextDelay);
//     };

//     animateRandomLetters();
//   };

//   const handleMouseLeave = () => {
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }
//     setIsAnimating(false);
//     setDisplayText(text);
//   };

//   return (
//     <StyledNavItem
//       active={active}
//       onClick={onClick}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//       isLandingPage={isLandingPage}
//       isAnimating={isAnimating}
//     >
//       {displayText.split("").map((char, index) => (
//         <Letter key={`${text}-${index}`}>{char}</Letter>
//       ))}
//     </StyledNavItem>
//   );
// };

// export default function Navbar({
//   activeItem,
//   onItemClick,
//   isLandingPage = false,
// }) {
//   return (
//     <NavbarContainer isLandingPage={isLandingPage}>
//       <AnimatedNavItem
//         text="Entrance"
//         active={activeItem === "entrance"}
//         onClick={() => onItemClick("entrance")}
//         isLandingPage={isLandingPage}
//       />
//       <AnimatedNavItem
//         text="Exhibition"
//         active={activeItem === "exhibition"}
//         onClick={() => onItemClick("exhibition")}
//         isLandingPage={isLandingPage}
//       />
//       <AnimatedNavItem
//         text="Invitation"
//         active={activeItem === "invitation"}
//         onClick={() => onItemClick("invitation")}
//         isLandingPage={isLandingPage}
//       />
//     </NavbarContainer>
//   );
// }

// // Simple flip animation
// const flipLetter = keyframes`
//   0% { transform: rotateX(0deg); }
//   50% { transform: rotateX(-90deg); }
//   100% { transform: rotateX(0deg); }
// `;

// const NavbarContainer = styled.nav`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 1.5rem 0;
//   background-color: ${(props) => (props.isLandingPage ? "#f9f8f6" : "#111")};
//   z-index: 20;
//   transition: background-color 0.8s cubic-bezier(0.4, 0, 0.2, 1);
// `;

// const StyledNavItem = styled.div`
//   margin: 0 24px;
//   font-family: "Museo Sans", serif;
//   font-size: 20px;
//   letter-spacing: -1%;
//   line-height: 22px;
//   margin-top: 22px;
//   width: 92px;
//   text-align: center;
//   cursor: pointer;
//   color: ${(props) => (props.isLandingPage ? "#111" : "#f9f8f6")};
//   border-bottom: ${(props) =>
//     props.active
//       ? `2px solid ${props.isLandingPage ? "#111111" : "#f9f8f6"}`
//       : "2px solid transparent"};
//   transition: border-bottom 0.3s ease, font-weight 0.3s ease;
//   font-weight: ${(props) => (props.active ? "600" : "400")};

//   display: flex;
//   justify-content: center;
//   align-items: center;
//   perspective: 200px;
// `;

// const Letter = styled.span`
//   display: inline-block;
//   min-width: 0.5em;
//   text-align: center;
//   transform-origin: center center;
//   transition: transform 0.2s ease;
//   border: 1px solid
//     ${(props) =>
//       props.isLandingPage
//         ? "rgba(17, 17, 17, 0.3)"
//         : "rgba(249, 248, 246, 0.3)"};
//   padding: 2px 3px;
//   margin: 0 1px;

//   &:hover {
//     animation: ${flipLetter} 0.3s ease-in-out;
//   }
// `;

import { useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

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
      active={active}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      isLandingPage={isLandingPage}
      isAnimating={isAnimating}
    >
      {displayText.split("").map((char, index) => (
        <Letter key={`${text}-${index}`}>{char}</Letter>
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
    <NavbarContainer isLandingPage={isLandingPage}>
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
  background-color: ${(props) => (props.isLandingPage ? "#f9f8f6" : "#111")};
  z-index: 20;
  transition: background-color 0.8s cubic-bezier(0.4, 0, 0.2, 1);
`;

const StyledNavItem = styled.div`
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
  font-weight: ${(props) => (props.active ? "600" : "400")};

  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 200px;
`;

const Letter = styled.span`
  display: inline-block;
  min-width: 0.5em;
  text-align: center;
  transform-origin: center center;
  transition: transform 0.2s ease;

  ${(props) =>
    props.isAnimating &&
    `
    animation: ${flipLetter} 0.3s ease-in-out;
  `}
`;
