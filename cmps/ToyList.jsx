import { ContactPreview } from "./ContactPreview.jsx"

export function ContactList({ contacts, onRemoveContact, onEditContact, addToCart, baba }) {

    return (
        <ul className="contact-list">
            {contacts.map(contact =>
                <ContactPreview
                    key={contact._id}
                    contact={contact}
                    onRemoveContact={onRemoveContact}
                    onEditContact={onEditContact}
                />
            )}
        </ul>
    )
}