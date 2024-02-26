import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { getCookie } from '../util/util';
import Contact from "../components/Contact";
import config from '../config';

const Contacts = () => {
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [mobile, setMobile] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const getToken = getCookie('token');
    
    const [deleteError, setDeleteError] = useState(null);
    const [addError, setAddError] = useState(null);

    const handleDelete = (id) => {
        setAddError(null);
        fetch(`${config.gateWayURL}${config.contacts.baseURL}/${id}`, {
            method: 'DELETE',
            headers: {
                "authorization": getToken,
            }
        })
        .then(res => res.json())
        .then(data => {
            setDeleteError(data);
            getAllContacts();
            setIsEdit(false);
            resetForm();
        })
    }

    const getAllContacts = () => {
        if(getToken.length){
            fetch(`${config.gateWayURL}${config.contacts.baseURL}`, {
                method: 'GET',
                headers: {
                    "authorization": getToken,
                }
            })
            .then(res => res.json())
            .then(data => {
                setContacts(data.data);
            })
        } else {
            navigate("/login");
        }
    }

    const handleAddContact = () => {
        setDeleteError(null);
        fetch(`${config.gateWayURL}${config.contacts.baseURL}`, {
            method: 'POST',
            body: JSON.stringify({firstname: firstname, lastname: lastname, email: email,  city: city, mobile: mobile}),
            headers: {
                "Content-Type": "application/json",
                "authorization": getToken,
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.status === 200){
                getAllContacts();
                setAddError(null);
                resetForm();
            } 
            setAddError(data);
            
        })
    }

    const handleEditContact = (contact) => {
        setIsEdit(true);
        setFirstname(contact.firstname);
        setLastname(contact.lastname);
        setEmail(contact.email);
        setCity(contact.city);
        setMobile(contact.mobile);
    }

    const handleUpdateContact = () => {
        setDeleteError(null);
        fetch(`${config.gateWayURL}${config.contacts.baseURL}`, {
            method: 'PUT',
            body: JSON.stringify({firstname: firstname, lastname: lastname, email: email,  city: city, mobile: mobile}),
            headers: {
                "Content-Type": "application/json",
                "authorization": getToken,
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.status === 200){
                setIsEdit(false);
                resetForm();
                getAllContacts();
            } else {
                setIsEdit(true);
            }
            setAddError(data);
            
        })
    };

    const resetForm = () => {
        setFirstname('');
        setLastname('');
        setEmail('');
        setCity('');
        setMobile('');
    }


    useEffect(() => {
        getAllContacts();
    }, [])


    return (
        <>
            <div className="container">
                <div className='row justify-content-md-center'>
                    <div className="col-md-8 ">
                            <h1 className="text-center">Add New Contact</h1>
                            <hr/>
                            <div className='row'>
                                <div className="col-md-12 ">
                                    {
                                        addError && <div className={`alert ${addError.status === 200 ? 'alert-primary': 'alert-danger'}`} role="alert">{addError?.message}</div>
                                    }
                                </div>
                            </div>
                            <form>
                                <div className="row">
                                    <div className="mb-3">
                                        <label htmlFor="firstname" className="form-label">First Name</label>
                                        <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} className="form-control" id="firstname" placeholder="First Name" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="lastname" className="form-label">Last Name</label>
                                        <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} className="form-control" id="lastname" placeholder="Last Name" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control"  id="email" placeholder="name@example.com" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="city" className="form-label">City</label>
                                        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="form-control"  id="city" placeholder="Email" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="phone" className="form-label">Mobile</label>
                                        <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} className="form-control"  id="phone" placeholder="Phone number" />
                                    </div>
                                
                                </div>
                                <div className="row">
                                    <div className="mb-3">
                                        {
                                            !isEdit ? <button type="button" onClick={handleAddContact} className="btn btn-primary">Add Contact</button>
                                            : <button type="button" onClick={handleUpdateContact} className="btn btn-primary">Update Contact</button>
                                        }                                        
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                <hr/>
                <div className='row'>
                    <div className="col-md-12 ">
                        {
                            deleteError && <div className={`alert ${deleteError.status === 200 ? 'alert-primary': 'alert-danger'}`} role="alert">{deleteError.message}</div>
                        }
                    </div>
                </div>

                <div className="row mb-15" style={{marginBottom: "50px"}}>
                    <Contact allContacts={contacts} deleteContact={handleDelete} editContact={handleEditContact} />
                </div>
            </div>
        </>
    )
}

export default Contacts;