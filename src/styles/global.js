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
    color: ${({theme})=>theme.onWriting};
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
    color: ${({theme})=>theme.textColor}
}
.time-mode:hover{
    color: #BDF516;
    cursor: pointer;
}
.counter{
    margin-left: 9rem;
    color: ${({theme})=>theme.textColor}
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

.stats-box{
    display: flex;
    width: '1000px';
    height: 'auto';
    margin-right: 'auto';
    margin-left: 'auto';
}

.left-box{
    width: 40%;
    padding: 30px;
}
.right-box{
    width: 50%;
}
.title{
    font-size: 20px;
}
.sub-title{
    font-size: 30px;
}

.header{
    width: 1000px;
    display: flex;
    justify-content: space-between;
    marging-left: auto;
    margin-right: auto;
}
.logo{
    margin-left: 9rem;
}

.user-profile{
    width: 700px;
    margin: auto;
    display: flex;
    height: 10rem;
    background: ${({theme})=>theme.onWriting};
    border-radius: 20px;
    padding: 1rem;
    justify-content: center;
    align-item: center;
}
.user{
    display: flex;
    margin-bottom: 15px;
    font-size: 1.3rem;
    padding; 1rem;
}
.info{
    width:60%;
    padding: 1.5rem;
    margin-top: 0.8rem;
    margin-left: 1.2rem;
}
.table{
    margin: auto;
    width: 1000px;
}
.user-graph{
   width: 70%;
   margin-left: 11rem;
}

.center-of-screen{
    display: flex;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
}

.user-btn{
  margin-left: 80%;
  background: ${({theme})=>theme.textColor};
  width: 20%;
  padding: 1%;
  border-radius: 10px;
}
`