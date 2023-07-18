import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
 
*{
    box-sizing: border-box;
}

body{
    background: ${({theme})=>theme.background};
    color: white;
    margin: 0;
    padding: 0;
    transition: all 0.25s linear;
}
.canvas{
    display: grid;
    min-height: 100vh;
    grid-auto-flow: row;
    grid-template-rows: auto 1fr auto;
    gap: 0.5rem;
    padding: 2rem;
    width: 100vw;
    align-items: center;
    text-align: center;
}

.type-box{
  display: block;
  max-width: 1000px;
  height: 140px;
  margin-left: auto;
  margin-right: auto;
  overlflow: hidden;
}

.words{
    display: flex;
    flex-wrap: wrap;
    font-sixe: 32px;
    color: ${({theme})=>theme.textColor};
}

.word{
    margin: 5px;
    padding-right: 2px;
    color: ${({theme})=>theme.typeBox};
}

.hidden-input{
    opacity: 0;
}

.current{
    border-left: 1px solid;
    animation: blinking 2s infinite;
    animation-timing-function: ease;
    @keyframes blinking{
        0% {border-left-color: white;}
        25% {border-left-color: black;}
        50% {border-left-color: white;}
        100% {border-left-color: black;}
    }
}

.current-right{
    border-right: 1px solid;
    animation: blinking 2s infinite;
    animation-timing-function: ease;
    @keyframes blinking{
        0% {border-right-color: white;}
        25% {border-right-color: black;}
        50% {border-right-color: white;}
        100% {border-right-color: black;}
    }
}

.correct{
    color: green;
}
.incorrect{
    color: red;
}

.upper-menu{
    display: flex;
    width: 1000px;
    marging-left: auto;
    margin-right: auto;
    font-size: 1.3rem;
    justify-content: space-between;
    padding: 0.5rem;
}
.modes{
    display: flex;
    gap: 0.4rem;
}
.time-mode:hover{
    color: green;
    cursor: pointer;
}
.counter{
    margin-left: 9rem;
}

.footer{
    display: flex;
    justify-content: space-between;
}
.link{
    margin-right: auto;
    margin-left: auto;
}
.theme{
    margin-right: auto;
    margin-left: auto;
}

`