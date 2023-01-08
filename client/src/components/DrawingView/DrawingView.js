import React, { useState, useRef } from "react";

import CanvasDraw from "react-canvas-draw";
import PropTypes from "prop-types";

import WaitingRoom from "../WaitingRoom/WaitingRoom";
import WordChoosing from "../WordChoosing/WordChoosing";

import "./DrawingView.css";

const DrawingView = ({ onSendClick, waiting, chooseWord }) => {

  window.addEventListener("resize", () => {
    setHeight(window.screen.height - 330);
    setWidth(window.screen.width);
  });
  const [height, setHeight] = useState(window.screen.height - 330);
  const [width, setWidth] = useState(window.screen.width);

  const [wordChoosing, setWordChoosing] = useState(null);
  const [color, setColor] = useState("#000");
  const [brushRadius, setBrushRadius] = useState(2);

  const canvasRef = useRef(null);

  const changeColor = (brushColor) => {
    setColor(brushColor);
  };

  const changeRadius = (radius) => {
    setBrushRadius(Number(radius));
  };

  const remove = () => {
    setColor("#ffff");
  };

  const eraseAll = () => {
    canvasRef.current.eraseAll();
  };

  const undo = () => {
    canvasRef.current.undo();
  };

  const sendImg = () => {
    onSendClick(canvasRef.current.getSaveData());
  };

  const onChooseWord = (word, points) => {
    setWordChoosing(word);
    chooseWord(word, points);
  };

  return (
    <div className="drawing-view-container">
      {!waiting && !wordChoosing && <WordChoosing onWordChosen={onChooseWord} />}
      {!waiting && wordChoosing && (
        <>
          <h3>Drawing</h3>
          <div className="word-container">
            You are drawing :<div className="word"> {wordChoosing}</div>
          </div>
          <div className="canvas-tools">
            <div className="canvas-tool-item">
              <label>colors</label>
              <div className="canvas-colors-tool">
                <button
                  className="btn btn-black"
                  onClick={() => changeColor("black")}
                ></button>
                <button
                  className="btn btn-red"
                  onClick={() => changeColor("red")}
                ></button>
                <button
                  className="btn btn-yellow"
                  onClick={() => changeColor("yellow")}
                ></button>
                <button
                  className="btn btn-blue"
                  onClick={() => changeColor("blue")}
                ></button>
              </div>
            </div>
            <div className="canvas-tool-item">
              <label>enter radius</label>
              <input type="text" id="brushRadius"></input>
              <button
                onClick={() =>
                  changeRadius(document.getElementById("brushRadius").value)
                }
              >
                ok
              </button>
            </div>
            <div className="canvas-tool-item" onClick={remove}>
              remove
            </div>
            <div className="canvas-tool-item" onClick={eraseAll}>
              reset
            </div>
            <div className="canvas-tool-item" onClick={undo}>
              undo
            </div>
            <div className="canvas-tool-item" onClick={sendImg}>
              send
            </div>
          </div>
          <CanvasDraw
            brushColor={color}
            brushRadius={brushRadius}
            lazyRadius={1}
            hideGrid={true}
            canvasWidth={width}
            canvasHeight={height}
            ref={canvasRef}
          />
        </>
      )}
      {waiting && <WaitingRoom text={"waiting for a guess"}/>}
    </div>
  );
};

DrawingView.propTypes = {
  onSendClick: PropTypes.func.isRequired,
  waiting: PropTypes.bool.isRequired,
};

export default DrawingView;
