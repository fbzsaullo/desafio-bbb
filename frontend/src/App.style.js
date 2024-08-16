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

@media (max-width: 1200px) {
  h1 {
    font-size: 40px;
  }

  h2 {
    font-size: 22px;
  }

  h3 {
    font-size: 18px;
  }
}

@media (max-width: 992px) {
  h1 {
    font-size: 36px;
  }

  h2 {
    font-size: 20px;
  }

  h3 {
    font-size: 16px;
  }
}

@media (max-width: 768px) {
  h1 {
    font-size: 32px;
  }

  h2 {
    font-size: 18px;
  }

  h3 {
    font-size: 14px;
  }
}

@media (max-width: 576px) {
  h1 {
    font-size: 28px;
  }

  h2 {
    font-size: 16px;
  }

  h3 {
    font-size: 12px;
  }
}
`;

export default GlobalStyle;
