import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BaseLayout from "./pages/BaseLayout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* NESTED ROUTE CONCEPT IS USED FOR SHARED-LAYOUT */}
          <Route path="/" element={<BaseLayout />}>
            {/* <Route path="login" element={<Login />} /> */}
            <Route path="signup" element={<Register />} />
            <Route path="*" element={<h1>NOT FOUND</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
