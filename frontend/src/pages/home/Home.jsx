import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <section className=" bg-heroBackground bg-cover bg-center bg-black/40 bg-blend-overlay h-screen flex flex-col justify-center items-center ">
      <div className="flex flex-col items-center justify-center text-white ">
        <h1 className="mb-2 text-5xl">NoteWorthy</h1>
        <h2 className="mb-2 text-xl">
          simplify your thoughts, organize your life
        </h2>
        <span>
          <Button size="sm" className="mr-2">
            <Link to="/register">sign up</Link>
          </Button>
          <Button size="sm">
            <Link to="/auth">log in</Link>
          </Button>
        </span>
      </div>
    </section>
  );
}
