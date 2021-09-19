import React, { useState, useEffect } from 'react'
import './Main.scss'

export const Main = () => {

   const [note, setNote] = useState([])

   const [chosenNote, setChosenNote] = useState({ text: '', title: '' })

   const [title, setTitle] = useState('')
   const [text, setText] = useState('')

   const [isNoteOpen, setIsNoteOpen] = useState(false)

   const createNote = (e) => {
      e.preventDefault()
      if (title !== '' && text !== '') {
         setNote([
            ...note,
            {
               title,
               text,
               id: Date.now(),
               tegs: text.split(' ').filter(el => el.includes('#')).join('  ')
            }
         ])
         setTitle('')
         setText('')
      }
   }
   useEffect(() => {
      if (note.length === 0) {
         setChosenNote({ text: '' })
      }
      setIsEditOpen(false)
   }, [note])


   const deleteNote = (id) => {
      setNote(prevActions => (
         prevActions.filter((value, i) => i !== id)
      ));
   }

   const [isEditOpen, setIsEditOpen] = useState(false)
   const saveEditNote = () => {
      setNote(note.map(o => {
         if (o.id === chosenNote.id) {
            return chosenNote;
         }
         return o;
      }))
      setIsEditOpen(false)
   }

   const editTitle = (e) => {
      setChosenNote({
         ...chosenNote,
         title: e.target.value,
      })
   }

   const editText = (e) => {
      setChosenNote({
         ...chosenNote,
         text: e.target.value,
      })
   }

   const [SearchValue, setSearchValue] = useState('')


   const filtredNotes = note.filter(el => {

      return el.text.split(' ').filter(el => el.includes('#')).join('  ').includes(SearchValue)
   })




   const chosenTegs = chosenNote.text
   if (chosenTegs.split(' ').filter(el => el.includes('#')).join('  ')) {
      const chosen = chosenTegs.split(' ').filter(el => el.includes('#')).join('  ')
   }



   return (
      <div className="Main" >

         {isNoteOpen && <form action="" onSubmit={(e) => createNote(e)}>
            <input type="text" value={title} placeholder="Заголовок заметки" onChange={(e) => setTitle(e.target.value)} />
            <textarea type="text" value={text} placeholder="Текст заметки" onChange={(e) => setText(e.target.value)} />

            <div className="Main__buttons">
               <button >Создать</button>
               <button onClick={() => setIsNoteOpen(!isNoteOpen)}>&times;</button>
            </div>
         </form>}

         {!isNoteOpen && <button className="CreateNote" onClick={() => setIsNoteOpen(!isNoteOpen)}>Создать заметку</button>}

         {note.length > 0 && <form action="" className="Search">
            <input onChange={e => setSearchValue(e.target.value)} value={SearchValue} type="text" placeholder="Поиск по тегу" />
         </form>}

         <div className="notes">
            {
               filtredNotes.map((el, index) => (
                  <div key={index} className="notes__elem" onClick={() => setChosenNote(el)}>
                     <p className="tegs" >{el.text.split(' ').filter(el => el.includes('#')).join('  ')}</p>
                     <p>{el.title}</p>

                     <button onClick={() => deleteNote(index)}>Удалить</button>
                  </div>
               ))
            }
         </div>

         {note.length > 0 &&
            <div className="checkNote" onClick={() => setIsEditOpen(true)} >
               <p>{chosenNote.title}</p>
               <p>{chosenNote.text}</p>
               <p className="tegs">{chosenNote.text.split(' ').filter(el => el.includes('#')).join('  ')}</p>
            </div>}

         {isEditOpen && <div className="editNote">
            <form action="" onSubmit={(e) => e.preventDefault()}>
               <input type="text" onChange={editTitle} value={chosenNote.title} />
               <textarea type="text" onChange={editText}

                  value={chosenTegs} />
               <button onClick={() => saveEditNote()}>Сохранить</button>
            </form>

         </div>}

      </div >
   )
}
