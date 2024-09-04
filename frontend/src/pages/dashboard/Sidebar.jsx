import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <aside className="col-span-1 row-span-2 bg-[#1E1E1E] text-white rounded-r-xl ">
      <div className="flex flex-col items-center pt-2 sticky">
        <div className="w-[100px] h-[100px] bg-slate-700 rounded-full mb-5"></div>
        <h3 className="mb-5">Journal</h3>
        <h3 className="mb-5">Settings</h3>
        <Button
          className="bg-slate-100 text-black"
          onClick={() => {
            // retrive the note id from the database
            navigate(`/note/${noteId || ""}`);
          }}
        >
          New Note
        </Button>
      </div>
    </aside>
  );
};
export default Sidebar;
