import { Route, Routes } from "react-router";
import SignUpForm from "./components/SignUpForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<SignUpForm></SignUpForm>} />
      </Routes>
    </>
  );
}

export default App;
