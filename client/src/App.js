import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

import Local from "./helpers/Local";
import Api from "./helpers/Api";

import Navbar from "./components/Navbar";

import PrivateRoute from "./components/PrivateRoute";
import LoginView from "./views/LoginView";
import HomeView from "./views/HomeView";
import Favourites from "./views/Favourites";

import { NavLink } from "react-router-dom";

import FeaturedTripView from "./views/FeaturedTripView";
// import NewRoadTripView from "./views/NewRoadTripView";
import RoadtripView from "./views/RoadtripView";// import FeaturedTripView from "./views/FeaturedTripView";
import NewRoadTripView from "./views/NewRoadTripView";
import PastRoadTripView from "./views/PastRoadTripView";
import ProfileView from "./views/ProfileView";
import StopsView from "./views/StopsView";
import Error404View from "./views/Error404View";
// import Local from "./helpers/Local";


function App() {
  const [user, setUser] = useState(Local.getUser());
  const [loginErrorMsg, setLoginErrorMsg] = useState("");
  const [cardLiked, setCardLiked] = useState([]);
  const [roadtripData, setRoadtripData] = useState([]);

  const navigate = useNavigate();

  async function doLogin(username, password) {
    let myresponse = await Api.loginUser(username, password);
    if (myresponse.ok) {
      Local.saveUserInfo(myresponse.data.token, myresponse.data.user);
      setUser(myresponse.data.user);
      setLoginErrorMsg("");
      navigate("/");
    } else {
      setLoginErrorMsg("Login failed");
    }
  }

  function doLogout() {
    Local.removeUserInfo();
    setUser(null);
    // (NavBar will send user to home page)
  }

  let [roadtripData, setRoadtripData] = useState([]);

  useEffect(() => {
    fetchRoadtrips();
  }, []);

  async function fetchRoadtrips() {
    let myresponse = await Api.getRoadtrips();
    if (myresponse.ok) {
      setRoadtripData(myresponse.data);
    } else {
      console.log("Response not okay.");
    }
  }

  return (
    <div className="App">
      <NavLink to="/" className="Logo">
        {" "}
        <p>Road Tripper</p>
      </NavLink>
      <Navbar user={user} logoutCb={doLogout} />

      <Routes>
        <Route
          path="/"
          element={<HomeView roadtripData={roadtripData} makeFav={makeFav} />}
        />
        {/* <Route path="/profile/*" element={<ProfileView />} /> */}

        <Route
          path="/users/:user_id"
          element={
            <PrivateRoute>
              <ProfileView user={user} />
            </PrivateRoute>
          }
        />

        <Route
          path="/users/:userId"
          element={
            <PrivateRoute>
              <ProfileView />
            </PrivateRoute>
          }
        />

        <Route
          path="/login"
          element={
            <LoginView
              loginCb={(u, p) => doLogin(u, p)}
              loginError={loginErrorMsg}
            />
          }
        />

        <Route path="*" element={<Error404View />} />
        <Route path="/roadtrip" element={<RoadtripView addRoadtripCb={formData => addRoadtrip(formData)} />} />
        <Route path="/stops/:id" element={<StopsView />} />
        {/* <Route path="/stops/roadtripID" element={<StopsView roadtrips={roadtrips} />} /> */}
        {/* <Route path="/map" element={<TheMap />} /> */}
        {/* <Route path="/PastFormView" element={<TheMap />} /> */}
        {/* <Route path="/NewRoadTripView" element={<NewRoadTripView />} />
        <Route path="/PastRoadTripView" element={<PastRoadTripView />} /> */}
      </Routes>
    </div>
  );
}

export default App;
