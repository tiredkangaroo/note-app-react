import React from "react";
export default function Note({ note, deleteNote, togglePriority }){
    function handlePriorityChange(){
        togglePriority(note.id)
    }
    function handleDeleteNote(){
        deleteNote(note.id)
    }
    return (
            <tr>
                <td className="noteText">{note.text}</td>
                <td><input className="checkbox" type="checkbox" defaultChecked={note.priority} onChange={handlePriorityChange} /></td>
                <td><button className="delete" type="button" onClick={handleDeleteNote}>Delete Note</button></td>
            </tr>
    )
}