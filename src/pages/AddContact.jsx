import { Link, useNavigate } from "react-router-dom"; 
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState } from "react";

export const AddContact = () => {

    const { store, dispatch } = useGlobalReducer()
    const navigate = useNavigate()

    let [data, setData] = useState({
        name: "", email: "", phone: "", address: ""
    })

    const handleFormData = (e) => {
        setData({ ...data, [e.target.id]: e.target.value })
    }

    const createNewContact = (e) => {

        e.preventDefault()

        if (data.name === "" || data.email === "" || data.phone === "" || data.address === "") {
            return alert("All fields are required")
        } else {
            fetch(`https://playground.4geeks.com/contact/agendas/andymms/contacts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (response.status === 201) {
                        alert("Contact created");
                        navigate("/")
                    } else if (response.status === 422 || response.status === 400) {
                        alert("There was an error creating the contact");
                    }
                    return response.json()
                })
                .then(data => { console.log(data) })
                .catch(error => { console.log(error) })
        }

    }


    return <div className="container mt-5">
        <form>
            <h1 className="text-center"><b>Add new contact</b></h1>
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

            <button type="submit" className="btn btn-success w-100 text-center"
                onClick={createNewContact}>
                Create Contact
            </button>
            <Link to={"/"} >
                <p className="mt-3">Go back to agenda</p>
            </Link>
        </form>
    </div>
}