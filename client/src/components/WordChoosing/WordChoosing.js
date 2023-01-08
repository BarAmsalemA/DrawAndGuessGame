import { useEffect, useState } from "react";

import Button from "@mui/material/Button";

import "./WordChoosing.css";

var randomWords = require("random-words");

const WordChoosing = ({ onWordChosen }) => {
  const [words, setWords] = useState([]);

  useEffect(() => {
    const easy = randomWords({ exactly: 1, minLength: 2, maxLength: 3 })[0];
    const medium = randomWords({ exactly: 1, minLength: 4, maxLength: 5 })[0];
    const hard = randomWords({ exactly: 1, minLength: 6, maxLength: 7 })[0];
    setWords([easy, medium, hard]);
  }, []);

  return (
    <div className="words-container">
      <span>Easy</span>
      <Button
        sx={{ width: 180, height: 25, mt: 1 }}
        variant="contained"
        color="primary"
        id="easy"
        onClick={() => onWordChosen(words[0], 1)}
      >
        {words[0]}
      </Button>
      <span>Medium</span>
      <Button
        sx={{ width: 180, height: 25, mt: 1 }}
        variant="contained"
        color="warning"
        id="medium"
        onClick={() => onWordChosen(words[1], 3)}
      >
        {words[1]}
      </Button>
      <span>Hard</span>
      <Button
        sx={{ width: 180, height: 25, mt: 1 }}
        variant="contained"
        color="error"
        id="hard"
        onClick={() => onWordChosen(words[2], 5)}
      >
        {words[2]}
      </Button>
    </div>
  );
};

export default WordChoosing;
