// import React from "react";
// import { createRoot } from "react-dom/client";
// import App from "./App.jsx";

// console.log("React version:", React.version);
// console.log("React instance:", React);

// const root = createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/fonts.css";
import "./styles/index.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
