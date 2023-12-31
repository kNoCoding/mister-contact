import { Link } from "react-router-dom"

// const { Link } = ReactRouterDOM
export function ContactPreview({ contact, onRemoveContact, onEditContact, addToCart }) {

    return (
        <li className="contact-preview" key={contact._id}>
            <Link to={`/contact/${contact._id}`} >
                <h4>Contact: {contact.name}</h4>
                <h1>⛐</h1>
            </Link>

        </li>
    )
}