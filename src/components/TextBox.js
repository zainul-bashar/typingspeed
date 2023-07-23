import React, { createRef, useEffect, useMemo, useRef, useState } from "react";
import { generate } from "random-words";
import CountDown from "./CountDown";
import { useContextApi } from "../context/ContextApi";
import Stats from "./Stats";

const TextBox = () => {
  const [words, setWords] = useState([]);
  const [disabled,setDisabled]=useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setWords(generate(50));
  }, []);

  const wordsSpanRef = useMemo(() => {
    return Array(words.length)
      .fill(0)
      .map(() => createRef(null));
  }, [words]);

  const [currentWord, setCurrentWord] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const { testTime } = useContextApi();
  const [countdown, setCountDown] = useState(testTime);
  const [testStarted, setTestStarted] = useState(false);
  const [testEnded, setTestEnded] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [correctChars, setCorrectChars] = useState(0);
  const [incorreactChars, setIncorrectChars] = useState(0);
  const [missedChars, setMissedChars] = useState(0);
  const [extraChars, setExtraChars] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const [graphData, setGraphData] = useState([]);
  const [keyDownE, setKeyDownE] = useState(null);

  const countFnc = () => {

    const timer = () => {
      setCountDown((latestCountDown) => {
        setCorrectChars((correctChars)=>{
          setGraphData((graphData)=>{
            return [...graphData,[
              testTime - latestCountDown + 1,
              (correctChars/5)/((testTime-latestCountDown+1)/60)
            ]
            ]
          })
          return correctChars;
        })
        if (latestCountDown === 1) {
          setTestEnded(true)
          setTestStarted(false);
          clearInterval(timerId)
          setIntervalId(null)
          setCountDown(testTime)
          setCurrentChar(0);
        }
        return latestCountDown - 1
      })
    }
    let timerId = setInterval(timer, 1000)
    setIntervalId(timerId)
  }

  const startFn = (e) => {
    const allCurrChar = wordsSpanRef[currentWord].current.childNodes;

    if (wordsSpanRef[currentWord + 1].current.childNodes[0]) {
      if (e.keyCode === 8) {
        if (currentChar !== 0) {
          if (allCurrChar.length === currentChar) {
            if (allCurrChar[currentChar - 1].className.includes('extra')) {
              allCurrChar[currentChar - 1].remove();
              allCurrChar[currentChar - 2].className += ' current-right';

            }
            else {
              allCurrChar[currentChar - 1].className = 'current'
            }
            setCurrentChar(currentChar - 1);
            return;
          }
          allCurrChar[currentChar].className = '';
          allCurrChar[currentChar - 1].className = 'current';
          setCurrentChar(currentChar - 1);
        }
        return;
      }
      if (e.keyCode === 32) {

        let correctCharsInWord = wordsSpanRef[currentWord].current.querySelectorAll('.correct');
        if(correctCharsInWord.length === allCurrChar.length){
          setCorrectWords(correctWords + 1)
        }

        if (allCurrChar.length <= currentChar) {
          //remove cursor from last place of the word
          allCurrChar[currentChar - 1].classList.remove('current-right')
        }
        else {
          //remove cursor from middle place of the word
          setMissedChars(missedChars + (allCurrChar.length - currentChar))
          allCurrChar[currentChar].classList.remove('current')
        }
        wordsSpanRef[currentWord + 1].current.childNodes[0].className = 'current';
        setCurrentWord(currentWord + 1);
        setCurrentChar(0)
        return;
      }

      if (allCurrChar.length === currentChar) {
        setExtraChars(extraChars + 1);
        let newSpan = document.createElement('span')
        newSpan.innerText = e.key;
        newSpan.className = 'incorrect extra current-right'
        allCurrChar[currentChar - 1].classList.remove('current-right')
        wordsSpanRef[currentWord].current.append(newSpan)
        setCurrentChar(currentChar + 1);
        return;
      }

      if (allCurrChar[currentChar]) {
        if (e.key === allCurrChar[currentChar].innerText) {
             setCorrectChars(correctChars + 1)
          allCurrChar[currentChar].className = 'correct';
        } else {
             setIncorrectChars(incorreactChars + 1)
          allCurrChar[currentChar].className = 'incorrect';
        }

        if (currentChar + 1 === allCurrChar.length) {

          allCurrChar[currentChar].className += ' current-right';
          // setCurrentWord(currentWord+1);
          // setCurrentChar(0);
        }
        else {
          if (allCurrChar[currentChar + 1])
            allCurrChar[currentChar + 1].className = "current";
        }

        setCurrentChar(currentChar + 1);
      }

    }
  }

  // useEffect(() => {
  //   console.log(intervalId)
  // }, [intervalId])

  const takeData = (e) => {
    if (!testStarted) {
      setKeyDownE(e);
      countFnc();
      setTestEnded(false);
      setTestStarted(true)
    } else {
      startFn(e);
    }
    // console.log(wordsSpanRef, currentWord);
  };

  useEffect(() => {
    if(testStarted) {
      startFn(keyDownE);
    setCurrentWord(0);
    }
  }, [testStarted])

  const handleInput = () => {
    inputRef.current.focus();
  };

  useEffect(() => {
    handleInput();

    if (wordsSpanRef.length > 0 && wordsSpanRef[0].current) {
      wordsSpanRef[0].current.childNodes[0].className = "current";
    }
  }, [wordsSpanRef]);

  useEffect(() => {
    reset();
  }, [testTime])

  const resetWordSpanRef = () => {
    wordsSpanRef.map((i) => {
if(i?.current?.childNodes){
  return  Array.from(i.current.childNodes).map((j) =>
  j.className = '')
}})
  
     
    // wordsSpanRef[0].current.childNodes[0].className = 'current'

  }

  const calculateWPM = () => {
    return Math.round((correctChars/5)/(testTime/60));
  }
  const calculateAcc = () => {
    
    return Math.round((correctWords/currentWord)*100);
   
  }

  const reset = () => {
    clearInterval(intervalId);
    setCountDown(testTime)
    setCurrentWord(0)
    setCurrentChar(0)
    setTestStarted(false)
    setTestEnded(false)
    setWords(generate(50))
    resetWordSpanRef()
    handleInput()
  }

  return (
    <div>
      <CountDown count={countdown} />
      {testEnded ? <Stats
      wpm = {calculateWPM()}
       accuracy = {calculateAcc()} 
       correctChars = {correctChars} 
       incorreactChars = {incorreactChars}
       missedChars = {missedChars}
       extraChars = {extraChars}
       graphData = {graphData}/> : (<div className="type-box" onClick={handleInput}>
        <div className="words">
          {words.map((word, index) => (
            <span className="word" ref={wordsSpanRef[index]} key={index}>
              {word.split("").map((char, charIndex) => (
                <span key={charIndex}>{char}</span>
              ))}
            </span>
          ))}
        </div>
      </div>)}
      <input
        type="text"
        onKeyDown={takeData}
        className="hidden-input"
        ref={inputRef}
        disabled={testEnded}
      />
    </div>

  );
};

export default TextBox