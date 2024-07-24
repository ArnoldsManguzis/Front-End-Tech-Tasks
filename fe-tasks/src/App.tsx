import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import JuniorMid from "./pages/JuniorMid";
import Senior from "./pages/Senior";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/JuniorMid" element={<JuniorMid />} />
                    <Route path="/Senior" element={<Senior />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
