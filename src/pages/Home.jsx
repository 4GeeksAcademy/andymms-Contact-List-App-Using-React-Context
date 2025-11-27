import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";
import { ContactCard } from "../components/ContactCard.jsx";
import React, { useEffect } from "react";

const CreateAgenda = (dispatch) => {

	fetch(`https://playground.4geeks.com/contact/agendas/andymms`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({})
	})
		.then(response => {
			if (response.status === 201) {
				console.log("New agenda created");
				getAgenda(dispatch)
			} else if (response.status === 422 || response.status === 400) {
				console.log("Agenda already exists");
				getAgenda(dispatch)
			}
			return response.json()
		})
		.then(data => { console.log(data) })
		.catch(error => { console.log(error) })

}

const getAgenda = (dispatch) => {

	fetch(`https://playground.4geeks.com/contact/agendas/andymms/contacts`)
		.then(response => response.json())
		.then(data => {
			if (data && Array.isArray(data.contacts)) {
				dispatch({
					type: "set_contacts",
					payload: data.contacts
				})
			} else {
				console.log("No contacts on the agenda");
				dispatch({
					type: "set_contacts",
					payload: []
				})
			}
		})
		.catch(error => console.log("Error fetching agenda:", error))

}


export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	useEffect(() => {
		CreateAgenda(dispatch)
	}, [dispatch]);

	return (
		<div className="container mt-5">
			<h1 className="text-center"><b>Contacts Library</b></h1>
			<div className="d-flex justify-content-end">
				<Link to="/add-contact" >
					<button className="btn btn-success"> Add contact</button>
				</Link>
			</div>
			<ContactCard getAgenda={() => getAgenda(dispatch)}/>
		</div>
	);
}; 