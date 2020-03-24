import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';
// import 'react-perfect-scrollbar/dist/css/styles.css';

import colors from './colors';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    outline: 0;
    padding: 0;
  }

  *:focus {
    outline: 0;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased !important;
    background-color: ${colors.white};
  }

  body, input, button {
    color: #666;
    font-family: 'Roboto', Arial, Helvetica, sans-serif;
    font-size: 14px;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }
`;
