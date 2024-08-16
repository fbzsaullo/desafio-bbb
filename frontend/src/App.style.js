import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
:root {
  font-family: 'Inter', sans-serif;
  background-color: #F2F4FC;
}

body {
  margin: 0;
  padding: 0;
}

* {
  margin: 0;
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

h4 {
  font-size: 28px;
  font-weight: bold;
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

  h4 {
    font-size: 24px;
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

  h4 {
    font-size: 22px;
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

  h4 {
    font-size: 20px;
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

  h4 {
    font-size: 18px;
  }
}
`;

export default GlobalStyle;
