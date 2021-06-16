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

  @media (min-width: 800px) {
    /* Works on Firefox */
  * {
      scrollbar-width: thin;
      scrollbar-color: var(--yellow) var(--gray);
    }
    /* Works on Chrome, Edge, and Safari */
    *::-webkit-scrollbar {
      width: 12px;
    }
    *::-webkit-scrollbar-track {
      background: var(--gray);
    }
    *::-webkit-scrollbar-thumb {
      background-color: var(--yellow);
      border-radius: 20px;
      border: 3px solid orange;
    }
  }

  .react-modal-overlay {
    background: #32323280;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 10000;
    display:flex;
    align-items: center;
    justify-content: center;
  }

  .ReactModal__Body--open {
    overflow: hidden;
  }

  .react-modal-content {
    width: 100%;
    margin: 0 1.5rem;
    max-width: 500px;
    background: var(--background);
    position: relative;
    outline: none;
    box-shadow: 4px 4px 4px 5px rgba(0, 0, 0, 0.2);
  }
`;
