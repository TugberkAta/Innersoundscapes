import { Route, Routes } from "react-router";
import SignUpForm from "./components/authentication/SignUpForm";
import DarkModeSwitch from "./components/DarkModeSwitch";
import { useEffect, useState } from "react";
import HomePage from "./components/HomePage";
import LoginForm from "./components/authentication/LoginForm";

function App() {
  const [displayMode, setDisplayMode] = useState(
    localStorage.getItem("displayMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("displayMode", displayMode);
  }, [displayMode]);

  return (
    <>
      <Routes>
        <Route
          path="/register"
          element={
            <>
              <DarkModeSwitch
                setDisplayMode={setDisplayMode}
                displayMode={displayMode}
              ></DarkModeSwitch>
              <SignUpForm displayMode={displayMode}></SignUpForm>
            </>
          }
        />
        <Route
          path="/log-in"
          element={
            <>
              <DarkModeSwitch
                setDisplayMode={setDisplayMode}
                displayMode={displayMode}
              ></DarkModeSwitch>
              <LoginForm displayMode={displayMode}></LoginForm>
            </>
          }
        />
        <Route
          path="/homepage"
          element={
            <>
              <HomePage></HomePage>
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
