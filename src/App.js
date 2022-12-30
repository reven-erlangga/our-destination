import "./App.css";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Routes>
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/:userId/places" element={<UserPlaces />} exact />
          <Route path="/" element={<Users />} />
          <Route path="/places/create" element={<NewPlace />} exact />
          <Route path="/places/:placeId" element={<UpdatePlace />} exact />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
