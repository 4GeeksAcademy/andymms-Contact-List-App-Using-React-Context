import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const ContactCard = ({ getAgenda }) => {

    const { store, dispatch } = useGlobalReducer()

    const deleteContact = (contactId) => {

        fetch(`https://playground.4geeks.com/contact/agendas/andymms/contacts/${contactId}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.status === 204) {
                    alert("Contact deleted");
                    getAgenda()
                } else if (response.status === 422 || response.status === 400) {
                    alert("There was an error deleting the contact");
                }
            })
            .then(data => { console.log(data) })
            .catch(error => { console.log(error) })
    }

    return (
        <> {store && store.contacts && store.contacts.length > 0 ? (
            store.contacts.map((contacts) => {
                return <div key={contacts.id}>
                    <div className="card mb-3 mt-3 w-100">
                        <div className="row g-0">
                            <div className="col-md-3 d-flex justify-content-center mt-4 mb-4">
                                <img src="https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png"
                                    className="img-fluid rounded-circle ratio ratio-1x1 object-fit-cover"
                                    alt="Profile Picture"
                                    style={{ maxWidth: '150px', maxHeight: '150px' }}
                                />
                            </div>
                            <div className="col-md-9">
                                <div className="card-body">
                                    <div className="d-flex">
                                        <h5 className="card-title fs-4"> <b>{contacts.name}</b></h5>

                                        <Link className="ms-auto" to={"/edit-contact/" + contacts.id}>
                                            <i className="fs-5 fa-solid fa-pen text-warning"></i>
                                        </Link>

                                        <i className="ms-5 me-5 fs-5 fa-solid fa-trash text-danger"
                                            data-bs-toggle="modal" data-bs-target={`#deleteContact${contacts.id}`}></i>
                                        <div className="modal fade" id={`deleteContact${contacts.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h1 className="modal-title fs-5" id={`deleteContact${contacts.id}`}>Are you sure you want to delete {contacts.name}?</h1>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Not really</button>
                                                        <button type="button" className="btn btn-danger"
                                                            onClick={() => deleteContact(contacts.id)}
                                                            data-bs-dismiss="modal">
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="mt-3">
                                        <p className="text-secondary"><i className="fa-solid fa-location-dot"></i> {contacts.address}</p>
                                        <p className="text-secondary"><i className="fa-solid fa-phone"></i> {contacts.phone}</p>
                                        <p className="text-secondary"><i className="fa-solid fa-envelope"></i> {contacts.email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            })
        ) : (
            <p className="text-center text-muted mt-5 fs-4 p-5 rounded">
                There are no contacts on the agenda.
            </p>
        )}
        </>
    );
}