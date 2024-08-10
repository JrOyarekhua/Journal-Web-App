import { useState } from "react";

export default function Home() {
  const buttonClass = "rounded-full w-[6rem] bg-black/75 p-[0.1rem]";
  const [content, setContent] = useState("home");
  return (
    <div className="h-screen w-screen bg-hero-image bg-center bg-cover bg-no-repeat flex flex-col justify-center align-center">
      <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
      <hero className="text-slate-50 flex flex-col items-center z-20 ">
        <div className="w-full text-center mb-4">
          <h1 className="text-5xl mb-4">NoteWorthy</h1>
          <h2 className="text-xl mb-4">
            simplify your thoughts, organize your life
          </h2>
        </div>
        <span>
          <button className={`mr-4 ${buttonClass}`}>sign up</button>
          <button className={buttonClass}>log in</button>
        </span>
      </hero>
    </div>
  );
}
