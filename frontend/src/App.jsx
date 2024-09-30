import Home from "./pages/home/Home";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/home/SignUp";
import LogIn from "./pages/home/LogIn";
import Dashboard from "./pages/dashboard/Dashboard";
import Note from "./pages/dashboard/Note";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/auth" element={<LogIn />} />
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="note/:id?" element={<Note />} />
        

    </Routes>
  );
}

export default App;
