
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'contactDB'

export const contactService = {
    query,
    getById,
    save,
    remove,
    getEmptyContact,
    getDefaultFilter
}


function query(filterBy = {}) {

    if (!filterBy.txt) filterBy.txt = ''
    if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
    const regExp = new RegExp(filterBy.txt, 'i')
    return storageService.query(STORAGE_KEY)
        .then(contacts => {
            return contacts.filter(contact =>
                regExp.test(contact.vendor) &&
                contact.price <= filterBy.maxPrice
            )
        })
}

function getById(contactId) {
    return storageService.get(STORAGE_KEY, contactId)
}
function remove(contactId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, contactId)
}
function save(contact) {
    if (contact._id) {
        return storageService.put(STORAGE_KEY, contact)
    } else {
        // when switching to backend - remove the next line
        contact.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, contact)
    }
}


function getEmptyContact() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}



function getDefaultFilter() {
    return { txt: '', maxPrice: '' }
}



