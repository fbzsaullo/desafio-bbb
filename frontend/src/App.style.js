import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
:root {
  font-family: 'Inter', sans-serif;
  background-color: #F2F4FC;
}

h1 {
  font-size: 48px;
}

h2 {
  font-size: 24px;
}

h3 {
  font-size: 20px;
  font-weight: lighter;
}
`;

export default GlobalStyle;