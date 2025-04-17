import Home from "./components/Home";
import  './app.css';
import { BrowserRouter, Routes, Route } from "react-router";
import AddProject from "./components/AddProject";
import ProjectDetail from "./components/Project_Detail";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:id" element={<ProjectDetail/>} />
      <Route path="/add" element={<AddProject/>} />
    </Routes>
  );
}

export default App;
