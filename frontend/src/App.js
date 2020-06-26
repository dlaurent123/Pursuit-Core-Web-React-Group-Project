import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import SignInForm from "./components/LogIn/SignInForm";
import SignUpForm from "./components/LogIn/SignUpForm";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import Navbar from "./components/General/Navbar";
import "./App.css";
import UpLoadImage from "./components/PhotoUpLoad/photoUpLoad";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [searchValue, setSearchValue] = useState();

  const onSearch = search => {
    setSearchValue(search);
  }

  const handleSignUp = async user => {
    try {
      let res = await axios.post("/api/users", user);
      setUser(res.data.user);
      setError(false);
      setLoggedIn(true);
    } catch (error) {
      setErrorText(error.response.data.error);
      setError(true);
    }
    // Pass in values into database
  };
  const handleLogIn = async email => {
    try {
      let res = await axios.post("/api/users/login", { email });
      if (res.data.user) {
        setError(false);
        setUser(res.data.user);
        setLoggedIn(true);
      } else {
        setError(true);
      }
    } catch (error) {
      setErrorText(error.response.data.error);
      setError(true);
    }
  };

  if (loggedIn) {
    return (
      <div className="App">
        <Navbar setLoggedIn={setLoggedIn} onSearch={onSearch}/>
        <Switch>
          <Redirect exact from="/login" to="/" />
          <Redirect exact from="/signup" to="/" />
          <Route path="/profile">
            <Profile user={user} error={error} errorText={errorText} />
          </Route>
          <Route exact path="/">
            <Home user={user} error={error} errorText={errorText} searchValue={searchValue}/>
          </Route>
        </Switch>
      </div>
    );
  } else {
    return (
      <div className="App">
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Redirect exact from="/profile" to="/login" />
          <Route path={"/login"}>
            <SignInForm
              handleLogIn={handleLogIn}
              error={error}
              errorText={errorText}
            />
          </Route>
          <Route path={"/signup"}>
            <SignUpForm
              handleSignUp={handleSignUp}
              error={error}
              errorText={errorText}
            />
          </Route>
        </Switch>
      </div>
    );
  }
}
export default App;
