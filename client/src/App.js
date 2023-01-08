import { Routes, Route, BrowserRouter } from "react-router-dom";

import Login from "./pages/Login/Login";

import "./App.css";
import GameScreen from "./pages/GameScreen/GameScreen";
import Header from "./components/Header/Header"

function App() {
  // localStorage.setItem('users')

  return (
    <div className="App">
        <Header/>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/game-screen" element={<GameScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;

