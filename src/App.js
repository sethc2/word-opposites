import { useEffect, useState, useMemo } from "react";
import logo from "./logo.svg";
import "./App.css";
import { wordList } from "./WordList";

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const getNextSet = () => {
  console.log(wordList.length);
  const next = getRandomInt(wordList.length);
  console.log(next);
  const { word, antonyms } = wordList[next];
  const antonym = antonyms[getRandomInt(antonyms.length)];
  return { word, opposite: antonym };
};

function App() {
  const [currentSet, setCurrentSet] = useState(getNextSet());

  const { word, opposite } = currentSet;

  const answers = useMemo(() => {
    const set = new Set();
    set.add(currentSet.opposite);
    while (set.size < 4) {
      set.add(getNextSet().opposite);
    }
    return Array.from(set).sort();
  }, [currentSet]);

  const [numberCorrect, setNumberCorrect] = useState(0);

  const [numberWrong, setNumberWrong] = useState(0);

  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const nextQuestion = () => {
    setCurrentSet(getNextSet());
  };

  useEffect(() => {
    if (selectedAnswer !== null) {
      setTimeout(
        () => {
          setSelectedAnswer(null);
          nextQuestion();
        },
        selectedAnswer === opposite ? 100 : 2000
      );
    }
  }, [selectedAnswer]);
  return (
    <div className="App">
      <div className="word">{word}</div>
      <div className="answers">
        {answers.map((answer) => (
          <button
            style={{
              background:
                selectedAnswer === null
                  ? "lightgrey"
                  : answer === opposite
                  ? "green"
                  : answer === selectedAnswer
                  ? "red"
                  : "lightgrey",
            }}
            onClick={() => {
              if (answer === opposite) {
                setNumberCorrect(numberCorrect + 1);
              } else {
                setNumberWrong(numberWrong + 1);
              }

              setSelectedAnswer(answer);
            }}
            key={answer}
          >
            {answer}
          </button>
        ))}
      </div>
      <div className="stats">
        <div>Number correct: {numberCorrect}</div>
        <div>Number wrong: {numberWrong}</div>
      </div>
    </div>
  );
}

export default App;
