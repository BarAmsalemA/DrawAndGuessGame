import { useState, useEffect } from "react";

import { socketService } from "../../services/socketService";
import DrawingView from "../../components/DrawingView/DrawingView";
import GuessingView from "../../components/GuessingView/GuessingView";
import WaitingRoom from "../../components/WaitingRoom/WaitingRoom";
import { useNavigate } from "react-router-dom";

import "./GameScreen.css";

const GameScreen = () => {
  const navigate = useNavigate();

  const [drawer, setDrawer] = useState(false);
  const [waitForDraw, setWaitForDraw] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [waitForGuess, setWaitForGuess] = useState(false);
  const [drawingVideo, setDrawingVideo] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [points, setPoints] = useState(0);
  const [newPoints, setNewPoints] = useState();
  const [word, setWord] = useState(null);

  useEffect(() => {
    socketService.on("setDrawing", () => {
      setWaitForDraw(false);
      setWaitForGuess(false);
      setDrawer(true);
    });

    socketService.on("startGame", () => {
      setIsLoading(false);
    });

    socketService.on("changeWaitForDraw", () => {
      setWaitForDraw(true);
      setWaitForGuess(false);
      setDrawer(false);
    });

    socketService.on("getWordChoosing", ({ word, points }) => {
      setWord(word);
      setNewPoints(points);
    });

    socketService.on("getDrawing", (drawingVideo) => {
      setDrawingVideo(drawingVideo);
      setDrawer(false);
      setWaitForGuess(false);
      setWaitForDraw(false);
      setIsLoading(false);
    });

    socketService.on("winner", (winner) => {
      setDrawer(true);
      setWaitForDraw(false);
      setIsLoading(true);
      alert(`winner is ${winner}`);
      localStorage.removeItem("users");
      socketService.terminate()
      navigate("/");
    });
  }, []);

  //when the drawer clicking on send they switching roles
  const sendDrawing = (drawingVideo) => {
    setWaitForGuess(true);
    //send to guess the drawing video
    socketService.emit("sentDrawing", drawingVideo);
  };

  const success = (guessingWord) => {
    if (guessingWord.toLowerCase() !== word) {
      alert("try again");
      return;

    } 
    setIsSuccess(true);
    setPoints(points + newPoints);
  };

  const changeRoles = () => {
    setIsSuccess(false);
    setDrawer(!drawer);
    setWaitForDraw(!waitForDraw);
    setWaitForGuess(false);
    socketService.emit("success", points);
  };

  const chooseWord = (word, points) => {
    //send word to server
    socketService.emit("sentWordChoosing", { word, points });
  };

  const endGame = () => {
    socketService.emit("endGame");
  };

  return (
    <div className="game-screen-container">
      {!isLoading && (
        <div className="second-header">
          <div className="score">
            Score : <div className="score-points">{points}</div>
          </div>
          <button className="end-game" onClick={endGame}>
            end game
          </button>
        </div>
      )}
      {drawer && !isLoading && (
        <DrawingView
          onSendClick={sendDrawing}
          waiting={waitForGuess}
          chooseWord={chooseWord}
        />
      )}
      {!drawer && !isLoading && (
        <GuessingView
          waiting={waitForDraw}
          drawingVideo={drawingVideo}
          success={success}
        />
      )}
      {isLoading && <WaitingRoom text={"waiting for a player to join"} />}

      {isSuccess && (
        <div className="success-popup">
          <h3>Success!</h3>
          <h4>you earn {newPoints} points</h4>
          <button
            className="success-close"
            onClick={() => {
              changeRoles();
            }}
          >
            X
          </button>
        </div>
      )}
    </div>
  );
};

export default GameScreen;
