const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux

import { ContactFilter } from '../cmps/ContactFilter.jsx'
import { contactService } from '../services/contact.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadContacts, removeContact, removeContactOptimistic, saveContact, setFilterBy } from '../store/actions/contact.actions.js'
import {  ADD_CAR_TO_CART } from '../store/reducers/contact.reducer.js'

export function ContactIndex() {
    const dispatch = useDispatch()
    const contacts = useSelector(storeState => storeState.contactModule.contacts)
    const contactt = useSelector(storeState => storeState.contactModule.shoppingContactt)
    const isLoading = useSelector(storeState => storeState.contactModule.isLoading)
    const filterBy = useSelector(storeState => storeState.contactModule.filterBy)
    // const [filterBy, setFilterBy] = useState(contactService.getDefaultFilter())

    useEffect(() => {
        loadContacts()
            .catch(() => {
                showErrorMsg('Cannot show contacts')
            })
    }, [filterBy])

    function onRemoveContact(contactId) {
        removeContactOptimistic(contactId)
            .then(() => {
                showSuccessMsg('Contact removed')
            })
            .catch(err => {
                console.log('Cannot remove contact', err)
                showErrorMsg('Cannot remove contact')
            })
    }

    function onAddContact() {
        const contactToSave = contactService.getEmptyContact()
        saveContact(contactToSave)
            .then((savedContact) => {
                console.log('savedContact:', savedContact)
                showSuccessMsg(`Contact added (vendor: ${savedContact.vendor})`)
            })
            .catch(err => {
                console.log('Cannot add contact', err)
                showErrorMsg('Cannot add contact')
            })


    }
    function onEditContact(contact) {
        const price = +prompt('New price?')
        const contactToSave = { ...contact, price }

        saveContact(contactToSave)
            .then((savedContact) => {
                // dispatch({ type: UPDATE_CAR, contact: savedContact })
                showSuccessMsg(`Contact updated to price: $${savedContact.price}`)
            })

            .catch(err => {
                console.log('Cannot update contact', err)
                showErrorMsg('Cannot update contact')
            })
    }

    function onSetFilter(filterBy) {
        // setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
        setFilterBy(filterBy)
    }



    return (
        <div>
            <h3>Contacts App</h3>
            <main>
                <button onClick={onAddContact}>Add Contact ⛐</button>
                <ContactFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                {!isLoading && <ul className="contact-list">
                    {contacts.map(contact =>
                        <li className="contact-preview" key={contact._id}>
                            <h4>{contact.vendor}</h4>
                            <h1>⛐</h1>
                            <p>Price: <span>${contact.price.toLocaleString()}</span></p>
                            <p>Owner: <span>{contact.owner && contact.owner.fullname}</span></p>
                            <div>
                                <button disabled={isLoading} onClick={() => {
                                    onRemoveContact(contact._id)
                                }}>x</button>
                                <button  onClick={() => {
                                    onEditContact(contact)
                                }}>Edit</button>
                            </div>

                        </li>)}
                </ul>}
                {isLoading && <div>Loading...</div>}
                <hr />
                <pre>{JSON.stringify(contactt, null, 2)}</pre>
            </main>
        </div>
    )

}