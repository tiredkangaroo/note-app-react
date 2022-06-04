import React from "react";
import Note from "./Note"

export default function NoteTaker({ allNotes, togglePriority, deleteNote }){
    return (
        <table>
            <tbody>
                <tr>
                    <th>Note</th>
                    <th>Priority</th>
                    <th>Delete</th>
                </tr>
            {
            allNotes.map(note => {
                return <Note key={note.id} note={note} deleteNote={deleteNote} togglePriority={togglePriority}/>
            })
            }
            </tbody>
        </table>
    )
}