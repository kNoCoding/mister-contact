import { contactService } from "../../services/contact.service.js"
import { ADD_CAR, CAR_UNDO, REMOVE_CAR, SET_CARS, SET_FILTER_BY, SET_IS_LOADING, UPDATE_CAR } from "../reducers/contact.reducer.js"
import { store } from "../store.js"


export function loadContacts() {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    const filterBy = store.getState().contactModule.filterBy
    return contactService.query(filterBy)
        .then(contacts => {
            store.dispatch({ type: SET_CARS, contacts })
        })
        .catch(err => {
            console.log('contact action -> Cannot load contacts', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}

export function removeContactOptimistic(contactId) {
    store.dispatch({ type: REMOVE_CAR, contactId })
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })

    return contactService.remove(contactId)
        .catch(err => {
            store.dispatch({ type: CAR_UNDO })
            console.log('contact action -> Cannot remove contact', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}


export function removeContact(contactId) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return contactService.remove(contactId)
        .then(() => {
            store.dispatch({ type: REMOVE_CAR, contactId })
        })
        .catch(err => {
            console.log('contact action -> Cannot remove contact', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}

export function saveContact(contact) {
    const type = contact._id ? UPDATE_CAR : ADD_CAR
    return contactService.save(contact)
        .then(contactToSave => {
            store.dispatch({ type, contact: contactToSave })
            return contactToSave
        })
        .catch(err => {
            console.log('contact action -> Cannot save contact', err)
            throw err
        })
}

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}