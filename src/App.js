import React, {useRef, useState, useEffect} from "react";
import NoteTaker from "./NoteTaker";

const LOCAL_STORAGE_KEY = "Notable.notes"
function App() {
  const [notes, setNotes] = useState([])
  const notesRef = useRef()
  const priorityNotesRef = useRef();
  useEffect(() =>{
    const storedNotes = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY)
    )
    if (storedNotes) {setNotes(storedNotes); }
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes))
  }, [notes])

  function togglePriority(id){
    const allNewNotes = [...notes]
    const toggleNote = allNewNotes.find(singleNote => singleNote.id === id)
    toggleNote.priority = !toggleNote.priority;
    priorityNotesRef.current.innerText = `Priority Notes: ${getAllPriorityNotes()}`
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes))
  }
  function newNote(e){
    e.preventDefault()
    const name = notesRef.current.value
    if (!name.replace(/\s/g, '')){ return 0; }
    setNotes(preNotes => {
      return [...preNotes, {id: preNotes.length + 1, text:name, priority: false}]
    })
    notesRef.current.value = ""
  }
  function getAllPriorityNotes(){
    const allNewNotes = [...notes]
    const allPriorityNotes = allNewNotes.filter(singleNote => singleNote.priority === true);
    return allPriorityNotes.length;
  }
  window.notes = notes;
  function deleteNote(id){
    let allNewNotes = [...notes]
    if (allNewNotes.length > 1){
      allNewNotes = allNewNotes.slice(0, id - 1).concat(allNewNotes.slice(id, allNewNotes.length))
    }
    else{
      allNewNotes = []
    }
    setNotes(preNotes => {
      return allNewNotes
    })
    // priorityNotesRef.current.innerText = `Priority Notes: ${getAllPriorityNotes()}`;
  }
  function clearAllNotes(){
    setNotes(preNotes => {
      return [];
    })
  }
  return (
    <>
      <NoteTaker allNotes={notes} togglePriority={togglePriority} deleteNote={deleteNote}/><br></br>
      <form>
        <input autofocus type="text" ref={notesRef}></input>&nbsp;
        <button type="submit" onClick={newNote}>Add</button><br></br><br></br>
      </form>
      <button type="button" onClick={clearAllNotes}>Clear</button> all Notes
      <p ref={priorityNotesRef}>Priority Notes: {getAllPriorityNotes()}</p>
    </>
  )
}

export default App;
