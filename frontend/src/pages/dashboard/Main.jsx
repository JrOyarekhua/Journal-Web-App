import NoteWrapper from "./dashboardComponents/NoteWrapper";
const Main = () => {
  return (
    <main className=" row-start-2 col-start-2">
      <div className="flex flex-col justify-center items-center gap-8 w-full">
        <NoteWrapper date="Aug 2" />
        <NoteWrapper date="Aug 2" />
        <NoteWrapper date="Aug 2" />
        <NoteWrapper date="Aug 2" />
        <NoteWrapper date="Aug 2" />
        <NoteWrapper date="Aug 2" />
        <NoteWrapper date="Aug 2" />
        <NoteWrapper date="Aug 2" />
        <NoteWrapper date="Aug 2" />
      </div>
    </main>
  );
};

export default Main;
