import { Card, CardTitle, CardFooter } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisIcon } from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
const NoteWrapper = ({ title, date, noteId, handleDeleteClick }) => {
  const navigate = useNavigate()
  return (

    <Card className="flex flex-col items-start justify-center h-[75px] w-[700px] bg-[#18181b] text-white pl-4 border-none mb-4">
      <CardTitle className="p-0 mt-8">{title || "untitled"}</CardTitle>
      <CardFooter className="flex p-0 justify-between w-full pb-4">
        <p className="text-xs">{date}</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="hover:bg- ">
              <EllipsisIcon fill="white" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Note options</DropdownMenuLabel>
            <DropdownMenuSeparator></DropdownMenuSeparator>
            <DropdownMenuItem onClick={() => {
              alert(noteId)
              navigate(`/note/:${noteId}`)
            }}>edit note</DropdownMenuItem>
            <DropdownMenuSeparator></DropdownMenuSeparator>
            <DropdownMenuItem onClick={() => {
              handleDeleteClick(noteId)
            }}>delete note</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
};

export default NoteWrapper;
