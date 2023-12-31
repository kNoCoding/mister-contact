import { contactService } from "../../services/contact.service.js"


// contact
export const SET_CARS = 'SET_CARS'
export const REMOVE_CAR = 'REMOVE_CAR'
export const ADD_CAR = 'ADD_CAR'
export const UPDATE_CAR = 'UPDATE_CAR'
export const CAR_UNDO = 'CAR_UNDO'

// shopping contactt
export const SET_CART_IS_SHOWN = 'SET_CART_IS_SHOWN'
export const ADD_CAR_TO_CART = 'ADD_CAR_TO_CART'
export const REMOVE_CAR_FROM_CART = 'REMOVE_CAR_FROM_CART'
export const CLEAR_CART = 'CLEAR_CART'

export const SET_IS_LOADING = 'SET_IS_LOADING'


export const SET_FILTER_BY = 'SET_FILTER_BY'

const initialState = {
    contacts: [],
    lastContacts: [],
    isContacttShown: false,
    shoppingContactt: [],
    isLoading: false,
    filterBy: contactService.getDefaultFilter()
}

export function contactReducer(state = initialState, action = {}) {

    let contacts
    let shoppingContactt
    let lastContacts
    switch (action.type) {
        // contact
        case SET_CARS:
            return { ...state, contacts: action.contacts }

        case REMOVE_CAR:
            lastContacts = [...state.contacts]
            contacts = state.contacts.filter(contact => contact._id !== action.contactId)
            return { ...state, contacts, lastContacts }

        case ADD_CAR:
            contacts = [...state.contacts, action.contact]
            return { ...state, contacts }

        case UPDATE_CAR:
            contacts = state.contacts.map(contact => contact._id === action.contact._id ? action.contact : contact)
            return { ...state, contacts }


        // shopping contactt
        case SET_CART_IS_SHOWN:
            return { ...state, isContacttShown: action.isContacttShown }

        case ADD_CAR_TO_CART:
            shoppingContactt = [...state.shoppingContactt, action.contact]
            return { ...state, shoppingContactt }

        case ADD_CAR_TO_CART:
            shoppingContactt = [...state.shoppingContactt, action.contact]
            return { ...state, shoppingContactt }

        case REMOVE_CAR_FROM_CART:
            shoppingContactt = state.shoppingContactt.filter(contact => contact._id !== action.contactId)
            return { ...state, shoppingContactt }
        case CLEAR_CART:
            return { ...state, shoppingContactt: [] }


        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }

        case SET_FILTER_BY:
            return { ...state, filterBy: { ...state.filterBy, ...action.filterBy } }

        case CAR_UNDO:
            contacts = [...state.lastContacts]
            return { ...state, contacts }

        default:
            return state
    }
}
