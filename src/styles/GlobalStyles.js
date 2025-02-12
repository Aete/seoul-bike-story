import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyles = createGlobalStyle`
    ${reset}
    html, body{
        font-family: "Roboto", sans-serif;
    }

    body{
      display:flex;
      background-color:#0e0e0e;
      justify-content:center;
      width: calc(100vw - (100vw - 100%));
      margin: 0;
      scrollbar-gutter: stable;
      overflow-x: hidden;
    }

    a{
        text-decoration: none;
        color: inherit;
    }
    *{
        box-sizing: border-box;
        
    }
    input, textarea { 
      -moz-user-select: auto;
      -webkit-user-select: auto;
      -ms-user-select: auto;
      user-select: auto;
    }
    input:focus {
      outline: none;
    }

    button {
      border: none;
      background: none;
      padding: 0;
      cursor: pointer;
    }
`;
