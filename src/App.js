import db from './firebase';
import React, { useState, useEffect } from 'react';
import './App.css';
import Contact from './components/Contact';
import { Modal, FormControl, Button, Input, InputLabel } from '@material-ui/core';
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';

function App() {

    const [contacts, setContacts] = useState([])
    const [name, setName] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [open, setOpen] = useState(false)

    useEffect(() => {
        db.collection('contacts').orderBy('name', 'asc').onSnapshot(snapshot => {
            setContacts(snapshot.docs.map(doc => {
                return ({id: doc.id, contact: doc.data()})
            }))
        })
    }, [])
    const addToContacts = function(e) {
        e.preventDefault();
        db.collection('contacts').add({
            name: name,
            mobileNumber: mobileNumber
        })
        setName('');
        setMobileNumber('');
        setOpen(false);        
    }

    return (
        <div className="App">
            <Modal open={open} onClose={() => setOpen(false)}>
                <form className="form">
                    <FormControl>
                        <InputLabel className="form__label" htmlFor="name">Name</InputLabel>
                        <Input value={name} onChange={e => setName(e.target.value)} type="text" id="name" className="form__input"/>
                    </FormControl>
                    <FormControl>
                        <InputLabel className="form__label" htmlFor="num">Contact Number</InputLabel>
                        <Input value={mobileNumber} onChange={e => setMobileNumber(e.target.value)} type="tel" id="num" className="form__input"/>
                    </FormControl>
                    <Button disabled={!name || !mobileNumber} onClick={addToContacts} className="form__submit" type="submti">Add to Contacts</Button>
                    <Button className="form__discard" onClick={e => setOpen(false)}>Discard</Button>
                </form>
            </Modal>
            <AddCircleOutlineSharpIcon style={{fontSize: '3rem'}} className="form__add-button" onClick={e => setOpen(true)}></AddCircleOutlineSharpIcon>
            <ul className="contacts">
                {
                    contacts.map(contact => {
                        return (
                        <Contact contact = {contact}/>
                    )})
                }
            </ul>
        </div>
    );
}

export default App;
