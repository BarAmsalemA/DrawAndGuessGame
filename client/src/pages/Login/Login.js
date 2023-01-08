import { useRef } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import "./Login.css";
import { socketService } from "../../services/socketService";

const Login = () => {

  const navigate = useNavigate();
  const userName = useRef({ value: "" });

  localStorage.removeItem("users");

  const login = () => {
    const name = userName.current.value;
    if (!name) {
      alert("Please enter your name");
      return;
    } 
    
    const users = JSON.parse(localStorage.getItem("users")) || [];
      users.push({ name });
      socketService.init()
      localStorage.setItem("users", JSON.stringify(users));
      socketService.emit("userLogged", name);
      navigate("/game-screen");
  };

  return (
    <div className="login-window">
      <TextField
        id="userName"
        label="User Name"
        placeholder="Please enter your name"
        focused
        inputRef={userName}
      />
      <Button
        sx={{ mt: 1 }}
        variant="outlined"
        
        onClick={login}
      >
        Login
      </Button>
    </div>
  );
};
export default Login;
