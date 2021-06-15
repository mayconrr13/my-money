import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --background: #1D1D1D;
    --text: #FFFFFF;
    --details: #CCCCCC;
    --green: #25995A;
    --red: #B73534;
    --yellow: #FFC727;
    --gray: #323232;
  }

  body {
    background: var(--background);
    overflow-x: hidden;
  }

  body, input, textarea, select, button, a {
    font: 400 1rem "Montserrat", sans-serif;
  }

  button {
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;
