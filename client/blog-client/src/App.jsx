import { Route, Routes } from "react-router";
import SignUpForm from "./components/authentication/SignUpForm";
import DarkModeSwitch from "./components/utilities/DarkModeSwitch";
import { useEffect, useState } from "react";
import HomePage from "./components/homePage/HomePage";
import LoginForm from "./components/authentication/LoginForm";
import CreateArticle from "./components/articleCreation/CreateArticle";
import MainLayout from "./components/genrePages/MainLayout";

function App() {
  const [displayMode, setDisplayMode] = useState(
    localStorage.getItem("displayMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("displayMode", displayMode);
  }, [displayMode]);

  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/users/current", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setUserData(result);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!userData) {
      setLoading(true);
    } else setLoading(false);
  }, [userData]);

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
              <HomePage userData={userData}></HomePage>
            </>
          }
        />
        <Route
          path="/create-article"
          element={
            <>
              <DarkModeSwitch
                setDisplayMode={setDisplayMode}
                displayMode={displayMode}
              ></DarkModeSwitch>
              {loading ? (
                <div
                  className={`w-full flex flex-col items-center justify-around bg-no-repeat bg-center bg-cover md:h-screen h-full ${
                    displayMode
                      ? "bg-[url('client/blog-client/src/assets/stacked-waves-haikei-2.svg')]"
                      : "bg-[url('client/blog-client/src/assets/stacked-waves-haikei-3.svg')]"
                  }`}
                ></div>
              ) : (
                <CreateArticle
                  displayMode={displayMode}
                  userData={userData}
                ></CreateArticle>
              )}
            </>
          }
        />
        <Route
          path="/alternative"
          element={
            <>
              <MainLayout
                articleAddress="alternative"
                categoryName={"Alternative"}
                userData={userData}
              />
              ;
            </>
          }
        />
        <Route
          path="/psychedelia"
          element={
            <>
              <MainLayout
                articleAddress="psychedelia"
                categoryName={"Psychedelia"}
                userData={userData}
              />
              ;
            </>
          }
        />
        <Route
          path="/progressive"
          element={
            <>
              <MainLayout
                articleAddress="progressive"
                categoryName={"Progressive"}
                userData={userData}
              />
              ;
            </>
          }
        />
        <Route
          path="/punk"
          element={
            <>
              <MainLayout
                articleAddress="punk"
                categoryName={"Punk"}
                userData={userData}
              />
              ;
            </>
          }
        />
        <Route
          path="/turkish-scene"
          element={
            <>
              <MainLayout
                articleAddress="turkish-scene"
                categoryName={"Turkish Scene"}
                userData={userData}
              />
              ;
            </>
          }
        />
        <Route path="/article/:id" element={<></>} />
      </Routes>
    </>
  );
}

export default App;
