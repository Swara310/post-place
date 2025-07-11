import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Users from "./Users/Pages/Users";
//import NewPlace from "./Places/Pages/NewPlace";
// import UserPlaces from "./Places/Pages/UserPlaces";
// import UpdatePlace from "./Places/Pages/UpdatePlace";
// import Auth from "./Users/Pages/Auth";
import MainNavigation from "./Shared/Components/Navigation/MainNavigation";
import { AuthContext } from "./Shared/Context/Auth-Context";
import { useAuth } from "./Shared/Hooks/Auth-Hook";
import LoadingSpinner from "./Shared/Components/UIElements/LoadingSpinner";

const NewPlace = React.lazy(() => import("./Places/Pages/NewPlace"));
const UserPlaces = React.lazy(() => import("./Places/Pages/UserPlaces"));
const UpdatePlace = React.lazy(() => import("./Places/Pages/UpdatePlace"));
const Auth = React.lazy(() => import("./Users/Pages/Auth"));

const App = () => {
  const { login, logout, token, userId } = useAuth();
  let routes;
  if (token) {
    routes = (
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/:userId/places" element={<UserPlaces />} />
          <Route path="/places/new" element={<NewPlace />} />
          <Route path="/places/:placeId" element={<UpdatePlace />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/:userId/places" element={<UserPlaces />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<Navigate to="/auth" />} />
        </Routes>
      </React.Fragment>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Suspense
            fallback={
              <div className="center">
                <LoadingSpinner />
              </div>
            }
          >
            {routes}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
