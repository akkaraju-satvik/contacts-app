import './Contact.css';
import React, { useState } from 'react';
import db from '../firebase';
import { FormControl, ListItem, Input, Modal, Button } from '@material-ui/core';

const Contact = function(props) {
    const [open, setOpen] = useState(false)

    const [name, setName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('')

    const updateContact = function() {
        db.collection('contacts').doc(props.contact.id).set({
            name: name,
            mobileNumber: mobileNumber
        }, {merge: true});
        setOpen(false);
    }
    return (
        <>
        <Modal open={open} onClose={() => setOpen(false)}>
            <div className="modal">
                <form class="form">
                    <FormControl>
                        <Input className="modal__name" value={name} placeholder={props.contact.contact.name} onChange={e => setName(e.target.value)} type="text"></Input>
                    </FormControl>
                    <FormControl>
                        <Input className="modal__number" value={mobileNumber} placeholder={props.contact.contact.mobileNumber} onChange={e => setMobileNumber(e.target.value)} type="tel"></Input>
                    </FormControl>
                    <Button type="submit" onClick={updateContact}>Update</Button>
                    <Button onClick={e => setOpen(false)}>Discard</Button>
                </form>
            </div>
        </Modal>
        <ListItem className="contact">
            <ListItem className="contact__name">
                {props.contact.contact.name}
            </ListItem>
            <ListItem className="contact__number">
                {props.contact.contact.mobileNumber}
            </ListItem>
            <Button onClick={e => setOpen(true)}>Edit</Button>
            <Button className="contact__delete" onClick={() => db.collection('contacts').doc(props.contact.id).delete()}>Delete</Button>
        </ListItem>
        </>
    )
}

export default Contact;