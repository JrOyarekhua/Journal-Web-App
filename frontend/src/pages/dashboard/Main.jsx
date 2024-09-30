import axios from "axios";
import NoteWrapper from "./dashboardComponents/NoteWrapper";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { NoteContext } from "@/providers/NoteProvider";


const Main = () => {
  // note state to store notes retrived 
  const [notes, setNotes] = useState([])
  const {noteId} = useContext(NoteContext)
  console.log(noteId)
  // function to get all the notes 
  useEffect(() => {
    getNotes()
  },[])
  // function to fetch notes from the api 
  const getNotes = async () => {
    try{
      const res = await axios.get(`http://localhost:8080/api/notes`,{withCredentials: true, headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }})
      console.log("notes: " + res.data.notes)
      setNotes(res.data.notes)
      console.log("notes set")
      console.log(notes)
      
    }catch(error){
      console.log("error fetching notes: " + error)
    }
  }

  const deleteNote = async (note_id) => {
    console.log("NOTE ID FROM THE QUERY STRING: " + noteId)
    console.log("NOTE ID FROM THE DATABASE: " + note_id)
    try{
       await axios.delete(`http://localhost:8080/api/notes/:${note_id}`,{
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      })

      const updatedNotes = notes.filter((note) => note.note_id != note_id)
      setNotes(updatedNotes)
    }
    catch(error){
      console.log(error)
    }
  
  }

  return (
    <main className=" row-start-2 col-start-2">
      <div className="flex flex-col items-center gap-8 w-full min-h-screen">
        {notes.map(note => (
          <NoteWrapper key={note.note_id} title={note.title} date={note.date_created} noteId={note.note_id} handleDeleteClick={deleteNote}/>
        ))}
      </div>
    </main>
  );
};

export default Main;
