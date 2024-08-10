export default function Home(props) {
  return (
    <section className="text-slate-50">
      <div className="text-center mb-4">
        <h1 className="text-5xl mb-4">NoteWorthy</h1>
        <h2 className="text-xl mb-4">
          simplify your thoughts, organize your life
        </h2>
      </div>
      <span>
        <button
          className={`mr-4 ${props.buttonStyles}`}
          onClick={() => props.handleClick("sign-up")}
        >
          sign up
        </button>
        <button
          className={props.buttonStyles}
          onClick={() => props.handleClick("log-in")}
        >
          log in
        </button>
      </span>
    </section>
  );
}
