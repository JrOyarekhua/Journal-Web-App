import { useState } from "react";
import Home from "./Home.jsx";
import LogIn from "./LogIn.jsx";
import SignUp from "./SignUp.jsx";

export default function Hero() {
  const buttonClass = "rounded-full w-[6rem] bg-black/75 p-[0.1rem]";
  const [page, setPage] = useState("home");

  function handleButtonClick(page) {
    setPage(page);
  }

  return (
    <div
      style={{ width: "50%" }}
      className="h-screen bg-hero-image bg-center bg-cover bg-no-repeat "
    >
      {page === "home" && (
        <Home buttonStyles={buttonClass} handleClick={handleButtonClick} />
      )}
      {page === "log-in" && <LogIn />}
      {page === "sign-up" && <SignUp />}
    </div>
  );
}
