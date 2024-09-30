import { createContext,useState } from "react";

import React from "react";

export const NoteContext = createContext()

export const NoteProvider = ({children}) => {
  const [noteId,setNoteId] = useState("")
  return (
    <NoteContext.Provider value={{noteId,setNoteId}} >
        {children}
    </NoteContext.Provider>
  );
};


