import {useState,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import axios from 'axios';
import { NoteContext } from '@/providers/NoteProvider';
import { AuthContext } from '@/providers/AuthProvider'; 
const Note = () => {
  const [note, setNote] = useState({
    title: "",
    content: "",
    dateCreated: ""
    
  })
  const [isEditing,setIsEditing] = useState(false)
  const [createNote, setCreateNote] = useState(false)
  const [editNote,setEditNote] = useState(false)
  const {noteId,setNoteId} = useContext(NoteContext)
  const {user_id} = useContext(AuthContext)
  const token = localStorage.getItem("accessToken")
  const navigate = useNavigate()

  const {id} = useParams()
  

  console.log(`user_id: ${user_id} `)
  console.log(`noteID: ${id}`)
  setNoteId(id)

  // get a single note from the database 
  const getNote = async (noteId) => {
    console.log('route hit')
    console.log("NOTE ID IN THE GET NOTE FUNCTION: " + noteId)
    try{
      const res = await axios.get(`http://localhost:8080/api/notes/${noteId}`,{withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      })
      console.log(res)
      // update the note object 
      setNote(res.data.note)
      console.log("note set")
      console.log(note.content)
    }
    catch(error){
      console.log(error)
    }
  }

  // create a new note 
  const handlNoteCreate = async (user_id,note,token) => {
    if( ! note.title){
      note.title = "untitled"
    }
    if(!token){
      console.log("token not found")
    }
    try{
      const res = await axios.post(`http://localhost:8080/api/notes/new`,{
        title: note.title,
        content: note.content
      }, {withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      )
      console.log(res)
      console.log("new note id: " + res.data.note_id)
      console.log("note id set")
    }
    catch(error){
      console.log(error)
    }
  }

  // handle note edit
  const handleNoteEdit = async (noteId) => {
    // post the updated note content to the database 
    let data = {}
    if (note.title != "untitled"){
      data.new_title = note.title
    }
    data.new_content = note.content
    console.log(data)
    console.log("note id IN THE EDIT NOTE FUNCTION: " + noteId )
    try{
      const res = await axios.put(`http://localhost:8080/api/notes/${noteId}`,
        data
      ,{
        withCredentials: true,
        headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}
      })
      console.log("note successfully updated: " + res)
    }
    catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    // logic to fetch single note from the database 
  if(id){
    setIsEditing(true)
    // make api call based on id passed in parameter
    getNote(id)
  }
  return () => {
    setIsEditing(false)
  }
  
  },[user_id,id])

  
  // logic to create a new note 
  useEffect(() => {

    if(createNote){
      handlNoteCreate(user_id,note,token)
      setCreateNote(false)
      navigate('/dashboard')
    }

   
  }, [createNote])

  
  // logic to edit a note 
  useEffect(() => {
    if(editNote){
      handleNoteEdit(id)
      setEditNote(false)
      navigate("/dashboard")
    }
  },[editNote])
  

  const handleCreateClick = async () => {
  // post the note to the database and store the note id in the note context
  setCreateNote(true)
  }

  const handleEditClick = async () => {
    setEditNote(true)
  }

  const buttonStyles = "absolute right-7 text-bold text-xl top-[24px] "
 
  return (
    // fetch the note details when the component first renders
    // if the note id is provided then provide note details 
    // if not, render a blank page to create a new note 
    
    <section className=' flex flex-col justify-center pt-5 px-6  bg-stone-900 text-white'>
      <div className=' w-full flex justify-center'>
      <h1 className=' text-3xl hover:outline-none'>{note.dateCreated?.slice(0,10) || "New Note" }</h1>
      {isEditing ? <button className={buttonStyles} onClick={(handleEditClick)}>Save Note</button> : <button onClick={(handleCreateClick)}>Create Note</button>}
      </div>
      <form className=' pt-5' onSubmit={async (e) => {
        e.preventDefault()
        // any validation you want to add can go here 
        // run the create function or save function based on the route you want to hit 
        // redirect to the note page

      }}>
        <label htmlFor="noteContent" className=' hidden'>{isEditing ? "Enter your new note" : "Edit your note"}</label>
        <textarea className=" outline-none border-none w-full min-h-screen text-xl hover:outline-none active:outline-none bg-stone-900" name="noteContent" id="noteContent" placeholder='enter your thoughts here...'  onChange={(e) => {
          console.log(e.target.value)
          setNote({
            ...note,
            content: e.target.value
          })
          console.log(note)
        }} 
        value= {note.content}></textarea>
      </form>
    </section>
  );
};

export default Note;
