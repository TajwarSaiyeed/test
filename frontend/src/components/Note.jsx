import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {FaPencilAlt, FaTrashAlt} from 'react-icons/fa';
import { toast } from 'react-toastify';
import { FaPlusSquare, FaClipboardList } from 'react-icons/fa';
import { updateNote, deleteNote } from '../features/notes/noteSlice';

function Note({ note, clickExpendEvent, showNoteEntryBox }) {
    const dispatch = useDispatch();
    const { user } = useSelector(
        (state) => state.auth
    )
    const { isLoading, isError, message } = useSelector(
      (state) => state.notes
    )
    const [edit, setEdit] = useState(false);
    const [noteBody, setNoteBody] = useState('');
    

    const toggleEditNote = () => {
      setEdit((prevState) => {
        return !prevState;
      });

      setNoteBody(note.body);
    }

    const submitEditNote = (e) => {
      e.preventDefault();

      var newNote = {...note};
      newNote.body = noteBody;
      newNote.updatedBy = user._id;
      newNote.updatedByName = user.name;
      newNote.updatedDate = new Date();

      dispatch(updateNote(newNote))

      toggleEditNote();
    }

    useEffect(() => {
      if (isError) {
        console.log(message);
      }
    }, [isError, message, dispatch])

    const clickDeleteNote = () => {
      dispatch(deleteNote(note._id));
    }

    return (
      <div className="note">
          <div className='d-flex justify-content-between mb-0 align-item-center top-button-group'>
              <span className='d-grid align-item-center color-blue cursor-pointer' ><FaPlusSquare onClick={showNoteEntryBox} /></span>
              <span onClick={clickExpendEvent} className='d-grid border-round bg-black color-white p-2px node_dismish'><FaClipboardList /></span>
          </div>
       
          <div className="note-body omar2">
          {edit &&
            <form className="note-entry note-entry-embedded" onSubmit={submitEditNote}>
                <textarea name="noteBody" cols="30" rows="10" onChange={(e) => setNoteBody(e.target.value)}>{noteBody}</textarea>
                <input type="submit" value="Save Changes" className="btn bg-black mt-1" />
            </form>}
          {!edit &&
            <>
              <p>{note.body}</p>
              {/* <p className="note-info">Posted {note.postedDate.substr(0, 10)} by {note.postedByName}{note.updatedDate &&<> • Edited {note.updatedDate.substr(0, 10)} by {note.updatedByName}</>}</p> */}
            </>
          }
          </div>
          <div className='d-flex justify-content-between align-item-center mt-3px'>
              <div className='d-flex gap-1 action'>
                  <span className='color-blue' onClick={toggleEditNote}>Edit</span>
                  <span className='color-blue' onClick={clickDeleteNote}>Delete</span>
              </div>
              <div></div>
          </div>
          {/* <div><FaPencilAlt onClick={toggleEditNote} title="Edit" /><FaTrashAlt onClick={clickDeleteNote} title="Delete" /></div> */}
      </div>
    )
}

export default Note