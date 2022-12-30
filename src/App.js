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
import Auth from "./user/pages/Auth";
import { Redirect } from "react-router-dom";
import { AuthContext } from "./shared/context/auth-context";
import { useCallback, useState } from "react";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Routes>
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/:userId/places" element={<UserPlaces />} exact />
            <Route path="/" element={<Users />} />
            <Route path="/places/create" element={<NewPlace />} exact />
            <Route path="/places/:placeId" element={<UpdatePlace />} exact />
            <Route path="/auth" element={<Auth />} exact />
            <Redirect tp="/" />
          </Routes>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
