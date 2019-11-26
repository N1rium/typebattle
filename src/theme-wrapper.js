import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  * {
    box-sizing: border-box;
    user-select: none;
  }

  :root {
    --green: #2ECC40;
    --red: #FF4136;
    --blue: #0074D9;
    --yellow: #FFDC00;
  }

  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: 'Bungee', cursive;
    background-color: #1B1A1A;
    color: white;
  }

  #app-container {
    width: 100%;
    height: 100%;
  }
`;

export default ({ children }) => {
  const theme = {};
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};
