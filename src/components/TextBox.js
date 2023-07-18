import React, { createRef, useEffect, useMemo, useRef, useState } from "react";
import { generate } from "random-words";
import CountDown from "./CountDown";
import { useContextApi } from "../context/ContextApi";

const TextBox = () => {
  const [words, setWords] = useState([]);
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

  const [keyDownE, setKeyDownE] = useState(null);

  const countFnc = () => {

    const timer = () => {
      setCountDown((latestCountDown) => {
        if (latestCountDown === 1) {
          setTestEnded(true)
          setTestStarted(false);
          clearInterval(timerId)
          setIntervalId(null)
          setCountDown(testTime)
          setCurrentChar(0);
          setCurrentWord(0)
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
        if (allCurrChar.length <= currentChar) {
          //remove cursor from last place of the word
          allCurrChar[currentChar - 1].classList.remove('current-right')
        }
        else {
          //remove cursor from middle place of the word
          allCurrChar[currentChar].classList.remove('current')
        }
        wordsSpanRef[currentWord + 1].current.childNodes[0].className = 'current';
        setCurrentWord(currentWord + 1);
        setCurrentChar(0)
        return;
      }

      if (allCurrChar.length === currentChar) {
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

          allCurrChar[currentChar].className = 'correct';
        } else {

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
    if(testStarted) startFn(keyDownE)
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
    wordsSpanRef.map((i) => 
      Array.from(i.current.childNodes).map((j) =>
        j.className = '')
    )
    // wordsSpanRef[0].current.childNodes[0].className = 'current'

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
      {testEnded ? <h1>Test Ended</h1> : (<div className="type-box" onClick={handleInput}>
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
      />
    </div>

  );
};

export default TextBox