import { Link, useNavigate, useParams } from "react-router-dom"; 
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect, useState } from "react";

export const EditContact = () => {

    const { contact_id } = useParams()
    const { store, dispatch } = useGlobalReducer()
    const navigate = useNavigate()

    let [data, setData] = useState({
        name: "", email: "", phone: "", address: ""
    })

    useEffect(() => {

        const contactToEdit = store.contacts.find(contact => contact.id === parseInt(contact_id))

        if (contactToEdit) {
            setData({
                name: contactToEdit.name,
                email: contactToEdit.email,
                phone: contactToEdit.phone,
                address: contactToEdit.address
            })
        } else {
            alert("Contact not found")
        }

    }, [contact_id])

    const handleFormData = (e) => {
        setData({ ...data, [e.target.id]: e.target.value })
    }

    const editContact = (e) => {

        e.preventDefault()

        if (data.name === "" || data.email === "" || data.phone === "" || data.address === "") {
            return alert("All fields are required")
        } else {
            fetch(`https://playground.4geeks.com/contact/agendas/andymms/contacts/${contact_id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (response.status === 200) {
                        alert("Contact updated");
                        navigate("/")
                    } else if (response.status === 422 || response.status === 400) {
                        alert("There was an error updating the contact");
                    }
                    return response.json()
                })
                .then(data => { console.log(data) })
                .catch(error => { console.log(error) })
        }

    }

    return <div className="container mt-5">
        <form>
            <h1 className="text-center"><b>Edit contact</b></h1>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Full Name <i className="fa-regular fa-address-card"></i></label>
                <input type="text" className="form-control" id="name" aria-describedby="emailHelp"
                    value={data.name}
                    onChange={handleFormData} />
            </div>
            <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone number <i className="fa-solid fa-phone"></i></label>
                <input type="text" className="form-control" id="phone" aria-describedby="emailHelp"
                    value={data.phone}
                    onChange={handleFormData} />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email <i className="fa-solid fa-envelope"></i></label>
                <input type="text" className="form-control" id="email" aria-describedby="emailHelp"
                    value={data.email}
                    onChange={handleFormData} />
            </div>
            <div className="mb-3">
                <label htmlFor="address" className="form-label">Address <i className="fa-solid fa-location-dot"></i></label>
                <input type="text" className="form-control" id="address" aria-describedby="emailHelp"
                    value={data.address}
                    onChange={handleFormData} />
            </div>

            <button type="submit" className="btn btn-warning w-100 text-center"
                onClick={editContact}>
                Edit Contact
            </button>
            <Link to={"/"} >
                <p className="mt-3">Go back to agenda</p>
            </Link>
        </form>
    </div>
}