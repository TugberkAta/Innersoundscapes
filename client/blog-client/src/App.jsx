import { Route, Routes } from "react-router";
import SignUpForm from "./components/authentication/SignUpForm";
import DarkModeSwitch from "./components/utilities/DarkModeSwitch";
import { useEffect, useState } from "react";
import LoginForm from "./components/authentication/LoginForm";
import CreateArticle from "./components/articleCreation/CreateArticle";
import MainLayout from "./components/utilities/MainLayout";
import HubPageDisplay from "./components/utilities/HubPageDisplay";
import ArticlePage from "./components/articleDisplay/ArticlePage";
import ArticleLayout from "./components/articleDisplay/articleLayout";

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
    //Routes for crud actions and log-in
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
        {/* Display routes such as homepage and article pages etc. */}
        <Route
          path="/homepage"
          element={
            <>
              <MainLayout
                articleCategory="all"
                userData={userData}
                DisplayComponent={HubPageDisplay}
              />
              ;
            </>
          }
        />
        <Route
          path="/article/:id"
          element={
            <>
              <ArticlePage
                userData={userData}
                DisplayComponent={ArticleLayout}
              />
              ;
            </>
          }
        />
        <Route
          path="/alternative"
          element={
            <>
              <MainLayout
                articleCategory="alternative"
                categoryName={"Alternative"}
                userData={userData}
                DisplayComponent={HubPageDisplay}
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
                articleCategory="psychedelia"
                categoryName={"Psychedelia"}
                userData={userData}
                DisplayComponent={HubPageDisplay}
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
                articleCategory="progressive"
                categoryName={"Progressive"}
                userData={userData}
                DisplayComponent={HubPageDisplay}
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
                articleCategory="punk"
                categoryName={"Punk"}
                userData={userData}
                DisplayComponent={HubPageDisplay}
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
                articleCategory="turkish-scene"
                categoryName={"Turkish Scene"}
                userData={userData}
                DisplayComponent={HubPageDisplay}
              />
              ;
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
