
const Contact = ({allContacts, deleteContact, editContact}) => {
    
    return(
        <>
            {
                allContacts?.map(contact => (
                    <div className="col-xs-6 col-md-4 mt-3" key={contact._id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{(contact.firstname).toUpperCase()}  {(contact.lastname).toUpperCase()}</h5>
                                <p className="card-text">{contact.email}</p>
                                <p className="card-text">{contact.city}</p>
                                <p className="card-text">{contact.mobile}</p>
                                <button type="button" onClick={() => deleteContact(contact._id)} className="btn btn-outline-danger"><i className="bi bi-archive"></i></button>
                                <button type="button" onClick={() => editContact(contact)} className="btn btn-outline-success" style={{marginLeft: "10px"}}><i className="bi bi-pencil-square"></i></button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
        
    )
}

export default Contact;