import PropTypes from "prop-types";

import Loading from "@mui/material/CircularProgress";

import "./WaitingRoom.css"

const WaitingRoom = ({text}) => {
  return (
    <>
      <div className="waiting-room">
        <h3>{text}</h3>
        <Loading />
      </div>
    </>
  );
};



export default WaitingRoom;
