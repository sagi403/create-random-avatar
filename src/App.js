import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainScreen from "./screens/MainScreen";

const App = () => {
  return (
    <>
      <Router basename="/create-random-avatar">
        <Routes>
          <Route path="/" element={<MainScreen />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
