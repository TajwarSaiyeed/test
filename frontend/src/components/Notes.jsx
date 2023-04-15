import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { createNote, getNotes, reset } from '../features/notes/noteSlice'
import { FaPlusSquare, FaClipboardList } from 'react-icons/fa'

import Note from './Note'

function Notes({expanded, order, item, clickExpendEvent}) {
    const [notebody, setNotebody] = useState('')
    const [shownotetext, setShownotetext] = useState(false)
    const dispatch = useDispatch();
    const { user } = useSelector(
        (state) => state.auth
    )

    const { notes, isError, message } = useSelector(
        (state) => state.notes
    );

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        
        dispatch(getNotes());

        return () => {
            //dispatch(reset());
        }

       
    }, [isError, message, dispatch])

    
    /**
     * Expend text area at initial 
     */
    useEffect(() => {
        if(expanded && filterNotes.length <= 0) setShownotetext(true)
    }, [expanded])

    const addNote = (e) => {
        e.preventDefault();

        var newNote = {
            order: order ? order._id : null,
            item: item ? item._id : null,
            body: notebody,
            postedBy: user._id,
            postedByName: user.name,
            postedDate: new Date()
        };
        
        dispatch(createNote(newNote));
        setNotebody('')
        
    }
    
    const userNotes = notes.map((note, k) => {
        if((order && note.order == order._id) || (item && note.item == item._id)) {
            if(typeof note != 'undefined'){
                return note;
            }
        }
    })
    const filterNotes = userNotes.filter(function( element ) {
        return element !== undefined;
     });

    
    const showNoteEntryBox = (e = false) => {
        if(e == 'remove'){ 
            setShownotetext(false)
        }else{ 
            setShownotetext(true)
        }
    }


    if (expanded) {
        return (
            <div className="notes">
                <span className='overlayer position-fixed w-100 h-100 top-0 left-0' onClick={clickExpendEvent}></span>
                {filterNotes.map((note, k) => {
                        return <Note showNoteEntryBox={showNoteEntryBox} key={k} clickExpendEvent={clickExpendEvent} note={note} />
                })}
                

                <form className={ shownotetext || (shownotetext && filterNotes.length <= 0) ? `note-entry parent-entry` : `note-entry parent-entry d-none` } onSubmit={addNote}>
                    <div className='d-flex justify-content-between align-item-center top-button-group mb-5px'>
                        <span className='d-grid align-item-center color-blue cursor-pointer' ></span>
                        <span onClick={(e) => showNoteEntryBox('remove')} className='d-grid border-round bg-black color-white p-2px node_dismish'><FaClipboardList /></span>
                    </div>
                    <div>
                        <textarea name="notebody" cols="30" rows="10" value={notebody} onChange={(e) => setNotebody(e.target.value)}></textarea>
                    </div>
                    <div className='d-flex justify-content-between align-item-center mt-1'>
                        <div className='d-flex gap-1 action'>
                            <span>Edit</span>
                            <span>Delete</span>
                        </div>
                        <div><input type="submit" value="Post" className="bg-blue btn note-btn" /></div>
                    </div>
                </form>
            </div>
        )
    } else {
        return <></>
    }
}

export default Notes