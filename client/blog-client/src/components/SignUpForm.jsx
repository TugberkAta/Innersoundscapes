import { useState } from "react";

const SignUpForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  return (
    <div className="content-container w-screen h-screen flex items-center justify-center bg-[url('src/assets/stacked-waves-haikei-2.svg')]">
      <form method="POST" action="http://localhost:3000/users/register">
        <div className="flex flex-col gap-6  shadow-md p-12 rounded-md border-t-4 rounded-t-none border-cyan-400 bg-slate-100">
          <div className="flex flex-col">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              className="border-2 rounded-md p-1"
              type="text"
              placeholder="First name..."
              name="firstName"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              className="border-2 rounded-md p-1"
              type="text"
              placeholder="Last Name"
              name="lastName"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="username">User Name</label>
            <input
              id="username"
              className="border-2 rounded-md p-1"
              type="text"
              placeholder="User name..."
              name="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className="border-2 rounded-md p-1"
              type="password"
              placeholder="***"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="repeatPassword">Repeat Password</label>
            <input
              id="repeatPassword"
              className="border-2 rounded-md p-1"
              type="password"
              placeholder="***"
              name="repeatPassword"
              required
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>
          <button
            className=" p-2 bg-blue-500 text-white rounded-sm"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
