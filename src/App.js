import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/" element={<Users />} />
        <Route path="/places/create" element={<NewPlace />} exact />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
